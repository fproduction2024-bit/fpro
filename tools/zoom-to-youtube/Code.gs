/**
 * ============================================================
 * Zoom録画 → YouTube 自動アップロード (Google Apps Script)
 * ポーリング方式
 * ============================================================
 * 
 * 定期的にZoom APIで新しいクラウド録画を確認し、
 * 未処理の録画をGoogle Drive経由でYouTubeに自動アップロードする。
 * 
 * 【セットアップ】
 * 1. スクリプトプロパティに以下を設定:
 *    - ZOOM_CLIENT_ID
 *    - ZOOM_CLIENT_SECRET
 *    - ZOOM_ACCOUNT_ID
 *    - DRIVE_FOLDER_ID (一時保存用フォルダのID、省略可)
 * 
 * 2. Advanced Services で YouTube Data API v3 を有効化
 * 
 * 3. setupTrigger() を1回実行してタイマーを設定
 */

// ============================================================
// 設定
// ============================================================

function getConfig() {
  var props = PropertiesService.getScriptProperties();
  return {
    ZOOM_CLIENT_ID:         props.getProperty('ZOOM_CLIENT_ID'),
    ZOOM_CLIENT_SECRET:     props.getProperty('ZOOM_CLIENT_SECRET'),
    ZOOM_ACCOUNT_ID:        props.getProperty('ZOOM_ACCOUNT_ID'),
    DRIVE_FOLDER_ID:        props.getProperty('DRIVE_FOLDER_ID'),
    SPREADSHEET_ID:         props.getProperty('SPREADSHEET_ID'),
    YOUTUBE_PRIVACY:        props.getProperty('YOUTUBE_PRIVACY') || 'unlisted',
    YOUTUBE_CATEGORY_ID:    props.getProperty('YOUTUBE_CATEGORY_ID') || '27',
    CHECK_INTERVAL_MINUTES: 30,
    MAX_DIRECT_DOWNLOAD_MB: 50,
  };
}

// ============================================================
// タイマー設定（初回に1回だけ手動実行する）
// ============================================================

/**
 * 30分ごとの定期実行トリガーを設定する
 * ★ 最初に1回だけ手動で実行してください ★
 */
function setupTrigger() {
  // 既存の同名トリガーを削除
  cleanupTriggers_('checkNewRecordings');
  
  // 30分ごとに実行するトリガーを作成
  ScriptApp.newTrigger('checkNewRecordings')
    .timeBased()
    .everyMinutes(30)
    .create();
  
  console.log('✅ タイマー設定完了: 30分ごとに新しい録画を確認します');
  console.log('💡 手動ですぐに確認する場合は checkNewRecordings() を実行してください');
}

/**
 * タイマーを停止する
 */
function stopTrigger() {
  cleanupTriggers_('checkNewRecordings');
  console.log('⏹️ タイマーを停止しました');
}

// ============================================================
// メイン処理: 新しい録画を確認しアップロード
// ============================================================

/**
 * Zoom APIで新しい録画を確認し、未処理のものをYouTubeにアップロード
 * （タイマーから自動実行される。手動実行も可能）
 */
