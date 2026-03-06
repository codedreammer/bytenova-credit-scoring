import { useEffect, useState } from 'react';
import RiskBadge from '../components/RiskBadge';
import { Filter, Search } from 'lucide-react';
import { fetchEvaluations } from '../services/api';
import type { EvaluationRecord } from '../services/api';

export default function History() {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchEvaluations();
                const sortedData = [...data].sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setEvaluations(sortedData);
            } catch (err) {
                console.error('Failed to fetch evaluations:', err);
                setError('Could not load evaluation history.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredData = evaluations.filter((item) => {
        const matchesRisk = filter === 'All' || item.risk === filter;
        const matchesSearch = item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRisk && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Evaluation History</h1>
                    <p className="text-gray-500 mt-1">Review past vendor credit evaluations and tracking.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400 group-focus-within:text-[#14532D] transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search vendors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 focus:outline-none transition-all w-full md:w-64"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={18} className="text-gray-400" />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 focus:outline-none appearance-none bg-white transition-all font-medium text-gray-700 cursor-pointer"
                        >
                            <option value="All">All Risk Levels</option>
                            <option value="Low">Low Risk</option>
                            <option value="Moderate">Moderate Risk</option>
                            <option value="High">High Risk</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor Info</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheme</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Score</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        Loading evaluations...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-[#EF4444] font-medium">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                            {new Date(item.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900 group-hover:text-[#14532D] transition-colors">{item.vendor}</p>
                                            <p className="text-sm text-gray-500">{item.city}</p>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{item.scheme}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 border border-gray-100 font-bold text-lg text-gray-900 shadow-sm">
                                                {item.score}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <RiskBadge level={item.risk} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No evaluations found matching the selected filters.
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
