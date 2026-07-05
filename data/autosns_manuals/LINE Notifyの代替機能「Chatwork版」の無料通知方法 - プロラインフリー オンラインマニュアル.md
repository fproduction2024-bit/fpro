# LINE Notifyの代替機能「Chatwork版」の無料通知方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/setting/chatwork-notify

[設定](https://autosns.co.jp/manual/category/use/setting)

# LINE Notifyの代替機能「Chatwork版」の無料通知方法

2025年9月29日

![LINE Notifyの代替機能「Chatwork版」の無料通知方法](https://autosns.co.jp/manual/wp-content/uploads/2025/03/eye_setting_chatwork.png)

[このページを印刷](javascript:void(0))

**無料通知機能の「LINE Notify」が3月31日でサービス終了するため、**

**代替機能として「Chatworkに通知」「Slackに通知」を活用いただけるようになりました。**

**（※LINE公式アカウントの月間メッセージ送信数を消費せずに通知を受け取れます。）**

「Slackに通知」は[こちら](https://autosns.co.jp/manual/nocategory/slack-notify)から、ご確認いただけます。

## **Chatworkに通知を設定する方法**

### **0. 事前準備  Chatwork のアカウントを作成してください（※持っている場合でも作成を推奨）**

ご自身のアカウントのAPIキーを使うと

自分から自分へのメッセージとして、

「通知が鳴らない」「未読フラグがつかない」状態になるため

**Chatworkのアカウントをお持ちである場合でも、**

**ご自身のアカウントとは別に**

**以下のリンクから通知用のアカウントを別で作成することを推奨します。**

<https://go.chatwork.com/ja/>

![](https://autosns.co.jp/manual/wp-content/uploads/2025/03/notice-chatwork002-1024x534.jpg)

『無料登録して使う』という赤いボタンからナビが始まりますので、

ナビに従ってご自身のアカウントとは別にアカウント登録をしてください。

（例：通知用アカウント）

補足

Gmail ならエイリアスメールでアカウントを作ることが可能です。

例えば、  
prolinefree@gmail.com を持ってたら、  
prolinefree**+api**@gmail.com も  
prolinefree**+test**@gmail.com も同じメールボックスに届く、という状態になります。

### 自分に通知するための準備

作成した別のアカウント（例：通知用アカウント）と自分のアカウントを「コンタクトを追加」しておきます。

まず、作成した続きで、そのアカウントから「＋」マークから『コンタクトを追加』をクリックして

![]()

リンクをコピーして、

![]()

自分のアカウントでログインして、リンクから「コンタクトに追加」して

別のアカウントから承認して、両方のアカウントでつながっておきます。

### 自分以外も含めて複数人に通知したい場合

同様に、作成した別のアカウント（例：通知用アカウント）と通知したい対象のアカウントを「コンタクトを追加」しておきます。

上と同様に作成した別のアカウント（例：通知用アカウント）のリンクを通知したい対象の方に伝えて

「コンタクトに追加」してもらい、別のアカウント（例：通知用アカウント）で承認しておいてください。

### **1. Chatwork APIトークンの取得**

その上で、

ご自身のアカウントとは別の、作成したChatworkアカウント（例：通知用アカウント）でログインした状態で

まず、[ChatworkのAPIページ](https://developer.chatwork.com/docs/getting-started) にアクセスして、下にスクロールして『APIの利用申請』をクリックしてください。

![]()

「APIトークン」が表示されますのでコピーします。

![]()

### **2. プロライン側の通知設定**

1. **プロラインの管理画面**で  
   **設定 >テスト送信の受信者**のページへ移動します。

![]()

「Chatwork通知」の項目を選択して

![]()

『Chatwork APIトークンを登録する』をクリックします。

![]()

先ほどコピーした**APIトークン**を貼り付けて、

**通知を送りたいチャット**を選択して、

（必要があれば）通知の種類を選択して

「登録する」をクリックしてください。

![]()

②には通知したい対象のアカウント（ご自身の個人名など）を選択してください。

これでChatworkへの通知が有効になります。

（例：個人の場合）

![]()

複数の方に通知する場合には、それぞれ登録してください。

### **3. 実際の通知の様子**

以上の設定で、以下の時に

**・チャット通知（登録者からメッセージがあった時）**

**・顧客活動通知（フォーム登録、予約などの活用があった時）**

**・アフィリエイト通知（アフィリエイトでの活動があった時）**

ご自身のChatworkアカウントに以下の様に通知が来るようになります。

![]()

![]()

そして、スマホでChatworkを通知設定にしている場合には、以下のように通知が届くようになります。

![]()

**※チャット通知は、初期設定では『全て通知』される状態でないため、設定の注意点は、以下をご参考ください。**

[チャット運用の注意点『すぐに既読になる仕様』と『チャット通知の設定』について](https://autosns.co.jp/manual/use/chat/chat-settings)

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