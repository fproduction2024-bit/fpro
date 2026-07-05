# LINE Notifyの代替機能「Slack版」の無料通知方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/setting/slack-notify

[設定](https://autosns.co.jp/manual/category/use/setting)

# LINE Notifyの代替機能「Slack版」の無料通知方法

2025年3月20日

![LINE Notifyの代替機能「Slack版」の無料通知方法](https://autosns.co.jp/manual/wp-content/uploads/2025/03/eye_setting_slack.png)

[このページを印刷](javascript:void(0))

**無料通知機能の「LINE Notify」が3月31日でサービス終了するため、**

**代替機能として「Chatworkに通知」「Slackに通知」を活用いただけるようになりました。**

**（※LINE公式アカウントの月間メッセージ送信数を消費せずに通知を受け取れます。）**

「Chatworkに通知」は[こちら](https://autosns.co.jp/manual/use/setting/chatwork-notify)から、ご確認いただけます。

## **Slackに通知を設定する方法**

### **0. 事前準備  Slack のアカウントがない場合には、作成してください**

Slackのアカウントをお持ちでない場合には、以下のリンクから作成していただけます。

<https://slack.com/intl/ja-jp>

![](https://autosns.co.jp/manual/wp-content/uploads/2025/03/notice-slack003-1024x653.jpg)

『SLACKを始める』という紫ボタンからナビが始まりますので、

ナビに従ってアカウント登録をしてください。

### **1. Slack Webhook URLの取得までの手順**

#### Slackアプリを作成する（持っていない場合）

まず、[Slack APIページ](https://api.slack.com/apps) にアクセスして、「Create New App」 をクリックして

![]()

 **「From scratch」** クリックします。

![]()

上の欄ではアプリ名（App Name）：「**プロラインフリー通知**」と入力して、

下の欄では通知を送りたいワークスペースを選択します。

（※アプリ名は任意の名前に変更可能です）

![]()

#### Webhook を有効にする

作成したアプリ（アプリ名の例：test(画像の左上に表示されています。)）の左メニューで

「Incoming Webhooks」メニューを開いて、「Activate Incoming Webhooks」を **ON** に切り替えます。

![]()

#### 通知用の場所を作成する（持っていない場合）

通知に使用するボットユーザーがない場合には、以下の内容を作成します。

![]()

『App Home』メニューを開いて、  
「Your App’s Presence in Slack」 という箇所で『Edit』 をクリックします。

![]()

「Display Name (Bot Name)」 「Default username 」をそれぞれ入力して、『Save』 をクリックします。

![]()

#### Webhook を作成する

左メニューで「Incoming Webhooks」メニューを開いて、

「Webhook URLs for Your Workspace」 の下部にある

「Add New Webhook to Workspace」 をクリック します。

![]()

そして通知先のチャネルかアプリを選択して、「許可する」をクリックします。 

![]()

### **2. プロライン側の通知設定**

1. **プロラインの管理画面**で  
   **設定 >テスト送信の受信者**のページへ移動します。

![]()

「Slack通知」の項目を選択して![]()

『Slack通知先URLを登録する』をクリックします。

![]()

先ほどコピーした**Webhook URL**を貼り付けて、

**通知先の名前**に自分が分かりやすい名前（Slackワークスペース名など）を入力して

（必要があれば）通知の種類を選択して

「登録する」をクリックしてください。

（万一、入力しても「登録する」が有効にならない場合には、一旦入力欄外をクリックして動作を確認してください。）

![]()

これでSlackへの通知が有効になります。

![]()

### **3. 実際の通知の様子**

以上の設定で、

**・顧客活動通知（フォーム登録、予約などの活用があった時）**

**・チャット通知（登録者からメッセージがあった時）**

**・アフィリエイト通知（アフィリエイトでの活動があった時）**

Slack側に以下の様に通知が来るようになります。

![]()

**※チャット通知は、初期設定では『全て通知』される状態でないため、設定の注意点は、以下をご参考ください。**

[チャット運用の注意点『すぐに既読になる仕様』と『チャット通知の設定』について](https://autosns.co.jp/manual/use/chat/chat-settings)

---

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
* [![LINE Notify(ラインノティファイ)で無料通知](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE Notify(ラインノティファイ)で無料通知

  2023年5月19日](https://autosns.co.jp/manual/use/setting/line-notify "LINE Notify(ラインノティファイ)で無料通知")