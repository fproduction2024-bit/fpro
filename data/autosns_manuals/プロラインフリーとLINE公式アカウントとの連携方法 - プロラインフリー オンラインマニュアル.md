# プロラインフリーとLINE公式アカウントとの連携方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/connect/autosns-line

[LINE公式と連携する](https://autosns.co.jp/manual/category/start/connect)

# プロラインフリーとLINE公式アカウントとの連携方法

2022年12月1日

![プロラインフリーとLINE公式アカウントとの連携方法](https://autosns.co.jp/manual/wp-content/uploads/2020/07/eye_autosns-line_1200×630.png)

[このページを印刷](javascript:void(0))

（オートSNSは旧称です。現在はプロラインに変更しております。）

使用するブラウザが「Internet Explorer」だと、これから使用するLINE Developersサイトの動きがおかしくなるようです。  
**LINEアカウント設定する際のブラウザは、「Google Chrome」「Firefox」を使って、LINEアカウント設定を完了してください。**

#### 手順1:プロラインフリーに設定されているwebhook URLをコピーします

プロラインフリーに戻って、**設定 ＞初期設定(Messaging API)**  を開き「Webhook URL」をコピーします

![Webhook URLをコピー](https://autosns.co.jp/manual/wp-content/uploads/2020/07/2021-04-21_21h45_59.png)

#### 手順2：LINE DevelopersにあるMessaging API設定タブをクリックします

LINE Developersに戻って、Messaging API設定タブをクリックします

![2：Messaging API]()

#### 手順3：Webhook設定にて、先程コピーしたURLを貼り付けて更新します

![3:Webhook設定]()

続いて、Webhookの利用トグルスイッチが表示されるので、ONにします

![3：Webhookトグル]()

#### 手順4：メッセージの応答設定を編集します

Messaging API設定タブにある「応答メッセージ」横の緑の編集ボタンを押すと、**LINE Official Account Managerの画面が別タブで開く**のでそちらで応答設定をします。

![4：応答メッセージ]()

応答設定は、チャット: OFF、あいさつメッセージ: OFF、**Webhook: ON**、応答メッセージ： OFF で設定してください。

![4：基本設定、詳細設定]()

**応答設定を終えたら必ずタブを閉じて下さい。**  
（※応答設定を行うときにLINE Official Account Managerに画面を移動していますが、続きの設定はLINE Developersで行うためです）  
![4：タブを閉じる]()

#### 手順5：プロラインフリーのアカウント設定をします

プロラインフリー内の**LINE ID**、**チャネルシークレット**、**アクセストークン**をLINE Developers内の情報をコピー＆ペーストして埋めていきます。

![アカウント設定(Messaging API)]()

LINE ID（ボットのベーシックID、取得した場合はプレミアムID、Messaging API設定タブの上部にある「ボットのベーシックID」をコピー＆ペーストしてください。

**※必ず先頭の@も一緒にコピー＆ペーストしてください。**

![5：ベーシックID]()

**ボットのベーシックIDが、**@+英数字**ではない場合、**LINE Developersの画面下部（フッター部分）の右側にある言語選択のセレクトボックスで [日本語]を選んで下さい。****

![5：ベーシックID]()

**それでも直らない場合はブラウザの自動翻訳がオンになっているので、オフにして下さい（Google Chromeの場合）。**

![5：自動翻訳]()

**②チャネルシークレット**  
チャネル基本設定タブの下方にあります。

![5：チャネルシークレット]()

**③アクセストークン**  
Messaging API設定タブの下部にある「チャネルアクセストークン」の発行ボタンを押す。  
すると、アクセストークンが発行されますので、それをコピー＆ペーストします。

![5：アクセストークン]()

以上で、LINE ID、チャネルシークレット、アクセストークンの全てが埋まります。

![アカウント設定完了]()

**入力（ペースト）が完了したら、必ず保存ボタン押して保存してください。**

#### 手順6：LINE developersにて、Webhook URLの検証をします

最後に、LINE developersに戻って、Messaging API設定タブ→Webhook設定にあるWebhook URLの欄に「検証」ボタンがあるので押し、「成功」という表記が出るのを確認したら、接続は無事完了となります。  
![6：Webhook URL検証]()

これで連携の準備ができました。お疲れ様でした。

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
* [![プロラインフリーに最初の１⼈⽬を友だち追加する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーに最初の１⼈⽬を友だち追加する

  2020年7月16日](https://autosns.co.jp/manual/start/connect/add-first-friend "プロラインフリーに最初の１⼈⽬を友だち追加する")
* [![既存のLINE公式アカウントをプロラインフリーと連携させる方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  既存のLINE公式アカウントをプロラインフリーと連携させる方法

  2020年7月21日](https://autosns.co.jp/manual/start/connect/got-account-link "既存のLINE公式アカウントをプロラインフリーと連携させる方法")
* [![管理画面の見方、メインメニューについて](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  管理画面の見方、メインメニューについて

  2020年8月26日](https://autosns.co.jp/manual/start/connect/main_menu "管理画面の見方、メインメニューについて")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  アカウントを入れ替えたい場合（例：メインアカウントとサブアカウント）

  2022年6月4日](https://autosns.co.jp/manual/start/connect/account-exch "アカウントを入れ替えたい場合（例：メインアカウントとサブアカウント）")