function checkNewRecordings() {
  log('🔍 新しい録画を確認中...');
  
  try {
    var config = getConfig();
    var accessToken = getZoomAccessToken();
    
    // 過去24時間の録画を取得
    var fromDate = new Date();
    fromDate.setHours(fromDate.getHours() - 24);
    var fromStr = Utilities.formatDate(fromDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
    
    var recordings = getZoomRecordings(accessToken, fromStr);
    
    if (!recordings || recordings.length === 0) {
      log('📭 新しい録画はありません');
      return;
    }
    
    log('📋 ' + recordings.length + ' 件のミーティング録画を検出');
    
    // 処理済みIDリストを取得
    var processedIds = getProcessedIds();
    var newCount = 0;
    
    recordings.forEach(function(meeting) {
      var mp4Files = (meeting.recording_files || []).filter(function(f) {
        return f.file_type === 'MP4' && f.status === 'completed';
      });
      
      // 文字起こしファイル（TRANSCRIPT）を探す
      var transcriptFile = (meeting.recording_files || []).filter(function(f) {
        return f.file_type === 'TRANSCRIPT' && f.status === 'completed';
      })[0];
      
      mp4Files.forEach(function(recording) {
        var recordingId = recording.id;
        
        // 既に処理済みならスキップ
        if (processedIds.indexOf(recordingId) !== -1) {
          log('⏭️ スキップ (処理済み): ' + meeting.topic + ' [' + recordingId + ']');
          return;
        }
        
        log('🆕 新しい録画を発見: ' + meeting.topic);
        
        try {
          // ファイル名を生成
          var fileName = sanitizeFileName(meeting.topic || 'Zoom Recording') 
            + '_' + formatDate(meeting.start_time) + '.mp4';
          
          // 説明文を生成
          var description = buildDescription(meeting, recording);
          
          // 文字起こしを取得
          var transcript = '';
          if (transcriptFile) {
            log('📝 文字起こしをダウンロード中...');
            transcript = downloadTranscript(transcriptFile.download_url, accessToken);
            if (transcript) {
              log('✅ 文字起こし取得完了 (' + transcript.length + '文字)');
            }
          } else {
            log('ℹ️ 文字起こしファイルなし（Zoomの文字起こし設定を確認してください）');
          }
          
          // ダウンロード
          log('📥 ダウンロード開始: ' + fileName);
          var driveFile = downloadRecording(recording.download_url, accessToken, fileName, config);
          
          if (!driveFile) {
            log('❌ ダウンロード失敗: ' + fileName);
            return;
          }
          
          log('✅ Drive保存完了: ' + formatFileSize(driveFile.getSize()));
          
          // YouTubeにアップロード
          var title = meeting.topic || 'Zoom Recording';
          var videoId = uploadToYouTube(driveFile, title, description, config);
          
          if (videoId) {
            log('🎉 YouTubeアップロード完了!');
            log('🔗 https://youtu.be/' + videoId);
            
            // スプレッドシートに記録
            logToSpreadsheet({
              date: meeting.start_time,
              topic: meeting.topic || 'Zoom Recording',
              videoId: videoId,
              url: 'https://youtu.be/' + videoId,
              duration: meeting.duration || '',
              fileSize: formatFileSize(driveFile.getSize()),
              transcript: transcript
            });
            
            // 処理済みとして記録
            markAsProcessed(recordingId);
            newCount++;
          }
          
          // 一時ファイル削除
          driveFile.setTrashed(true);
          log('🗑️ 一時ファイル削除');
          
        } catch (error) {
          log('❌ 処理エラー (' + meeting.topic + '): ' + error.message);
        }
      });
    });
    
    if (newCount > 0) {
      log('✅ ' + newCount + ' 件の新しい録画をYouTubeにアップロードしました');
    } else {
      log('📭 未処理の録画はありませんでした');
    }
    
  } catch (error) {
    log('❌ エラー: ' + error.message + '\n' + error.stack);
  }
}

// ============================================================
// Zoom API
// ============================================================

/**
 * Zoom Server-to-Server OAuth でアクセストークンを取得
 */
function getZoomAccessToken() {
  var config = getConfig();
  var credentials = Utilities.base64Encode(
    config.ZOOM_CLIENT_ID + ':' + config.ZOOM_CLIENT_SECRET
  );
  
  var response = UrlFetchApp.fetch('https://zoom.us/oauth/token', {
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + credentials,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    payload: {
      'grant_type': 'account_credentials',
      'account_id': config.ZOOM_ACCOUNT_ID
    },
    muteHttpExceptions: true
  });
  
  var result = JSON.parse(response.getContentText());
  
  if (result.access_token) {
    return result.access_token;
  } else {
    throw new Error('Zoomトークン取得失敗: ' + response.getContentText());
  }
}

/**
 * Zoom APIで録画一覧を取得
 * 
 * @param {string} accessToken - Zoomアクセストークン
 * @param {string} from - 取得開始日時 (ISO 8601)
 * @returns {Array} ミーティング録画の配列
 */
function getZoomRecordings(accessToken, from) {
  var url = 'https://api.zoom.us/v2/users/me/recordings'
    + '?from=' + encodeURIComponent(from)
    + '&page_size=30';
  
  var response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    muteHttpExceptions: true
  });
  
  if (response.getResponseCode() !== 200) {
    log('❌ Zoom録画一覧取得エラー: HTTP ' + response.getResponseCode());
    log('   ' + response.getContentText());
    return [];
  }
  
  var result = JSON.parse(response.getContentText());
  return result.meetings || [];
}

