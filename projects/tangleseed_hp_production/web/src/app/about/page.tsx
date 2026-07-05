'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function About() {
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

        document.querySelectorAll('.section-title--zen, .team-member, .company-info__table').forEach((el) => {
            animateOnScroll.observe(el);
        });

        return () => animateOnScroll.disconnect();
    }, []);

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <h1 className="page-hero__title font-serif">私たちについて</h1>
                    <p className="page-hero__subtitle">
                        アートの力で、人々に心の居場所を届けます。
                    </p>
                </div>
            </section>

            {/* Vision Section */}
            <section className="about-vision bg-[var(--bg-primary)]">
                <div className="container">
                    <p className="about-vision__quote animate-fade-in">
                        「ゼンタングルを、ヨガのように当たり前の存在に。」
                    </p>
                    <div className="about-vision__text space-y-6">
                        <p>
                            私たちは、ゼンタングルというアートを通じて、誰もが心を整えられる社会を目指しています。
                            「趣味でゼンタングルをやっている」と言えば、誰もが理解できる世界。
                            それは、ヨガやピラティス、数独のように、社会に広く認知された存在になることを意味します。
                        </p>
                        <p>
                            8年間のNPO活動で培った経験と、累計4万人の体験者。
                            この実績を礎に、企業や地域と連携しながら、日本中に「心の居場所」を広げていきます。
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team section">
                <div className="container">
                    <h2 className="section-title section-title--zen block mx-auto w-fit mb-16">チーム</h2>
                    <div className="team__grid">
                        <article className="team-member">
                            <div className="team-member__image photo-frame">
                                <Image
                                    src="/images/instructor_portrait_alt.jpg"
                                    alt="古橋 美鳥"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="team-member__info">
                                <span className="team-member__role">コンテンツホルダー / CZT（認定講師）</span>
                                <h3 className="team-member__name font-serif">古橋 美鳥</h3>
                                <div className="team-member__bio space-y-4">
                                    <p>
                                        ゼンタングルの魅力に出会い、その哲学に惹かれて認定講師（CZT）の資格を取得。
                                        8年間にわたり、NPO団体「カイツブリの会」でがん患者の方々への心のケアとして、
                                        ゼンタングルを提供し続けてきました。
                                    </p>
                                    <p>
                                        「失敗がない」というゼンタングルの哲学は、人生そのもの。
                                        この素晴らしいアートを、より多くの人に届けたいと願っています。
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="team-member">
                            <div className="team-member__image photo-frame">
                                <Image
                                    src="/images/placeholder-portrait.jpg"
                                    alt="古橋 寛"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="team-member__info">
                                <span className="team-member__role">代表 / プロデューサー</span>
                                <h3 className="team-member__name font-serif">古橋 寛</h3>
                                <div className="team-member__bio space-y-4">
                                    <p>
                                        戦略立案と事業開発を担当。AIやデジタル技術を活用しながら、
                                        アナログなゼンタングルの価値を最大化し、社会に届けることをミッションとしています。
                                    </p>
                                    <p>
                                        「理念を持った会社が、しっかりと経済的にも成功する」
                                        ——そんな新しい時代のモデルケースを、タングルシードで実現します。
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Company Info Section */}
            <section id="company" className="company-info section bg-[var(--bg-primary)]">
                <div className="container">
                    <h2 className="section-title section-title--zen block mx-auto w-fit mb-16">会社概要</h2>
                    <div className="company-info__table glass p-8 rounded-lg shadow-sm animate-fade-in">
                        <table>
                            <tbody>
                                <tr>
                                    <th>会社名</th>
                                    <td>株式会社タングルシード</td>
                                </tr>
                                <tr>
                                    <th>法人番号</th>
                                    <td>6160001024010</td>
                                </tr>
                                <tr>
                                    <th>設立</th>
                                    <td>2022年2月22日</td>
                                </tr>
                                <tr>
                                    <th>代表者</th>
                                    <td>古橋 寛</td>
                                </tr>
                                <tr>
                                    <th>代表講師</th>
                                    <td>古橋 美鳥 CZT（ゼンタングル認定講師）</td>
                                </tr>
                                <tr>
                                    <th>資本金</th>
                                    <td>200万円</td>
                                </tr>
                                <tr>
                                    <th>所在地</th>
                                    <td>〒520-3231 滋賀県湖南市サイドタウン1丁目1－19</td>
                                </tr>
                                <tr>
                                    <th>事業内容</th>
                                    <td>
                                        ゼンタングル関連事業<br />
                                        認定講師養成<br />
                                        企業研修・福利厚生プログラム提供<br />
                                        書店・店舗との提携事業
                                    </td>
                                </tr>
                                <tr>
                                    <th>メール</th>
                                    <td><a href="mailto:hiroshi@tangle-seed.co.jp" className="text-[var(--accent-gold)] hover:underline">hiroshi@tangle-seed.co.jp</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-white">
                <div className="container text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 leading-tight">
                        ともに、心の居場所を<br />つくりませんか。
                    </h2>
                    <p className="text-gray-500 mb-10">
                        企業・店舗との提携、メディア取材、講演依頼など、お気軽にお問い合わせください。
                    </p>
                    <Link href="/alliance" className="btn btn-gold px-10 py-4 text-lg">
                        法人・提携のご相談
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
