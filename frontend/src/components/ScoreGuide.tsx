interface ScoreGuideProps {
    score: number;
}

interface ScoreBand {
    label: string;
    min: number;
    max: number;
    rating: string;
}

const scoreBands: ScoreBand[] = [
    { label: '800 - 1000', min: 800, max: 1000, rating: 'Excellent Credit' },
    { label: '650 - 799', min: 650, max: 799, rating: 'Moderate Risk' },
    { label: '500 - 649', min: 500, max: 649, rating: 'Risky Borrower' },
    { label: 'Below 500', min: 0, max: 499, rating: 'High Risk' },
];

export default function ScoreGuide({ score }: ScoreGuideProps) {
    const interpretedScore = score <= 100 ? score * 10 : score;

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Score Interpretation</h3>
            <div className="space-y-2">
                {scoreBands.map((band) => {
                    const isCurrent = interpretedScore >= band.min && interpretedScore <= band.max;
                    return (
                        <div
                            key={band.label}
                            className={`rounded-lg px-3 py-2 text-sm border ${isCurrent
                                ? 'bg-[#14532D]/10 border-[#22C55E]/40'
                                : 'bg-gray-50 border-gray-100'
                                }`}
                        >
                            <p className={`font-semibold ${isCurrent ? 'text-[#14532D]' : 'text-gray-700'}`}>
                                {band.label}
                            </p>
                            <p className={`${isCurrent ? 'text-[#22C55E] font-bold' : 'text-gray-500'}`}>
                                {band.rating}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
