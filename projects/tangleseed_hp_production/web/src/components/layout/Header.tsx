'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="header">
            <div className="header__container">
                <Link href="/" className="header__logo">
                    <span className="header__logo-text">Tangleseed</span>
                </Link>

                <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
                    <ul className="header__nav-list">
                        <li><Link href="/representative" onClick={() => setIsMenuOpen(false)}>代表メッセージ</Link></li>
                        <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>私たちについて</Link></li>
                        <li><Link href="/#services" onClick={() => setIsMenuOpen(false)}>サービス</Link></li>
                        <li><Link href="/stories" onClick={() => setIsMenuOpen(false)}>お客様の声</Link></li>
                        <li><Link href="/library" onClick={() => setIsMenuOpen(false)}>タングル図鑑</Link></li>
                        <li><Link href="/gift" className="text-accent-gold font-bold" onClick={() => setIsMenuOpen(false)}>プレゼント</Link></li>
                        <li><Link href="/alliance" className="header__nav-cta" onClick={() => setIsMenuOpen(false)}>法人・提携のご相談</Link></li>
                    </ul>
                </nav>

                <button
                    className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--active' : ''}`}
                    aria-label="メニューを開く"
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
