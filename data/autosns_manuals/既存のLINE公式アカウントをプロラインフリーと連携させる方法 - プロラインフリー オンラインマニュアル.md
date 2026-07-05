# 既存のLINE公式アカウントをプロラインフリーと連携させる方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/connect/got-account-link

[LINE公式と連携する](https://autosns.co.jp/manual/category/start/connect)

# 既存のLINE公式アカウントをプロラインフリーと連携させる方法

2022年1月12日

![既存のLINE公式アカウントをプロラインフリーと連携させる方法](https://autosns.co.jp/manual/wp-content/uploads/2020/07/eye_got-account-link_1200×630.png)

[このページを印刷](javascript:void(0))

プロラインフリーと連携が完了した状態で、新規に友だち登録があると、**あいさつメッセージ > 友だち追加時の最初のシナリオ(初期登録シナリオ)** で設定したシナリオのメッセージが送信されます。  
初期状態でテスト用のメッセージが用意されていますので、プロラインフリーとの連携後すぐにLINE公式アカウントが友だち追加される可能性がある場合は、連携前に最初に送られるメッセージの編集も忘れず行ってください。

### *fa-font-awesome*Messaging APIで連携している他社のLINEメッセージ配信ツール等を利用している方

Messaging API設定（ベーシック ID、アクセストークン、チャネルシークレット、Webhook URL など）をオートSNSフリーの設定に変更すると、LINEアカウントが連携する外部ツールが切り替わります。

![Messaging APIが連携している場合](https://autosns.jp/manual/wp-content/uploads/2020/07/img_s6_01.png)

（オートSNSは旧称です。システムの名称を現在はプロラインに変更しております。）

設定変更手順は「プロラインフリーとLINEアカウントとの連携方法」を参考にしてください。

[![プロラインフリーとLINE公式アカウントとの連携方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

プロラインフリーとLINE公式アカウントとの連携方法

2020.7.16

（オートSNSは旧称です。現在はプロラインに変更しております。） 手順1:プロラインフリーに設定されているwebhook URLをコピーします プロラインフリーに戻って、設定 ＞初期設定(Messaging API)  を開き「Webhook URL」をコピーします 手順2：LINE Devel...](https://autosns.co.jp/manual/start/connect/autosns-line)

### *fa-font-awesome*既にLINE公式アカウントをお持ちで、Messaging APIの利用（LINE Developersへのアクセス）は初めての方

LINE公式アカウントとオートSNSフリーを連携させると、プロラインフリーでステップメッセージ配信などを管理できるようになります。

![MessagingAPIの利用が初めて]()

（オートSNSは旧称です。システムの名称を現在はプロラインに変更しております。）

設定手順は下記の方法でプロラインフリーと連携をおこなってください。

#### 手順1：LINE Official Account Managerにログインします

LINE Official Account Managerに、自分のLINEアカウントでログインします。  
↓↓↓  
<https://manager.line.biz/>

#### 手順2：「アカウントリスト」からプロラインフリーと連携させたいアカウントを選びます

「アカウントリスト」からプロラインフリーと連携させたいアカウントを選びます

LINE Official Account Managerにあるアカウントタブより、「アカウントリスト」からプロラインフリーと連携させたいアカウントを選びます。

![2：アカウントリスト]()

#### 手順3：Messaging APIの設定をおこないます

右上にある「設定」→ 左メニューの「Messaging API」を選択、「Messaging APIを利用する」ボタンをクリックします。

![3：Messaging APIを利用する]()

![3：Messaging APIを利用ボタン]()

#### 手順4：開発者情報を入力します

はじめての利用の場合、「開発者情報の入力」を求められるので、「開発者名」と「メールアドレス」を入力し、「確認画面へ進む」をクリック。

※開発者名は、自分の名前を入力しておけば問題ありません。

![5：開発者情報の入力]()

「LINEビジネスアカウント」で作成しているLINE公式アカウントの場合は、個人用LINEアカウントでのログインが要求されますのでログインをして下さい。  
ログイン後、上記の開発者情報の入力画面が出てきます。

#### 手順5：プロバイダーを作成します

プロバイダーを作成します。  
なお、プロバイダー名は自分がわかりやすい名前に設定して大丈夫です。

![5：プロバイダー作成]()

プライバシーポリシーと利用規約は空欄でも先に進むことが出来ます。  
まだ出来ていない場合は、空欄で先に進んでください。

![5：プライバシーポリシー]()

#### 手順6：Messaging APIの利用を有効にする

OKボタンを押します。

![6：Messaging APIの利用]()

続いて、下記のような画面が表示されれば、**LINE Official Account Managerでの作業は完了です。**

#### 手順7：LINE Developersに移動します。

下記をクリックして、LINE Developersを開きます。  
↓↓↓  
<https://developers.line.biz/ja/>

#### 手順8：プロバイダーリストに移動します

右上にある、自分のLINEアイコンにカーソルを当て、プロバイダーリストを選択します。

![8：プロバイダーリスト選択]()

こちらのリンクからも、[プロバイダーリストに移動できます。](https://developers.line.biz/console/)

#### 手順9：先程、作成したプロバイダーリストを選択します

先程、作成したプロバイダーリストを選択します。

![9：プロバイダーを選択]()

#### 手順10：プロラインフリーと連携させたいアカウントを選択します

当ツールと連携させたい、既存のアカウントを選びます。

![10：既存アカウントの選択]()

以下、設定変更手順は「プロラインフリーとLINEアカウントとの連携方法」を参考にしてください。

[![プロラインフリーとLINE公式アカウントとの連携方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

プロラインフリーとLINE公式アカウントとの連携方法

2020.7.16

（オートSNSは旧称です。現在はプロラインに変更しております。） 手順1:プロラインフリーに設定されているwebhook URLをコピーします プロラインフリーに戻って、設定 ＞初期設定(Messaging API)  を開き「Webhook URL」をコピーします 手順2：LINE Devel...](https://autosns.co.jp/manual/start/connect/autosns-line)

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[LINE公式と連携する](https://autosns.co.jp/manual/category/start/connect)の関連記事

* [![プロラインフリーのアカウントの作成方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーのアカウントの作成方法

  2020年7月16日](https://autosns.co.jp/manual/start/connect/create-proline-account "プロラインフリーのアカウントの作成方法")
* [![LINE公式アカウントの作成方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE公式アカウントの作成方法

  2020年7月16日](https://autosns.co.jp/manual/start/connect/create-line "LINE公式アカウントの作成方法")
* [![プロラインフリーとLINE公式アカウントとの連携方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーとLINE公式アカウントとの連携方法

  2020年7月16日](https://autosns.co.jp/manual/start/connect/autosns-line "プロラインフリーとLINE公式アカウントとの連携方法")
* [![プロラインフリーに最初の１⼈⽬を友だち追加する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーに最初の１⼈⽬を友だち追加する

  2020年7月16日](https://autosns.co.jp/manual/start/connect/add-first-friend "プロラインフリーに最初の１⼈⽬を友だち追加する")
* [![管理画面の見方、メインメニューについて](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  管理画面の見方、メインメニューについて

  2020年8月26日](https://autosns.co.jp/manual/start/connect/main_menu "管理画面の見方、メインメニューについて")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  アカウントを入れ替えたい場合（例：メインアカウントとサブアカウント）

  2022年6月4日](https://autosns.co.jp/manual/start/connect/account-exch "アカウントを入れ替えたい場合（例：メインアカウントとサブアカウント）")