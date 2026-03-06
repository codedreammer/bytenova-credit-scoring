import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
                {icon && (
                    <div className="w-10 h-10 rounded-full bg-[#14532D]/5 flex items-center justify-center text-[#14532D] group-hover:scale-110 group-hover:bg-[#14532D]/10 transition-transform">
                        {icon}
                    </div>
                )}
            </div>

            <div className="flex items-end gap-3 mt-auto">
                <span className="text-4xl font-black text-gray-900 tracking-tight">{value}</span>

                {trend && (
                    <span className={`flex items-center text-sm font-medium pb-1 ${trend.isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}
                    </span>
                )}
            </div>
        </div>
    );
}
