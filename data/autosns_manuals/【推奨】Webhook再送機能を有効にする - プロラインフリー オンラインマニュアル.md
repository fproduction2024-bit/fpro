# 【推奨】Webhook再送機能を有効にする - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/connect/enable-webhook-redelivery

[LINE公式と連携する](https://autosns.co.jp/manual/category/start/connect)

# 【推奨】Webhook再送機能を有効にする

2022年7月1日

[このページを印刷](javascript:void(0))

2022/04/19に、LINE公式アカウントにMessaging APIのWebhook再送機能が追加されました。  
プロラインフリーでは、より安定してお使いいただくため設定を**推奨**しております。

#### 手順1：LINE Developers にアクセスします

LINE Developers：<https://developers.line.biz/ja/>

右上の「ログイン」をクリックし、設定したいLINE公式アカウントのLINE Official Account Managerと同じログイン情報でログインしてください。  
ログイン済みの場合、右上のご自身のアイコン画像をクリックし [LINE Developers コンソール] を選択します。

![1：LINE Developers](https://autosns.jp/manual/wp-content/uploads/2020/07/img_s1_01.png)

PC版

![]()

スマートフォン版

#### 手順2：開発者情報を入力します はじめての利用の場合、「開発者情報の入力」を求められるので「開発者名」と「メールアドレス」を入力し「確認画面へ進む」をクリックしてください。 ここで入力する情報は外部に公開されません。自分の名前、メールアドレスを入力しておけば問題ありません。 5：開発者情報の入力 手順3：Webhookの再送を有効にしたいMessaging APIチャネルを選択します 通常LINE公式アカウントと同名で「Messaging API」と書いてあるチャネルがありますので選択します 手順3：［Messaging API設定］タブをクリックします 手順4：［Webhookの再送］をオンにします 設定箇所は、[Messaging API設定]ページの中ほどにある、Webhook項目の中にあります。 プロラインフリーで使用しているLINE公式アカウントの場合、Webhook URLが「https://autosns.jp/・・・」で始まるURLになっています。 間違いない事を確認し、[Webhookの再送]をオンにします。 手順5：同意のチェックを入れて、［Webhookの再送を有効にする］ボタンをクリックします 注意 プロラインフリーの利用を止めて、別のシステムを利用することになった場合、移行先のシステムが「再送機能」に対応していない可能性があります。 その場合は、設定値を無効に変更してください。

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
* [![既存のLINE公式アカウントをプロラインフリーと連携させる方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  既存のLINE公式アカウントをプロラインフリーと連携させる方法

  2020年7月21日](https://autosns.co.jp/manual/start/connect/got-account-link "既存のLINE公式アカウントをプロラインフリーと連携させる方法")
* [![管理画面の見方、メインメニューについて](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  管理画面の見方、メインメニューについて

  2020年8月26日](https://autosns.co.jp/manual/start/connect/main_menu "管理画面の見方、メインメニューについて")