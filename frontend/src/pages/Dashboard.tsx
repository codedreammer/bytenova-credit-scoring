
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import { Users, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
    const recentEvaluations = [
        { id: 1, vendor: 'Ramesh Kirana', city: 'Mumbai', scheme: 'Mudra', score: 82, risk: 'Low Risk' },
        { id: 2, vendor: 'Suresh Textiles', city: 'Surat', scheme: 'Stand Up India', score: 65, risk: 'Moderate Risk' },
        { id: 3, vendor: 'Pooja Electronics', city: 'Delhi', scheme: 'PMEGP', score: 45, risk: 'High Risk' },
        { id: 4, vendor: 'Anita Boutique', city: 'Pune', scheme: 'Mudra', score: 78, risk: 'Low Risk' },
    ];

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
                    value="1,248"
                    icon={<Users size={20} />}
                    trend={{ value: '12%', isPositive: true }}
                />
                <StatCard
                    title="Avg Credit Score"
                    value="71.4"
                    icon={<CreditCard size={20} />}
                    trend={{ value: '2.4', isPositive: true }}
                />
                <StatCard
                    title="Recommended Cases"
                    value="842"
                    icon={<CheckCircle size={20} />}
                    trend={{ value: '8%', isPositive: true }}
                />
                <StatCard
                    title="Review Required"
                    value="156"
                    icon={<AlertTriangle size={20} />}
                    trend={{ value: '1.2%', isPositive: false }}
                />
            </div>

            {/* Risk Distribution */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Risk Distribution
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Low Risk</p>
                        <p className="text-2xl font-bold text-green-600">3</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Moderate</p>
                        <p className="text-2xl font-bold text-orange-500">4</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">High Risk</p>
                        <p className="text-2xl font-bold text-red-500">2</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Recent Evaluations</h2>
                    <button className="text-sm font-semibold text-[#14532D] hover:text-[#22C55E] transition-colors">
                        View All →
                    </button>
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
                            {recentEvaluations.map((evalItem) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
