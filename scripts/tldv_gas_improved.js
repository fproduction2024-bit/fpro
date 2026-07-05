var SHEET_NAME = 'シート1';

function doPost(e) {
    try {
        if (!e.postData || !e.postData.contents) {
            return ContentService.createTextOutput("No data");
        }

        var payload = JSON.parse(e.postData.contents);

        var mid = (payload.data && payload.data.meetingId)
            || payload.meetingId
            || payload.meeting_id;

        if (!mid) {
            return ContentService.createTextOutput("No ID");
        }

        // 重複チェック：すでに処理済みか確認
        if (isDuplicateMeeting(mid)) {
            return ContentService.createTextOutput("Already processed");
        }

        var transcriptData = payload.data && payload.data.data;

        processMeetingFromWebhook(mid, transcriptData);
        return ContentService.createTextOutput("Success");
    } catch (err) {
        return ContentService.createTextOutput("Error: " + err.message);
    }
}

function isDuplicateMeeting(meetingId) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME);

    if (!sh) return false;

    var lastRow = sh.getLastRow();
    if (lastRow < 2) return false; // ヘッダー行のみの場合

    // D列（tl;dvリンク）を取得
    var links = sh.getRange(2, 4, lastRow - 1, 1).getValues();

    // 既存のリンクにこのミーティングIDが含まれているかチェック
    for (var i = 0; i < links.length; i++) {
        if (links[i][0] && links[i][0].toString().indexOf(meetingId) > -1) {
            return true; // 重複あり
        }
    }

    return false; // 重複なし
}

function processMeetingFromWebhook(mid, transcriptData) {
    try {
        var props = PropertiesService.getScriptProperties();
        var tk = props.getProperty('TLDV_API_KEY');
        var gk = props.getProperty('GEMINI_API_KEY');

        // 1. Meeting Details
        var mUrl = "https://pasta.tldv.io/v1alpha1/meetings/" + mid;
        var mRes = UrlFetchApp.fetch(mUrl, { headers: { "x-api-key": tk }, muteHttpExceptions: true });

        if (mRes.getResponseCode() !== 200) {
            writeErrorToSheet(mid, "ミーティング取得エラー", "ミーティングが見つかりません");
            return;
        }

        var mJson = JSON.parse(mRes.getContentText());

        // 2. Webhookから取得した文字起こしを処理
        var tText = extractTranscriptFromWebhook(transcriptData);

        // ★ 新機能：実際の参加者（発言者）を抽出
        var actualParticipants = extractActualParticipants(transcriptData);

        // 3. AI Analysis
        var meetingTitle = "無題";
        var summ = "処理中";

        if (tText && tText.length > 30) {
            meetingTitle = ask(tText, gk, "以下の会議の内容から、適切な会議タイトルを20文字以内で考えてください。タイトルのみを出力してください：");
            summ = ask(tText, gk, "以下の会議の文字起こしを、簡潔に3〜5行の箇条書きで要約してください。重要な決定事項やTODOがあれば含めてください：");
        }

        // 4. Write to Sheet
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sh = ss.getSheetByName(SHEET_NAME);

        if (!sh) {
            throw new Error("Sheet not found");
        }

        var meetingStartTime = getMeetingStartTime(mJson);

        sh.appendRow([
            Utilities.formatDate(meetingStartTime, "JST", "yyyy/MM/dd HH:mm"),
            meetingTitle,
            actualParticipants,  // ★ 変更：Gemini APIではなく、実際の発言者を使用
            "https://tldv.io/app/meetings/" + mid,
            summ
        ]);

    } catch (err) {
        writeErrorToSheet(mid || "unknown", "システムエラー", err.message);
    }
}

/**
 * ★ 新機能：Webhookから実際の参加者（発言者）を抽出
 * @param {Array} transcriptData - Webhookから送られてきた書き起こしデータ
 * @return {string} - 「古橋と〇〇」形式の参加者リスト
 */