/**
 * 録画ファイルをダウンロードしてGoogle Driveに保存
 */
function downloadRecording(downloadUrl, accessToken, fileName, config) {
  var url = downloadUrl + '?access_token=' + accessToken;
  
  try {
    // ファイルサイズ確認
    var headResponse = UrlFetchApp.fetch(url, {
      method: 'get',
      followRedirects: true,
      muteHttpExceptions: true,
      headers: { 'Range': 'bytes=0-0' }
    });
    
    var contentRange = headResponse.getHeaders()['Content-Range'] || '';
    var totalSize = 0;
    var rangeMatch = contentRange.match(/\/(\d+)/);
    if (rangeMatch) {
      totalSize = parseInt(rangeMatch[1], 10);
    }
    
    log('📊 ファイルサイズ: ' + formatFileSize(totalSize));
    
    var blob;
    var maxBytes = config.MAX_DIRECT_DOWNLOAD_MB * 1024 * 1024;
    
    if (totalSize > 0 && totalSize > maxBytes) {
      log('📦 分割ダウンロードモード');
      blob = downloadInChunks(url, totalSize, maxBytes);
    } else {
      var response = UrlFetchApp.fetch(url, {
        method: 'get',
        followRedirects: true,
        muteHttpExceptions: true
      });
      
      if (response.getResponseCode() !== 200) {
        log('❌ HTTP ' + response.getResponseCode());
        return null;
      }
      blob = response.getBlob();
    }
    
    blob.setName(fileName);
    
    var folder = config.DRIVE_FOLDER_ID 
      ? DriveApp.getFolderById(config.DRIVE_FOLDER_ID) 
      : DriveApp.getRootFolder();
    
    return folder.createFile(blob);
    
  } catch (error) {
    log('❌ ダウンロードエラー: ' + error.message);
    return null;
  }
}

/**
 * 文字起こし（VTT）をダウンロードしてプレーンテキストに変換
 */
function downloadTranscript(downloadUrl, accessToken) {
  var url = downloadUrl + '?access_token=' + accessToken;
  
  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      followRedirects: true,
      muteHttpExceptions: true
    });
    
    if (response.getResponseCode() !== 200) {
      log('⚠️ 文字起こしダウンロードエラー: HTTP ' + response.getResponseCode());
      return '';
    }
    
    var vttText = response.getContentText('UTF-8');
    
    // VTTフォーマットからプレーンテキストを抽出
    // タイムスタンプ行(00:00:00.000 --> 00:00:05.000)と空行、ヘッダーを除去
    var lines = vttText.split('\n');
    var textLines = [];
    
    lines.forEach(function(line) {
      line = line.trim();
      // WEBVTTヘッダー、空行、タイムスタンプ行、連番行をスキップ
      if (!line || 
          line === 'WEBVTT' ||
          line.match(/^\d+$/) ||
          line.match(/\d{2}:\d{2}:\d{2}/) ||
          line.match(/-->/)
      ) {
        return;
      }
      // 重複行を除去
      if (textLines.length === 0 || textLines[textLines.length - 1] !== line) {
        textLines.push(line);
      }
    });
    
    return textLines.join('\n');
    
  } catch (error) {
    log('⚠️ 文字起こしエラー: ' + error.message);
    return '';
  }
}

/**
 * 大きなファイルを分割ダウンロード
 */
