import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link href="/" className="footer__logo">Tangleseed</Link>
                        <p className="footer__tagline">15分の静寂で、社会を整える。</p>
                    </div>
                    <div className="footer__links">
                        <h4>サイトマップ</h4>
                        <ul>
                            <li><Link href="/representative">代表メッセージ</Link></li>
                            <li><Link href="/about">私たちについて</Link></li>
                            <li><Link href="/#services">サービス</Link></li>
                            <li><Link href="/stories">お客様の声</Link></li>
                        </ul>
                    </div>
                    <div className="footer__links">
                        <h4>法的情報</h4>
                        <ul>
                            <li><Link href="/about#company">会社概要</Link></li>
                            <li><Link href="/privacy">プライバシーポリシー</Link></li>
                            <li><Link href="/legal">特定商取引法に基づく表記</Link></li>
                        </ul>
                    </div>
                    <div className="footer__contact">
                        <h4>お問い合わせ</h4>
                        <p>株式会社タングルシード</p>
                        <a href="mailto:info@tangle-seed.co.jp" className="footer__email">info@tangle-seed.co.jp</a>
                    </div>
                </div>
                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Tangleseed Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
