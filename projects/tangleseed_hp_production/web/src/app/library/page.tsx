'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PatternCard from '@/components/patterns/PatternCard';
import { patterns, getAllCategories, getCategoryNameJa, type Pattern } from '@/data/patterns/patterns';
import type { Metadata } from 'next';

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = getAllCategories();

    const filteredPatterns = patterns.filter(pattern => {
        const matchesSearch =
            pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pattern.nameJa.includes(searchQuery) ||
            pattern.descriptionJa.includes(searchQuery);

        const matchesDifficulty =
            selectedDifficulty === 'all' || pattern.difficulty === selectedDifficulty;

        const matchesCategory =
            selectedCategory === 'all' || pattern.category.includes(selectedCategory);

        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    return (
        <main className="min-h-screen pt-[var(--header-height)]">
            <Header />

            {/* Hero */}
            <section className="section bg-gradient-to-br from-accent-gold/10 to-accent-teal/10">
                <div className="container max-w-5xl text-center">
                    <span className="badge badge-outline mb-6">Pattern Library</span>
                    <h1 className="text-4xl md:text-5xl mb-6 leading-tight">
                        タングル図鑑
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        {patterns.length}種類のゼンタングルパターンを収録。<br />
                        初級から上級まで、あなたにぴったりのパターンが見つかります。
                    </p>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="section bg-white border-b border-gray-100">
                <div className="container max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-3">
                            <input
                                type="text"
                                placeholder="パターン名で検索..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                            />
                        </div>
                        <div>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                            >
                                <option value="all">すべてのレベル</option>
                                <option value="beginner">初級</option>
                                <option value="intermediate">中級</option>
                                <option value="advanced">上級</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-gold transition-colors"
                            >
                                <option value="all">すべてのカテゴリ</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {getCategoryNameJa(category)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        {filteredPatterns.length}件のパターンが見つかりました
                    </div>
                </div>
            </section>

            {/* Pattern Grid */}
            <section className="section">
                <div className="container">
                    {filteredPatterns.length > 0 ? (
                        <div className="content-grid">
                            {filteredPatterns.map((pattern) => (
                                <PatternCard key={pattern.id} pattern={pattern} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">該当するパターンが見つかりませんでした</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedDifficulty('all');
                                    setSelectedCategory('all');
                                }}
                                className="btn btn-outline mt-4"
                            >
                                フィルターをリセット
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
