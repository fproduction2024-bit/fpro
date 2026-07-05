import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import PatternCard from '@/components/patterns/PatternCard';
import { patterns, getPatternBySlug, type Pattern } from '@/data/patterns/patterns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return patterns.map((pattern) => ({
        slug: pattern.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pattern = getPatternBySlug(slug);

    if (!pattern) {
        return {
            title: 'Pattern Not Found',
        };
    }

    return {
        title: `${pattern.nameJa}（${pattern.name}）の描き方 | タングルシード`,
        description: pattern.descriptionJa,
    };
}

export default async function PatternDetailPage({ params }: Props) {
    const { slug } = await params;
    const pattern = getPatternBySlug(slug);

    if (!pattern) {
        notFound();
    }

    const difficultyColors = {
        beginner: 'bg-green-100 text-green-700 border-green-200',
        intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        advanced: 'bg-red-100 text-red-700 border-red-200',
    };

    const difficultyLabels = {
        beginner: '初級',
        intermediate: '中級',
        advanced: '上級',
    };

    // Get related patterns (same category, different pattern)
    const relatedPatterns = patterns
        .filter(p => p.id !== pattern.id && p.category.some(c => pattern.category.includes(c)))
        .slice(0, 3);

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Pattern Header */}
            <section className="section bg-white border-b border-gray-100">
                <div className="container max-w-4xl">
                    <div className="text-center">
                        <span className={`badge mb-4 ${difficultyColors[pattern.difficulty]}`}>
                            {difficultyLabels[pattern.difficulty]}
                        </span>
                        <h1 className="text-4xl md:text-5xl mb-4">{pattern.nameJa}</h1>
                        <p className="text-xl text-gray-600 mb-6">{pattern.name}</p>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">{pattern.descriptionJa}</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {pattern.category.map((cat, index) => (
                                <span key={index} className="badge badge-outline">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Official Pattern Info */}
            {pattern.category.includes('official') && (
                <section className="section bg-gradient-to-r from-accent-gold/10 to-accent-teal/10 border-y border-accent-gold/20">
                    <div className="container max-w-4xl">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="badge bg-accent-gold text-white text-sm px-4 py-2">
                                ✨ 公式Zentangle®パターン
                            </span>
                            {pattern.category.includes('foundational') && (
                                <span className="badge bg-accent-teal text-white text-sm px-4 py-2">
                                    📚 基本8タングル
                                </span>
                            )}
                        </div>
                        <div className="text-center space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                このパターンは、<strong className="text-accent-gold">Zentangle創始者のRick Roberts（リック・ロバーツ）とMaria Thomas（マリア・トーマス）</strong>によって生み出された公式パターンです。
                            </p>
                            {pattern.category.includes('foundational') && (
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>最初の8つの基本タングル</strong>の1つとして、初心者が最初に学ぶべきパターンとして推奨されています。
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Pattern Image */}
            <section className="section bg-gradient-to-br from-accent-gold/5 to-accent-teal/5">
                <div className="container max-w-3xl">
                    <div className="bg-gradient-to-br from-accent-gold/10 to-accent-teal/10 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-accent-gold/30">
                        <div className="text-center p-8">
                            <div className="text-8xl mb-4">🎨</div>
                            <p className="text-lg font-bold text-gray-700 mb-2">{pattern.nameJa}のパターン</p>
                            <p className="text-sm text-gray-500">画像はpublic/images/patterns/{pattern.slug}.jpgに配置してください</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* YouTube Tutorial */}
            {pattern.youtubeVideoId && (
                <section className="section bg-gray-50">
                    <div className="container max-w-4xl">
                        <h2 className="section-title">動画チュートリアル</h2>
                        <div
                            className="bg-white rounded-lg p-8 shadow-sm"
                            style={{ maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            <YouTubeEmbed
                                videoId={pattern.youtubeVideoId}
                                title={`${pattern.nameJa}の描き方`}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Step-by-Step Instructions */}
            <section className="section bg-white">
                <div className="container max-w-4xl">
                    <h2 className="section-title">描き方のステップ</h2>
                    <div className="space-y-8">
                        {pattern.steps.map((step) => (
                            <div key={step.stepNumber} className="card">
                                <div className="card-content">
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-accent-gold">{step.stepNumber}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold mb-2">{step.instructionJa}</h3>
                                            <p className="text-sm text-gray-600">{step.instruction}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Related Patterns */}
            {relatedPatterns.length > 0 && (
                <section className="section">
                    <div className="container">
                        <h2 className="section-title">関連パターン</h2>
                        <div className="content-grid">
                            {relatedPatterns.map((relatedPattern) => (
                                <PatternCard key={relatedPattern.id} pattern={relatedPattern} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="section bg-gradient-to-br from-accent-gold/10 to-accent-teal/10">
                <div className="container max-w-3xl text-center">
                    <h2 className="section-title">もっと学びたい方へ</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        無料の7日間体験クラスで、さらに多くのパターンを学びましょう。
                    </p>
                    <a
                        href="https://hxzk7sue.autosns.app/addfriend/s/KaGnyj5v0d/@255jknci"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold text-lg inline-block"
                    >
                        LINE友だち登録をして講座を受け取る
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
