/**
 * 古橋 TODO ダッシュボード — Google Calendar API (GAS)
 * 
 * セットアップ手順:
 * 1. https://script.google.com で新しいプロジェクトを作成
 * 2. このコードを貼り付け
 * 3. 「デプロイ」→「新しいデプロイ」→ 種類: ウェブアプリ
 *    - 実行するユーザー: 自分
 *    - アクセスできるユーザー: 全員
 * 4. デプロイ URL をコピーして TODO ダッシュボードに貼り付け
 */

function doGet(e) {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    try {
        const daysBack = parseInt(e?.parameter?.daysBack) || 1;
        const daysForward = parseInt(e?.parameter?.daysForward) || 14;

        const now = new Date();
        const start = new Date(now);
        start.setDate(start.getDate() - daysBack);
        start.setHours(0, 0, 0, 0);

        const end = new Date(now);
        end.setDate(end.getDate() + daysForward);
        end.setHours(23, 59, 59, 999);

        // hiroshifuruhashi.imp@gmail.com のカレンダーのみ取得
        const targetEmail = 'hiroshifuruhashi.imp@gmail.com';
        const calendars = [CalendarApp.getCalendarById(targetEmail)].filter(Boolean);
        const events = [];

        calendars.forEach(cal => {
            const calEvents = cal.getEvents(start, end);
            calEvents.forEach(ev => {
                events.push({
                    id: ev.getId(),
                    title: ev.getTitle(),
                    description: ev.getDescription() || '',
                    start: ev.getStartTime().toISOString(),
                    end: ev.getEndTime().toISOString(),
                    allDay: ev.isAllDayEvent(),
                    location: ev.getLocation() || '',
                    calendar: cal.getName(),
                    color: cal.getColor(),
                });
            });
        });

        // 開始時刻でソート
        events.sort((a, b) => new Date(a.start) - new Date(b.start));

        output.setContent(JSON.stringify({
            success: true,
            count: events.length,
            range: { start: start.toISOString(), end: end.toISOString() },
            events: events,
        }));

    } catch (err) {
        output.setContent(JSON.stringify({
            success: false,
            error: err.message,
        }));
    }

    return output;
}
