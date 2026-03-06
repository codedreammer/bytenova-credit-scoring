
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FilePlus, History, HelpCircle } from 'lucide-react';

export default function Sidebar() {
    const links = [
        { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { to: '/new', label: 'New Evaluation', icon: <FilePlus size={20} /> },
        { to: '/history', label: 'History', icon: <History size={20} /> },
        { to: '/methodology', label: 'Methodology', icon: <HelpCircle size={20} /> },
    ];

    return (
        <aside className="w-72 bg-[#14532D] text-white flex-shrink-0 flex flex-col border-r border-[#14532D]/10 glass-panel shadow-2xl z-50">
            <div className="p-8 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#14532D] shadow-lg flex items-center justify-center p-0.5">
                        <div className="w-full h-full bg-[#14532D] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl leading-none">V</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-0 leading-none">VyaparScore</h1>
                        <p className="text-xs text-green-300/80 font-medium tracking-wide mt-1 uppercase">Behavioral Credit Engine</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 py-8 px-4 space-y-2 relative">
                <div className="absolute left-6 top-8 bottom-8 w-px bg-white/5 z-0"></div>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `relative z-10 flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm border font-inter ${isActive
                                ? 'bg-gradient-to-r from-[#22C55E]/20 to-transparent text-white border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.1)] translate-x-2'
                                : 'text-green-100/70 border-transparent hover:bg-white/5 hover:text-white hover:translate-x-1'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-[#22C55E] text-[#14532D] shadow-lg shadow-[#22C55E]/30' : 'bg-white/5 text-green-200'}`}>
                                    {link.icon}
                                </div>
                                <span className="text-base font-semibold tracking-wide">{link.label}</span>
                                {isActive && (
                                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <span className="block w-2.5 h-2.5 bg-[#22C55E] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">System Active</p>
                            <p className="text-xs text-green-200/70">ML Endpoint connected</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
