# PayPal連携(スマートボタン支払い) - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/start/external/paypal-smartbtn

[外部サービスと連携する](https://autosns.co.jp/manual/category/start/external)

# PayPal連携(スマートボタン支払い)

2023年6月28日

![PayPal連携(スマートボタン支払い)](https://autosns.co.jp/manual/wp-content/uploads/2020/12/eye_paypal.png)

[このページを印刷](javascript:void(0))

## PayPal連携(スマートボタン支払い)

コンテンツページにPayPalスマートボタンを貼り付け、支払い完了でシナリオ遷移する方法について説明します。

ポイント

PayPalはアメリカの会社が運営する、インターネットを利用した決済サービスです。  
現在、世界で3億アカウント以上登録されており、世界的には最もポピュラーなオンライン決済サービスとなります。  
（※もちろん、日本語での電話・メールでのお問い合わせにも対応しています）

補足

PayPalの決済システムが、新しい方式に順次切り替わっているようです。  
その為、新しくPayPalアカウントを作成された方は、「スマートボタン」や「今すぐ購入」などの設定がない場合がございます。  
その際は、Stripeにも対応しておりますので、こちらの活用をご検討ください。  

[![２：Stripe商品作成とプロラインとの連携方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

２：Stripe商品作成とプロラインとの連携方法

2022.4.9

記事の目次１．プロラインとのAPI連携方法（初回のみ）２．Stripe商品の作成方法３．プロラインとの連携方法（決済ボタン作成） この作業を進めるには、Stripeのアカウントが必要です。 もし、Stripeのアカウント作成がまだのようでしたら、下記の記事を先にご確認ください。 1プロラインとのAP...](https://autosns.co.jp/manual/use/payment-work/stripe/stripe-proline)

※現在、PayPal連携できているアカウントに関しては、引き続き決済連携をご利用いただくことができます。

### *fa-font-awesome*事前準備

* **PayPal ビジネスアカウント**  
  ペイパル決済を導入するために、ビジネスアカウント登録（無料）が必要です
* **プロライン シナリオ**  
  決済ページに誘導するシナリオ、決済完了後のシナリオを作成しておきます
* **プロライン コンテンツページ**  
  決済ボタンを埋め込むコンテンツページ・LP(決済ページ)を作成しておきます。商品の魅力などを記述しましょう
* **プロライン フォーム送信完了ページ**  
  決済成功後に表示されるフォーム送信完了ページ(サンクスページ)を作成しておきます。

### *fa-font-awesome*PayPalでの操作

#### 手順1：PayPal公式ページからビジネスアカウントにログインします

PayPal公式ページ <https://www.paypal.com/jp/>  
![]()

#### 手順2：トップメニューより[決済ボタン]を選択します

トップメニューの **ツール＞ 決済ボタン** を選択します。  
※表示されていない場合は、 **ツール＞ すべてのツール** を選択し、表示されたページで[決済ボタン]を選択してください  
![]()

#### 手順3：決済ボタンの種類で[スマートボタン]を選択します

![]()

応用

上記画像右上の「Smart Subscribe」ボタンは、スマートボタンの定期課金版です。こちらを使うと定期課金作成でシナリオ移動が可能です。  
ただし、課金時にシナリオ移動ではなく、定期課金作成時にシナリオ移動になる点はご注意ください。

#### 手順4：決済ボタンの設定を行い、HTMLコードを取得します

決済ボタンの設定で価格や、説明文、デザイン（スタイル）を変更できます。  
設定出来たら [コードのコピー]ボタンをクリックします。

※クリップボードにHTMLコードがコピーされます。後ほど使用しますので、メモ帳に貼り付けて保存しておくなどしておきましょう。  
![]()

### *fa-font-awesome*プロラインフリーでの操作

#### 手順1：プロラインフリーにログインし、決済ボタンを埋め込むコンテンツページ・LP（決済ページ）の編集画面を開きます

本ツール（プロラインフリー）にログインして**コンテンツページ・LP ＞ 対象のコンテンツページ** を選択します

#### 手順2：スマート決済ボタンを設置したい位置の万能エディタを開きます

※万能エディタはスマート決済ボタン用に新規作成しても構いません。

#### 手順3: 対象の万能エディタを、テキスト(HTML)モードにします

万能エディタの編集画面で[テキスト(HTML)]をクリックします  
![]()

#### 手順4：スマート決済ボタンのHTMLコードを貼り付けます

スマート決済ボタンを表示したい位置に、PayPalで取得したHTMLコードを貼り付けます。

#### 手順5：決済成功時に完了ページに遷移するように設定します。

貼り付けたコードの下方にある、onApprove:で始まる行を見つけます。  
![]()

以下の記述を削除して、書き換えます。

```
onApprove: function(data, actions) {
    return actions.order.capture().then(function(orderData) {
    
    // Full available details
    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

    // Show a success message within this page, e.g.
    const element = document.getElementById('paypal-button-container');
    element.innerHTML = '';
    element.innerHTML = '

### Thank you for your payment!

';

    // Or go to another URL:  actions.redirect('thank_you.html');

  });
},
```

↓

```
onApprove: function(data, actions) {
    return actions.order.capture().then(function(orderData) {
        location.href='[[fp1]]';
    });
},
```

※[[fp1]]の部分は、決済成功後に表示される完了ページ(サンクスページ)を指定します。[フィールド挿入]ボタンから挿入すると間違いがありません。

応用

手順3: で「Smart Subscribe」ボタンを選択した場合は、以下の記述を削除して、書き換えます。

```
onApprove: function(data, actions) {
  alert(data.subscriptionID); // You can add optional success message for the subscriber here
}
```

↓

```
onApprove: function(data, actions) {
  location.href='[[fp1]]';
}
```

#### 手順6：[保存]ボタンをクリックします

[保存]ボタンをクリックして、編集内容を保存します

#### 手順7：決済成功後に表示される完了ページ（サンクスページ）の編集画面を開きます

**登録フォーム(アンケート) ＞ フォーム送信完了ページ ＞ 対象のフォーム送信完了ページ** を選択します

#### 手順8：フォーム送信完了ページの要素にシナリオ移動を追加します

[シナリオ移動]ボタンをクリックして、要素を追加します。

![フォーム送信完了ページにシナリオ移動を設定する]()

#### 手順9：決済成功後に実行するシナリオ移動を選択します

「決済に誘導するシナリオ」から「決済完了後のシナリオ」に遷移するシナリオ分岐タグを選択します。

![シナリオ移動を選択]()

必ず、フォーム送信完了ページに追加してください。コンテンツページ・LPにシナリオ分岐タグを追加すると、決済前にシナリオ遷移してしまいます。

#### 手順10：[保存]ボタンをクリックします

[保存]ボタンをクリックして、編集内容を保存します

#### 手順11：決済ページに誘導するシナリオから、動作確認をしましょう

決済ページに誘導するシナリオから、決済ページを表示してPayPal決済、サンクスページへ転送されシナリオ遷移する。という流れを確認してみましょう。

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[外部サービスと連携する](https://autosns.co.jp/manual/category/start/external)の関連記事

* [![YouCanBookMe連携(スケジュール予約/Zoom連携なし)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  YouCanBookMe連携(スケジュール予約/Zoom連携なし)

  2020年12月23日](https://autosns.co.jp/manual/start/external/ycbm-new-booking "YouCanBookMe連携(スケジュール予約/Zoom連携なし)")
* [![YouCanBookMe連携(スケジュール予約/Zoom連携あり)](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  YouCanBookMe連携(スケジュール予約/Zoom連携あり)

  2021年12月25日](https://autosns.co.jp/manual/start/external/ycbm-zoom-form "YouCanBookMe連携(スケジュール予約/Zoom連携あり)")
* [![外部システム連携（信号を送る）](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  外部システム連携（信号を送る）

  2024年2月1日](https://autosns.co.jp/manual/start/external/push_html "外部システム連携（信号を送る）")
* [![外部システムからシナリオを移動や、フォーム登録する方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  外部システムからシナリオを移動や、フォーム登録する方法

  2024年2月26日](https://autosns.co.jp/manual/start/external/receive_request "外部システムからシナリオを移動や、フォーム登録する方法")
* [![友だち追加時にパラメータを持ち込む](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  友だち追加時にパラメータを持ち込む

  2024年3月7日](https://autosns.co.jp/manual/start/external/addfriend_parameter "友だち追加時にパラメータを持ち込む")