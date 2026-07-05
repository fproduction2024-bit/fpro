# LINE Notify(ラインノティファイ)で無料通知 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/setting/line-notify

[設定](https://autosns.co.jp/manual/category/use/setting)

# LINE Notify(ラインノティファイ)で無料通知

2025年3月27日

![LINE Notify(ラインノティファイ)で無料通知](https://autosns.co.jp/manual/wp-content/uploads/2023/05/eye_line-notify.png)

[このページを印刷](javascript:void(0))

**無料通知機能の「LINE Notify」が2025年3月31日でサービス終了するため、**

**代替機能として「Chatworkに通知」「Slackに通知」を活用いただけるようになりました。**

**（※LINE公式アカウントの月間メッセージ送信数を消費せずに通知を受け取れます。）**

「Slackに通知」は[こちら](https://autosns.co.jp/manual/nocategory/slack-notify)から、ご確認いただけます。

「Chatworkに通知」は[こちら](https://autosns.co.jp/manual/use/setting/chatwork-notify)から、ご確認いただけます。

LINE Notify通知機能は、連携するLINE公式アカウントの月間メッセージ送信数を消費せずに管理者（複数も可能）に各種通知を送る機能です。

## 概要

「LINE Notify(ラインノティファイ)」とは、各種Webサービスからの通知をLINEで受信するサービスです。  
連携すると、LINEが提供する公式アカウント"LINE Notify"から通知が届きます。利用料金は無料です。

プロラインが「あなたのLINE公式アカウント」を通じて、管理者（あなた）にLINE通知メッセージを送信すると、「あなたのLINE公式アカウント」の月間メッセージ送信数を消費します。  
このサービスを使うと、プロラインが"LINE Notify"を通じて、管理者（あなた）にLINE通知メッセージを送信できるようになり、月間メッセージ送信数を消費しません。

## 設定方法

### *fa-font-awesome*LINEアプリでの操作（初回のみ）

#### 手順1：LINEアプリの友だち検索で「@linenotify」と入力し検索します

![](https://autosns.co.jp/manual/wp-content/uploads/2023/05/linenotify001.png)

#### 手順2：「追加」ボタンをタップします

![]()

#### 手順3：LINE Notifyとのトーク画面にメッセージが表示されればOKです

![]()

### *fa-font-awesome*LINE Notify管理画面での操作

#### 手順1：LINE Notify マイページ にアクセスします

LINE Notify マイページ  
<https://notify-bot.line.me/my/>

ログインを要求された場合、通知を受け取りたい管理者の個人LINEアカウントでログインしてください

#### 手順2：「トークンを発行する」をクリックします

**※必ずPCでご確認ください。**スマートフォンやタブレットでは「トークンを発行する」ボタンが表示されません。  
![]()

#### 手順3：トークン名、通知先を設定し、「発行する」ボタンをクリックします

**トークン名** は、任意の名前です。通知されるメッセージの先頭に表示されます。20文字以内で入力してください。  
複数のLINE公式アカウントを管理している場合は、LINE公式アカウントの名前など判別できる名称がオススメ

**通知先** は、1:1の通知の他、LINE Notifyを含むグループも選択できます。  
グループの場合、LINE公式アカウント「LINE Notify（@linenotify）」をグループメンバーに必ず参加させてください。参加していないと通知メッセージを受信できません。

#### 手順4：表示されたトークンをコピーします

表示されたトークンは必ずコピーしてください。**あとから再表示することができません。**
![]()

発行されたトークンは、次のプロライン管理画面での操作で使用します。

### *fa-font-awesome*プロラインでの操作

#### 手順1：「設定 > テスト送信の受信者」で、「LINE Notify通知先の登録」を選択します

本ツール（プロラインフリー）にログインして  **設定 ＞** **テスト送信の受信者 ＞** **LINE Notify通知先の登録** を開きます。  
![]()

#### 手順2：「LINE Notify アクセストークンを登録する」ボタンをクリックします

![]()

#### 手順3：先ほどコピーした「トークン」を貼り付けます

LINE Notify マイページで取得したトークンを貼り付けます。  
発行されたトークンの再表示はできませんので、コピーし忘れた場合は、再発行してください。  
![]()

#### 手順4：通知の種類を選択し、「登録する」をクリックします

通知の先として、LINE Notify通知先を設定可能な「顧客活動通知の受信者」「チャット通知の受信者」「アフィリエイト通知の受信者」のすべてが選択されています。  
必要な場合のみチェックを外してください。  
![]()

以上で、設定が完了しました。  
通知の種類の設定は「設定 > テスト送信の受信者」の各種受信者設定や、「LINE Notify通知先の登録」から変更することも可能です。

注意点

通知設定されている内容について

あなたのLINE公式アカウントを通した通知は送信件数に換算されますが、

LINE Notifyを通した通知は件数に換算されずに受け取っていただくことができます。

![line-notify]()

設定後は、以下のようにLINE Notifyと通常の通知の両方で通知が来る状態になっておりますので、

![実際の管理画面]()

**通常の通知（画像の一番下のアカウント）の『通知受信対象』の紙飛行機アイコンをクリックして灰色にして**

**LINE Notify側の通知の紙飛行機アイコンのみ緑色の状態であることをご確認ください。**

（LINE Notify側の通知は、画像のように鈴のアイコンで表示されます。）

![line-notify]()

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[設定](https://autosns.co.jp/manual/category/use/setting)の関連記事

* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーの月額プラン変更方法が知りたい

  2021年4月24日](https://autosns.co.jp/manual/application/changeplan "プロラインフリーの月額プラン変更方法が知りたい")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーから届くメールの登録メールアドレスを変更したい

  2021年5月12日](https://autosns.co.jp/manual/use/setting/address "プロラインフリーから届くメールの登録メールアドレスを変更したい")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  複数人で管理する環境を作りたい場合（管理者権限について）

  2022年5月4日](https://autosns.co.jp/manual/use/setting/admin-login "複数人で管理する環境を作りたい場合（管理者権限について）")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  スマホのホーム画面にプロラインフリーのアイコンを追加する方法（アプリのようにすぐに遷移できるようにしたい）

  2022年7月13日](https://autosns.co.jp/manual/use/setting/icon "スマホのホーム画面にプロラインフリーのアイコンを追加する方法（アプリのようにすぐに遷移できるようにしたい）")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE公式アカウントが凍結されないための３つの対策

  2022年8月15日](https://autosns.co.jp/manual/use/setting/ban-counterplan "LINE公式アカウントが凍結されないための３つの対策")
* [![LINE Notifyの代替機能「Slack版」の無料通知方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE Notifyの代替機能「Slack版」の無料通知方法

  2025年3月18日](https://autosns.co.jp/manual/use/setting/slack-notify "LINE Notifyの代替機能「Slack版」の無料通知方法")