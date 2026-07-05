import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ゼンタングルとは？ | タングルシード',
    description: 'ゼンタングルの歴史、メソッドの基礎、そして誰でも楽しめる理由について学びましょう。',
};

export default function AboutZentanglePage() {
    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Hero */}
            <section className="section bg-white border-b border-gray-100">
                <div className="container max-w-4xl text-center">
                    <span className="badge badge-outline mb-6">What is Zentangle?</span>
                    <h1 className="text-4xl md:text-5xl mb-6">
                        ゼンタングルとは？
                    </h1>
                    <p className="text-lg text-gray-600">
                        誰でも楽しめる、美しいアートの創造メソッド
                    </p>
                </div>
            </section>

            {/* Origins */}
            <section className="section">
                <div className="container max-w-4xl">
                    <h2 className="section-title">ゼンタングルの誕生</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            ゼンタングル® は、2004年にアメリカでRick Roberts（リック・ロバーツ）とMaria Thomas（マリア・トーマス）によって生み出されました。
                        </p>
                        <p>
                            マリアがイラストを描いている時に感じた集中と没頭の感覚を、リックが瞑想の経験から「これは誰もが体験できるべきだ」と考えたことがきっかけです。
                        </p>
                        <div className="bg-accent-gold/5 border-l-4 border-accent-gold rounded-r-lg p-6">
                            <p className="font-medium">
                                「Zentangle」という名前は、「Zen（禅）」と「Tangle（絡まる）」を組み合わせた造語です。禅の心の静けさと、線が絡み合って生まれる美しいパターンを表現しています。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Method */}
            <section className="section bg-gray-50">
                <div className="container max-w-5xl">
                    <h2 className="section-title">ゼンタングルメソッドの基本</h2>
                    <p className="section-subtitle">8つの基本ステップで、誰でも美しいアートが創れます</p>

                    <div className="content-grid">
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">1️⃣</div>
                                <h3 className="card-title">感謝と鑑賞</h3>
                                <p className="card-description">
                                    これから使う道具や、創作の時間に感謝することから始めます。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">2️⃣</div>
                                <h3 className="card-title">コーナードット</h3>
                                <p className="card-description">
                                    タイル（正方形の紙）の四隅に軽く点を打ちます。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">3️⃣</div>
                                <h3 className="card-title">ボーダー</h3>
                                <p className="card-description">
                                    点と点を結んで、自由な枠線を描きます。完璧でなくてOK。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">4️⃣</div>
                                <h3 className="card-title">ストリング</h3>
                                <p className="card-description">
                                    枠の中に、鉛筆で軽く線を引いてエリアを分けます。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">5️⃣</div>
                                <h3 className="card-title">タングル</h3>
                                <p className="card-description">
                                    各エリアにパターン（タングル）を描いていきます。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">6️⃣</div>
                                <h3 className="card-title">シェーディング</h3>
                                <p className="card-description">
                                    影をつけることで、立体感と深みを与えます。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">7️⃣</div>
                                <h3 className="card-title">イニシャルとサイン</h3>
                                <p className="card-description">
                                    裏にイニシャルと日付を書き、自分の作品として認めます。
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">8️⃣</div>
                                <h3 className="card-title">鑑賞</h3>
                                <p className="card-description">
                                    完成した作品を様々な角度から眺め、発見を楽しみます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="section">
                <div className="container max-w-4xl">
                    <h2 className="section-title">ゼンタングルの哲学</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-100 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-accent-gold">🎯 No Mistakes</h3>
                            <p className="text-gray-700">
                                ゼンタングルに「間違い」はありません。予期せぬ線も新しい可能性として歓迎されます。
                            </p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-accent-gold">🧘 Mindfulness</h3>
                            <p className="text-gray-700">
                                一筆一筆に集中することで、今この瞬間に意識を向けるマインドフルネスを体験できます。
                            </p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-accent-gold">✨ Unexpected Result</h3>
                            <p className="text-gray-700">
                                結果を予測せず、一筆ずつ進めることで、予想外の美しさが生まれます。
                            </p>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-accent-gold">🤝 No Comparison</h3>
                            <p className="text-gray-700">
                                他者との比較はせず、それぞれの表現を尊重し合います。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section bg-gradient-to-br from-accent-gold/5 to-accent-teal/5">
                <div className="container max-w-4xl">
                    <h2 className="section-title">ゼンタングルの効果</h2>
                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🧠</span>
                                <div>
                                    <strong>集中力の向上</strong> - 一筆一筆に集中することで、深い没頭状態（フロー）を体験
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">😌</span>
                                <div>
                                    <strong>ストレス軽減</strong> - 繰り返しのパターンを描くことで、リラックス効果が得られます
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">💪</span>
                                <div>
                                    <strong>自己肯定感の向上</strong> - 「間違い」がないため、誰でも達成感を味わえます
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🎨</span>
                                <div>
                                    <strong>創造性の発揮</strong> - シンプルなルールの中で、無限の表現が可能です
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🤲</span>
                                <div>
                                    <strong>手と脳の協調</strong> - 細かい作業により、手先の器用さと脳の活性化が促されます
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-white">
                <div className="container max-w-3xl text-center">
                    <h2 className="section-title">ゼンタングルを始めませんか？</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        無料の7日間体験クラスで、ゼンタングルメソッドを学びましょう。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://hxzk7sue.autosns.app/addfriend/s/KaGnyj5v0d/@255jknci"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-gold text-lg"
                        >
                            無料7日間クラスを始める
                        </a>
                        <a href="/library" className="btn btn-outline text-lg">
                            タングル図鑑を見る
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
