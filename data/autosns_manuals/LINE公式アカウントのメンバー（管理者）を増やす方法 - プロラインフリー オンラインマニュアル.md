# LINE公式アカウントのメンバー（管理者）を増やす方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/application/line-official/add-member

[LINE公式アカウント設定](https://autosns.co.jp/manual/category/application/line-official)

# LINE公式アカウントのメンバー（管理者）を増やす方法

2025年4月14日

![LINE公式アカウントのメンバー（管理者）を増やす方法](https://autosns.co.jp/manual/wp-content/uploads/2020/08/eye_add-member_1200×630.png)

[このページを印刷](javascript:void(0))

LINE公式アカウントやプロバイダー・チャネルに、メンバー（管理者）追加するための権限管理の設定方法について説明します。

アカウントに付与する権限の編集をおこなうには、管理者権限を持つアカウントでログインする必要がありますので

必要に応じて、それぞれの権限を付与してください。

記事の目次

[１．LINE公式アカウントの権限付与について](#number1)

[２．LINE公式アカウントのプロバイダー権限付与について](#number2)

[３．Messaging APIチャネル](#number3)[（ある場合にはLINEログインチャネルも）の権限付与について](#number3)

**※この記事は公式側のサイトでの権限付与****についてですが、**

**プロラインフリー側の管理画面を複数人で運用する方法については[こちらのマニュアル](https://autosns.co.jp/manual/use/setting/admin-login)をご参考ください。**

## LINE公式アカウントの権限付与について

**『LINE公式アカウントの権限』を付与することによって、**

**LINE Official Account Managerで、以下のように該当のアカウントの操作ができるようになります。**

![権限を付与する](https://autosns.co.jp/manual/wp-content/uploads/2020/08/add-member31-1024x322.jpg)

アクセス先は、 https://manager.line.biz/account/＜ベーシックID＞です。  
（例：https://manager.line.biz/account/@123abcd）

権限が無い場合には、URLにアクセスしても以下のように『400 Bad Request エラー』の表示になりますので、

![権限がない場合]()  
下の操作手順を実施して権限付与してください。

#### 手順1：LINE Official Account Managerにログインします

LINE Official Account Managerにログインします。  
<https://account.line.biz/login>

#### 手順2：確認したいアカウントを選択します

アカウントリストから、確認したいアカウントを選択します。

![LINE公式アカウント アカウントリスト]()

#### 手順3：アカウント設定から、権限管理の設定をします

アカウントページの右側にある「歯車マークの設定」をクリックします。

![LINE公式アカウント設定]()

アカウント設定より、権限管理をクリックします。

![LINE公式アカウント権限管理]()

#### 手順4：メンバーを追加します

権限管理ページより「メンバーを追加」をクリックします。

![LINE公式アカウント メンバー追加]()

#### 手順5：認証用のURLを発行します

権限の種類で『管理者』を選択し「URLを発行」ボタンをクリックすると認証用のURLが生成されます。

![LINEアカウント追加メンバーURL発行]()

発行された認証用URLを追加したいユーザーへメールなどで共有します。  
なお、追加されるユーザーも、LINEログインのためのメールアドレス設定をしておく必要があります。

※認証用URLは発行から24時間で失効するのでご注意ください。

※注意　既に『運用者』での権限を付与している場合

LINE公式アカウントのみの運用の状態から、外部ツール連携を含んだ構築代行を依頼する場合には、  
『運用者』という権限のみでは、以下のようにMessaging APIのメニューが表示されずに設定ができないため、

![]()

既に『運用者』での権限を付与していたら、『管理者』での権限にご変更ください。

![]()

#### 手順6：追加されるユーザがログインします

認証URLを受け取ったユーザーが、そのURLをクリックして、LINE Official Account Managerにログインします。

## LINE公式アカウントのプロバイダー権限付与について

LINE公式アカウントの権限付与だけでなく、

ここからのLINE Developers側の権限付与もしておくことで

LINE Developersコンソールでの情報も閲覧・編集できるようになります。

（例えば、友達追加画面の前の認証画面の画像や表示名の変更など、  
LINE Official Account Manager側でできないLINE Developers側での設定もあるため、

**まず、『LINE公式アカウントのプロバイダー権限』を付与することによって、**

**以下のようにLINE Developers の プロバイダ内に作成されているチャネルの一覧表示ができるようになります。**

![]()

アクセス先は、 https://developers.line.biz/console/provider/＜プロバイダID（※チャネルIDではありません）＞です。  
（例：https://developers.line.biz/console/provider/1234567890）

権限が無い場合には、URLにアクセスしても以下のように『404 エラー』の表示になりますので、

![404エラー ]()必要に応じて下の操作手順を実施して権限付与してください。

#### 手順1：LINE Developersにログインします

まず、LINE Developersのコンソール画面にログインします。  
<https://developers.line.biz/console/>

#### 手順２：権限付与したいプロバイダーをクリックして、『権限設定』タブをクリックします

複数プロバイダーがある場合には、一覧の中から権限付与したいプロバイダーを選択してクリックし、

![プロバイダーを選択する ]()

選択したプロバイダーのページで『権限設定』のタブをクリックします。

![権限付与をクリックする]()

#### 手順３：『メールで招待』をクリックして必要項目を入力して招待メールを送信します

権限設定の右の『メールで招待』をクリックすると、『新メンバーを招待』という画面に移行します。

![メール招待する]()

権限付与したい方のメールアドレスを入力して、権限の種類を選択して（管理する場合にはAdminを選びます。）招待メールを送信してください。

![メールを送る]()

#### 手順４：追加されるユーザーがログインして承諾、同意します。

認証URLを受け取ったユーザーは、メール内の『招待を承諾する』というURLをクリックしてください。

![届くメールの内容]()

その後、LINE Developersにログインすると、LINE Developersコンソールが未登録の場合には、以下の表示になりますので、

開発者名、メールアドレスを入力して、『LINE開発契約』のリンク内容を読み、チェックを入れてアカウントを作成してください。

![Developersが初めての場合]()

アカウントを作成すると、『該当のプロバイダーに招待されています』という画面に移行しますので『同意する』をクリックするとプロバイダー権限が付与されます。

![同意する画面]()

このようにプロバイダーの権限を付与することによって各チャネルが表示されますが、

以下の画像の状態のように、まだ各チャネルの権限付与はされておりませんので、各チャネルの権限付与については次の操作をしてください。

![各チャネルはまだ権限がない状態]()

## Messaging APIチャネル（ある場合にはLINEログインチャネルも）の権限付与について

**『Messaging APIチャネル（ある場合にはLINEログインチャネルも）の権限』を付与することによって、**

**以下のようにLINE Developers の 該当チャネルの管理ができるようになります。**（左：Messaging APIチャネル、右：LINEログインチャネル）

![]() ![]()

アクセス先は、 https://developers.line.biz/console/channel/＜チャネルID＞です。  
（例：https://developers.line.biz/console/channel/1234567890）

権限が無い場合には、URLにアクセスしても同様に『404 エラー』の表示になりますので、

![404エラー ]()  
下の操作手順を実施して権限付与してください。

#### 手順1：LINE Developersにログインします（上の操作の続きの場合には、ここは省略です。）

まず、LINE Developersのコンソール画面にログインします。  
<https://developers.line.biz/console/>

#### 手順２：権限付与したいチャネルを選んで、『権限設定』タブをクリックします

権限付与するチャネルを選択します。（ある場合にはLINEログインチャネルも行います。どちらも方法は同じで順不同です。）

![チャネルを選択する]()

プロバイダーの権限付与と同様に、該当のチャネルで『権限設定』を選択します。

![権限設定]()

#### 手順３：『メールで招待』をクリックして必要項目を入力して招待メールを送信します

プロバイダー権限の付与と同様にメールで招待をします。

[![メールで招待]()](https://developers.line.biz/console/)

チャネルの権限付与でも、権限を付与したい方のメールアドレスを入力して、権限の種類を選択して（管理する場合にはAdminを選びます。）招待メールを送信します。

![必要項目を入力して招待する]()

#### 手順４：追加されるユーザーがログインして承諾、同意します。

チャネルの権限者への招待メールが届きますので、追加されるユーザーは『招待を承諾する』をクリックします。

（権限付与する側はプロバイダー、チャネルのそれぞれで承諾と同意が必要であることをお伝えください。）

![届くメールの内容２]()

リンク先で同意をすると、以下のように追加されます。

![追加されます。]()

![通知]()

LINEログインチャネルがある場合も手順は同様で権限付与することができます。

**ここまでは、公式側のサイトでの権限付与****についてですが、**

**プロラインフリー側の管理画面を複数人で運用する方法については以下のマニュアルをご参考ください。**

[![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

複数人で管理する環境を作りたい場合（管理者権限について）

2022.5.4

記事の目次 １．一部のアカウント（任意のメインアカウントかサブアカウント）環境だけ共有したい場合 ２．全てのアカウント環境を共有したい場合（メインアカウントとサブアカウント全部）...](https://autosns.co.jp/manual/use/setting/admin-login)

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[LINE公式アカウント設定](https://autosns.co.jp/manual/category/application/line-official)の関連記事

* [![リッチメニューの設定方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  リッチメニューの設定方法

  2020年7月24日](https://autosns.co.jp/manual/application/line-official/howto-rich-menu "リッチメニューの設定方法")
* [![リッチメニューに２種類のアクションを設定する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  リッチメニューに２種類のアクションを設定する方法

  2020年7月25日](https://autosns.co.jp/manual/application/line-official/twotype-rich-menu "リッチメニューに２種類のアクションを設定する方法")
* [![LINEアプリからメールアドレスを登録（変更）する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINEアプリからメールアドレスを登録（変更）する方法

  2020年8月1日](https://autosns.co.jp/manual/application/line-official/line-app-email "LINEアプリからメールアドレスを登録（変更）する方法")
* [![LINE公式アカウントの名前を変更する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE公式アカウントの名前を変更する方法

  2020年8月1日](https://autosns.co.jp/manual/application/line-official/change-name "LINE公式アカウントの名前を変更する方法")
* [![LINE公式アカウントのIDを好きなID（プレミアムID）に変更する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE公式アカウントのIDを好きなID（プレミアムID）に変更する方法

  2020年8月1日](https://autosns.co.jp/manual/application/line-official/premium-id "LINE公式アカウントのIDを好きなID（プレミアムID）に変更する方法")
* [![LINE公式アカウントでQRコードを確認する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE公式アカウントでQRコードを確認する方法

  2020年8月1日](https://autosns.co.jp/manual/application/line-official/qrcode "LINE公式アカウントでQRコードを確認する方法")