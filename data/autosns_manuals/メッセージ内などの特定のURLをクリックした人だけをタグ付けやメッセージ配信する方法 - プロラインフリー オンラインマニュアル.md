# メッセージ内などの特定のURLをクリックした人だけをタグ付けやメッセージ配信する方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/friends/url-click

[友だち管理](https://autosns.co.jp/manual/category/use/friends)

# メッセージ内などの特定のURLをクリックした人だけをタグ付けやメッセージ配信する方法

2023年3月10日

[このページを印刷](javascript:void(0))

「特定のリンク（URL）をクリックした時だけ分けてタグをつけられませんか？」

「URLリンクをクリックした人だけをタグをつけて、メッセージを送ることはできませんか？」

などのお問い合わせをいただくことが多いので、その方法をお伝えしたいと思います。

#### 手順1：まず、URLクリックした人が登録するシナリオを作成します

超ステップ配信＞[ステップ配信シナリオ](https://autosns.jp/scenarios)にて、

![ステップ配信シナリオ](https://autosns.co.jp/manual/wp-content/uploads/2023/01/url-click03.png)

シナリオを新規作成します。（例：タイトル名「URLクリックした人が登録するシナリオ」）

![シナリオ新規作成]()

#### 手順2：シナリオ移動のカスタマイズで、解除シナリオのチェックを外す

超ステップ配信＞[シナリオ移動のカスタマイズ](https://autosns.jp/measurement-tag)に移り、

![シナリオ移動のカスタマイズ]()

「解除シナリオ：全て解除」のチェックを外し、保存します。

![シナリオ移動のカスタマイズで「解除：なし」に設定]()

補足

この操作は、URLをクリックしてシナリオ移動をする際に、今のシナリオから解除されない様にするためです。

**もしも、URLをクリックすることによって今のシナリオを解除したい場合には、この手順は飛ばしてください。**

#### 手順３：コンテンツページの「自作ページに転送」で移動したいURLを設定します

コンテンツページ・LP＞[自作ページに転送](https://autosns.jp/content-pages-redirect)で

![自作ページに転送]()

新規作成をクリックした後に、移動したいURLを入力・保存します。

![URLを入力する]()

#### 手順４：同コンテンツページに「シナリオ移動」要素を追加して、手順2で作成したシナリオ移動を設定します

同コンテンツページに「シナリオ移動」要素を追加して、手順2 のシナリオ移動のカスタマイズを設定します。

![シナリオ移動の要素を加える]()

#### 手順５：超ステップ配信のメッセージなどで 手順３・４で作成した（自作ページに転送）に誘導します

超ステップ配信＞[ステップ配信シナリオ](https://autosns.jp/scenarios)のメッセージなどで手順３・４で作成した（自作ページに転送）に誘導します。

テキストで「フィールドを挿入」ボタンを押して、フィールド一覧からコンテンツページのタブを選択して選んでもいいですし、

![フィールド挿入]()

![コンテンツページを選択]()

こんな風に、ボタンから「コンテンツページを開く」で該当のコンテンツページを選んでいただいても構いません。

![ボタンで作成]()

これで、URLクリックした人が、手順1.で作成したシナリオに集まります。

（属性タグを付けなくても、シナリオに登録されている方だけを選択することなど、管理することが可能です）

#### 手順６：属性タグを付ける設定にしたり、メッセージを設定する

また、手順1.で作成したシナリオ1通目に「送信後、属性タグを付ける」設定で付けることが可能です。

メッセージ配信の必要があれば、ここで設定してください。

配信の必要がなければ、1通目のシナリオメッセージのフキダシは削除して構いません。（タグのみを付与します。）

![タグをつける]()

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[友だち管理](https://autosns.co.jp/manual/category/use/friends)の関連記事

* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  友だち一覧から対象者を絞り込む

  2020年8月4日](https://autosns.co.jp/manual/use/friends/select-user "友だち一覧から対象者を絞り込む")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  プロラインフリーでの多岐にわたる［友だち管理］の方法

  2021年4月13日](https://autosns.co.jp/manual/use/friends/allfriends "プロラインフリーでの多岐にわたる［友だち管理］の方法")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  運営者側から登録されている友だちをブロックする方法

  2021年4月13日](https://autosns.co.jp/manual/use/friends/block "運営者側から登録されている友だちをブロックする方法")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  シナリオを送りながら「属性タグ」を設定する方法

  2021年4月23日](https://autosns.co.jp/manual/use/friends/tag "シナリオを送りながら「属性タグ」を設定する方法")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  友だちのLINE登録時に通知が来るようにする方法

  2022年5月2日](https://autosns.co.jp/manual/use/friends/add-notice "友だちのLINE登録時に通知が来るようにする方法")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  LINE公式アカウントの友だちをプロラインフリーに認識させる方法

  2022年6月5日](https://autosns.co.jp/manual/use/friends/friend-recog "LINE公式アカウントの友だちをプロラインフリーに認識させる方法")