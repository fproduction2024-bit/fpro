'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function StoriesPage() {
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

        document.querySelectorAll('.animate--fade-up, .section-title--zen, .story-card').forEach((el) => {
            animateOnScroll.observe(el);
        });

        return () => animateOnScroll.disconnect();
    }, []);

    const testimonials = [
        { text: '「仕事のストレスで眠れない日が続いていましたが、寝る前にゼンタングルを描くようになってから、ぐっすり眠れるようになりました。」', author: '40代 会社員', location: '東京都' },
        { text: '「絵心がないと思っていた私でも、美しい作品が描けてびっくり。今では友人へのプレゼントカードを作るのが趣味になりました。」', author: '60代 主婦', location: '滋賀県' },
        { text: '「書店でのワークショップに参加して、初めて"集中する喜び"を知りました。スマホを置いて、ペンだけを持つ時間の贅沢さ。」', author: '30代 自営業', location: '京都府' },
        { text: '「不登校だった娘が、ゼンタングルをきっかけに自信を取り戻しました。"失敗がない"という哲学が、彼女を救ってくれたと思います。」', author: '40代 保護者', location: '大阪府' },

    ];

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <h1 className="page-hero__title font-serif">お客様の声・成功事例</h1>
                    <p className="page-hero__subtitle">
                        ゼンタングルで人生が変わった方々のストーリー
                    </p>
                </div>
            </section>

            {/* Featured Story */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="photo-frame shadow-2xl animate--fade-up">
                            <Image
                                src="/images/lifestyle_real.jpg"
                                alt="成功事例"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <span className="text-accent-gold text-xs font-bold tracking-widest uppercase mb-4 block">Featured Story</span>
                            <h2 className="text-3xl font-serif mb-6 leading-tight">「描くことで、自分を取り戻せた」</h2>
                            <p className="text-xl italic text-gray-600 leading-relaxed font-serif">
                                「がんの治療中、何もする気力がなかった私に、美鳥先生がゼンタングルを教えてくれました。
                                １時間だけ、ペンを持って描く。それだけで、少しずつ心が軽くなっていくのを感じました。」
                            </p>
                            <p className="text-accent-gold font-medium">— 特定非営利活動法人ともいき京都 参加者様</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="section bg-[var(--bg-primary)] animate-bg-pattern">
                <div className="container">
                    <h2 className="section-title section-title--zen block mx-auto w-fit mb-16">みなさまの声</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((story, i) => (
                            <article key={i} className="story-card bg-white p-8 rounded-xl shadow-md border border-transparent hover:border-accent-gold transition-all animate--fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                                <p className="text-gray-700 italic mb-8 leading-relaxed">
                                    {story.text}
                                </p>
                                <div className="mt-auto">
                                    <span className="block font-bold text-sm text-gray-900">{story.author}</span>
                                    <span className="block text-xs text-gray-400">{story.location}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Artwork Showcase */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="photo-frame shadow-2xl animate--fade-up order-2 md:order-1">
                            <Image
                                src="/images/artwork_detail.jpg"
                                alt="ゼンタングル作品の詳細"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="space-y-6 order-1 md:order-2">
                            <h2 className="text-3xl font-serif mb-6 underline decoration-accent-gold decoration-4 underline-offset-8">作品のクオリティ</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    「絵心がない」と思っていた方でも、このような美しい作品を作ることができます。
                                    ゼンタングルは、シンプルなパターンの繰り返しから生まれる、
                                    驚くほど精巧なアート作品へと発展していきます。
                                </p>
                                <p>
                                    一つ一つのタイルに込められた集中と静寂の時間が、
                                    このような美しい結晶となって表れるのです。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Repeat (Visual consistency) */}
            <section className="section bg-white border-y border-gray-100">
                <div className="container">
                    <div className="grid grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="text-5xl font-bold text-accent-gold font-serif">40,000<small className="text-2xl">+</small></div>
                            <p className="text-sm text-gray-500 font-medium">累計体験者数</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-accent-gold font-serif">8<small className="text-2xl">年</small></div>
                            <p className="text-sm text-gray-500 font-medium">NPO活動継続</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-accent-gold font-serif">100<small className="text-2xl">%</small></div>
                            <p className="text-sm text-gray-500 font-medium">次回予約率</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-[var(--bg-primary)]">
                <div className="container text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 leading-tight">
                        あなたも、<br />ゼンタングルを体験してみませんか。
                    </h2>
                    <p className="text-gray-500 mb-10">
                        オンライン講座、書店ワークショップ、企業研修など、様々な形でお届けしています。
                    </p>
                    <Link href="/alliance" className="btn btn-gold px-12 py-5 text-xl">
                        体験する
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
