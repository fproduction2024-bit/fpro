import Link from 'next/link';
import type { Pattern } from '@/data/patterns/patterns';

interface PatternCardProps {
    pattern: Pattern;
}

export default function PatternCard({ pattern }: PatternCardProps) {
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

    return (
        <Link href={`/library/${pattern.slug}`} className="card">
            <div className="card-image flex items-center justify-center bg-gradient-to-br from-accent-gold/10 to-accent-teal/10">
                <div className="text-center p-8">
                    <div className="text-5xl mb-3">🎨</div>
                    <p className="text-sm font-medium text-gray-600">{pattern.nameJa}</p>
                </div>
            </div>
            <div className="card-content">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="card-title">{pattern.nameJa}</h3>
                    <span className={`badge text-xs ${difficultyColors[pattern.difficulty]}`}>
                        {difficultyLabels[pattern.difficulty]}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{pattern.name}</p>
                <p className="card-description line-clamp-2">{pattern.descriptionJa}</p>
                <div className="card-meta">
                    {pattern.category.slice(0, 2).map((cat, index) => (
                        <span key={index} className="badge badge-outline text-xs">
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
