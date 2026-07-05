'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function AlliancePage() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');
    };

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Hero */}
            <section className="section bg-gradient-to-br from-accent-gold/10 to-accent-teal/10">
                <div className="container max-w-4xl text-center">
                    <span className="badge badge-outline mb-6">法人・提携のご提案</span>
                    <h1 className="text-4xl md:text-5xl mb-6 leading-tight">
                        <span className="text-accent-gold">低コスト・高付加価値</span>の<br />
                        ウェルネスプログラム
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        書店・カフェ・福利厚生・シニア施設など、<br />
                        あらゆる業態で「心の豊かさ」を提供するパートナーシップ
                    </p>
                </div>
            </section>

            {/* Social Proof */}
            <section className="section bg-white border-y border-gray-100">
                <div className="container max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-3">
                            <div className="text-5xl font-bold text-accent-gold">40,000+</div>
                            <p className="text-sm text-gray-600 font-medium">累計受講者数</p>
                        </div>
                        <div className="space-y-3">
                            <div className="text-5xl font-bold text-accent-gold">8+ Years</div>
                            <p className="text-sm text-gray-600 font-medium">NPO支援実績</p>
                        </div>
                        <div className="space-y-3">
                            <div className="text-5xl font-bold text-accent-gold">8.75%</div>
                            <p className="text-sm text-gray-600 font-medium">継続率（業界平均の2倍）</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnership Models */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">提携モデル</h2>
                    <div className="content-grid">
                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="card-title">書店・文具店様</h3>
                                <p className="card-description mb-4">
                                    店頭でのワークショップ開催、または「ポストカードQR戦略」による集客。来店促進とオンライン会員獲得の両立が可能です。
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>✓ 初期費用・在庫リスクなし</li>
                                    <li>✓ ポストカード設置のみで月間20-50名の集客実績</li>
                                    <li>✓ 売上の一部を手数料として還元</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">🏢</div>
                                <h3 className="card-title">企業福利厚生</h3>
                                <p className="card-description mb-4">
                                    従業員のメンタルヘルスケアとして、ゼンタングルのオンライン講座を導入。ストレス軽減とチームビルディングに効果的です。
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>✓ 1回15分の手軽なセルフケア</li>
                                    <li>✓ リモートワーク環境でも実施可能</li>
                                    <li>✓ 企業様専用プログラムのカスタマイズ対応</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">☕</div>
                                <h3 className="card-title">カフェ・ホテル様</h3>
                                <p className="card-description mb-4">
                                    お客様向けの体験型コンテンツとして、ゼンタングルワークショップを提供。滞在時間の延長と顧客満足度向上に貢献します。
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>✓ 講師派遣または動画コンテンツ提供</li>
                                    <li>✓ オリジナルカードやグッズ制作も可能</li>
                                    <li>✓ SNS映えする特別な体験を提供</li>
                                </ul>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-content">
                                <div className="text-4xl mb-4">🏥</div>
                                <h3 className="card-title">シニア施設・医療機関様</h3>
                                <p className="card-description mb-4">
                                    高齢者や患者様のアートセラピーとして導入実績あり。8年以上のNPO活動で培ったノウハウを提供します。
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>✓ がん患者支援での8年間の実績</li>
                                    <li>✓ 身体的負担が少なく、誰でも参加可能</li>
                                    <li>✓ コミュニティ形成にも効果的</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Postcard QR Strategy */}
            <section className="section bg-gradient-to-br from-accent-gold/5 to-accent-teal/5">
                <div className="container max-w-4xl">
                    <h2 className="section-title">「ポストカードQR戦略」とは？</h2>
                    <p className="section-subtitle">低コストで始められる、実績ある集客手法</p>

                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        <p className="text-gray-700 leading-relaxed mb-8">
                            店頭にゼンタングルのポストカードを設置し、QRコードから無料LINE講座に誘導する仕組みです。初期費用・在庫リスクなしで、月間20-50名の新規顧客獲得に成功している実績があります。
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-accent-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-accent-gold">1</span>
                                </div>
                                <h4 className="font-bold mb-2">ポストカード設置</h4>
                                <p className="text-sm text-gray-600">レジ横や店頭に美しいゼンタングル作品のポストカードを設置</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-accent-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-accent-gold">2</span>
                                </div>
                                <h4 className="font-bold mb-2">QRコードから登録</h4>
                                <p className="text-sm text-gray-600">お客様がスマホでQRを読み取り、LINE友だち登録</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-accent-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-accent-gold">3</span>
                                </div>
                                <h4 className="font-bold mb-2">継続的な関係構築</h4>
                                <p className="text-sm text-gray-600">無料講座→有料会員へ、8.75%の高い継続率</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section bg-white">
                <div className="container max-w-2xl">
                    <h2 className="section-title">お問い合わせ</h2>
                    <p className="section-subtitle">まずはお気軽にご相談ください</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">貴社名 *</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">ご担当者名 *</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.contactName}
                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">メールアドレス *</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">電話番号</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">業種 *</label>
                            <select
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.businessType}
                                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            >
                                <option value="">選択してください</option>
                                <option value="bookstore">書店・文具店</option>
                                <option value="corporate">企業福利厚生</option>
                                <option value="cafe">カフェ・ホテル</option>
                                <option value="senior">シニア施設・医療機関</option>
                                <option value="other">その他</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">お問い合わせ内容</label>
                            <textarea
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full btn btn-gold text-lg py-4">
                            送信する
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
