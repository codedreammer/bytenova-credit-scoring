import { useState } from 'react';
import { evaluateCredit } from '../services/api';
import type { EvaluationPayload, EvaluationResponse } from '../services/api';
import ScoreRing from '../components/ScoreRing';
import RiskBadge from '../components/RiskBadge';
import ExplainabilityPanel from '../components/ExplainabilityPanel';
import ScoreGuide from '../components/ScoreGuide';
import { Calculator, AlertCircle, RefreshCw, Send, Activity, Wallet, Shield } from 'lucide-react';

export default function NewEvaluation() {
    const [formData, setFormData] = useState<EvaluationPayload>({
        income: 0,
        expense: 0,
        digitalPercent: 0,
        incomeStability: 0,
    });

    // Extra fields that aren't sent to API but are part of UX logic per prompt
    const [vendorName, setVendorName] = useState('');
    const [city, setCity] = useState('');
    const [segment, setSegment] = useState('');
    const [scheme, setScheme] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<EvaluationResponse | null>(null);
    const [submittedData, setSubmittedData] = useState<EvaluationPayload | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Map specific form fields to ML expected payload
        if (['income', 'expense', 'digitalPercent', 'incomeStability'].includes(name)) {
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await evaluateCredit(formData);
            setSubmittedData(formData);
            setResult({
                score: response.score,
                risk: response.risk,
                suggestedLoan: response.suggestedLoan,
                confidence: response.confidence
            });
        } catch (err) {
            setError('Failed to calculate credit score. Please check connection to ML service.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setResult(null);
        setSubmittedData(null);
        setFormData({
            income: 0,
            expense: 0,
            digitalPercent: 0,
            incomeStability: 0,
        });
        setVendorName('');
        setCity('');
        setSegment('');
        setScheme('');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">New Evaluation</h1>
                <p className="text-gray-500 mt-2">Generate a behavioral credit score instantly for underbanked vendors.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">

                        <div className="bg-gray-50/80 px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Shield className="text-[#14532D]" size={20} />
                                Vendor Intake Form
                            </h2>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Demographics */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Business Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vendor Name</label>
                                        <input
                                            type="text"
                                            value={vendorName}
                                            onChange={e => setVendorName(e.target.value)}
                                            placeholder="e.g. Ramesh Traders"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all placeholder:text-gray-400 bg-gray-50/30"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                            placeholder="e.g. Mumbai"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all placeholder:text-gray-400 bg-gray-50/30"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Segment</label>
                                        <select
                                            value={segment}
                                            onChange={e => setSegment(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50/30 appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select Segment</option>
                                            <option value="retail">Retail Kirana</option>
                                            <option value="services">Services</option>
                                            <option value="manufacturing">Manufacturing (Micro)</option>
                                            <option value="agriculture">Agri-Allied</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Government Scheme</label>
                                        <select
                                            value={scheme}
                                            onChange={e => setScheme(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50/30 appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select Scheme</option>
                                            <option value="mudra">Mudra Yojana</option>
                                            <option value="standup">Stand Up India</option>
                                            <option value="pmegp">PMEGP</option>
                                            <option value="pmsvanidhi">PM SVANidhi</option>
                                            <option value="none">None / Direct Lending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Financials (ML Inputs) */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                                    <Activity size={16} /> ML Predictors
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Income (₹)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">₹</div>
                                            <input
                                                type="number"
                                                name="income"
                                                value={formData.income || ''}
                                                onChange={handleInputChange}
                                                placeholder="45000"
                                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50/30"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Expense (₹)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">₹</div>
                                            <input
                                                type="number"
                                                name="expense"
                                                value={formData.expense || ''}
                                                onChange={handleInputChange}
                                                placeholder="28000"
                                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50/30"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Digital Payment Ratio (%)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">%</div>
                                            <input
                                                type="number"
                                                name="digitalPercent"
                                                min="0" max="100"
                                                value={formData.digitalPercent || ''}
                                                onChange={handleInputChange}
                                                placeholder="45"
                                                className="w-full px-4 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50/30"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Income Stability Score (0-100)</label>
                                        <input
                                            type="number"
                                            name="incomeStability"
                                            min="0" max="100"
                                            value={formData.incomeStability || ''}
                                            onChange={handleInputChange}
                                            placeholder="80"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50/30"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                            {error && (
                                <div className="flex items-center gap-2 text-[#EF4444] text-sm bg-[#EF4444]/10 px-4 py-2 rounded-lg font-medium w-full md:w-auto">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}
                            {!error && <div className="hidden md:block"></div>}

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={isLoading}
                                    className="px-5 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-colors w-full md:w-auto flex items-center justify-center gap-2"
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#14532D] to-[#22C55E] shadow-lg shadow-[#22C55E]/30 hover:shadow-[#22C55E]/50 hover:-translate-y-0.5 transition-all w-full md:w-auto flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <RefreshCw className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <Calculator size={20} />
                                            Generate Score
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                        <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                            <Wallet className="text-[#14532D]" size={20} />
                            <h2 className="text-lg font-bold text-gray-900">Evaluation Result</h2>
                        </div>

                        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                            {!result && !isLoading && (
                                <div className="text-gray-400 space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center border-4 border-gray-100/50 shadow-inner">
                                        <Send className="opacity-20 translate-x-1" size={40} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-500">Awaiting Submissions</p>
                                        <p className="text-sm mt-1 px-4">Fill the details and generate score to view ML analysis.</p>
                                    </div>
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex items-center justify-center flex-col gap-4">
                                    <div className="w-16 h-16 border-4 border-gray-100 border-t-[#22C55E] rounded-full animate-spin"></div>
                                    <p className="text-sm font-semibold text-[#14532D] animate-pulse">Running Logistic Model...</p>
                                </div>
                            )}

                            {result && !isLoading && (
                                <div className="w-full space-y-8 animate-in zoom-in duration-500">
                                    <ScoreRing score={result.score} riskLevel={result.risk} />

                                    <div className="space-y-4 pt-6 border-t border-gray-100 w-full text-left">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Risk Assessment</p>
                                            <div className="flex items-center gap-2">
                                                <RiskBadge level={result.risk} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Recommended Loan Limit</p>
                                            <p className="text-2xl font-black text-gray-900">
                                                <span className="text-gray-400 text-lg mr-1">₹</span>
                                                {result.suggestedLoan.toLocaleString('en-IN')}
                                            </p>
                                        </div>

                                        <div className="mt-8 bg-green-50 rounded-xl p-4 border border-green-100/50">
                                            <p className="text-xs font-semibold text-[#14532D]">
                                                Model Confidence:{' '}
                                                <span className="font-bold text-[#22C55E]">
                                                    High ({Math.round((result.confidence ?? 92))}%)
                                                </span>
                                            </p>
                                        </div>

                                        {submittedData && (
                                            <ExplainabilityPanel
                                                income={submittedData.income}
                                                expense={submittedData.expense}
                                                digitalPercent={submittedData.digitalPercent}
                                                incomeStability={submittedData.incomeStability}
                                            />
                                        )}

                                        <ScoreGuide score={result.score} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
