'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { patterns } from '@/data/patterns/patterns';

export default function Home() {
  const [featuredPatterns, setFeaturedPatterns] = useState<any[]>([]);

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

    document.querySelectorAll('.animate--fade-up, .section-title--zen, .social-proof__item, .service-card, .timeline__item, .timeline__line, .timeline__dot, .pattern-card').forEach((el) => {
      animateOnScroll.observe(el);
    });

    // Pick the 3 foundational patterns: Crescent Moon, Hollibaugh, Cadent
    const selected = patterns.filter(p => ['1', '2', '3'].includes(p.id));
    setFeaturedPatterns(selected);

    return () => animateOnScroll.disconnect();
  }, []);

  const roots = [
    { year: '2016', title: 'NPO活動開始', desc: 'がん患者の方々への心のケアとして、ゼンタングルの提供を開始。「カイツブリの会」との協働がスタート。' },
    { year: '2020', title: 'オンライン講座開始', desc: 'コロナ禍を機に、全国どこからでも参加できるオンライン講座を開始。受講者数が急増。' },
    { year: '2024', title: '累計4万人突破', desc: '累計体験者数が40,000人を突破。企業・書店との提携フェーズへ。' },
    { year: '2026', title: '全国展開へ', desc: '書店提携モデルの確立。日本中に「心の居場所」を広げるプロジェクトを本格始動。' },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__background">
            <Image
              src="/images/hero-zentangle.png"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
            <div className="hero__overlay"></div>
          </div>

          <div className="hero__content">
            <h1 className="hero__title">
              15分の静寂が、<br />
              あなたの毎日を整える。
            </h1>
            <p className="hero__subtitle">
              累計40,000人が体験した、マインドフルネス・アート。
            </p>
            <div className="hero__cta">
              <Link href="/alliance" className="btn btn--primary">
                法人・提携のご相談
              </Link>
              <Link href="/gift" className="btn btn--secondary">
                まずは体験してみる
              </Link>
            </div>
          </div>

          <div className="hero__scroll-indicator">
            <span className="animate--fade-up">Scroll</span>
            <div className="hero__scroll-line"></div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="social-proof">
          <div className="container">
            <div className="social-proof__grid">
              <div className="social-proof__item animate--fade-up">
                <span className="social-proof__number">40,000<small>+</small></span>
                <span className="social-proof__label">累計体験者数</span>
              </div>
              <div className="social-proof__item animate--fade-up" style={{ transitionDelay: '0.1s' }}>
                <span className="social-proof__number">8<small>年</small></span>
                <span className="social-proof__label">NPO活動継続</span>
              </div>
              <div className="social-proof__item animate--fade-up" style={{ transitionDelay: '0.2s' }}>
                <span className="social-proof__number">100<small>%</small></span>
                <span className="social-proof__label">次回予約率</span>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Slider */}
        <section className="partners">
          <div className="container">
            <p className="partners__label">応援・協力いただいている皆様</p>
            <div className="partners__slider">
              <div className="partners__track">
                <a href="http://kaitsuburi.com/" target="_blank" rel="noopener" className="partner-logo"><span>淡海かいつぶりセンター</span></a>
                <a href="https://tomoiki-kyoto.net/" target="_blank" rel="noopener" className="partner-logo"><span>ともいき京都</span></a>
                {/* Duplicate for infinite loop */}
                <a href="http://kaitsuburi.com/" target="_blank" rel="noopener" className="partner-logo"><span>淡海かいつぶりセンター</span></a>
                <a href="https://tomoiki-kyoto.net/" target="_blank" rel="noopener" className="partner-logo"><span>ともいき京都</span></a>
                <a href="http://kaitsuburi.com/" target="_blank" rel="noopener" className="partner-logo"><span>淡海かいつぶりセンター</span></a>
                <a href="https://tomoiki-kyoto.net/" target="_blank" rel="noopener" className="partner-logo"><span>ともいき京都</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="about" className="mission section animate--bg-pattern">
          <div className="container">
            <div className="mission__content" style={{ gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' }}>
              <div className="mission__text">
                <h2 className="section-title section-title--zen">
                  私たちは、アートの力で、<br />人々に心の居場所を届けます。
                </h2>
                <div className="mission__description">
                  <p>
                    ゼンタングルは、パターンを描くことで心を整えるマインドフルネス・アートです。
                    「失敗がない」という哲学のもと、誰でも15分で美しい作品を生み出すことができます。
                  </p>
                  <p>
                    私たちタングルシードは、8年間にわたりNPOでのがん患者支援活動を続けてきました。
                    その経験を活かし、企業や地域と連携しながら、日本中に「心の居場所」を広げていきます。
                  </p>
                </div>
              </div>
              <div className="mission__image animate--fade-up">
                <Image
                  src="/images/instructor_portrait_alt.jpg"
                  alt="講師紹介"
                  width={400}
                  height={533}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Roots / Timeline Section */}
        <section id="roots" className="roots section animate--bg-pattern">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2 className="section-title section-title--zen">あゆみ</h2>
              <p style={{ color: 'var(--color-medium-gray)', marginTop: '1rem' }}>Tangleseedの社会的ルーツ</p>
            </div>

            <div className="timeline">
              <div className="timeline__line"></div>
              {roots.map((item, i) => (
                <div key={i} className="timeline__item" style={{ transitionDelay: `${i * 0.2}s` }}>
                  <div className="timeline__dot"></div>
                  <div className="timeline__year">{item.year}</div>
                  <div className="timeline__content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Highlight */}
        <section id="services" className="services section">
          <div className="container">
            <div className="services__header">
              <h2 className="section-title section-title--zen section-title--center">提携メニュー</h2>
              <p className="section-subtitle">あなたのビジネスに、心を整える時間を。</p>
            </div>

            <div className="services__grid">
              {[
                { title: '書店・店舗との提携', desc: '場所を提供いただくだけ。運営・集客は全て当社が担当します。来店動機の創出と、地域コミュニティの形成に貢献します。', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', href: '/alliance#bookstore' },
                { title: '企業の健康経営・福利厚生', desc: 'オフィスへの出張ワークショップ、またはオンライン研修。従業員のストレス軽減と、集中力向上に貢献します。', icon: 'M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4 M9 9v.01 M9 12v.01 M9 15v.01 M9 18v.01', href: '/alliance#corporate' },
                { title: '認定講師向けサポート', desc: '「場所」「集客」「自信」の3要素をパッケージで提供。月5〜10万円の持続可能な収入を目指す講師を支援します。', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 1 0-8 4 4 0 0 1 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', href: '/alliance#instructor' }
              ].map((service, i) => (
                <div key={i} className="service-card animate--fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="service-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={service.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__description">{service.desc}</p>
                  <Link href={service.href} className="service-card__link">詳しく見る →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Library Highlight Section */}
        <section id="library" className="library-highlight section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2 className="section-title section-title--zen section-title--center">タングル図鑑</h2>
              <p className="section-subtitle">世界に広がる2,000種以上のパターンから、おすすめをピックアップ。</p>
            </div>

            <div className="library-highlight__grid">
              {featuredPatterns.map((pattern) => (
                <Link href={`/library/${pattern.slug}`} key={pattern.id} className="pattern-preview-card animate--fade-up">
                  <div className="pattern-preview-card__image">
                    <Image
                      src={pattern.imageUrl}
                      alt={pattern.nameJa}
                      width={400}
                      height={300}
                      className="object-cover"
                      unoptimized={pattern.id === '3'}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/patterns/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="pattern-preview-card__content">
                    <h3 className="pattern-preview-card__title">{pattern.nameJa}</h3>
                    <p className="pattern-preview-card__name">{pattern.name}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
              <Link href="/library" className="btn btn--secondary">
                図鑑をもっと見る
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta section animate--bg-pattern">
          <div className="container">
            <div className="cta__content">
              <h2 className="cta__title">
                ともに、心の居場所を<br />つくりませんか。
              </h2>
              <p className="cta__description">
                企業・店舗との提携、メディア取材、講演依頼など、お気軽にお問い合わせください。
              </p>
              <Link href="/alliance" className="btn btn--primary btn--large">
                法人・提携のご相談
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
