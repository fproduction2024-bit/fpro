# YouCanBookMe連携(スケジュール予約_Zoom連携なし) - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/external/ycbm-new-booking

[外部サービスと連携する](https://autosns.co.jp/manual/category/start/external)

# YouCanBookMe連携(スケジュール予約/Zoom連携なし)

2022年3月28日

![YouCanBookMe連携(スケジュール予約/Zoom連携なし)](https://autosns.co.jp/manual/wp-content/uploads/2020/12/eye_youcanbookme.png)

[このページを印刷](javascript:void(0))

## YouCanBookMe連携(スケジュール予約/Zoom連携なし)

メッセージやコンテンツページからスケジュール予約サービスに移動して、予約完了でシナリオ遷移する方法について説明します。  
更にZoomとも連携して、予約されたスケジュールにオンライン会議（通話）を行いたい場合は、こちらの記事を参考にしてください  

[![YouCanBookMe連携(スケジュール予約/Zoom連携あり)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

YouCanBookMe連携(スケジュール予約/Zoom連携あり)

2021.12.25

YouCanBookMe連携(スケジュール予約/Zoom連携あり) メッセージやコンテンツページからスケジュール予約サービスに移動して、予約完了でZoom会議室の準備と、フォーム登録（必要に応じてシナリオ遷移）する方法について説明します。 Zoomとの連携は行わず、スケジュール予約のみ行いたい場合や...](https://autosns.co.jp/manual/start/external/ycbm-zoom-form)

ポイント

You Can Book Meはイギリスの会社が運営する、Web予約サービスです。  
管理画面が英語ですが日本でも利用者の非常に多いサービスです。  
（※予約者向けの画面は、日本語にも対応しています）

### *fa-font-awesome*事前準備

* **You Can Book Me 有料アカウント**  
  You Can Book Meの有料機能（Webhook）を使うため、有料アカウントが必要です
* **You Can Book Me 予約ページ**  
  予約を受け付けるページ（booking pages）をYou Can Book Meで作成しておきます
* **プロライン シナリオ**

※例として予約ページにシナリオメッセージから誘導していますが、コンテンツページや、応答メッセージで誘導しても構いません。

### *fa-font-awesome*プロラインでの操作

#### 手順1：プロラインフリーにログインし、予約ページに誘導するシナリオの編集画面を開きます

本ツール（プロライン[旧：オートSNSフリー]）にログインして**超ステップ配信シナリオ ＞ 対象のシナリオ** を選択します

#### 手順2：予約を受け付けるページへのリンクを編集します

予約を受け付けるページ（You Can Book Meのbooking page）へのリンクに **?UID=[[uid]]** を付けます。

※大文字小文字の区別があるため間違えない様に注意してください。

![フキダシに予約リンクを貼り付ける]()

#### 手順3：[保存]ボタンをクリックします

[保存]ボタンをクリックして、編集内容を保存します

#### 手順4：予約完了後のシナリオへのシナリオ移動の編集画面を開きます

**超ステップ配信 ＞ シナリオ移動のカスタマイズ ＞ 対象のシナリオ > 対象のシナリオ移動** を選択します。

![シナリオ移動の選択]()  
※名前は一例です

#### 手順5：「外部システム連携用タグ発動用URL」を取得します

[外部システム連携したい場合]をクリックすると、外部システム連携に必要な情報が表示されます。  
「外部システム連携用タグ発動用URL」をクリックしてコピーします。

※クリップボードにURLがコピーされます。後ほど使用しますので、メモ帳に貼り付けて保存しておくなどしておきましょう。

![外部連携したい場合のシナリオ移動]()

### *fa-font-awesome*You Can Book Meでの操作

#### 手順1：You Can Book Me公式ページから管理画面にログインします

You Can Book Me公式ページ <https://youcanbook.me/>  
![]()

#### 手順2：予約ページの質問内容を追加します

左メニューより、**Booking form ＞ Questions**と選択し、[Add question]リンクをクリックします。  
![]()

#### 手順3：以下の通り設定します

![]()

##### Type

Hidden question

##### Shorthand code

UID

#### 手順4：[Save changes]ボタンをクリックします

[Save changes]ボタンをクリックして、編集内容を保存します

#### 手順5：予約完了時の通知を追加します

左メニューより、**Notifications ＞ Acitons ＞ After new booking made**と選択し、[+]ボタンをクリックします  
![]()

#### 手順6：Webhook通知を選択します

通知の種類を選択するモーダルが表示されますので、[Webhook]を選択します。  
![]()

#### 手順7：以下の通り設定します

![]()

##### Webhook name

管理名を自由に設定できます

##### URL

事前に取得した「外部システム連携用タグ発動用URL」を貼り付け、**[[uid]]** を **{UID}** に書き替えます。  
※書き換え後のUIDは必ず大文字にします

##### HTTP method

GET

#### 手順8：[Save changes]ボタンをクリックします

[Save changes]ボタンをクリックして、編集内容を保存します

#### 手順9：予約ページに誘導するシナリオから、動作確認をしましょう

予約ページに誘導するシナリオから、予約ページを表示して、予約完了後にシナリオ遷移する。という流れを確認してみましょう。

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[外部サービスと連携する](https://autosns.co.jp/manual/category/start/external)の関連記事

* [![PayPal連携(スマートボタン支払い)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  PayPal連携(スマートボタン支払い)

  2020年12月22日](https://autosns.co.jp/manual/start/external/paypal-smartbtn "PayPal連携(スマートボタン支払い)")
* [![YouCanBookMe連携(スケジュール予約/Zoom連携あり)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  YouCanBookMe連携(スケジュール予約/Zoom連携あり)

  2021年12月25日](https://autosns.co.jp/manual/start/external/ycbm-zoom-form "YouCanBookMe連携(スケジュール予約/Zoom連携あり)")
* [![外部システム連携（信号を送る）](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  外部システム連携（信号を送る）

  2024年2月1日](https://autosns.co.jp/manual/start/external/push_html "外部システム連携（信号を送る）")
* [![外部システムからシナリオを移動や、フォーム登録する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  外部システムからシナリオを移動や、フォーム登録する方法

  2024年2月26日](https://autosns.co.jp/manual/start/external/receive_request "外部システムからシナリオを移動や、フォーム登録する方法")
* [![友だち追加時にパラメータを持ち込む](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  友だち追加時にパラメータを持ち込む

  2024年3月7日](https://autosns.co.jp/manual/start/external/addfriend_parameter "友だち追加時にパラメータを持ち込む")