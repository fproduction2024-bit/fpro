/* ═══════════════════════════════════════════
   Brain Booster Package - App Logic
   ═══════════════════════════════════════════ */

// ─── Present Content Data ───
const presents = [
    {
        title: "Brain販売で月50万円を達成するロードマップ",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「知識をお金に変える」——これは特別な才能じゃなく、正しい"順番"を知っているかどうかの話です。</blockquote>

<h2>はじめに</h2>
<p>僕がBrainを立ち上げた理由は1つだけ。<strong>「知識を持っている人が、正当に報われる世界を作りたい」</strong></p>
<p>あなたがもし何かの分野で人より詳しいこと、経験から得た知見、仕事で積み上げたスキルがあるなら、それは間違いなく"売れる"。このロードマップでは、<strong>「月50万円を最短で達成する人の共通パターン」</strong>をお伝えします。</p>

<h2>Phase 0：自分の"売り物"を特定する（Day 1〜3）</h2>
<h3>売れるテーマの3条件</h3>
<table><tr><th>条件</th><th>チェック</th></tr>
<tr><td>① その知識で<strong>誰かの悩みが解決する</strong></td><td>□</td></tr>
<tr><td>② ネットで<strong>検索している人がいる</strong></td><td>□</td></tr>
<tr><td>③ あなたが<strong>実体験に基づいて語れる</strong></td><td>□</td></tr></table>
<p>💡 <strong>迫のワンポイント</strong>: 「自分が稼いだ金額」よりも「自分が解決した問題」で商品を考えること。</p>

<h2>Phase 1：最小単位でコンテンツを作る（Day 4〜10）</h2>
<p><strong>「1つの問題を、1つの方法で解決するコンテンツ」を作る。</strong> 5,000〜10,000字 or 動画3〜5本。制作期間3〜7日。</p>
<p>💡 最初のコンテンツに100点は要らない。70点で出して、レビューを見て改善する。</p>

<h2>Phase 2：価格と販売戦略を決める（Day 11〜14）</h2>
<table><tr><th>戦略</th><th>具体例</th></tr>
<tr><td>ローンチ価格</td><td>4,980円（最初の50部限定）</td></tr>
<tr><td>通常価格</td><td>9,800円</td></tr>
<tr><td>部数連動値上げ</td><td>50部→100部→200部で段階的に値上げ</td></tr></table>

<h2>Phase 3：初速を作る（Day 15〜21）</h2>
<table><tr><th>施策</th><th>目的</th></tr>
<tr><td>アフィリエイト報酬率を50%に設定</td><td>紹介者のインセンティブを最大化</td></tr>
<tr><td>レビューキャンペーン</td><td>購入者にレビュー依頼→追加特典プレゼント</td></tr>
<tr><td>Xでのカウントダウン投稿</td><td>「あと10部で値上げ」で緊急性を演出</td></tr></table>

<h2>Phase 4：月50万円の安定収益を作る（Day 22〜90）</h2>
<p>コンテンツ数を3〜5本に増やし、1本あたり月10〜15本売れればOK。さらにアフィリエイト収益で循環を作る。</p>

<h2>月50万円達成チェックリスト</h2>
<ul>
<li>□ 売れるテーマを特定した（Phase 0）</li>
<li>□ 最小単位のコンテンツを1つ作った（Phase 1）</li>
<li>□ 価格設定とローンチ戦略を決めた（Phase 2）</li>
<li>□ 初速施策を実行し、最初の10件のレビューを獲得した（Phase 3）</li>
<li>□ 2つ目以降のコンテンツを制作し始めた（Phase 4）</li>
<li>□ 月間売上50万円を達成した 🎉</li>
</ul>`
    },
    {
        title: "コンテンツの値段設計テンプレート",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「値段を間違えるだけで、どんなに良いコンテンツでも売れなくなる。」逆に言えば、値段設計を正しくやるだけで売上は2〜3倍変わる。</blockquote>

<h2>値段設計の5つの原則</h2>
<h3>原則1：「いくらの価値を届けるか」で考える</h3>
<p>❌ 「競合が5,000円だから4,980円にしよう」<br>✅ 「この教材で月10万円稼げるなら、1万円は安いと感じるはず」</p>

<h3>原則2：価格帯ごとに"購入心理"が変わる</h3>
<table><tr><th>価格帯</th><th>購入者の心理</th><th>求められるもの</th></tr>
<tr><td>〜1,980円</td><td>とりあえず買ってみよう</td><td>短くて読みやすいこと</td></tr>
<tr><td>2,980〜4,980円</td><td>ハズレでもいいか</td><td>明確な1つのノウハウ</td></tr>
<tr><td>9,800〜14,800円</td><td>元が取れるか確認したい</td><td>実績・レビュー・ボリューム</td></tr>
<tr><td>19,800〜29,800円</td><td>本当に変われるなら買う</td><td>体系的な講座・テンプレ付き</td></tr>
<tr><td>49,800円〜</td><td>投資として回収できるか？</td><td>サポート・添削・コミュニティ</td></tr></table>

<h3>原則3：「ローンチ価格」で初速を作る</h3>
<p>通常価格の50〜60%をローンチ価格に設定（例：通常9,800円 → ローンチ4,980円）</p>

<h2>値段設計テンプレート</h2>
<h3>STEP 1：価値の定量化</h3>
<table><tr><th>質問</th><th>あなたの回答</th></tr>
<tr><td>このコンテンツで月いくら稼げる？</td><td>＿＿＿＿円</td></tr>
<tr><td>効果は何ヶ月続く？</td><td>＿＿＿＿ヶ月</td></tr>
<tr><td>合計の経済的インパクト</td><td>＿＿＿＿円</td></tr></table>
<p><strong>推奨販売価格 ＝ 経済的インパクト × 5〜10%</strong></p>

<h2>迫の実体験：値段を変えただけで売上3倍</h2>
<p>同じコンテンツを1,980円→9,800円に値上げ＋段階値上げ導入。部数は減ったのに<strong>売上は3倍</strong>。アフィリエイト報酬率50%にしたことで月売上が3万円→30万円に。</p>`
    },
    {
        title: "初心者が最短で月5万円を作る3ステップ",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「月5万円」は人生を変える金額だ。給料以外に毎月5万円が入ってくる状態を一度作れば、そこからの伸びは早い。</blockquote>

<h2>STEP 1：90日で売れるスキルを1つ身につける</h2>
<h3>おすすめスキル TOP5</h3>
<table><tr><th>スキル</th><th>学習期間</th><th>単価目安</th><th>月5万に必要な件数</th></tr>
<tr><td>① Web制作</td><td>2〜3ヶ月</td><td>3〜10万円/件</td><td>1〜2件</td></tr>
<tr><td>② 動画編集</td><td>1〜2ヶ月</td><td>5千〜3万円/本</td><td>2〜10本</td></tr>
<tr><td>③ Webライティング</td><td>1〜2ヶ月</td><td>3千〜2万円/記事</td><td>3〜15記事</td></tr>
<tr><td>④ SNS運用代行</td><td>1ヶ月</td><td>3〜10万円/月</td><td>1〜2社</td></tr>
<tr><td>⑤ Lステップ構築</td><td>2〜3ヶ月</td><td>10〜50万円/件</td><td>1件</td></tr></table>
<p>💡 「好きかどうか」より「需要があるかどうか」で選ぶほうが確実。</p>

<h2>STEP 2：最初の1件を「実績作り」として獲得する</h2>
<p><strong>方法①</strong>：知人に無料〜格安で提供する<br>
<strong>方法②</strong>：クラウドソーシングで小さい案件を取る<br>
<strong>方法③</strong>：Brainコミュニティで案件紹介を受ける</p>
<p>💡 最初の1件は「お金」じゃなく「実績」を取りに行く。この1件で案件獲得スピードが10倍変わる。</p>

<h2>STEP 3：月5万円を安定させる「仕組み」を作る</h2>
<p><strong>柱①</strong>：継続案件を1つ持つ（ベース収入の確保）<br>
<strong>柱②</strong>：ポートフォリオを磨き続ける<br>
<strong>柱③</strong>：「紹介」が生まれる仕事をする</p>

<h3>タイムライン</h3>
<table><tr><th>期間</th><th>やること</th><th>目標</th></tr>
<tr><td>Month 1</td><td>スキル学習（毎日2時間）</td><td>基礎を固める</td></tr>
<tr><td>Month 2</td><td>ポートフォリオ制作＋初案件</td><td>実績1件</td></tr>
<tr><td>Month 3</td><td>案件増＋継続案件獲得</td><td>月5万円達成</td></tr></table>`
    },
    {
        title: "稼げるスキル選定チェックリスト",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「何を学ぶか」で、1年後の月収が10倍変わる。スキル選びを間違えると、どれだけ努力しても月5万円すら届かない。</blockquote>

<h2>スキル選定の5大基準</h2>
<p>各基準を<strong>1〜5点</strong>で採点。合計<strong>20点以上</strong>なら「稼げるスキル」と判定。</p>
<table><tr><th>基準</th><th>チェック内容</th></tr>
<tr><td>①市場の需要</td><td>クラウドソーシングで案件が十分にあるか</td></tr>
<tr><td>②学習期間</td><td>3ヶ月以内に基礎が身につくか</td></tr>
<tr><td>③案件単価</td><td>1件あたり1万円以上あるか</td></tr>
<tr><td>④スケーラビリティ</td><td>教材化やコンサル展開が可能か</td></tr>
<tr><td>⑤相性</td><td>続けられるか、楽しいか</td></tr></table>

<h2>2026年版 稼げるスキルランキング TOP8</h2>
<table><tr><th>順位</th><th>スキル</th><th>総合点</th></tr>
<tr><td>🥇 1位</td><td>Lステップ/LINE構築</td><td>24/25</td></tr>
<tr><td>🥈 2位</td><td>Web制作（WordPress含む）</td><td>22/25</td></tr>
<tr><td>🥉 3位</td><td>SNS運用代行</td><td>22/25</td></tr>
<tr><td>4位</td><td>動画編集（ショート特化）</td><td>21/25</td></tr>
<tr><td>5位</td><td>Webライティング</td><td>21/25</td></tr>
<tr><td>6位</td><td>Webデザイン</td><td>20/25</td></tr>
<tr><td>7位</td><td>プログラミング</td><td>20/25</td></tr>
<tr><td>8位</td><td>広告運用</td><td>20/25</td></tr></table>
<p>💡 1位のLステップ/LINE構築は「競合が少ない × 単価が高い × 需要が伸びている」の三拍子が揃っている。</p>

<h2>判定</h2>
<table><tr><th>合計点</th><th>判定</th></tr>
<tr><td>20〜25点</td><td>🟢 最優先で取り組むべきスキル</td></tr>
<tr><td>15〜19点</td><td>🟡 可能性あり。弱い基準を補強</td></tr>
<tr><td>10〜14点</td><td>🟠 リスクあり。別スキルも検討</td></tr>
<tr><td>〜9点</td><td>🔴 このスキルは避けた方がいい</td></tr></table>`
    },
    {
        title: "売上の壁を突破する「仕組み化」チェックシート",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>月商300万を超えたあたりで、ほぼ全員が同じ壁にぶつかる。「自分が動かないと売上が止まる」——これを"仕組み"で解決する。</blockquote>

<h2>仕組み化の全体像</h2>
<pre><code>④ 経営・戦略      ← あなたがやるべきこと（これだけ）
③ マーケティング    ← 仕組み化 or 外注
② セールス         ← 仕組み化 or 外注
① 価値提供         ← 仕組み化 or 外注</code></pre>

<h2>5セクション診断</h2>
<table><tr><th>セクション</th><th>チェック例</th></tr>
<tr><td>①集客</td><td>広告/SEOで自動リスト獲得、LP有無、CPA把握</td></tr>
<tr><td>②教育</td><td>ステップ配信、動画教育、スコアリング</td></tr>
<tr><td>③セールス</td><td>カレンダー自動化、台本マニュアル、代行可能</td></tr>
<tr><td>④価値提供</td><td>マニュアル化、スタッフ代行可、会員サイト</td></tr>
<tr><td>⑤組織</td><td>業務フロー文書化、人材育成プロセス、1週間不在でもOK</td></tr></table>

<h3>判定</h3>
<table><tr><th>合計</th><th>レベル</th></tr>
<tr><td>20〜25</td><td>🟢 仕組み化上級者</td></tr>
<tr><td>15〜19</td><td>🟡 もう少しで時間が空く</td></tr>
<tr><td>10〜14</td><td>🟠 属人的経営</td></tr>
<tr><td>〜9</td><td>🔴 要注意・自転車操業</td></tr></table>

<h2>仕組み化の優先順位</h2>
<ol>
<li><strong>セールス</strong>の仕組み化（成約率が上がれば全体UP）</li>
<li><strong>教育</strong>の仕組み化（セールスの負荷が減る）</li>
<li><strong>集客</strong>の仕組み化（安定したリスト獲得）</li>
<li><strong>価値提供</strong>の仕組み化（あなたの時間が空く）</li>
<li><strong>組織</strong>の仕組み化（スケールの準備）</li>
</ol>
<p>💡 多くの経営者は「集客が足りない」と思っているが、実際は「セールスと教育の仕組みがないから取りこぼしている」が8割。</p>`
    },
    {
        title: "年商1億経営者が実践するKPI設計テンプレート",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「数字を見ていない経営者は、地図なしで航海しているのと同じだ。」KPIを正しく設計するだけで、何をすべきかが一瞬で分かるようになる。</blockquote>

<h2>売上の因数分解</h2>
<pre><code>売上 ＝ リスト数 × 成約率 × 客単価 × リピート率</code></pre>
<p>この4つの因数のうち、<strong>どこがボトルネックかを特定して、そこに集中する。</strong></p>

<h2>ボトルネック特定マトリクス</h2>
<table><tr><th>指標</th><th>業界平均</th><th>優秀ライン</th></tr>
<tr><td>リスト獲得CPA</td><td>3,000〜5,000円</td><td>〜2,000円</td></tr>
<tr><td>リスト→商談 転換率</td><td>3〜5%</td><td>10%以上</td></tr>
<tr><td>商談着座率</td><td>60〜70%</td><td>80%以上</td></tr>
<tr><td>成約率</td><td>20〜30%</td><td>40%以上</td></tr>
<tr><td>LTV</td><td>初回購入の2倍</td><td>初回の3倍以上</td></tr></table>

<h2>年商1億円の逆算設計（具体例）</h2>
<pre><code>年商1億円 ＝ 月商833万円
＝ 月間成約17件 × 客単価50万円
＝ 月間商談56件 × 成約率30%
＝ 月間リスト560人 × 商談転換率10%

→ CPA3,000円なら月間広告費168万円（年間約2,000万円）
→ ROAS 5.0（広告費の5倍の売上）</code></pre>

<p>💡 「がむしゃらに頑張る」フェーズは終わり。<strong>数字を見て、正しい場所に力を集中する</strong>のが次のフェーズ。</p>`
    },
    {
        title: "Brainアフィリエイトで月10万円稼ぐ戦略ガイド",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「良いコンテンツを見つけて、正しく紹介する。」これだけで月10万円は、実はそんなに難しくない。</blockquote>

<h2>Brainアフィリエイトの優位性</h2>
<table><tr><th></th><th>従来のアフィリエイト</th><th>Brainアフィリエイト</th></tr>
<tr><td>報酬率</td><td>1〜10%</td><td><strong>最大50%</strong></td></tr>
<tr><td>承認まで</td><td>30〜60日</td><td><strong>即時確定</strong></td></tr>
<tr><td>商品の質</td><td>当たりハズレが大きい</td><td>レビューで可視化</td></tr></table>

<h2>月10万円の方程式</h2>
<p><strong>例）9,800円 × 50% × 月21件 ＝ 102,900円</strong><br>
高単価商品（2万円以上）なら月7件の紹介でOK。</p>

<h2>紹介文テンプレート3種</h2>
<p><strong>①体験レビュー型</strong>：実際の変化を数値で語る<br>
<strong>②比較型</strong>：複数教材を比較して1位を推す<br>
<strong>③問題解決型</strong>：悩みに共感→教材で解決</p>

<h2>チャネル別戦略</h2>
<table><tr><th>チャネル</th><th>初収益まで</th><th>月10万円達成の難易度</th></tr>
<tr><td>X</td><td>2週間〜1ヶ月</td><td>★★★☆</td></tr>
<tr><td>note</td><td>1〜2ヶ月</td><td>★★★☆</td></tr>
<tr><td>ブログ</td><td>3〜6ヶ月</td><td>★★☆☆（安定性◎）</td></tr>
<tr><td>YouTube</td><td>2〜3ヶ月</td><td>★★☆☆（説得力◎）</td></tr></table>

<h2>30日ロードマップ</h2>
<p>Day 1〜5：商品選定・購入 → Day 6〜14：X投稿開始 → Day 15〜21：noteレビュー記事 → Day 22〜30：分析・最適化で月10万円達成</p>`
    },
    {
        title: "SNSフォロワーを最速で伸ばすX運用テンプレート",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>フォロワー0から1万人まで、僕は3ヶ月だった。才能じゃない。「型」があるかどうかの問題だ。</blockquote>

<h2>投稿の「型」7選</h2>
<table><tr><th>型</th><th>伸びやすさ</th><th>使い方</th></tr>
<tr><td>①ノウハウ共有型</td><td>★★★★★</td><td>学びを箇条書きで共有</td></tr>
<tr><td>②ビフォーアフター型</td><td>★★★★★</td><td>変化を数字で見せる</td></tr>
<tr><td>③常識破壊型</td><td>★★★★☆</td><td>「〇〇は嘘」で注目を集める</td></tr>
<tr><td>④失敗談共有型</td><td>★★★★☆</td><td>正直な失敗で共感を得る</td></tr>
<tr><td>⑤数字インパクト型</td><td>★★★★☆</td><td>実績を数字で見せる</td></tr>
<tr><td>⑥まとめ・リスト型</td><td>★★★☆☆</td><td>おすすめ10選系</td></tr>
<tr><td>⑦スレッド型</td><td>★★★★★</td><td>長文を分割して深く語る</td></tr></table>

<h2>1週間スケジュール</h2>
<table><tr><th>曜日</th><th>テーマ</th><th>投稿数</th></tr>
<tr><td>月</td><td>週の目標 + ノウハウ</td><td>3〜4</td></tr>
<tr><td>火</td><td>失敗談 + 学び</td><td>3〜4</td></tr>
<tr><td>水</td><td>スレッド（渾身の1本）</td><td>1+2</td></tr>
<tr><td>木</td><td>ビフォーアフター</td><td>3〜4</td></tr>
<tr><td>金</td><td>常識破壊 + まとめ</td><td>3〜4</td></tr>
<tr><td>土日</td><td>振り返り + 予告</td><td>各2〜3</td></tr></table>

<h2>フォロワー伸長の5つの加速器</h2>
<ol>
<li><strong>毎日30人にリプライ</strong>する</li>
<li><strong>月1回の企画</strong>を実施する</li>
<li><strong>伸びたツイートを分析</strong>して型を特定</li>
<li><strong>他プラットフォーム連携</strong>（note・LINE・YouTube）</li>
<li><strong>コラボ企画</strong>で相互フォロワー獲得</li>
</ol>

<h2>マイルストーン</h2>
<table><tr><th>フォロワー数</th><th>目安期間</th></tr>
<tr><td>0〜500</td><td>1ヶ月</td></tr>
<tr><td>500〜1,000</td><td>2ヶ月</td></tr>
<tr><td>1,000〜3,000</td><td>3ヶ月</td></tr>
<tr><td>3,000〜5,000</td><td>4〜5ヶ月</td></tr>
<tr><td>5,000〜10,000</td><td>6ヶ月</td></tr></table>`
    },
    {
        title: "迫佑樹直伝 ビジネスモデル構築の全体像",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「スキルがあっても稼げない人」と「普通のスキルで年商1億の人」。違いは1つ——ビジネスモデルを持っているかどうか。</blockquote>

<h2>ビジネスの4ステージ</h2>
<table><tr><th>ステージ</th><th>年商</th><th>目標</th></tr>
<tr><td>Stage 1：0→1</td><td>0〜500万</td><td>最初の「売れる体験」を作る</td></tr>
<tr><td>Stage 2：安定</td><td>500万〜3000万</td><td>毎月お客さんが来る仕組み</td></tr>
<tr><td>Stage 3：仕組み化</td><td>3000万〜3億</td><td>自分がいなくても回る</td></tr>
<tr><td>Stage 4：レバレッジ</td><td>3億〜</td><td>成功モデルを横展開</td></tr></table>

<h2>ビジネスモデル設計の7原則</h2>
<ol>
<li><strong>フロントエンドとバックエンドを分ける</strong></li>
<li><strong>LTV（顧客生涯価値）で考える</strong></li>
<li><strong>商品原価は売値の20%以内</strong>に抑える</li>
<li><strong>「時間」を売らないモデル</strong>を作る</li>
<li><strong>継続収入（リカーリング）</strong>を組み込む</li>
<li><strong>他人の力を借りる設計</strong>にする</li>
<li><strong>データで判断</strong>する</li>
</ol>

<h3>原則3の具体例（VERYの法則）</h3>
<pre><code>20% 商品原価
20% 集客コスト
20% セールスコスト
20% 運営コスト
20% 利益</code></pre>

<h2>9マスビジネスモデルキャンバス</h2>
<table><tr><th>項目</th><th>あなたの回答</th></tr>
<tr><td>① 顧客は誰か？</td><td></td></tr>
<tr><td>② 顧客の最大の悩みは？</td><td></td></tr>
<tr><td>③ 提供する解決策は？</td><td></td></tr>
<tr><td>④ フロント商品は？</td><td></td></tr>
<tr><td>⑤ バックエンド商品は？</td><td></td></tr>
<tr><td>⑥ 集客チャネルは？</td><td></td></tr>
<tr><td>⑦ セールスの方法は？</td><td></td></tr>
<tr><td>⑧ 継続収入の仕組みは？</td><td></td></tr>
<tr><td>⑨ 1年後の目標売上は？</td><td></td></tr></table>`
    },
    {
        title: "Brain成功者インタビュー集",
        byline: "by 迫 佑樹（Brain代表）",
        content: `
<blockquote>「成功者の話を聞く」。これが最もコスパの良い投資だと僕は思っている。</blockquote>

<h2>Case 1：コンテンツホルダーの成功例</h2>
<p><strong>Aさん（30代・男性）</strong>｜元 大手企業マーケ部門<br>
Brain歴1年6ヶ月 → <strong>月収250万円</strong>（Brain売上150万＋コンサル100万）</p>
<p>企業で「当たり前」だった知識をBrainに出品 → 初日50部。10ヶ月でBrain教材＋月額コミュニティ80名の安定収入モデルを構築。</p>
<blockquote>「"当たり前"を疑え。あなたの知識は誰かにとって喉から手が出るほど欲しい情報。」</blockquote>

<h2>Case 2：0→1 初心者の成功例</h2>
<p><strong>Bさん（20代・女性）</strong>｜元 アパレル販売員<br>
Brain歴10ヶ月 → <strong>月収60万円</strong>（Web制作40万＋Brain教材20万）</p>
<p>手取り18万円から未経験でWeb制作を学習。2ヶ月で初案件、6ヶ月で退職、10ヶ月で学習過程をBrain教材化。</p>
<blockquote>「"月5万円"という小さいゴールを置いたから動けた。」</blockquote>

<h2>Case 3：経営者のスケール例</h2>
<p><strong>Cさん（40代・男性）</strong>｜個人コンサルタント<br>
Brain歴8ヶ月 → <strong>年商3000万→1.2億</strong></p>
<p>1日12時間労働の自転車操業から、KPI設計＋セールス代行＋ステップ配信自動化で仕組みを構築。8ヶ月で年商4倍。</p>
<blockquote>「仕組み化は自分の仕事を奪われることじゃなく、自分の時間を取り戻すこと。」</blockquote>

<h2>Case 4：アフィリエイターの成功例</h2>
<p><strong>Dさん（20代・男性）</strong>｜元 飲食店アルバイト<br>
Brain歴6ヶ月 → <strong>月収35万円</strong>（アフィリエイト報酬）</p>
<p>フォロワー200人 → X運用本格化 → 6ヶ月でフォロワー5,000人＋月35万円のアフィリエイト収入。</p>
<blockquote>「"本当に良いと思ったものしか紹介しない"。信頼があるから売れる。」</blockquote>

<h2>4人に共通する成功法則</h2>
<ol>
<li><strong>小さく始めた</strong></li>
<li><strong>1つに集中した</strong></li>
<li><strong>行動が早かった</strong></li>
<li><strong>環境を変えた</strong></li>
<li><strong>データを見た</strong></li>
</ol>`
    }
];

// ─── Tab Filtering ───
const tabs = document.querySelectorAll('.type-tab');
const cards = document.querySelectorAll('.present-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const type = tab.dataset.type;

        cards.forEach(card => {
            if (type === 'all') {
                card.classList.remove('hidden');
            } else {
                const cardType = card.dataset.type;
                if (cardType === type || cardType === 'ALL') {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ─── Modal ───
const overlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openModal(index) {
    const p = presents[index];
    modalContent.innerHTML = `
    <h1>${p.title}</h1>
    <p class="modal-byline">${p.byline}</p>
    <hr>
    ${p.content}
    <hr>
    <p style="text-align:center;margin-top:32px;">
      <a href="#cta" class="cta-btn" onclick="closeModal()" style="font-size:15px;padding:16px 40px;">
        📩 面談を予約してこの特典を受け取る
      </a>
    </p>
    <p style="text-align:center;font-size:12px;color:#666;margin-top:12px;">© Brain Inc. All Rights Reserved.</p>
  `;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ─── Scroll Animation ───
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.present-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ─── Floating Particles ───
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
    position: absolute;
    width: ${Math.random() * 4 + 1}px;
    height: ${Math.random() * 4 + 1}px;
    background: rgba(108,92,231,${Math.random() * 0.3 + 0.1});
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: float ${Math.random() * 8 + 4}s ease-in-out infinite;
    animation-delay: ${Math.random() * 4}s;
  `;
    particlesContainer.appendChild(particle);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    25% { transform: translate(${Math.random() * 40 - 20}px, -${Math.random() * 40 + 20}px) scale(1.2); opacity: 1; }
    50% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 60 + 10}px) scale(0.8); opacity: 0.3; }
    75% { transform: translate(${Math.random() * 30 - 15}px, -${Math.random() * 30 + 10}px) scale(1.1); opacity: 0.7; }
  }
`;
document.head.appendChild(style);
