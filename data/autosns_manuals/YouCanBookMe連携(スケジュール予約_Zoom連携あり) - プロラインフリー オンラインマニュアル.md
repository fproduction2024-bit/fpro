# YouCanBookMe連携(スケジュール予約_Zoom連携あり) - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/external/ycbm-zoom-form

[外部サービスと連携する](https://autosns.co.jp/manual/category/start/external)

# YouCanBookMe連携(スケジュール予約/Zoom連携あり)

2024年2月26日

![YouCanBookMe連携(スケジュール予約/Zoom連携あり)](https://autosns.co.jp/manual/wp-content/uploads/2021/12/eye_zoom.png)

[このページを印刷](javascript:void(0))

## YouCanBookMe連携(スケジュール予約/Zoom連携あり)

メッセージやコンテンツページからスケジュール予約サービスに移動して、予約完了でZoom会議室の準備と、フォーム登録（必要に応じてシナリオ遷移）する方法について説明します。  
Zoomとの連携は行わず、スケジュール予約のみ行いたい場合や、フォーム登録なしにシナリオ遷移を行いたい場合は、こちらの記事を参考にしてください  

[![YouCanBookMe連携(スケジュール予約/Zoom連携なし)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

YouCanBookMe連携(スケジュール予約/Zoom連携なし)

2020.12.23

YouCanBookMe連携(スケジュール予約/Zoom連携なし) メッセージやコンテンツページからスケジュール予約サービスに移動して、予約完了でシナリオ遷移する方法について説明します。 更にZoomとも連携して、予約されたスケジュールにオンライン会議（通話）を行いたい場合は、こちらの記事を参考にし...](https://autosns.co.jp/manual/start/external/ycbm-new-booking)

ポイント

You Can Book Meはイギリスの会社が運営する、Web予約サービスです。  
管理画面が英語ですが日本でも利用者の非常に多いサービスです。  
（※予約者向けの画面は、日本語にも対応しています）

### *fa-font-awesome*事前準備

* **You Can Book Me 有料アカウント**  
  You Can Book Meの有料機能（Webhook）を使うため、有料アカウントが必要です
* **You Can Book Me 予約ページ**  
  予約を受け付けるページ（booking pages）をYou Can Book Meで作成しておきます
* **Zoom アカウント**
* **プロライン シナリオ**
* **プロライン フォーム**  
  ユーザー毎に予約情報を登録するフォームを作成しておきます

※例として予約ページにシナリオメッセージから誘導していますが、コンテンツページや、応答メッセージで誘導しても構いません。

### *fa-font-awesome*プロラインでの操作

#### 手順1：プロラインフリーにログインし、予約ページに誘導するシナリオの編集画面を開きます

本ツール（プロライン[旧：オートSNSフリー]）にログインして**超ステップ配信シナリオ ＞ 対象のシナリオ** を選択します

#### 手順2：予約を受け付けるページへのリンクを編集します

予約を受け付けるページ（You Can Book Meのbooking page）へのリンクに **?UID=[[uid]]** を付けます。  
booking pageのURLは通常 <ユーザーが設定>.youcanbook.me の形式です。

※大文字小文字の区別があるため間違えない様に注意してください。

![フキダシに予約リンクを貼り付ける]()

#### 手順3：[保存]ボタンをクリックします

[保存]ボタンをクリックして、編集内容を保存します

#### 手順4：予約情報を登録するフォームの編集画面で、質問を追加します

**登録フォーム ＞ 登録フォーム ＞ 対象のフォーム** を選択し、[新規質問を作成]ボタンで必要な数だけ質問要素を追加します。  
形式は**フリー項目**にします。

例えば、予約時間にZoom会議室にアクセスするためのURLを登録する質問は以下の様になります。  
![]()

##### 質問名

ZOOM URL

##### 形式

フリー項目

※名前は一例です

ここでは、同様に予約変更URL、キャンセルURLを登録する質問も追加しています。  
必要に応じて、名前、予約日時、電話番号など質問を追加してください。

#### 手順5：予約完了後のシナリオへのシナリオ移動の設定をします。

「フォーム送信完了者をシナリオ移動」の設定で、フォーム登録と同時に予約完了シナリオに移動することができます。  
必要に応じて設定してください。

予約完了時にフォームに情報が登録されますので、予約完了後のシナリオでは、上記の例では**[[form2-1]]**の形式でZoom URLをLINEで送ることができます。  
![]()

#### 手順6：[保存]ボタンをクリックします

[保存]ボタンをクリックして、編集内容を保存します

#### 手順7：各質問のフィールド名 および フォームURLを取得します

各質問名の横にフィールド名が表示されています。上記の例の場合、form2-1、form2-2、form2-3 をメモしておきます。  
また、フォームのURLもメモしておきます。  
※後ほど使用しますので、メモ帳に貼り付けて保存しておくなどしておきましょう。

#### 手順8：1時間前のリマインドシナリオへのシナリオ移動の編集画面を開きます

**超ステップ配信 ＞ シナリオ移動のカスタマイズ ＞ 対象のシナリオ > 対象のシナリオ移動** を選択します。  
リマインドLINEを送信する際に、他のシナリオ解除する必要が無ければ、解除シナリオの「全て解除」のチェックを外します。  
![]()  
※シナリオの名前は一例です

#### 手順9：「外部システム連携用タグ発動用URL」を取得します

[外部システム連携したい場合]をクリックすると、外部システム連携に必要な情報が表示されます。  
「外部システム連携用タグ発動用URL」をクリックしてコピーします。

※クリップボードにURLがコピーされます。後ほど使用しますので、メモ帳に貼り付けて保存しておくなどしておきましょう。

![外部連携したい場合のシナリオ移動]()

#### 手順10：1日前のリマインドシナリオも同様にします

1日前のリマインドシナリオも同様に、手順：8、9 を行います。  
このマニュアルでは説明用に予約時間の「1時間前」と「1日前」にリマインドLINEを送信する事として、以降の説明を進めていきます。  
※より多くのタイミングでリマインドする場合は、その数だけシナリオを作成し、手順：8、9を繰り返してください）

### *fa-font-awesome*You Can Book Meでの操作

#### 手順1：You Can Book Me公式ページから管理画面にログインします

You Can Book Me公式ページ <https://youcanbook.me/>  
![]()

#### 手順2：Integrationsページから、Zoomアカウントと連携します

右上のメニューより、**アカウント名(メールアドレス) ＞ Integrations**と選択します  
![]()

#### 手順3：連携するサービスでZoomを選択します

Zoomの下にある、[Connect]ボタンをクリックします  
![]()

#### 手順4：You Can Book MeがZoom会議室を作成する操作を許可します

Zoomのページに転送されます。ログインしていない場合は、連携したいZoomアカウントでログインしてください。  
内容を確認して[Authorize]ボタンをクリックします。  
![]()

注意

Zoomアカウントのセキュリティ設定によっては、事前承認が必要になる場合があります。事前承認を行い、接続を許可してください。  
事前承認ができない場合は、連携を続行する前に、Zoomアカウントの管理者に連絡して、サードパーティアクセスを承認してもらう必要があります。

#### 手順5：[Got it]ボタンをクリックします

正しく連携できると、You Can Book Meの管理画面に戻って連携成功の表示が出ます。[Got it]ボタンをクリックします。  
![]()

#### 手順6：予約時間にZoom会議室が作成されるように設定します

左メニューより、**Notifications ＞ Calendar Events**と選択し、[Add event location]をクリックし、Zoomを選択します。  
![]()

##### Event location

Zoom

#### 手順7：[Save changes]ボタンをクリックします

[Save changes]ボタンをクリックして、編集内容を保存します

#### 手順8：予約ページの質問内容を追加します

左メニューより、**Booking form ＞ Questions**と選択し、[Add question]リンクをクリックします。  
![]()

#### 手順9：以下の通り設定します

追加された質問（フォーム）の設定を画像のように設定します。  
（※Shorthand codeに記載する、UIDは半角の大文字で入力してください）  
![]()

##### Type

Hidden question

##### Shorthand code

UID

#### 手順10：[Save changes]ボタンをクリックします

[Save changes]ボタンをクリックして、編集内容を保存します

#### 手順11：予約完了時の通知を追加します

左メニューより、**Notifications ＞ Acitons ＞ After new booking made**と選択し、[+]ボタンをクリックします  
![]()

#### 手順12：Webhook通知を選択します

通知の種類を選択するモーダルが表示されますので、[Webhook]を選択します。  
![]()

#### 手順13：以下の通り設定します

Webhookの設定を行い、予約完了時にプロラインのフォームに情報が登録されるようにします。  
![]()

##### Webhook name

管理名を自由に設定できます

##### URL

フォームのURLを貼り付け、末尾の [[uid]] を **{UID}** に書き換えます。  
https://XXXXXXXX.autosns.app/fm/aaaaaaaaaa?uid={UID}  
※大文字小文字の区別があるため間違えない様に注意してください。

##### HTTP method

POST

##### Payload

事前に取得した各質問のフィールド名を使用します。  
1行目の dataType、UID の指定は処理に必要な情報ですので、そのままお使いいただき、2行目以降を質問要素に合わせて変更してください。  
今回の例では、フォームに3つの質問要素（form2-1、form2-2、form2-3）を作成しています。  
フィールド名と登録する情報を記述すると以下の様になります。

```
{"dataType": "json","uid":"{UID}",
 "form2-1":"{ZOOM-LINK}",
 "form2-2":"{RESCHEDULE-LINK}",
 "form2-3":"{CANCEL-LINK}"
}
```

※{ZOOM-LINK} は予約語でZoom会議室URLが入ります。同様に、{RESCHEDULE-LINK}は日時変更URL、{CANCEL-LINK}はキャンセルURLです。

応用

プロラインのフォームで質問要素を増やして、さらに追加で情報を登録することもできます。  
例えば、予約時間は {START}、予約時に入力したメールアドレスは {EMAIL} など。

予約されているコードは、You Can Book Meのマニュアルページを参照してください  
[Use shorthand codes to customize communications (英語サイト)](https://support.youcanbook.me/article/231-using-shorthand-codes-to-customise-your-communications)

予約されているコード以外に、名前、電話番号、質問などを任意のコードで登録、呼び出しすることも可能です。

#### 手順15：[Save changes]ボタンをクリックします

[Save changes]ボタンをクリックして、編集内容を保存します

※フォーム登録後、プロラインのフォーム管理画面で設定した「フォーム送信完了者をシナリオ移動」に応じたシナリオ移動が行われます。

#### 手順16：予約1時間前の通知を追加します

左メニューより、**Notifications ＞ Acitons ＞ Reminders before the booking**と選択し、[+]ボタンをクリックします  
![]()

#### 手順17：Webhook通知を選択します

通知の種類を選択するモーダルが表示されますので、[Webhook]を選択します。  
![]()

#### 手順18：以下の通り設定します

Webhookの設定を行い、予約1時間前にプロラインのシナリオ移動が発動されるようにします。  
![]()

##### Webhook name

管理名を自由に設定できます

##### When will this webhook be triggered?

1 hour(s)  
※1時間前にリマインドLINEを送る場合の設定です

##### URL

事前に取得した、1時間前に送るリマインドシナリオの「外部システム連携用タグ発動用URL」を貼り付け、**[[uid]]** を **{UID}** に書き替えます。  
※書き換え後のUIDは必ず大文字にします

##### HTTP method

GET

#### 手順19：[Save changes]ボタンをクリックします

[Save changes]ボタンをクリックして、編集内容を保存します

#### 手順20：1日前のリマインドも同様に行います

1日前のリマインドも同様に、手順：16～19 を行います。  
※より多くのタイミングでリマインドする場合は、その数だけ手順：16～19を繰り返してください

#### 手順21：予約ページに誘導するシナリオから、動作確認をしましょう

予約ページに誘導するシナリオから、予約ページを表示して、予約完了後にシナリオ遷移、予約時間にZoom会議室に参加する。という流れを確認してみましょう。

応用

ここでは、予約時にフォームに登録して、LINEを送る方法を説明しましたが、予約情報はYou Can Book Meからメールで送る場合、予約完了時にシナリオ移動する手順の方が簡単に設定できます。  
シナリオ移動の手順は、以下のページで説明しています。  

[![YouCanBookMe連携(スケジュール予約/Zoom連携なし)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

YouCanBookMe連携(スケジュール予約/Zoom連携なし)

2020.12.23

YouCanBookMe連携(スケジュール予約/Zoom連携なし) メッセージやコンテンツページからスケジュール予約サービスに移動して、予約完了でシナリオ遷移する方法について説明します。 更にZoomとも連携して、予約されたスケジュールにオンライン会議（通話）を行いたい場合は、こちらの記事を参考にし...](https://autosns.co.jp/manual/start/external/ycbm-new-booking)

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[外部サービスと連携する](https://autosns.co.jp/manual/category/start/external)の関連記事

* [![PayPal連携(スマートボタン支払い)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  PayPal連携(スマートボタン支払い)

  2020年12月22日](https://autosns.co.jp/manual/start/external/paypal-smartbtn "PayPal連携(スマートボタン支払い)")
* [![YouCanBookMe連携(スケジュール予約/Zoom連携なし)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  YouCanBookMe連携(スケジュール予約/Zoom連携なし)

  2020年12月23日](https://autosns.co.jp/manual/start/external/ycbm-new-booking "YouCanBookMe連携(スケジュール予約/Zoom連携なし)")
* [![外部システム連携（信号を送る）](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  外部システム連携（信号を送る）

  2024年2月1日](https://autosns.co.jp/manual/start/external/push_html "外部システム連携（信号を送る）")
* [![外部システムからシナリオを移動や、フォーム登録する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  外部システムからシナリオを移動や、フォーム登録する方法

  2024年2月26日](https://autosns.co.jp/manual/start/external/receive_request "外部システムからシナリオを移動や、フォーム登録する方法")
* [![友だち追加時にパラメータを持ち込む](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  友だち追加時にパラメータを持ち込む

  2024年3月7日](https://autosns.co.jp/manual/start/external/addfriend_parameter "友だち追加時にパラメータを持ち込む")