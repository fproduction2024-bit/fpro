'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GiftPage() {
    const [showFloating, setShowFloating] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('.lp-footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top < window.innerHeight) {
                    setShowFloating(false);
                } else {
                    setShowFloating(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-white">
                <header className="lp-header">
                    <div className="lp-container">
                        <Link href="/" className="text-2xl font-serif font-bold text-[var(--accent-teal)]">
                            Tangleseed
                        </Link>
                    </div>
                </header>

                <main>
                    <div className="lp-container">
                        {/* Hero Section */}
                        <section className="lp-hero">
                            <span className="section-label">LINE友だち登録で今すぐ受け取れる</span>
                            <h1 className="lp-hero__title font-serif">
                                はじめての人でも、<br />
                                スッと描けちゃう動画講座。
                            </h1>
                            <p className="lp-hero__subtitle">
                                15分の静寂が、あなたの毎日を心地よく整えます。
                            </p>
                            <div className="lp-hero__image overflow-hidden">
                                <Image
                                    src="/images/gift-hero-real.png"
                                    alt="ゼンタングル講座イメージ"
                                    width={1080}
                                    height={1080}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>

                            <a href="https://hxzk7sue.autosns.app/addfriend/s/KaGnyj5v0d/@255jknci"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-gold w-full text-lg py-5 shadow-xl">
                                LINEで無料動画講座を受け取る
                            </a>
                        </section>

                        {/* Benefits Section */}
                        <section className="benefits py-16">
                            <h2 className="section-title section-title--center block mx-auto w-fit">この講座で受け取れるもの</h2>

                            <div className="benefit-card">
                                <div className="benefit-card__image">
                                    <Image src="/images/gift-gallery-1.jpg" alt="基礎講座" width={480} height={480} />
                                </div>
                                <div className="benefit-card__content">
                                    <h3 className="benefit-card__title font-serif">はじめてのゼンタングル基礎講座</h3>
                                    <p className="text-gray-600">案内に沿ってペンを動かしていくと、誰でも驚くほどキレイな絵が描けちゃいます。</p>
                                </div>
                            </div>

                            <div className="benefit-card">
                                <div className="benefit-card__image">
                                    <Image src="/images/gift-gallery-2.jpg" alt="集中講座" width={480} height={480} />
                                </div>
                                <div className="benefit-card__content">
                                    <h3 className="benefit-card__title font-serif">より深く集中できるタングル講座</h3>
                                    <p className="text-gray-600">より深く集中できるタングルを選んでお伝えします。ゼンタングルのセラピー効果を実感できます。</p>
                                </div>
                            </div>

                            <div className="benefit-card">
                                <div className="benefit-card__image">
                                    <Image src="/images/gift-gallery-3.jpg" alt="応用講座" width={480} height={480} />
                                </div>
                                <div className="benefit-card__content">
                                    <h3 className="benefit-card__title font-serif">メッセージカード応用講座</h3>
                                    <p className="text-gray-600">絵の応用でカードの縁飾りを描けるようになります。大切な人へのギフトに添えてもオシャレですよ。</p>
                                </div>
                            </div>

                            <div className="benefit-card">
                                <div className="benefit-card__image">
                                    <Image src="/images/gift-gallery-4.jpg" alt="セラピー効果" width={480} height={480} />
                                </div>
                                <div className="benefit-card__content">
                                    <h3 className="benefit-card__title font-serif">描くと気持ちがスッキリするセラピー効果</h3>
                                    <p className="text-gray-600">ゼンタングルを日常に取り入れたら、気持ちの軽い毎日を送れるようになりますよ。</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Author Section - Full Bleed */}
                    <section className="author-section-lp">
                        <div className="lp-container">
                            <div className="author-box-lp">
                                <div className="author-image-lp-wrapper">
                                    <Image
                                        src="/images/instructor_portrait_alt.jpg"
                                        alt="古橋美鳥"
                                        width={200}
                                        height={200}
                                        className="author-image-lp"
                                    />
                                </div>
                                <div className="author-info-lp text-left">
                                    <h2 className="section-title mb-6">私がゼンタングルを伝える理由</h2>
                                    <div className="author-message text-gray-700 space-y-4">
                                        <p><strong>講師：古橋 美鳥 (Midori Furuhashi)</strong><br />ゼンタングル®認定講師 (CZT)</p>
                                        <p>
                                            私がゼンタングルを始めたきっかけは、ガンの治療で入院していたことです。肺腺ガンステージ3B、5年生存率20％の告知を受け、「死ぬかもしれない」と初めて思いました。
                                        </p>
                                        <p>
                                            闘病中、不安な情報に流されそうになる中、絵を描く時間だけは心が楽になり、自分を保つことができました。誰にも、病気にも奪われない豊かさがそこにはあったのです。
                                        </p>
                                        <p>
                                            自分の中に「安心できる世界」があることは、生きる自信になります。つらい状況にある方、日々に追われている方、すべての方にこのアートの力を手にしてほしいと願っています。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="lp-container">
                        {/* Closing Section */}
                        <section className="community py-16 pb-32">
                            <h2 className="section-title section-title--center block mx-auto w-fit mb-8">居心地の良いコミュニティ</h2>
                            <p className="text-center text-gray-600 mb-12 leading-relaxed">
                                ゼンタングルのコミュニティは驚くほど優しく、お互いを認め合う場所です。<br />
                                「間違い」も「失敗」もありません。あなたの作品を世界中の仲間がほめてくれます。
                            </p>

                            <div className="lp-cta-divider">
                                <h3 className="text-2xl font-serif text-[var(--accent-teal)] mb-8">
                                    あなたも、ゼンタングルの世界を体験してみませんか？
                                </h3>
                                <a href="https://hxzk7sue.autosns.app/addfriend/s/KaGnyj5v0d/@255jknci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-gold px-12 py-5 text-xl shadow-lg">
                                    LINE友だち登録をして講座を受け取る
                                </a>
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="lp-footer py-12 text-center text-gray-400 border-t border-gray-100">
                    <div className="lp-container">
                        <p>&copy; 2026 Tangleseed Inc. All rights reserved.</p>
                    </div>
                </footer>
            </div>

            {/* Floating CTA for Mobile - Outside min-h-screen to ensure viewport-relative fixed positioning */}
            {showFloating && (
                <div className="floating-cta-lp md:hidden">
                    <a href="https://hxzk7sue.autosns.app/addfriend/s/KaGnyj5v0d/@255jknci"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold w-full py-4 text-lg font-bold shadow-2xl">
                        無料で動画講座を受け取る
                    </a>
                </div>
            )}
        </>
    );
}
