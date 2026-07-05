'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function RepresentativePage() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate--visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate--fade-up, .section-title--zen').forEach((el) => {
            animateOnScroll.observe(el);
        });

        return () => animateOnScroll.disconnect();
    }, []);

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Main Content Section: Photo and All Text Side-by-Side */}
            <section className="section bg-white section-editorial px-4 md:px-0">
                <div className="container max-w-6xl">
                    <div className="editorial-layout">

                        {/* Left Column: Photo (At the very top) */}
                        <div className="editorial-sidebar">
                            <div className="photo-frame shadow-elevated rounded-lg overflow-hidden animate--fade-up">
                                <Image
                                    src="/images/representative_real.jpg"
                                    alt="代表 古橋美鳥"
                                    width={800}
                                    height={1000}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                            <div className="mt-6 hidden md:block animate--fade-up">
                                <p className="text-[10px] text-gray-300 uppercase tracking-[0.5em] font-bold text-center">Midori Furuhashi</p>
                            </div>
                        </div>

                        {/* Right Column: All Text (Beside Photo) */}
                        <div className="editorial-main">

                            {/* 1. Name and Title Block */}
                            <div className="animate--fade-up" style={{ marginBottom: '60px' }}>
                                <div className="space-y-2 mb-6" style={{ marginBottom: '24px' }}>
                                    <p className="text-sm text-accent-gold font-bold tracking-wider" style={{ marginBottom: '4px' }}>株式会社タングルシード 代表</p>
                                    <p className="text-sm text-gray-500 font-medium">ゼンタングル®認定講師 (CZT)</p>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight tracking-tighter" style={{ fontSize: '3rem', marginBottom: '16px' }}>古橋 美鳥</h1>
                                <div className="w-16 h-1 bg-accent-gold" style={{ width: '64px', height: '4px' }}></div>
                            </div>

                            {/* 2. Emotional Message (The Story) */}
                            <div className="space-y-8 animate--fade-up" style={{ transitionDelay: '0.2s', marginBottom: '80px' }}>
                                <h2 className="text-2xl md:text-3xl font-serif leading-tight text-gray-900" style={{ fontSize: '1.875rem', marginBottom: '32px' }}>
                                    失敗がない。その一言が、<br />私の人生を変えました。
                                </h2>
                                <div className="narrative-text space-y-6 text-gray-600 leading-[2.2] text-lg font-medium tracking-wide">
                                    <p className="font-serif italic text-xl border-l-[3px] border-accent-gold pl-6 py-1 text-gray-800 bg-accent-gold/5" style={{ paddingLeft: '24px', borderLeft: '3px solid var(--accent-gold)' }}>
                                        ゼンタングルとの出会いは、私の人生において最も幸福な出来事の一つでした。
                                        「ゼンタングルには失敗がない」——その哲学に触れたとき、
                                        日々の喧騒の中で縮こまっていた心が、ふわりと軽くなったのを覚えています。
                                    </p>
                                    <div style={{ marginTop: '32px' }}>
                                        <p style={{ marginBottom: '24px' }}>
                                            私は8年前から、NPO団体「カイツブリの会」にて、がん患者の方々やそのご家族への
                                            心のケアとしてゼンタングルを提供してきました。
                                            病という大きな不安の中にいる方々が、1枚のカードを描き終えたときに見せる、
                                            穏やかで充足感に満ちた表情。その笑顔こそが、私の活動の原点です。
                                        </p>
                                        <p style={{ marginBottom: '24px' }}>
                                            自分の中に「安心できる世界」があることは、生きる自信になります。
                                            誰にも、そして病気にも奪われない心の豊かさが、そこにはありました。
                                            つらい状況にある方、日々に追われている方、すべての方にこのアートの力を手にしてほしいと願っています。
                                        </p>
                                        <p style={{ marginBottom: '24px' }}>
                                            現在、私たちは<strong>「ゼンタングルをヨガのように当たり前の存在にする」</strong>というビジョンを掲げています。
                                            心の健康を保つためのツールとして、誰もがペン一本で、
                                            いつでも、どこでも静寂を取り戻せる社会。
                                            そんな「心の居場所」を、日本中に広げていきたいと考えています。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Detailed Profile Items (Bio & Media) */}
                            <div className="animate--fade-up" style={{ transitionDelay: '0.4s', paddingTop: '48px', borderTop: '1px solid #f0f0f0' }}>
                                <div style={{ marginBottom: '56px' }}>
                                    <h3 className="flex items-center gap-4 text-xl font-bold font-serif mb-6" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <span className="w-10 h-[2px] bg-accent-gold" style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent-gold)' }}></span>
                                        略歴 / 実績
                                    </h3>
                                    <ul className="space-y-4 text-sm text-gray-600 leading-relaxed pl-4" style={{ listStyle: 'none', paddingLeft: '16px' }}>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>京都市立芸術大学日本画卒業</span></li>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>2018年 ゼンタングル®講師資格CZT 取得</span></li>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>NPO団体「カイツブリの会」にて8年間の指導実績</span></li>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>累計受講者数 40,000人以上</span></li>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>全国の書店・カフェでのワークショップ開催多数</span></li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="flex items-center gap-4 text-xl font-bold font-serif mb-6" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <span className="w-10 h-[2px] bg-accent-gold" style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent-gold)' }}></span>
                                        主なメディア・講演
                                    </h3>
                                    <ul className="space-y-4 text-sm text-gray-600 leading-relaxed pl-4" style={{ listStyle: 'none', paddingLeft: '16px' }}>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>地元主要新聞および雑誌にて活動紹介多数</span></li>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>マインドフルネス・アートをテーマにした講演登壇</span></li>
                                        <li className="flex gap-3" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}><span className="text-accent-gold mt-1">✦</span><span>オンライン教育プラットフォームでの講座展開</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="section bg-[#FBF9F6] py-20 md:py-32 px-4 md:px-0">
                <div className="container max-w-6xl">
                    <div className="editorial-layout editorial-layout-reversed items-center">
                        <div className="editorial-sidebar">
                            <div className="photo-frame rounded-none border-none shadow-xl overflow-hidden animate--fade-up">
                                <Image
                                    src="/images/exhibition_showcase.jpg"
                                    alt="作品展示の様子"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                                />
                            </div>
                        </div>
                        <div className="editorial-main animate--fade-up">
                            <div className="space-y-6 md:pr-12">
                                <p className="text-gray-400 italic text-sm md:text-base leading-relaxed border-l-4 border-accent-gold/20 pl-6 py-2">
                                    NPO活動での作品展示風景。<br />
                                    ペン一本から始まる「静寂」の時間が、誰かの力になれるよう、<br />
                                    私たちは一つひとつの対話を大切に活動を続けています。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-white cta-section">
                <div className="container text-center-custom max-w-2xl mx-auto-custom" style={{ margin: '0 auto' }}>
                    <div className="space-y-10 animate--fade-up">
                        <div className="bg-accent-gold mx-auto-custom" style={{ width: '64px', height: '1px', marginBottom: '40px' }}></div>
                        <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                            ともに、心の居場所を<br />つくりませんか。
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg" style={{ marginTop: '24px', marginBottom: '40px' }}>
                            代表・古橋へのメディア取材、講演依頼、<br />および法人提携に関するお問い合わせはお気軽にご連絡ください。
                        </p>
                        <div className="pt-6">
                            <Link href="/alliance" className="btn btn-gold px-14 py-5 text-xl shadow-elevated">
                                法人・提携のご相談
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
