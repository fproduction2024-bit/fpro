# LINE公式アカウントの友だち追加前でも予約できる設定方法（予約をきっかけに友だちを増やす） - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/reserve-calendar/calendar-add-friend

[スケジュール/イベント予約](https://autosns.co.jp/manual/category/use/reserve-calendar)

# LINE公式アカウントの友だち追加前でも予約できる設定方法（予約をきっかけに友だちを増やす）

2025年8月1日

[このページを印刷](javascript:void(0))

![](https://autosns.co.jp/manual/wp-content/uploads/2022/03/icon_robot02.png)

LINEに友だち登録していない人にも予約案内したいんだよなぁ…

![]()

それなら、カレンダーページを切り替えるだけで出来るよ！

「LINE公式アカウントの友だちでない人にも、『予約してもらうこと』はできますか？」

というお問い合わせをいただくことがありますので、

**友だち追加前の方の予約受付の流れ**についてご案内いたします。

## ①管理側の操作：予約カレンダーを「外部公開ページ」に切り替える

[予約カレンダーページ](https://autosns.jp/reserve-calendar/ "予約カレンダーページ")でページの種類を「友だち専用ページ」から「外部公開ページ（誰にでも公開ページ）」にすると、 LINEの友だちでなくてもアクセスして予約できるようになりますので、

例えば、こちらの予約カレンダーページ（外部公開ページ）をSNSやブログなどから案内すると、LINEの友だちでなくても予約できる流れになります。

![]()

LINE登録させる際のデフォルトの状態は初期登録シナリオですが、

以下の箇所で登録するシナリオの設定が可能です。

![]()

一番右の画面でシナリオを設定してください。

![]()

（友だち追加済でもシナリオ登録させたい場合には、一番下にチェックを入れてください。）

事前準備

特定のシナリオから始める設定には、LINEログイン連携が必要となります。

[参照：LINEログイン連携](https://autosns.co.jp/manual/start/connect/line-login)

さらに、予約カレンダーと決済連携をすることによって、予約完了前に決済させることが可能です。

『予約完了前に決済させる』にチェックを入れて、

![]()

以下の箇所で決済ボタンを選択してください。

（予約カレンダー側で複数のメニューを設定されている場合には、メニュー毎に異なる決済ボタンの設定も可能です。）

![]()

### 登録先のシナリオの活用例

登録先のシナリオの活用例を挙げますので、ご参考ください。

#### 30分以内に決済されなかった方にメッセージで予約誘発する場合（決済連携を利用時）

決済連携を利用している場合には30分以内に決済されない場合、

「友だち追加はできてるが、本予約はされてない」という状態になってしまうため、

友だち追加してくれた方に対して、シナリオで改めて予約するように説明するのが有効です。

登録シナリオ側（例：予約登録シナリオ）では『開始までの待ち時間』を 30分以上に設定して、

![]()

例えば、メッセージ内では

・本予約がまだであること

・予約をするメリットなどをアピールすること

・再度予約カレンダーに誘導すること

を用意することなどによって、未決済の方に予約を促すことができます。

![]()

![]()

[予約リマインダーページ](https://autosns.jp/reserve-reminder)側の予約完了時のシナリオ移動では、このリマインドシナリオを解除する設定になっていれば、決済・予約済みの方には、配信されません。

![]()

補足

解除設定について、デフォルトの設定の場合には、自動で解除されますが、

移動前のシナリオ（例：予約登録シナリオ）のステップ一覧下の

「シナリオ移動の「全て解除」を実行しても、このシナリオからは解除しない」にチェックを入れているか、

[シナリオ移動のカスタマイズ](https://autosns.jp/measurement-tag)にて移動先のシナリオを選択し、

解除シナリオの「全て解除」のチェックを外して保存している場合には解除されません。

#### 新規友だち登録時のみ何らかの別のメッセージを送る場合

新規友だち登録時のみ何らかの別のメッセージを送りたい場合には、

以下の設定の

![]()

登録先シナリオの設定の下の

『既に友だち追加済みの場合でも、シナリオ登録する』にはチェックを入れずに

![]()

例えば、登録シナリオ側（例：予約登録シナリオ）では、

初回予約完了時だけ伝えるメッセージを専用のシナリオに登録して送ることや、

![]()

流入計測用に空シナリオを用意して

必要に応じて、[予約リマインダーページ](https://autosns.jp/reserve-reminder)側の予約完了時のシナリオ移動で接続して計測するなど可能です。

![]()

（デフォルトの設定では毎回登録されますが、[シナリオ移動のカスタマイズ](https://autosns.jp/measurement-tag)にて移動先のシナリオを選択し、登録回数の制限の設定も可能です。）

## ② 予約者側：外部公開ページから仮予約を行う

LINE公式アカウントの友だちではない方からの予約については、一旦『仮予約』という形になります。

日時を選択すると、以下のような確認画面になりますので、『予約する』をタップすると、

![]()

「仮予約が完了しました。」という状態になります。

![]()

そして、仮予約→本予約にする場合には、

30分以内にLINE公式アカウントに友だち追加する必要がありますので、

予約を確定させるために自然な流れで友だちを増やすことができます。

## ③予約者側：仮予約ページから友だち追加をして、予約を確定させる

仮予約ページに表示されている友だち追加用QRコードから、

30分以内にLINEの友だち追加をしてもらい、

（決済連携がある場合には決済を進めると）

**仮予約とLINEユーザーが紐づき、本予約として確定されます。**![]()

管理側では、[**予約一覧ページ**](https://autosns.jp/reserve-history)に予約内容が表示される状態になります。

![]()

※**PC版LINEの場合、動作に様々な制限がある事がございます。**  
その為、正確な動作確認をしたい場合は、スマホ版LINEアプリをご利用ください。

[このページを印刷](javascript:void(0))

[スケジュール/イベント予約](https://autosns.co.jp/manual/category/use/reserve-calendar)の関連記事

* [![予約枠を作る](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  予約枠を作る

  2023年1月17日](https://autosns.co.jp/manual/use/reserve-calendar/create_calendar "予約枠を作る")
* [![追加質問する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  追加質問する

  2023年1月18日](https://autosns.co.jp/manual/use/reserve-calendar/add_calendar_form "追加質問する")
* [![予約変更、キャンセル](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  予約変更、キャンセル

  2023年1月18日](https://autosns.co.jp/manual/use/reserve-calendar/change_reservation "予約変更、キャンセル")
* [![スケジュール/イベント予約とは？](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  スケジュール/イベント予約とは？

  2023年1月27日](https://autosns.co.jp/manual/use/reserve-calendar/reserve_summary "スケジュール/イベント予約とは？")
* [![](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  Zoomミーティングに招待

  2023年1月30日](https://autosns.co.jp/manual/use/reserve-calendar/zoom_personal "Zoomミーティングに招待")
* [![予約時に決済する](data:image/gif;base64,R0lGODdhAQABAPAAAN3d3QAAACwAAAAAAQABAAACAkQBADs=) 

  予約時に決済する

  2023年3月3日](https://autosns.co.jp/manual/use/reserve-calendar/add_calendar_products "予約時に決済する")