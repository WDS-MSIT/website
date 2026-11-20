import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, Camera, Sparkles } from 'lucide-react';
import { labData, itMous } from '../data/facilitiesData';

const DepartmentLabsSection = ({ deptKey }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const labs = labData.filter((l) => l.deptKey === deptKey);

    if (!labs || labs.length === 0) return null;

    // One full row on wide screens before "View More".
    const INITIAL_LABS = 4;
    const visibleLabs = isExpanded ? labs : labs.slice(0, INITIAL_LABS);
    const hiddenCount = labs.length - INITIAL_LABS;

    return (
        <div className="space-y-4 sm:space-y-6 my-6 sm:my-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Laboratories & Computing Hub</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Showing {visibleLabs.length} of {labs.length} specialized department laboratories
                    </p>
                </div>
                <Link
                    to="/facilities"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-all self-start sm:self-auto"
                >
                    <span>Full Facilities Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Labs Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {visibleLabs.map((lab) => (
                    <div 
                        key={lab.id}
                        className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                        <div>
                            {/* Image Header */}
                            <div className="relative h-24 sm:h-48 bg-slate-900 overflow-hidden">
                                {lab.hasPhoto && lab.images && lab.images.length > 0 ? (
                                    <img 
                                        src={lab.images[0]} 
                                        alt={`${lab.labNo} - ${lab.name}`} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400">
                                        <Camera className="w-8 h-8 mb-1 text-slate-500" />
                                        <span className="text-xs font-semibold text-slate-300">Photo Pending</span>
                                        <span className="text-[10px] text-slate-500">Official photography requested</span>
                                    </div>
                                )}

                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10">
                                    <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-slate-900/90 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg border border-white/10">
                                        {lab.labNo}
                                    </span>
                                    {lab.totalSystems && (
                                        <span className="hidden sm:inline px-2.5 py-1 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                                            {lab.totalSystems} PCs
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                                <div>
                                    <h4 className="text-sm sm:text-lg leading-snug font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {lab.name}
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-1 sm:mt-2 line-clamp-4 sm:line-clamp-none">
                                        {lab.description}
                                    </p>
                                </div>

                                {/* Specs */}
                                {lab.systemConfig && lab.systemConfig.desktop && (
                                    <div className="hidden sm:block p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-600">
                                        <strong className="text-slate-900 block mb-0.5">Desktop Hardware:</strong>
                                        {lab.systemConfig.desktop}
                                        {lab.systemConfig.server && (
                                            <div className="mt-1">
                                                <strong className="text-blue-900">Server:</strong> {lab.systemConfig.server}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Hardware Kits */}
                                {lab.hardwareKits && lab.hardwareKits.length > 0 && (
                                    <div className="hidden sm:block">
                                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Specialized Hardware & Kits:
                                        </div>
                                        <ul className="text-xs text-slate-700 list-disc list-inside bg-white p-3 rounded-xl border border-slate-200/80 space-y-0.5">
                                            {lab.hardwareKits.map((h, idx) => (
                                                <li key={idx}>{h}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Software */}
                                {lab.software && lab.software.length > 0 && (
                                    <div className="hidden sm:block">
                                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Installed Software:
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {lab.software.map((sw, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[11px] font-medium rounded-md">
                                                    {sw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Subjects */}
                                {lab.subjects && lab.subjects.length > 0 && (
                                    <div className="hidden sm:block">
                                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Subjects Taught:
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {lab.subjects.map((sub, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[11px] font-semibold rounded-md border border-blue-100">
                                                    <strong className="text-blue-900">{sub.code}:</strong> {sub.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More / View Less Toggle Button */}
            {labs.length > INITIAL_LABS && (
                <div className="pt-4 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <span>
                            {isExpanded 
                                ? 'Show Fewer Laboratories' 
                                : `View More Laboratories (${hiddenCount} More)`
                            }
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
            )}

            {/* IT MOUs Section if deptKey === 'it' */}
            {deptKey === 'it' && (
                <div className="mt-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">IT Department MOUs & Industry Collaborations</h3>
                    <p className="text-xs text-slate-500">Official partnerships with industry leaders for internships, skill enhancement, and lab research setup.</p>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                    <th className="p-3">#</th>
                                    <th className="p-3">Partner</th>
                                    <th className="p-3">Domain</th>
                                    <th className="p-3">Start Date</th>
                                    <th className="p-3">Expiry</th>
                                    <th className="p-3">Students</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {itMous.map((mou) => (
                                    <tr key={mou.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-3 font-bold text-slate-400">{mou.id}</td>
                                        <td className="p-3 font-bold text-slate-900">{mou.partner}</td>
                                        <td className="p-3 text-slate-600">{mou.domain}</td>
                                        <td className="p-3 font-mono text-slate-500">{mou.mouDate}</td>
                                        <td className="p-3 font-mono text-slate-500">{mou.expiryDate}</td>
                                        <td className="p-3 font-semibold text-blue-600">{mou.beneficiaries}</td>
                                        <td className="p-3">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                mou.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-700'
                                            }`}>
                                                {mou.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentLabsSection;
