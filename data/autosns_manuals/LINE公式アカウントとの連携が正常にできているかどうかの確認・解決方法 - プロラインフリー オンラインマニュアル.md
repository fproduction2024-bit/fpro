# LINE公式アカウントとの連携が正常にできているかどうかの確認・解決方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/linkage-check

[はじめ方](https://autosns.co.jp/manual/category/start)

[LINE公式と連携する](https://autosns.co.jp/manual/category/start/connect)

# LINE公式アカウントとの連携が正常にできているかどうかの確認・解決方法

2023年10月31日

[このページを印刷](javascript:void(0))

プロラインで運用中に以下のような問題がある場合には、LINE公式アカウントとプロラインが正常に連携できていない可能性があります。

・キーワードを発言しているのにキーワード応答が反応しない

・メッセージ配信ができない

・友だちからのチャット受信ができない

・新規で登録されてもツールが認識しない

今回は、このような現象があってお困りの時のために確認方法をご案内いたします。

## Messaging API連携の確認についてご案内します

LINE公式アカウント側とプロライン側のチャネルID、チャネルシークレットの組み合わせが正しければ、Messaging APIは正常に連携できております。

（正しくない場合には、プロラインのLINE公式アカウントから下の通知が届きます。もし通知が届いていない場合には、[こちらに進んでください。](#number1)）

![エラー通知](https://autosns.co.jp/manual/wp-content/uploads/2023/08/linkage-check5.png)

通知のリンクをクリックすると、該当のアカウントの[初期設定(Messaging API)](https://autosns.jp/setting/line)に飛びますので、

『連携するLINE公式アカウント情報の更新／上書き』というボタンをクリックして

初期設定ナビから正しいチャネルID、チャネルシークレットを入力して設定し直してください。

![連携するLINE公式アカウント情報の更新／上書き]()

確認方法

正しいチャネルID、チャネルシークレットは、以下のチャネルID、チャネルシークレットという欄にある、

![チャネルIDなど確認]()

『LINE Developers > プロバイダーリスト>>』という緑のリンクをクリックすると、

![リンクをクリック]()

LINE公式アカウント側のサイトに遷移し、（必要あればログインすると）Messaging API設定ページに飛びますので、『チャネル基本設定』に移動して、

![チャネル基本設定]()

以下の箇所でご確認いただけます。

![]()

## Webhook設定に関する確認項目２つをご案内します

チャネルID、チャネルシークレットの組み合わせに問題のない場合には、Webhookに関する項目を２つ確認します。

### １）応答設定がwebhookがオンになっているかどうか

プロライン管理画面の上メニューの『LINE公式アカウント』をクリックしてLINE Official Account Managerに移動して、

![LINE公式アカウント]()

（必要あれば該当のアカウントを選んで）右上の歯車のマークをクリックすると『設定』のメニューが出てきます。

![設定]()

『応答設定』を選び、

![応答設定]()

画像のようにwebhookがオン（緑色）に設定されていることをご確認ください。

![Webhook]()

（webhookがオフの場合には、連携できていない状態です。）

### ２）次に、Webhook URLが一致しているかどうか

[初期設定(Messaging API)](https://autosns.jp/setting/line)にある『１：Webhook URL』の値をコピーして、

![Webhook URL]()

先ほどのLINE Official Account Managerの『応答設定』の下の「Messaging API」にある「Webhook URL」と同じかどうかご確認ください。

![Messaging API]()

![Webhook URL]()

不具合の起こる事例について

例えば、以下のようにプロラインの別のアカウントに同一のLINE公式アカウントを連携した時など

・メインアカウントーLINE公式アカウントA  
・サブアカウント　ーLINE公式アカウントA

後から連携した方のWebhook URLに変更されて先に連携した側で不具合が起こります。

連携する際には、以下のように別々のLINE公式アカウントに連携してください。

・メインアカウントーLINE公式アカウントA  
・サブアカウント　ーLINE公式アカウントB

ここまで進めたら、問題の現象が改善するかどうか、実際にキーワード応答などで動作をご確認ください。

また、連携が切れている時に認識されていなかった友だちに関しては、以下の方法でツール側に認識させてください。

[![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

LINE公式アカウントの友だちをプロラインフリーに認識させる方法

2022.6.5

既にLINE公式アカウントで友だちになっている人が認識されないんだよ！ どのツールを使う場合でも、認識させるための手順を踏む必要があるんだよ。 これは、どんなツールを使っても同...](https://autosns.co.jp/manual/use/friends/friend-recog)

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[はじめ方](https://autosns.co.jp/manual/category/start), [LINE公式と連携する](https://autosns.co.jp/manual/category/start/connect)の関連記事

* [![用語と概要](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  用語と概要

  2020年7月16日](https://autosns.co.jp/manual/start/term-overview "用語と概要")
* [![プラン・料金について](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プラン・料金について

  2020年7月16日](https://autosns.co.jp/manual/start/fee-structure "プラン・料金について")
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