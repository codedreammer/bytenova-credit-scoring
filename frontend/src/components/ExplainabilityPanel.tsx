interface ExplainabilityPanelProps {
    income: number;
    expense: number;
    digitalPercent: number;
    incomeStability: number;
}

interface RiskFactor {
    label: string;
    value: number;
}

const formatSigned = (value: number) => {
    const rounded = Math.round(value);
    return `${rounded >= 0 ? '+' : ''}${rounded}`;
};

export default function ExplainabilityPanel({
    income,
    expense,
    digitalPercent,
    incomeStability,
}: ExplainabilityPanelProps) {
    // Income stability arrives in 0-100; normalize this factor for readable contribution values.
    const factors: RiskFactor[] = [
        { label: 'Income Stability', value: (incomeStability * 30) / 20 },
        { label: 'Digital Adoption', value: digitalPercent * 2 },
        { label: 'Expense Burden', value: -expense / 200 },
        { label: 'Savings Capacity', value: (income - expense) / 100 },
    ];

    return (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Key Risk Factors</h3>
            <div className="space-y-2">
                {factors.map((factor) => {
                    const positive = factor.value >= 0;
                    return (
                        <div key={factor.label} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{factor.label}</span>
                            <span className={`font-bold ${positive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                {formatSigned(factor.value)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
