# Messaging APIの利用設定 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/setnavi/firsttime-api

[アカウント初期設定ナビの設定方法](https://autosns.co.jp/manual/category/start/setnavi)

# Messaging APIの利用設定

2022年3月10日

![Messaging APIの利用設定](https://autosns.co.jp/manual/wp-content/uploads/2021/01/eye_firsttime-api_1200×630.png)

[このページを印刷](javascript:void(0))

**プロラインとLINE公式アカウントの連携作業は、パソコンにてお願い致します。**  
また、**LINEアカウント設定する際のブラウザは、「Google Chrome」「Safari」「Firefox」を使って、LINEアカウント設定を完了してください。**「Internet Explorer」では、LINE Developersサイト上で正しく動作しません。

この記事は、**初めてMessaging APIを設定する人向けの案内です。**  
既にステータスが「利用中」の場合は、「[手順5](#process)」へ進んでください。

#### 手順1：「Messaging APIを利用する」をクリックします

![Messaging API設定画面](https://autosns.co.jp/manual/wp-content/uploads/2021/01/firsttime-api_01.png)

「Messaging APIを利用する」をクリックします。  
既にステータスが「利用中」の場合は、「[手順5](#process)」へ進んでください。

注意

LINE Official Account Manager に「個人LINEアカウントと未連携のビジネスアカウント」でログインしている場合、Messaging APIチャネルを作成できないことがあります。  
その場合は、ビジネスアカウントに個人LINEアカウントを1対1で連携させてください。1つの個人LINEアカウントに、複数のビジネスアカウントを連携させることはできません。  
参考：[【LINE公式】ビジネスアカウントにLINEアカウントを連携させる](https://developers.line.biz/ja/docs/line-developers-console/login-account/#link-business-account-with-line-account)

#### 手順2：開発者情報の入力

![開発者情報を登録]()

名前とメールアドレスを入力して、『同意する』をクリックします（外部に公開される情報ではありません）。

#### 手順3：プロパイダーを作成、もしくは選択します

![Messaging APIの利用設定-プロバイダーを選択]()

プロパイダーとは、LINEプラットフォームを通じて、サービスを提供する個人、企業、またはその他の組織を指します。  
プロバイダー名は、LINEの認証画面で友だちに表示されるため、アカウント名など、認識しやすい名前を入力する事をオススメします。入力したら『同意する』をクリックします。

なお、すでにプロバイダ作成済みの場合は、それを選択することも可能です。

#### 手順4：プライバシーポリシー、利用規約の入力（スキップ可）

![Messaging API-プライバシーポリシー]()  
プライバシーポリシーと利用規約は任意入力になります。必要に応じて入力してください。  
後から入力可能なので、スキップしても問題ありません。最後に『OK』をクリックして登録します。

#### 手順5：Channel情報の「Channel ID」をプロラインに入力します

Messaging API画面に表示されている、Channel情報の「Channel ID」をコピーします。

![Messaging API-Channel ID]()

コピーした情報を、プロラインのアカウント初期設定ナビにペーストして、「次へ」ボタンをクリックします。

![プロラインフリー-Channel ID]()

#### 手順6：Channel情報の「Channel secret」をプロラインに入力します

「Channel secret」の入力を求められますので、Messaging API画面に表示されている「Channel ID」の下にある「Channel secret」をコピーして、プロラインにペーストします。  
![プロラインフリー-Channel Secret]()

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[アカウント初期設定ナビの設定方法](https://autosns.co.jp/manual/category/start/setnavi)の関連記事

* [![【既存】のLINE公式アカウントを使用してプロラインと連携](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  【既存】のLINE公式アカウントを使用してプロラインと連携

  2020年10月8日](https://autosns.co.jp/manual/start/setnavi/navi_old_step1 "【既存】のLINE公式アカウントを使用してプロラインと連携")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  【新規】LINE公式アカウントを新規作成する（LINE Official Account Manager）

  2023年3月18日](https://autosns.co.jp/manual/start/setnavi/navi_new_step1_loam "【新規】LINE公式アカウントを新規作成する（LINE Official Account Manager）")