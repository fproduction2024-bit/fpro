# 【集客UP！】アフィリエイターに継続報酬を発生させる方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/subsc-revenue

[使い方](https://autosns.co.jp/manual/category/use)

[友だち自動増加システム(独自ASP)](https://autosns.co.jp/manual/category/use/asp-system)

# 【集客UP！】アフィリエイターに継続報酬を発生させる方法

2024年2月1日

[このページを印刷](javascript:void(0))

プロラインの友達自動増加システム(独自ASP)を活用して、

新規の友だちを紹介してくれたアフィリエイターに対して、単発報酬ではなく**継続報酬を発生させる方法**についてご案内します。

例えば、AさんがBさんを紹介した場合で、Bさんが月額10,000円のサロンに入会している状態の時に、

毎月2,000円の報酬がAさんに継続して発生する下の図のような仕組みをイメージしていただけたらと思います。

![継続決済が発生する図](https://autosns.co.jp/manual/wp-content/uploads/2024/01/subsc-revenue01-1024x439.png)

それでは、継続的な報酬を発生させることによって

あなたの商品やサービスに価値を感じている方々が周りに勧めてくれるように実際の操作方法についてご案内します。

記事の目次

**[１・[決済連携] 機能を使用している場合](#number1)**

**[２・](#number2)[[決済連携] 機能を使用していない場合](#number2)**

## **1. [決済連携] 機能を使用している場合**

※こちらの方法を使う場合には、事前に決済連携機能で商品を登録している必要があります。

（Stripeの登録方法は[こちら](https://autosns.co.jp/manual/use/payment-work/stripe/stripe-proline)　PayPalの登録方法は[こちら](https://autosns.co.jp/manual/use/payment-work/paypal/paypal-proline)です。手動登録を選択することも可能です。）

その上で管理画面左メニューの「友だちが増える！独自ASP」を開いて[ASP案件を設定](https://autosns.jp/asp)をクリックしてください。

![ASP案件を設定]()

そして、『成果ポイントの追加』をクリックして、成果が発生するポイントを設定します。

![成果ポイントを追加します]()

「成果ポイントを選択」では「決済連携の商品を決済した」を選択します。![決済時に報酬を発生させる]()

次の項目では、どの商品にするかを選択します。

![どの商品にするか選択する]()

報酬金額の設定では、「支払い金額(税込)に対する報酬金額の割合」を設定できますので、

![継続報酬発生させる方法]()

例えば、「20%」と設定すると、最初に画像でイメージしていただいたように

月額10,000円が決済されるごとに、紹介者に2,000円の継続報酬が発生する状態になります。

![何％にするかを決める]()

## 2. [決済連携] 機能を使用していない場合

### 手順０：事前準備

この方法は、決済時にプロラインのユーザーIDを受け渡すことが必要になりますが、

可能かどうかについてはご利用の決済サービスによりますので、ご利用の決済サービスのサポートなどにご確認ください。

**（聞き方の例）**  
プロラインから 決済サービスの決済画面に

クエリパラメータ（URLに付加する情報）で uid=abc1234 のような値を渡しますので、

決済成功時にこの値を引き継いで、決済回数ごとに指定した別々の完了ページにリダイレクトできますでしょうか？

こちらが可能であれば、決済成功後の転送先をコンテンツページ（または完了ページ）で作成し、

同ページに「シナリオ移動」要素を埋め込むことなどで、決済完了者をシナリオ移動させることができます。

（または、決済サービスの完了ページにシナリオ移動のコードを埋め込むことができれば、外部ページと連携してシナリオ移動することも可能です。）

### 手順１：決済ごとのシナリオを作成する

事前準備でご確認いただき、受け渡すことが可能である場合には、

[ステップ配信シナリオ](https://autosns.jp/scenarios)で「1か月目」「2か月目」…と決済毎のシナリオを作成します。

（シナリオはメッセージを送らない空シナリオでも構いません。）

![各決済時のシナリオを作成する]()

### 手順２：独自ASP機能で、案件の設定をする

その上で管理画面左メニューの「友だちが増える！独自ASP」を開いて[ASP案件を設定](https://autosns.jp/asp)をクリックしてください。

![ASP案件を設定]()

そして、『成果ポイントの追加』をクリックして、成果が発生するポイントを設定します。

![成果ポイントを追加します]()

そして、「成果ポイントを選択」では「シナリオ登録された」を選択して、

![シナリオ移動時に設定]()

どのシナリオに登録された時に報酬2,000円が発生するかを設定します。

![シナリオ登録内容を設定]()

2ヶ月目以降も成果ポイントを追加して、

それぞれ「2か月目」「3か月目」…と決済毎のシナリオ成果が発生するポイントで設定します。

### 手順３：友達IDを反映させて決済リンクに受け渡すための準備をする

その上で、例えば外部のセールスレターなどで決済連携されていない決済リンクから決済する場合には、

[自作ページに転送](https://autosns.jp/content-pages-redirect)ページから

![自作ページに転送 ]()

転送先を外部の決済ページなどに設定して、

![転送先のURLを入力する]()

決済ページに誘導するシナリオでは、「自作ページに転送のコンテンツページ」のURLを案内します。  
（そうすると、外部のセールスレターにプロラインのユーザーIDが受け渡されます。（URLに ?uid=ユーザーID という情報が付きます））

### 手順４：決済成功時にシナリオ移動するように設定する

その上で、決済成功後の転送先を[コンテンツページ](https://autosns.jp/content-pages)（または[完了ページ](https://autosns.jp/complete-page)）で作成し、

同ページに「シナリオ移動」要素を埋め込むことによって、

![シナリオ移動時]()

決済完了者をシナリオ移動させることができますので、「1か月目」「2か月目」…と決済毎にシナリオ移動して報酬が発生します。

または、決済サービスの決済ごとの完了ページにシナリオ移動のコードを埋め込める場合には、

[シナリオ移動のカスタマイズ](https://autosns.jp/measurement-tag)にて

移動させたい「1か月目」「2か月目」などのシナリオを選択して　▼外部システム連携したい場合▼から

![外部システムと連携]()

『外部システム連携用シナリオ移動』のコードをコピーして完了ページのHTMLページ内に貼り付けて決済完了時にで指定したシナリオに移動することも可能です。

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[使い方](https://autosns.co.jp/manual/category/use), [友だち自動増加システム(独自ASP)](https://autosns.co.jp/manual/category/use/asp-system)の関連記事

* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  ステップ配信シナリオを新規作成する

  2020年7月21日](https://autosns.co.jp/manual/use/scenarios/create-scenario "ステップ配信シナリオを新規作成する")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  テンプレートからメッセージを作成する

  2020年7月21日](https://autosns.co.jp/manual/use/scenarios/deploy-template-message "テンプレートからメッセージを作成する")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  テキストメッセージを送る

  2020年7月21日](https://autosns.co.jp/manual/use/message/create_message_text "テキストメッセージを送る")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  画像（スーパーリッチメッセージ）を送る

  2020年7月21日](https://autosns.co.jp/manual/use/message/create-message-image "画像（スーパーリッチメッセージ）を送る")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  動画を送る

  2020年7月29日](https://autosns.co.jp/manual/use/message/create_message_video "動画を送る")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  音声を送る

  2020年7月29日](https://autosns.co.jp/manual/use/message/create_message_video-2 "音声を送る")