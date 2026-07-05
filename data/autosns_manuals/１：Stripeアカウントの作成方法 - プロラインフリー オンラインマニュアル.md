# １：Stripeアカウントの作成方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/payment-work/stripe/create-stripe

[Stripe（ストライプ）](https://autosns.co.jp/manual/category/use/payment-work/stripe)

# １：Stripeアカウントの作成方法

2024年4月3日

![１：Stripeアカウントの作成方法](https://autosns.co.jp/manual/wp-content/uploads/2022/04/eye_create-stripe.png)

[このページを印刷](javascript:void(0))

![](https://autosns.co.jp/manual/wp-content/uploads/2022/03/icon_robot02.png)

オンライン決済のStripeって、PayPalと何が違うの？

![]()

Stripeの大きなメリットとしては、アカウントの開設が早いことかな  
（※開設後に審査されるので、審査が甘いわけではありません）

![]()

あと、決済手数料はPayPalより安いので、低価格の商品を多く販売する場合はStripeの方が向いてるかな

※**プロラインで利用するには、アカウントの開設とは別に、Stripeの本番環境利用申請の提出が必要です。**

## Stripeアカウントの作成方法

**プロラインの決済連携を使うには、Stripeで作成した「商品」を利用します。**

「商品」は複数の「料金」設定を持ち「単発決済」「定期決済」共に利用でき、いわゆる「**サブスクリプション**(オンラインサロン／定期課金)」や「単発決済」に対応します。

プロラインでは、商品(種類)ごとの「累積支払い金額」に応じた「シナリオ移動・コンテンツや会員サイトの提供」が全自動でできます。

なお、**本番環境でStripeをプロラインと連携して使用するには、Stripeの「本番環境利用申請」が必須です。**

テスト環境の場合、「商品の作成」や「決済連携のテスト」は可能ですが、実際に金銭のやり取りは発生しない為、「**本番環境利用申請**」が必須となります。

今からアカウントを作る方は以下サイトを参照して、**「アカウント作成」と「本番環境利用申請」を行ってください。**

法人でない**個人の方も屋号(決済画面に表示される事業の名前)で作成できます。**

以下が作成方法の記事へのリンクですが、**その下の注意事項をよくお読みください。**

[Stripeアカウントの作り方(外部サイト)>>](https://n10shop.com/post-48882/)

※既にお持ちのアカウントの「本番環境利用申請」は、Stripe管理画面または以下のリンクから行えます。

[本番環境利用の申請(Stripe管理画面)>>](https://autosns.jp/r/?u=https://dashboard.stripe.com/account/onboarding/business-structure)

※１つのメールアドレスにプロジェクトごとに複数のStripeアカウントを作成することもできます。その際は**それぞれのStripeアカウントで本番環境利用申請を行ってください。**

[マニュアル：複数のアカウント(Stripe公式)>>](https://autosns.jp/r/?u=https://stripe.com/docs/multiple-accounts)

### アカウント作成時の注意点！

アカウント作成時の注意点です。**必ずお読み下さい。**

* **2段階認証について**  
  本番環境で必要ですので、**必ずおこなってください。**
* **銀行口座の登録について**  
  支払いの受け取りに必要ですので、**必ず登録してください。**
* **本番環境利用申請について**  
  テスト環境でのプロラインとの連携はStripeアカウント作成後すぐにおこなえますが、**「本番環境で支払いを受け取る」には、本番環境利用申請が必須になります。**

  申請と言っても、Webサイト上で求められる情報を入力したり、本人確認書類（運転免許証など)の画像をアップロードするだけで、申請から数分以内に有効になります。

  ただし、Stripeの審査が甘いわけではありません。ある程度売り上げが立つと、事後審査が行われます。事後審査で利用規約に違反しているもしくは、Stripeが不適格と判断した場合には、凍結、資産保留、最悪の場合アカウント削除など厳しい処置がなされる可能性もあります。

  本番環境利用申請前に「[Stripe利用規約](https://stripe.com/jp/ssa)」や、「[禁止/制限付き業種](https://stripe.com/jp/legal/restricted-businesses)」をよく確認してください。
* **JCB カード決済有効化**  
  JCBカード決済に必要です、**必ずおこなってください。**

  Stripe管理画面の[[設定 > 支払方法](https://dashboard.stripe.com/settings/payment_methods)]で、JCBカードを「有効」にすると、JCBによる審査が行われます。

  審査には３営業日～３週間程度かかります。JCB社による審査が進み、追加情報の提出を求められる場合もあります。本番環境利用申請が終わったら、早めにJCBカードの審査も進めましょう。

**Stripeは日本語で電話対応、チャット、メールを受け付けています。**

分からないことがあればStripeにお問い合わせください。

[Stripe サポートページ >>](https://support.stripe.com/)

※よくある質問が表示されます。右側の「サポートにお問い合わせください」から問い合わせ可能です。

※日本語の対応時間：月曜日～金曜日の午前9時～午後18時（日本時間）

続いて、「商品」を作成し、プロラインと連携するための簡単な方法を説明します。

[![２：Stripe商品作成とプロラインとの連携方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

２：Stripe商品作成とプロラインとの連携方法

2022.4.9

記事の目次１．プロラインとのAPI連携方法（初回のみ）２．Stripe商品の作成方法３．プロラインとの連携方法（決済ボタン作成） この作業を進めるには、Stripeのアカウントが必要です。 もし、Stripeのアカウント作成がまだのようでしたら、下記の記事を先にご確認ください。 1プロラインとのAP...](https://autosns.co.jp/manual/use/payment-work/stripe/stripe-proline)

決済連携の関連記事

**【 [１：UnivaPayアカウントの作成方法](https://autosns.co.jp/manual/use/payment-work/univapay/create-univapay) 】【 １：Stripeアカウントの作成方法 】◀今ココ！ 【 [１：PayPalアカウントの作成方法](https://autosns.co.jp/manual/use/payment-work/paypal/paypal-howto) 】**  
**【 [２：UnpvaPay商品の作成方法](https://autosns.co.jp/manual/use/payment-work/univapay/univapay-proline) 】【 [２：Stripe商品の作成方法](https://autosns.co.jp/manual/use/payment-work/stripe/stripe-proline) 】【 [２：PayPal Checkout連携](https://autosns.co.jp/manual/use/payment-work/paypal/paypal-checkout-proline) 】**

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[Stripe（ストライプ）](https://autosns.co.jp/manual/category/use/payment-work/stripe)の関連記事

* [![２：Stripe商品作成とプロラインとの連携方法](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  ２：Stripe商品作成とプロラインとの連携方法

  2022年4月9日](https://autosns.co.jp/manual/use/payment-work/stripe/stripe-proline "２：Stripe商品作成とプロラインとの連携方法")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  Stripe決済連携で登録した商品の継続課金を解約する方法について

  2023年12月11日](https://autosns.co.jp/manual/use/payment-work/stripe/stripe-portal "Stripe決済連携で登録した商品の継続課金を解約する方法について")