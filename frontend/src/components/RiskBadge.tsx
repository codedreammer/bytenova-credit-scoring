

interface RiskBadgeProps {
    level: string;
}

export default function RiskBadge({ level }: RiskBadgeProps) {
    let colorClass = '';

    if (level.includes('Low')) {
        colorClass = 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20';
    } else if (level.includes('Moderate')) {
        colorClass = 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
    } else if (level.includes('High')) {
        colorClass = 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20';
    } else {
        colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colorClass} uppercase tracking-wider shadow-sm flex items-center gap-1.5 w-fit`}>
            <span className={`w-1.5 h-1.5 rounded-full block ${level.includes('Low') ? 'bg-[#22C55E]' : level.includes('Moderate') ? 'bg-[#F59E0B]' : level.includes('High') ? 'bg-[#EF4444]' : 'bg-gray-400'}`}></span>
            {level}
        </span>
    );
}
