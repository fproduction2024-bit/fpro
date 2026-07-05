# Googleカレンダー連携 - プロラインフリー オンラインマニュアル

Source: https://autosns.co.jp/manual/use/reserve-calendar/google_calendar

[スケジュール/イベント予約](https://autosns.co.jp/manual/category/use/reserve-calendar)

# Googleカレンダー連携

2024年5月23日

![Googleカレンダー連携](https://autosns.co.jp/manual/wp-content/uploads/2023/03/eye_google_calendar.jpg)

[このページを印刷](javascript:void(0))

![](/images/banner/release_google_calendar.png)  
![]()

スケジュール/イベント予約機能は、カレンダー形式またはカード形式で予約の受付、履歴確認、管理、リマインド通知ができます。

このページでは、Googleカレンダー連携機能について説明します。

## Googleカレンダー連携でできる３つの機能

### 1受け付けた予約をGoogleカレンダーに表示する

カレンダー予約機能で友だちが予約をすると、連携したGoogleカレンダーに対して自動的に予定が入ります。  
![]()

友だちが予約をキャンセルすると、予定は削除されます。  
![]()

### 2Googleカレンダーで指定した時間帯だけ予約可にする

プロラインで設定した【予約受付時間】のうち、更に特定のイベント名（変更可能）で指定した時間だけが予約可能時間になります。  
休憩時間が複数ある場合、隔週で時間が変わる場合など、プロラインの【予約受付時間】で設定できない細かな空き時間設定を行えます。

例えば、【予約受付時間】が **10:00～19:00** の場合に、  
Googleカレンダーで **4/5 9:00～12:00、4/7 終日** で予約可能にするイベント名（初期値：予約可能）でイベントを作成すると、  
![]()

友だち（ユーザー）が予約できる時間は以下の様になります。  
![]()

プロラインで設定した【予約受付時間】が「店舗の空き時間」で、連携するGoogleカレンダーで「担当者の空き時間」を設定するイメージです。  
（店舗が開いてない時間は当然担当者が空き時間としても予約を受け付けません）

### 3Googleカレンダーで何かの予定が入っていたら予約不可にする

プロラインで設定した【予約受付時間】のうち、Googleカレンダーで何かの予定が入っていたら予約不可にします。  
プロラインのイベント予約以外で受け付けた予約をGoogleカレンダーに登録したり、別の予定が入った場合などに該当時間を予約不可にできます。

例えば、【予約受付時間】が **10:00～19:00** の場合に、  
Googleカレンダーで **4/4 13:00～16:00、4/6 終日** で予定を作成すると、  
![]()

友だち（ユーザー）が予約できる時間は以下の様になります。  
![]()

応用

複数のプロラインのカレンダーを同時に運用する場合も、Googleカレンダー連携を使うと効率良く運用できます。

あるプロラインのカレンダーで予約が入った場合にその時間帯を別のプロラインのカレンダーでは予約不可にできます。  
①２つ以上のプロラインのカレンダーで、同じGoogleカレンダー(ラベル)を連携します。  
②「1. 受け付けた予約をGoogleカレンダーに表示する」機能、「3. Googleカレンダーで何かの予定が入っていたら予約不可にする」を両方で有効にします。（設定方法は後述）  
③すると、あるプロラインのカレンダーで受け付けた予約がイベントとして登録され、その時間帯が別のプロラインのカレンダーでは予約不可になります。

例えば、「有料コンサル60分予約カレンダー」と「無料コンサル30分予約カレンダー」を作成し、それぞれ契約プランに応じて予約カレンダーに案内するといった運用方法で、ダブルブッキングも防止できます。  
さらに「2. Googleカレンダーで指定した時間帯だけ予約可にする」機能も組み合わせると、夕方以降に予約できるのは有料コンサルのみといった制限を加えることで差別化することもできます。

## Googleカレンダー連携

### *fa-font-awesome*事前準備

事前準備として、プロラインと使用したいGoogleカレンダーに対して権限を持つ「Googleアカウント」の連携を行います。

#### 手順1：「スケジュール/イベント予約 > Googleカレンダー連携」を開きます

本ツール（プロラインフリー）にログインして  **スケジュール/イベント予約 ＞ Googleカレンダー連携** を開きます。  
![]()

#### 手順2：「Sign in with Google」をクリックします

![]()

#### 手順3：連携したいアカウントを選択します

![]()

※権限付与の関係上、2回選択画面が表示されます

#### 手順4：内容を確認し、「続行」をクリックします

プロラインに付与させる権限についての確認画面です。「続行」をクリックします。  
![]()

#### 手順5：連携中のアカウント一覧に表示されたことを確認します

連携に成功すると、連携中のアカウント一覧に表示されます。  
![]()

### *fa-font-awesome*連携設定

#### 手順1：「スケジュール/イベント予約 > カレンダーを作る」で、編集対象のカレンダーを選択します

本ツール（プロラインフリー）にログインして  **スケジュール/イベント予約 ＞ カレンダーを作る** を開き、対象のカレンダーを選択します。  
![]()

#### 手順2：Googleカレンダー(ラベル)を選択します

「連携しているGoogleアカウント」が権限を持つGoogleカレンダー一覧が表示されます。いずれかのカレンダーを選択します。  
1つの予約カレンダーに対して連携できるGoogleカレンダーは、1つのみです。  
![]()

#### 手順3：連携する機能を選択します

Googleカレンダーと連携することで、3つの機能が利用できます。詳細は前述の通り  
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