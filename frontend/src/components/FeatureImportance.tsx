interface FeatureItem {
    name: string;
    weight: number;
}

const featureWeights: FeatureItem[] = [
    { name: 'Income Stability Score (25%)', weight: 25 },
    { name: 'Digital Payment Ratio (20%)', weight: 20 },
    { name: 'Income-Expense Margin (20%)', weight: 20 },
    { name: 'Business Stability Indicator (15%)', weight: 15 },
    { name: 'Revenue Scale (10%)', weight: 10 },
    { name: 'Expense Burden (10%)', weight: 10 },
];

export default function FeatureImportance() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {featureWeights.map((feature) => (
                <div key={feature.name} className="p-5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-800">{feature.name}</p>
                        <span className="text-sm font-bold text-[#14532D]">{feature.weight}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#14532D] to-[#22C55E]"
                            style={{ width: `${feature.weight}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
