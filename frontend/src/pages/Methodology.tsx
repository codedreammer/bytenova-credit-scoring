import { Database, Cpu, Activity, Lightbulb, PieChart, TrendingUp } from 'lucide-react';
import FeatureImportance from '../components/FeatureImportance';

export default function Methodology() {
    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Methodology overview</h1>
                <p className="text-gray-500 mt-2 text-lg max-w-2xl leading-relaxed">VyaparScore translates behavioral business metrics into actionable credit insights leveraging robust machine learning techniques to promote equitable access to finance.</p>
            </div>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-[#22C55E] pl-4">How VyaparScore Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            step: 'Step 1',
                            title: 'Vendor Data Intake',
                            desc: 'Secure ingestion of high-fidelity financial flow data, digital traction footprints, and macro-economic factors.',
                            icon: <Database className="text-[#14532D]" size={28} />
                        },
                        {
                            step: 'Step 2',
                            title: 'Feature Engineering',
                            desc: 'Transform raw inputs into normalized predictive signals accounting for seasonal volatility & income stability.',
                            icon: <Activity className="text-[#F59E0B]" size={28} />
                        },
                        {
                            step: 'Step 3',
                            title: 'AI Risk Scoring',
                            desc: 'Our Logistic Regression model estimates the probability of credit default using behavioral financial indicators. The model outputs a probability of default (PD), which is then transformed into a standardized credit score between 0 and 1000 and mapped into risk categories.',
                            icon: <Cpu className="text-[#22C55E]" size={28} />
                        },
                        {
                            step: 'Step 4',
                            title: 'Explainable Loan Rec',
                            desc: 'Delivery of transparent risk strata & evidence-based loan suggestions optimized for business health.',
                            icon: <Lightbulb className="text-[#14532D]" size={28} />
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase bg-gray-50 px-3 py-1 rounded-full">{item.step}</span>
                                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#22C55E]/10 transition-colors">
                                    {item.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-[#22C55E] pl-4">System Architecture</h2>
                <div className="max-w-3xl mx-auto space-y-3">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-900">User Interface (React Frontend)</p>
                    </div>
                    <p className="text-center text-[#22C55E] font-bold text-lg leading-none">&#8595;</p>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-900">API Processing Layer (Node.js Backend)</p>
                    </div>
                    <p className="text-center text-[#22C55E] font-bold text-lg leading-none">&#8595;</p>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-900">Machine Learning Service (Python Flask API)</p>
                    </div>
                    <p className="text-center text-[#22C55E] font-bold text-lg leading-none">&#8595;</p>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-center">
                        <p className="text-sm font-semibold text-gray-900">Credit Scoring Model (Scikit-Learn Logistic Regression)</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <PieChart className="text-[#22C55E]" size={24} />
                        Behavioral Feature Importance
                    </h2>
                    <FeatureImportance />
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#14532D] to-[#064e3b] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10"><TrendingUp /> Constant Refinement</h3>
                        <p className="text-green-50/90 leading-relaxed text-sm relative z-10">Our Logistic Regression pipelines can be periodically retrained using updated behavioral financial datasets. Continuous retraining allows the system to adapt to evolving borrower patterns while maintaining model transparency and regulatory interpretability.</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Underlying ML Service</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="bg-[#22C55E]/10 text-[#22C55E] p-1 rounded">&#10003;</span>
                                <div>
                                    <strong className="block text-gray-800">Scikit-Learn Backend</strong>
                                    Robust serialized python deployment (credit_model.pkl).
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-[#22C55E]/10 text-[#22C55E] p-1 rounded">&#10003;</span>
                                <div>
                                    <strong className="block text-gray-800">Deterministic Output</strong>
                                    Probability outputs are transformed into standardized scores on a 0-1000 scale.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-[#22C55E]/10 text-[#22C55E] p-1 rounded">&#10003;</span>
                                <div>
                                    <strong className="block text-gray-800">RESTful Flask Bridge</strong>
                                    Low latency synchronous Node.js to Flask API communication.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Credit Score Calculation</h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p className="text-gray-800 font-semibold">Credit Score = 1000 &times; (1 &minus; Probability of Default)</p>
                            <div>
                                <p className="font-semibold text-gray-900 mb-2">Risk Categories</p>
                                <ul className="space-y-1">
                                    <li>800 - 1000 &rarr; Low Risk</li>
                                    <li>650 - 799 &rarr; Moderate Risk</li>
                                    <li>500 - 649 &rarr; Risky Borrower</li>
                                    <li>Below 500 &rarr; High Risk</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