function downloadInChunks(url, totalSize, chunkSize) {
  var chunks = [];
  var start = 0;
  var partNum = 1;
  
  while (start < totalSize) {
    var end = Math.min(start + chunkSize - 1, totalSize - 1);
    log('  📦 チャンク #' + partNum + ': bytes ' + start + '-' + end);
    
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { 'Range': 'bytes=' + start + '-' + end },
      muteHttpExceptions: true,
      followRedirects: true
    });
    
    if (response.getResponseCode() !== 206 && response.getResponseCode() !== 200) {
      throw new Error('チャンクDL失敗: HTTP ' + response.getResponseCode());
    }
    
    chunks.push(response.getBlob().getBytes());
    start = end + 1;
    partNum++;
  }
  
  var allBytes = [];
  chunks.forEach(function(chunk) {
    allBytes = allBytes.concat(chunk);
  });
  
  return Utilities.newBlob(allBytes, 'video/mp4');
}

// ============================================================
// YouTube アップロード
// ============================================================

/**
 * Google DriveのファイルをYouTubeにアップロード
 */
function uploadToYouTube(driveFile, title, description, config) {
  try {
    var videoMetadata = {
      snippet: {
        title: title,
        description: description,
        categoryId: config.YOUTUBE_CATEGORY_ID,
        tags: ['Zoom', 'Recording', '自動アップロード']
      },
      status: {
        privacyStatus: config.YOUTUBE_PRIVACY,
        selfDeclaredMadeForKids: false
      }
    };
    
    log('📤 YouTubeアップロード中...');
    
    var video = YouTube.Videos.insert(
      videoMetadata,
      'snippet,status',
      driveFile.getBlob()
    );
    
    return video.id;
    
  } catch (error) {
    log('❌ YouTubeエラー: ' + error.message);
    return null;
  }
}

// ============================================================
// 処理済み管理（重複アップロード防止）
// ============================================================

/**
 * 処理済み録画IDリストを取得
 */
function getProcessedIds() {
  var props = PropertiesService.getScriptProperties();
  var json = props.getProperty('PROCESSED_IDS') || '[]';
  try {
    return JSON.parse(json);
  } catch (e) {
    return [];
  }
}

/**
 * 録画IDを処理済みとしてマーク
 */
function markAsProcessed(recordingId) {
  var ids = getProcessedIds();
  ids.push(recordingId);
  // 直近200件のみ保持
  if (ids.length > 200) {
    ids = ids.slice(-200);
  }
  PropertiesService.getScriptProperties().setProperty('PROCESSED_IDS', JSON.stringify(ids));
}

/**
 * 処理済みリストをリセット（手動実行用）
 */
function resetProcessedIds() {
  PropertiesService.getScriptProperties().deleteProperty('PROCESSED_IDS');
  console.log('✅ 処理済みリストをリセットしました');
}

// ============================================================
// スプレッドシート記録
// ============================================================

/**
 * アップロード結果をスプレッドシートに記録
 */
