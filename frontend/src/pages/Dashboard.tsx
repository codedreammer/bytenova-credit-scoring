import { useEffect, useMemo, useState } from 'react';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import { Users, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { fetchEvaluations } from '../services/api';
import type { EvaluationRecord } from '../services/api';

export default function Dashboard() {
    const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchEvaluations();
                const sortedData = [...data].sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setEvaluations(sortedData);
            } catch (err) {
                console.error('Failed to fetch dashboard evaluations:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const stats = useMemo(() => {
        const total = evaluations.length;
        const low = evaluations.filter((e) => e.risk === 'Low').length;
        const moderate = evaluations.filter((e) => e.risk === 'Moderate').length;
        const high = evaluations.filter((e) => e.risk === 'High').length;
        const avgScore = total > 0
            ? (evaluations.reduce((sum, item) => sum + item.score, 0) / total).toFixed(1)
            : '0';

        return {
            total,
            low,
            moderate,
            high,
            avgScore,
            recommended: low + moderate,
            reviewRequired: high,
        };
    }, [evaluations]);

    const recentEvaluations = evaluations.slice(0, 5);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back. Here's a summary of the latest credit insights.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Evaluations"
                    value={stats.total}
                    icon={<Users size={20} />}
                />
                <StatCard
                    title="Avg Credit Score"
                    value={stats.avgScore}
                    icon={<CreditCard size={20} />}
                />
                <StatCard
                    title="Recommended Cases"
                    value={stats.recommended}
                    icon={<CheckCircle size={20} />}
                />
                <StatCard
                    title="Review Required"
                    value={stats.reviewRequired}
                    icon={<AlertTriangle size={20} />}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Risk Distribution
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Low Risk</p>
                        <p className="text-2xl font-bold text-green-600">{stats.low}</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Moderate</p>
                        <p className="text-2xl font-bold text-orange-500">{stats.moderate}</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">High Risk</p>
                        <p className="text-2xl font-bold text-red-500">{stats.high}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Recent Evaluations</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor Info</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheme</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Score</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk Level</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-medium">
                                        Loading recent evaluations...
                                    </td>
                                </tr>
                            ) : recentEvaluations.length > 0 ? (
                                recentEvaluations.map((evalItem) => (
                                    <tr key={evalItem.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{evalItem.vendor}</p>
                                            <p className="text-sm text-gray-500">{evalItem.city}</p>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{evalItem.scheme}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex justify-center w-10 font-bold text-gray-900">
                                                {evalItem.score}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <RiskBadge level={evalItem.risk} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-sm font-medium text-gray-500 hover:text-[#14532D] transition-colors py-1 px-3 border border-gray-200 rounded-lg hover:border-[#14532D]/30 hover:bg-[#14532D]/5">
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-medium">
                                        No evaluations generated yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

