# Zoomミーティングに招待 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/reserve-calendar/zoom_personal

[スケジュール/イベント予約](https://autosns.co.jp/manual/category/use/reserve-calendar)

# Zoomミーティングに招待

2023年1月30日

[このページを印刷](javascript:void(0))

## Zoomミーティングに招待

スケジュール/イベント予約機能は、カレンダー形式またはカード形式で予約の受付、履歴確認、管理、リマインド通知ができます。

予約毎にZoom会議室を作成する「Zoom連携」機能はまだリリースされていませんが、固定したミーティングIDを使い回すことで、現時点でも予約者をZoomミーティングに招待する運用が可能です。

ここでは一例として、パーソナルミーティングについて説明します。  
（同様に、定期ミーティングでも行うことができますが、ミーティングIDが失効される場合がありますのでご注意ください）

### パーソナルミーティングとは？

Zoomでミーティングを開催すると、「ミーティングID」という数字が生成され、割り振られます。  
ミーティングIDは、いわば「会議室の部屋番号」のようなものです。

パーソナルミーティングとは、アカウント毎に１つ割り当てられている「パーソナルミーティングID」を用いて行うミーティングです。  
予約スケジュールごとに「ミーティングID」を生成する訳でないので、過去に招待したURLをクリックすれば、何時でも何度でもWeb会議に参加できるというリスクがありますので、**「パスコード」と「待機室」**を設定することをおすすめします。

※パーソナルミーティングIDの変更は、有料プランユーザーのみのサービスとなっています。

### *fa-font-awesome*Zoomでの操作

### Webサイトの場合：

[Zoom ウェブポータル](https://zoom.us/signin)にサインインしていることを確認します。

#### 手順1：パーソナルミーティングの設定画面を開く

左メニュー「ミーティング」→「パーソナルミーティング」タブ と開きます  
![](https://autosns.co.jp/manual/wp-content/uploads/2023/01/reserve_calendar_023.png)

#### 手順2：パスコード、待機室を有効にします

「編集」ボタンをクリックして、編集ページを開きます。「パスコード」、「待機室」のチェックを入れ、パスコードは任意のパスコードを入力します。  
![]()

#### 手順3：招待リンクをコピーします

「招待状をコピー」ボタンをクリックすると、招待リンクも含まれている定型文をコピーすることができます  
![]()

### *fa-font-awesome*プロラインでの操作

### パスコードを固定で運用する場合

#### 手順1：予約リマインダーのメッセージ編集画面を開きます

スケジュール/イベント予約 ＞ 予約リマインダー ＞ 任意の予約カレンダー を開きます。

※前述の通りスケジュール時間前にURLクリックして接続を試す方が居るかもしれない為、10分前や2時間前などの時間前の＜予約リマインド配信＞でお伝えする事をおススメします。  
（「待機室」設定が有効な場合、接続があってもミーティングが始まる事はありません）

その場合、予約完了時のメッセージで「Zoomリンクは直前のリマインド通知でお伝えします」と事前に説明しておくと受講者も安心です

#### 手順2：Zoomでコピーした情報をメッセージに貼り付けて送信するようにします

例：

予約日時は [[cl〇-booking-start]] です。  
お時間になったら以下のURLをクリックして参加できます。  
━━━━━━━━━━━━━━  
Zoomミーティングに参加する  
https://us06web.zoom.us/j/803\*\*\*\*\*\*\*?pwd=\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
ミーティングID: 803 \*\*\* \*\*\*\*  
パスコード: \*\*\*\*\*\*  
━━━━━━━━━━━━━━

※[[cl〇-booking-start]] は予約開始日時に変換されます（〇には数字が入ります）

### パスコードを変更して運用する場合(応用)

#### 手順1：招待リンクURLから、パスコード情報を削除する

友だちに送るメッセージ中に記載した「招待リンク」のURLに**?pwd=〇〇**が入っている場合、削除します。

#### 手順2：パスコードをユーザーIDに変更します

[[uid]]はLINEメッセージを受け取る友だち毎に固有のユーザーIDに変換されますので、友だち毎に異なるパスコードを伝えることができます。

予約日時は [[cl〇-booking-start]] です。  
お時間になったら以下のURLをクリックして参加できます。  
━━━━━━━━━━━━━━  
Zoomミーティングに参加する  
https://us06web.zoom.us/j/803\*\*\*\*\*\*\*  
ミーティングID: 803 \*\*\* \*\*\*\*  
パスコード: [[uid]]   
━━━━━━━━━━━━━━

#### 手順3：Zoom管理画面で、スケジュール予約の時間前に予約した友だちのユーザーIDに変更します

予約開始時間前にZoom管理画面でパスコードを変更しておきます。  
その時間にスケジュール予約しているユーザー以外はパスコードを知らないので会議室に接続できなくなり、セキュリティが高まります。  
![]()

※ここではパスコードにユーザーIDを使う方法を例に挙げましたが。固定パスコードを定期的に変更する運用でも、ずっと固定パスコードよりは安全です。

   
今後、予約毎にZoom会議室を作成する「Zoom連携」機能の開発も予定しています。ご期待ください。

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[スケジュール/イベント予約](https://autosns.co.jp/manual/category/use/reserve-calendar)の関連記事

* [![予約枠を作る](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  予約枠を作る

  2023年1月17日](https://autosns.co.jp/manual/use/reserve-calendar/create_calendar "予約枠を作る")
* [![追加質問する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  追加質問する

  2023年1月18日](https://autosns.co.jp/manual/use/reserve-calendar/add_calendar_form "追加質問する")
* [![予約変更、キャンセル](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  予約変更、キャンセル

  2023年1月18日](https://autosns.co.jp/manual/use/reserve-calendar/change_reservation "予約変更、キャンセル")
* [![スケジュール/イベント予約とは？](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  スケジュール/イベント予約とは？

  2023年1月27日](https://autosns.co.jp/manual/use/reserve-calendar/reserve_summary "スケジュール/イベント予約とは？")
* [![予約時に決済する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  予約時に決済する

  2023年3月3日](https://autosns.co.jp/manual/use/reserve-calendar/add_calendar_products "予約時に決済する")
* [![リマインド配信する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  リマインド配信する

  2023年3月3日](https://autosns.co.jp/manual/use/reserve-calendar/reserve-reminder "リマインド配信する")