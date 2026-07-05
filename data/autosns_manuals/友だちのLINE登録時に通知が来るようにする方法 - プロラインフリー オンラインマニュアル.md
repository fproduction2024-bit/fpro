# 友だちのLINE登録時に通知が来るようにする方法 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/friends/add-notice

[友だち管理](https://autosns.co.jp/manual/category/use/friends)

# 友だちのLINE登録時に通知が来るようにする方法

2023年1月26日

[このページを印刷](javascript:void(0))

![](https://autosns.co.jp/manual/wp-content/uploads/2022/03/icon_robot02.png)

友達がLINE登録しても把握できてないんだけど、何か方法ないの？

![]()

友だちがLINE登録した時に、指定したLINEやメールアドレスに通知が来るようにできるよ、  
まずは、通知設定がONになっているか確認してみよう！

## 友だちがLINE登録してくれた時に通知がくる設定の事前確認

まず『 [顧客活動通知の受信者](https://autosns.jp/setting/test-user/cv) 』で通知を受信する設定になっているか確認します。  
（管理メニューの『設定』→『 テスト送信の受信者設定』→『 顧客活動通知の受信者 』）

![顧客活動通知の受信者]()

このように、ご自身のアカウントの右の飛行機アイコンが緑色になっていたら受信できる状態です。

また、メールに通知がくる設定にする場合は、デフォルト（そのまま）の設定ではログイン時のメールアドレスに通知が届きますが、

通知先を変更したい場合には、[プロライン設定ページ](https://autosns.jp/setting/autosns)で通知先のメールアドレスを変更することもできます。

![メールアドレスの通知先を変えたい場合]()

## 友だちがLINE登録してくれた時に通知がくる設定手順

プロラインフリーでは、顧客の活動通知（フォーム送信／シナリオ移動／アフィリエイト活動通知先）に関して通知を送る設定があるので、LINE登録によってシナリオ移動をする状態を作ります。

#### 手順1：［超ステップ配信シナリオ］にて１つめのシナリオ（ここではシナリオAとします）を用意して、追加時のシナリオにします。

まず、『[ステップ配信シナリオ](https://autosns.jp/scenarios)』で友だち登録時に送るためのシナリオAを用意して、次のメッセージ送信までの待ち時間は1秒などで設定します。

![次のメッセージまでの待ち時間を1秒にする]()

作成したシナリオを『[あいさつメッセージ](https://autosns.jp/setting/initial/line)』で登録時に配信されるシナリオに設定しておきます。

![初期登録シナリオに設定]()

#### 手順2：ステップのない２つめのシナリオを用意します。（シナリオBとします。）

別でステップがない状態のシナリオBを用意します。

![ステップのないシナリオ]()

#### 手順３：シナリオAからシナリオBに移動させる設定にします。

シナリオAのステップの最後の『次のシナリオに移動』が工事中になっていて次に進まない状態ですが、ここクリックしてシナリオBに移動するように変更します。

![]()

「シナリオ末尾に来た時に自動的に他のシナリオの1通目に移動しますか？」で「移動する」を選択して、

「シナリオ移動を利用する」にチェックを入れて『移動先シナリオ』に『シナリオB』を登録します。

これで、友だちが登録した時には『シナリオA』に登録されて設定したメッセージが届き、自動で『シナリオB』に移動します。

#### 手順４：シナリオAからシナリオBに移動させる設定にします。

『[シナリオ移動のカスタマイズ](https://autosns.jp/measurement-tag)』ページで移動先の『シナリオB』を選択して、

「□ 登録発生時にメールで通知する」「□ 登録発生時にLINEで通知する」にチェックして保存します。

![シナリオ移動のカスタマイズの設定]()

以上の手順によって追加された時に通知が来るようになります。

また既にLINEで友だちだった人をプロラインフリーが認識する場合に初めのメッセージを変える場合も、プロラインフリーを連携する前からの友だちに送る用のシナリオを別で作って（例えばシナリオCにします）、『[あいさつメッセージ](https://autosns.jp/setting/initial/line)』で以下のように設定して、『シナリオA』の時と同じように『シナリオB』に移動するように設定しておけば『シナリオBに移動した時』に通知される設定なので、こちらもプロラインフリーの認識とほぼ同時に通知がくる設定になります。

![既に友だちだった人用のシナリオを別に作って同じように移動させる]()

他にも登録媒体ごとにあいさつメッセージ・シナリオを分けるような以下の場合にも、同じようにシナリオBに移動する設定にすれば、同じように通知されます。

[![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=)

流入元（登録媒体）ごとに、あいさつメッセージ・シナリオを分ける

2021.5.13

流入元（登録媒体）ごとに、あいさつメッセージ・シナリオを分けたい プロラインフリーでは、ステップごとに簡単に登録QRコードを作成できるので、ABテストなどが容易に設定できます。 ...](https://autosns.co.jp/manual/use/scenarios/changegreeting)

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

  LINE公式アカウントの友だちをプロラインフリーに認識させる方法

  2022年6月5日](https://autosns.co.jp/manual/use/friends/friend-recog "LINE公式アカウントの友だちをプロラインフリーに認識させる方法")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  メッセージ内などの特定のURLをクリックした人だけをタグ付けやメッセージ配信する方法

  2023年1月20日](https://autosns.co.jp/manual/use/friends/url-click "メッセージ内などの特定のURLをクリックした人だけをタグ付けやメッセージ配信する方法")