function extractActualParticipants(transcriptData) {
    if (!transcriptData || !Array.isArray(transcriptData)) {
        return "不明";
    }

    // 発言者をSetで収集（重複排除）
    var speakers = {};

    for (var i = 0; i < transcriptData.length; i++) {
        var segment = transcriptData[i];
        if (segment.speaker) {
            var speakerName = segment.speaker.trim();
            speakers[speakerName] = true;
        }
    }

    // Setから配列に変換
    var speakerList = Object.keys(speakers);

    if (speakerList.length === 0) {
        return "不明";
    }

    // 「古橋と〇〇」形式にフォーマット
    return formatParticipantsList(speakerList);
}

/**
 * ★ 新機能：参加者リストを「古橋と〇〇」形式にフォーマット
 * @param {Array} participants - 参加者名の配列
 * @return {string} - フォーマットされた文字列
 */
function formatParticipantsList(participants) {
    if (!participants || participants.length === 0) {
        return "不明";
    }

    // 1人の場合
    if (participants.length === 1) {
        return normalizeName(participants[0]);
    }

    // 複数人の場合：「〇〇と△△」または「〇〇と△△と□□」
    var normalizedNames = participants.map(function (name) {
        return normalizeName(name);
    });

    return normalizedNames.join("と");
}

/**
 * ★ 新機能：名前を正規化（全角カタカナを半角に、余分な空白を削除など）
 * @param {string} name - 正規化前の名前
 * @return {string} - 正規化後の名前
 */
function normalizeName(name) {
    if (!name) return "";

    // 基本的なトリム
    var normalized = name.trim();

    // 「Speaker 1」などのラベルが含まれている場合は除去
    // （通常はtl;dvが実名を設定しているはずですが、念のため）
    normalized = normalized.replace(/^Speaker\s+\d+\s*[:\-]?\s*/i, "");

    return normalized;
}

function extractTranscriptFromWebhook(transcriptData) {
    if (!transcriptData || !Array.isArray(transcriptData)) {
        return "";
    }

    var text = "";
    for (var i = 0; i < transcriptData.length; i++) {
        var segment = transcriptData[i];
        if (segment.text) {
            text += segment.text + " ";
        }
    }

    return text.trim();
}

function getMeetingStartTime(mJson) {
    var dateStr = null;

    if (mJson.startTime) dateStr = mJson.startTime;
    else if (mJson.startedAt) dateStr = mJson.startedAt;
    else if (mJson.scheduledAt) dateStr = mJson.scheduledAt;
    else if (mJson.happenedAt) dateStr = mJson.happenedAt;
    else if (mJson.createdAt) dateStr = mJson.createdAt;

    if (dateStr) return new Date(dateStr);
    return new Date();
}

function writeErrorToSheet(mid, title, error) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME);
    sh.appendRow([
        Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm"),
        title,
        "エラー",
        "https://tldv.io/app/meetings/" + mid,
        error
    ]);
}

function ask(txt, key, q) {
    if (!txt || txt.length < 10) return "データ不足";

    try {
        var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + key;
        var safeText = String(txt).substring(0, 30000);

        var payload = {
            contents: [{
                parts: [{ text: q + "\n\n" + safeText }]
            }]
        };

        var res = UrlFetchApp.fetch(url, {
            method: "post",
            contentType: "application/json",
            payload: JSON.stringify(payload),
            muteHttpExceptions: true
        });

        if (res.getResponseCode() !== 200) return "AI解析エラー";

        var result = JSON.parse(res.getContentText());
        if (result.candidates && result.candidates[0] && result.candidates[0].content) {
            return result.candidates[0].content.parts[0].text.trim();
        }

        return "解析失敗";
    } catch (e) {
        return "エラー";
    }
}

function testManually() {
    var testMeetingId = "696104f8b00d8300141a5b7c";
    processMeetingFromWebhook(testMeetingId, null);
}