function logToSpreadsheet(data) {
  var config = getConfig();
  
  if (!config.SPREADSHEET_ID) {
    log('⚠️ SPREADSHEET_ID 未設定のためスプレッドシート記録をスキップ');
    return;
  }
  
  try {
    var ss = SpreadsheetApp.openById(config.SPREADSHEET_ID);
    var sheet = ss.getSheetByName('アップロード履歴');
    
    // シートがなければ作成してヘッダーを追加
    if (!sheet) {
      sheet = ss.insertSheet('アップロード履歴');
      sheet.appendRow([
        'アップロード日時', 
        'ミーティング日時', 
        'トピック', 
        'YouTube URL', 
        '所要時間(分)', 
        'ファイルサイズ',
        'Video ID',
        '文字起こし'
      ]);
      // ヘッダー行を太字に
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // データを追記
    sheet.appendRow([
      new Date(),
      data.date ? new Date(data.date) : '',
      data.topic,
      data.url,
      data.duration,
      data.fileSize,
      data.videoId,
      data.transcript || ''
    ]);
    
    log('📊 スプレッドシートに記録しました');
    
  } catch (error) {
    log('⚠️ スプレッドシート記録エラー: ' + error.message);
  }
}

/**
 * スプレッドシートを新規作成する（手動実行用）
 * SPREADSHEET_ID が未設定の場合に使う
 */
function createSpreadsheet() {
  var ss = SpreadsheetApp.create('Zoom → YouTube アップロード履歴');
  var id = ss.getId();
  var url = ss.getUrl();
  
  // スクリプトプロパティに自動設定
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', id);
  
  console.log('✅ スプレッドシートを作成しました');
  console.log('📊 URL: ' + url);
  console.log('🔑 SPREADSHEET_ID: ' + id);
  console.log('💡 スクリプトプロパティに自動設定済みです');
}

// ============================================================
// ヘルパー関数
// ============================================================

function sanitizeFileName(name) {
  return name.replace(/[\/\\:*?"<>|]/g, '_').substring(0, 100);
}

function formatDate(isoString) {
  if (!isoString) return new Date().toISOString().slice(0, 10);
  var d = new Date(isoString);
  return Utilities.formatDate(d, 'Asia/Tokyo', 'yyyy-MM-dd_HHmm');
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  var units = ['B', 'KB', 'MB', 'GB'];
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + units[i];
}

function buildDescription(meeting, recording) {
  var lines = [
    '📹 Zoom録画の自動アップロード',
    '',
    '【ミーティング情報】',
    'トピック: ' + (meeting.topic || 'N/A'),
    '日時: ' + formatDate(meeting.start_time),
    'ミーティングID: ' + (meeting.id || 'N/A'),
  ];
  if (meeting.duration) {
    lines.push('所要時間: ' + meeting.duration + '分');
  }
  lines.push('');
  lines.push('この動画はZoom録画から自動アップロードされました。');
  return lines.join('\n');
}

function log(message) {
  var timestamp = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
  var logEntry = '[' + timestamp + '] ' + message;
  console.log(logEntry);
  
  try {
    var props = PropertiesService.getScriptProperties();
    var logs = props.getProperty('RECENT_LOGS') || '';
    var logLines = logs.split('\n').slice(-50);
    logLines.push(logEntry);
    props.setProperty('RECENT_LOGS', logLines.join('\n'));
  } catch (e) {}
}

function cleanupTriggers_(functionName) {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

// ============================================================
// ユーティリティ（手動実行用）
// ============================================================

/**
 * 直近のログを確認
 */
function viewRecentLogs() {
  var logs = PropertiesService.getScriptProperties().getProperty('RECENT_LOGS') || '(ログなし)';
  console.log('=== 直近のログ ===\n' + logs);
}

/**
 * 設定を確認
 */
function checkConfig() {
  var config = getConfig();
  console.log('=== 設定確認 ===');
  console.log('ZOOM_CLIENT_ID: ' + (config.ZOOM_CLIENT_ID ? '✅ 設定済み' : '❌ 未設定'));
  console.log('ZOOM_CLIENT_SECRET: ' + (config.ZOOM_CLIENT_SECRET ? '✅ 設定済み' : '❌ 未設定'));
  console.log('ZOOM_ACCOUNT_ID: ' + (config.ZOOM_ACCOUNT_ID ? '✅ 設定済み' : '❌ 未設定'));
  console.log('DRIVE_FOLDER_ID: ' + (config.DRIVE_FOLDER_ID || '(ルートフォルダ)'));
  console.log('SPREADSHEET_ID: ' + (config.SPREADSHEET_ID ? '✅ 設定済み' : '❌ 未設定 → createSpreadsheet() を実行'));
  console.log('YOUTUBE_PRIVACY: ' + config.YOUTUBE_PRIVACY);
  
  // トリガー状態
  var triggers = ScriptApp.getProjectTriggers();
  var active = triggers.some(function(t) { return t.getHandlerFunction() === 'checkNewRecordings'; });
  console.log('タイマー: ' + (active ? '✅ 稼働中' : '❌ 停止中 → setupTrigger() を実行してください'));
}
