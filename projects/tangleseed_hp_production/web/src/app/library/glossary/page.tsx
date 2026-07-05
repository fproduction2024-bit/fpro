import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ゼンタングル用語集 | タングルシード',
    description: 'ゼンタングルで使われる基本用語を分かりやすく解説します。',
};

export default function GlossaryPage() {
    const terms = [
        {
            term: 'Zentangle（ゼンタングル）',
            definition: 'Rick RobertsとMaria Thomasによって考案された、構造化されたパターン描画のメソッド。Zen（禅）とTangle（絡まる）を組み合わせた造語。',
        },
        {
            term: 'Tile（タイル）',
            definition: '正方形の専用紙（通常8.9cm×8.9cm）。ゼンタングルを描くためのキャンバス。',
        },
        {
            term: 'Tangle（タングル）',
            definition: 'ゼンタングルのパターンの1つ1つの単位。繰り返し描ける構造化されたパターン。',
        },
        {
            term: 'String（ストリング）',
            definition: 'タイルを複数のエリアに分ける、鉛筆で軽く引いた線。ガイドラインとして機能。',
        },
        {
            term: 'CZT（Certified Zentangle Teacher）',
            definition: 'ゼンタングル公認講師。本部が開催するセミナーを修了した認定講師。',
        },
        {
            term: 'Shading（シェーディング）',
            definition: '鉛筆やブラシペンで影をつけること。作品に立体感と深みを与えます。',
        },
        {
            term: 'Fragments（フラグメント）',
            definition: 'タングルの一部だけを描く技法。サイズや形を変えて使うことができます。',
        },
        {
            term: 'Monotangle（モノタングル）',
            definition: '1つのタングルだけを使って描いた作品。そのタングルの特性を深く理解できます。',
        },
        {
            term: 'ZIA（Zentangle Inspired Art）',
            definition: 'ゼンタングルにインスパイアされたアート。ゼンタングルメソッドを応用した自由な作品。',
        },
        {
            term: 'Bijou（ビジュー）',
            definition: '小さな正方形のタイル（通常6.4cm×6.4cm）。短時間で完成できる「宝石」のような作品。',
        },
        {
            term: 'Zendala（ゼンダラ）',
            definition: '円形の専用紙。マンダラ風のゼンタングル作品を描くために使用。',
        },
        {
            term: 'Aura（オーラ）',
            definition: '形の周りに平行線を描く技法。光や輝きを表現します。',
        },
        {
            term: 'Renaissance Tile（ルネサンスタイル）',
            definition: '茶色がかった専用タイル。白いペンで描くことで独特の雰囲気が出ます。',
        },
        {
            term: 'Tan・gle（タン・グル）',
            definition: '公式タングルのパターン名の表記方法。音節の区切りを示します。',
        },
        {
            term: 'No Mistakes（ノーミステイクス）',
            definition: 'ゼンタングルの哲学の核心。すべての線は新しい可能性として歓迎されます。',
        },
    ];

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Hero */}
            <section className="section bg-white border-b border-gray-100">
                <div className="container max-w-4xl text-center">
                    <span className="badge badge-outline mb-6">Terminology</span>
                    <h1 className="text-4xl md:text-5xl mb-6">
                        ゼンタングル用語集
                    </h1>
                    <p className="text-lg text-gray-600">
                        よく使われる用語を理解して、ゼンタングルをもっと楽しもう
                    </p>
                </div>
            </section>

            {/* Terms */}
            <section className="section">
                <div className="container max-w-4xl">
                    <div className="space-y-6">
                        {terms.map((item, index) => (
                            <div key={index} className="card">
                                <div className="card-content">
                                    <h3 className="text-xl font-bold mb-3 text-accent-gold">
                                        {item.term}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.definition}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-gradient-to-br from-accent-gold/10 to-accent-teal/10">
                <div className="container max-w-3xl text-center">
                    <h2 className="section-title">もっと学びたい方へ</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        無料の7日間体験クラスで、実際にタングルを描きながら学びましょう。
                    </p>
                    <a
                        href="https://hxzk7sue.autosns.app/addfriend/s/KaGnyj5v0d/@255jknci"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold text-lg inline-block"
                    >
                        無料7日間クラスを始める
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
