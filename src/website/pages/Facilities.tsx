import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
    Beaker, Book, Home, Trophy, Activity, Server, Cpu, Database, 
    BookOpen, ArrowRight, Search, Camera, CheckCircle2, AlertTriangle, 
    ExternalLink, X, ChevronLeft, ChevronRight, Sparkles, Filter, 
    Wrench, ShieldCheck, Layers, FileText, Check, Phone, Coffee, Landmark, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { departments, labData, itMous, campusInfrastructure } from '../data/facilitiesData';
import type { LabData } from '../data/facilitiesData';

const VALID_TABS = ['labs', 'library', 'mous'];

type LabModal = Partial<LabData> & {
    name: string;
    labNo: string;
    dept: string;
    description: string;
};

const Facilities = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const activeMainTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'labs';

    const [selectedDept, setSelectedDept] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mouFilter, setMouFilter] = useState('all'); // 'all' | 'Active' | 'In Process'
    const [selectedLabModal, setSelectedLabModal] = useState<LabModal | null>(null);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const handleTabChange = (newTab: string) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('tab', newTab);
            return next;
        }, { replace: true });
    };

    // Filter labs based on department and search query
    const filteredLabs = useMemo(() => {
        return labData.filter((lab) => {
            const matchesDept = selectedDept === 'all' || lab.deptKey === selectedDept;
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesDept;

            const matchesQuery = 
                lab.labNo.toLowerCase().includes(query) ||
                lab.name.toLowerCase().includes(query) ||
                lab.dept.toLowerCase().includes(query) ||
                lab.description.toLowerCase().includes(query) ||
                (lab.systemConfig?.desktop && lab.systemConfig.desktop.toLowerCase().includes(query)) ||
                (lab.systemConfig?.server && lab.systemConfig.server.toLowerCase().includes(query)) ||
                (lab.software || []).some(s => s.toLowerCase().includes(query)) ||
                (lab.subjects || []).some(sub => sub.name.toLowerCase().includes(query) || (sub.code || '').toLowerCase().includes(query)) ||
                (lab.hardwareKits && lab.hardwareKits.some(h => h.toLowerCase().includes(query)));

            return matchesDept && matchesQuery;
        });
    }, [selectedDept, searchQuery]);

    // Filter IT MOUs
    const filteredMous = useMemo(() => {
        return itMous.filter((mou) => {
            const matchesFilter = mouFilter === 'all' || mou.status === mouFilter;
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesFilter;

            return matchesFilter && (
                mou.partner.toLowerCase().includes(query) ||
                mou.domain.toLowerCase().includes(query)
            );
        });
    }, [mouFilter, searchQuery]);

    const openLabModal = (lab: LabModal) => {
        setSelectedLabModal(lab);
        setModalImageIndex(0);
    };

    const closeLabModal = () => {
        setSelectedLabModal(null);
    };

    return (
        <main className="min-h-screen bg-slate-50/50 transition-colors duration-300">
            <SEO 
                title="Campus Facilities & Academic Laboratories" 
                description="Explore MSIT's 33+ state-of-the-art academic laboratories across CSE, IT, ECE, EEE, Central Library with Koha OPAC, hostels, and industry MOUs."
                canonicalPath="/facilities"
            />

            <PageHero 
                title="State-of-the-Art" 
                accentTitle="Campus Facilities & Labs" 
                description="Explore MSIT's 33+ specialized laboratories, high-performance computing clusters, IoT R&D centers, central library, and student infrastructure."
                breadcrumbs={[{ label: 'Facilities' }]}
                heroImage="/campus/campus-pathway-block.webp"
                heroImageAlt="MSIT Academic Block and High-Tech Computing Facilities"
            />

            {/* Primary Tab Bar */}
            <div className="border-b border-slate-200 sticky top-[68px] xl:top-[128px] bg-white/95 backdrop-blur-md z-30 shadow-xs transition-colors duration-300">
                <div className="max-w-[92rem] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-3 sm:flex gap-1.5 sm:gap-6 py-2.5 sm:py-3">
                        <button
                            onClick={() => handleTabChange('labs')}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 cursor-pointer ${
                                activeMainTab === 'labs' 
                                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <Beaker className="hidden sm:block w-4 h-4" />
                            <span className="sm:hidden">Labs ({labData.length})</span><span className="hidden sm:inline">Laboratories ({labData.length})</span>
                        </button>

                        <button
                            onClick={() => handleTabChange('library')}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 cursor-pointer ${
                                activeMainTab === 'library' 
                                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <Book className="hidden sm:block w-4 h-4" />
                            <span className="sm:hidden">Library</span><span className="hidden sm:inline">Library & Campus</span>
                        </button>

                        <button
                            onClick={() => handleTabChange('mous')}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 cursor-pointer ${
                                activeMainTab === 'mous' 
                                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            <ShieldCheck className="hidden sm:block w-4 h-4" />
                            <span className="sm:hidden">MOUs ({itMous.length})</span><span className="hidden sm:inline">Industry MOUs & Collaborations ({itMous.length})</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-[92rem] mx-auto px-4 sm:px-6 py-6 sm:py-10">

                {/* =================================================== */}
                {/* TAB 1: LABORATORIES                                */}
                {/* =================================================== */}
                {activeMainTab === 'labs' && (
                    <div className="space-y-5 sm:space-y-8 animate-fade-in">
                        {/* Search and Department Filter Toolbar */}
                        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 sm:space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Search Bar */}
                                <div className="relative flex-1">
                                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by Lab #, Subject (CIC-355), Software (MATLAB), CPU (i7-13700)..."
                                        className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Results Count */}
                                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
                                    <Layers className="w-4 h-4 text-primary" />
                                    Showing <span className="text-slate-900 font-bold">{filteredLabs.length}</span> of {labData.length} Labs
                                </div>
                            </div>

                            {/* Department Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
                                    <Filter className="w-3.5 h-3.5" /> Dept:
                                </span>
                                {departments.map((dept) => {
                                    const count = dept.key === 'all' 
                                        ? labData.length 
                                        : labData.filter(l => l.deptKey === dept.key).length;

                                    return (
                                        <button
                                            key={dept.key}
                                            onClick={() => setSelectedDept(dept.key)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                                selectedDept === dept.key
                                                    ? 'bg-slate-900 text-white shadow-xs'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                            }`}
                                        >
                                            {dept.shortName}
                                            <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                                                selectedDept === dept.key ? 'bg-slate-800 text-blue-300' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Department Intro Banner (If specific department is selected) */}
                        {selectedDept !== 'all' && (
                            <div className="p-6 bg-gradient-to-r from-slate-900 via-[#1c3157] to-slate-900 rounded-2xl text-white shadow-md relative overflow-hidden border border-transparent">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                                        <Cpu className="w-4 h-4" />
                                        Department Profile
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-3">
                                        {departments.find(d => d.key === selectedDept)?.name}
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
                                        {departments.find(d => d.key === selectedDept)?.intro}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Labs Grid */}
                        {filteredLabs.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-xs space-y-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-800">No laboratories match your query</h4>
                                <p className="text-slate-500 text-sm max-w-md mx-auto">
                                    Try searching for different keywords such as "Python", "MATLAB", "105", "DSO", or clear your search filters.
                                </p>
                                <button 
                                    onClick={() => { setSearchQuery(''); setSelectedDept('all'); }}
                                    className="px-4 py-2 bg-primary text-white font-semibold text-xs rounded-xl hover:bg-primary-dark transition-all inline-flex items-center gap-2"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                                {filteredLabs.map((lab) => (
                                    <div 
                                        key={lab.id} 
                                        id={lab.id}
                                        className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.35)] hover:-translate-y-0.5 transition duration-300 flex flex-col group"
                                    >
                                        {/* Image Box */}
                                        <div className="relative h-28 sm:h-40 xl:h-44 bg-slate-900 overflow-hidden shrink-0">
                                            {lab.hasPhoto && (lab.images?.length ?? 0) > 0 ? (
                                                <img 
                                                    src={lab.images?.[0]} 
                                                    alt={`${lab.labNo} - ${lab.name}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                        e.currentTarget.style.display = 'none';
                                                        if (e.currentTarget.nextSibling instanceof HTMLElement) {
                                                            e.currentTarget.nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                            ) : null}

                                            {/* Fallback image box if missing or broken */}
                                            <div 
                                                className={`w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-slate-400 ${
                                                    lab.hasPhoto && (lab.images?.length ?? 0) > 0 ? 'hidden' : 'flex'
                                                }`}
                                            >
                                                <Camera className="w-8 h-8 mb-2 text-slate-600" />
                                                <span className="text-xs font-semibold text-slate-400">Photo Pending</span>
                                                <span className="text-[10px] text-slate-500">Official photo requested for {lab.labNo}</span>
                                            </div>

                                            {/* Overlay Badges */}
                                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10">
                                                <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-slate-900/90 text-white font-mono text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg shadow-xs border border-white/10">
                                                    {lab.labNo}
                                                </span>
                                                {lab.totalSystems && (
                                                    <span className="hidden sm:inline-block px-2.5 py-1 bg-primary/90 text-white text-xs font-bold rounded-lg shadow-xs">
                                                        {lab.totalSystems} PCs
                                                    </span>
                                                )}
                                                {(lab.images?.length ?? 0) > 1 && (
                                                    <span className="hidden sm:flex px-2.5 py-1 bg-slate-800/90 text-white text-xs font-bold rounded-lg shadow-xs items-center gap-1">
                                                        <Sparkles className="w-3 h-3" /> {lab.images?.length} Photos
                                                    </span>
                                                )}
                                            </div>

                                            {/* Click to Expand Overlay */}
                                            <button 
                                                onClick={() => openLabModal(lab)}
                                                className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-xs gap-2 backdrop-blur-xs"
                                            >
                                                <span>View Full Specs & Gallery</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between gap-3 sm:gap-4">
                                            <div>
                                                <div className="text-[9.5px] sm:text-[11px] font-bold text-primary uppercase tracking-wider mb-1 line-clamp-1">
                                                    {lab.dept}
                                                </div>
                                                <h4 className="text-[13px] sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                    {lab.name}
                                                </h4>

                                                {/* Specs Preview */}
                                                <p className="hidden sm:block text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                                    <strong className="text-slate-800">Hardware:</strong> {lab.systemConfig?.desktop}
                                                </p>
                                            </div>

                                            {/* Software Chips */}
                                            <div className="hidden sm:block space-y-2 pt-2 border-t border-slate-100">
                                                <div className="text-[11px] font-semibold text-slate-500">Software & Tools:</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(lab.software || []).map((sw, idx) => (
                                                        <span 
                                                            key={idx} 
                                                            className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200/60"
                                                        >
                                                            {sw}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Subjects Tags */}
                                            <div className="hidden sm:block space-y-1.5">
                                                <div className="text-[11px] font-semibold text-slate-500">Subjects Taught:</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {(lab.subjects || []).map((sub, idx) => (
                                                        <span 
                                                            key={idx}
                                                            className="px-2 py-0.5 bg-primary/5 text-primary text-[11px] font-semibold rounded-md border border-primary/15"
                                                            title={sub.name}
                                                        >
                                                            <strong className="text-primary-dark">{sub.code}:</strong> {sub.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={() => openLabModal(lab)}
                                                className="w-full mt-auto py-1.5 sm:py-2 px-2 sm:px-3 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 font-semibold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                                            >
                                                <span className="sm:hidden">Details</span><span className="hidden sm:inline">Lab Specifications & Details</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}


                {/* =================================================== */}
                {/* TAB 2: LIBRARY & CAMPUS INFRASTRUCTURE             */}
                {/* =================================================== */}
                {activeMainTab === 'library' && (
                    <div className="space-y-6 sm:space-y-12 animate-fade-in">
                        {/* Central Library Feature */}
                        <div id="central-library" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-200 shadow-card grid md:grid-cols-2 gap-5 sm:gap-8 items-center">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                                    <Book className="w-3.5 h-3.5" /> Academic Core
                                </div>
                                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                                    {campusInfrastructure.library.title}
                                </h3>
                                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                                    {campusInfrastructure.library.description}
                                </p>

                                {/* Quick Stats Grid */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:pt-2">
                                    <div className="p-3 sm:p-4 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/15">
                                        <div className="text-lg sm:text-2xl font-black text-primary-dark tabular-nums">{campusInfrastructure.library.books}</div>
                                        <div className="text-[11px] sm:text-xs font-semibold text-primary leading-snug">Printed Volumes & Reference Books</div>
                                    </div>
                                    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200">
                                        <div className="text-lg sm:text-2xl font-black text-slate-900 tabular-nums">{campusInfrastructure.library.journals}</div>
                                        <div className="text-[11px] sm:text-xs font-semibold text-slate-600 leading-snug">National & Int'l Journals</div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-2 sm:space-y-2.5 text-[13px] sm:text-sm text-slate-700 leading-snug">
                                    {campusInfrastructure.library.features.map((feat: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-2 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                                        <div className="space-y-0.5">
                                            <span className="text-[11px] font-black uppercase tracking-wider text-primary-dark block">Koha OPAC Library Portal:</span>
                                            <a 
                                                href={campusInfrastructure.library.opacUrl}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary-dark font-mono text-sm font-bold underline flex items-center gap-1.5 break-all"
                                            >
                                                {campusInfrastructure.library.opacUrl}
                                                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                            </a>
                                        </div>
                                        <a 
                                            href={campusInfrastructure.library.opacUrl}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all shrink-0"
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            Open Portal
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div 
                                    onClick={() => openLabModal({ 
                                        name: campusInfrastructure.library.title, 
                                        labNo: 'Central Facility', 
                                        dept: 'Academic Knowledge Hub', 
                                        hasPhoto: true, 
                                        images: campusInfrastructure.library.images || [campusInfrastructure.library.image],
                                        description: campusInfrastructure.library.description 
                                    })}
                                    className="rounded-2xl overflow-hidden border border-slate-200 shadow-md relative group cursor-pointer"
                                >
                                    <img 
                                        src={campusInfrastructure.library.image} 
                                        alt="MSIT Central Library Reading Hall" 
                                        className="w-full h-48 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>View {campusInfrastructure.library.images?.length || 6} Photos</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs leading-relaxed border border-transparent">
                                    <strong className="text-blue-400 block mb-1">Book Bank Scheme (Since 2006):</strong>
                                    Every enrolled MSIT student receives a complete set of textbooks for all registered courses per academic semester, free of additional loan charges.
                                </div>
                            </div>
                        </div>

                        {/* Campus Living & Sports Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Hostel */}
                            <div id="hostel" className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-card flex flex-col justify-between space-y-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold mb-4">
                                        <Home className="w-3.5 h-3.5" /> Residential Life
                                    </div>
                                    <h4 className="text-2xl font-bold mb-3">{campusInfrastructure.hostel.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        {campusInfrastructure.hostel.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 text-xs font-semibold mb-6">
                                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-100">
                                            Boys Hostel: {campusInfrastructure.hostel.boysCapacity} Capacity
                                        </div>
                                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-100">
                                            Girls Hostel: {campusInfrastructure.hostel.girlsCapacity} Capacity
                                        </div>
                                    </div>
                                    <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                                        {campusInfrastructure.hostel.amenities.map((am: string, idx: number) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                {am}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div 
                                    onClick={() => openLabModal({ 
                                        name: campusInfrastructure.hostel.title, 
                                        labNo: 'Boys Hostel', 
                                        dept: 'Residential Campus', 
                                        hasPhoto: true, 
                                        images: campusInfrastructure.hostel.images || [campusInfrastructure.hostel.image],
                                        description: campusInfrastructure.hostel.description 
                                    })}
                                    className="rounded-xl overflow-hidden border border-slate-800 h-48 relative group cursor-pointer"
                                >
                                    <img 
                                        src={campusInfrastructure.hostel.image} 
                                        alt="Hostel block" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>View {campusInfrastructure.hostel.images?.length || 6} Photos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sports */}
                            <div id="sports" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">
                                        <Trophy className="w-3.5 h-3.5" /> Athletics & Sports
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-3">{campusInfrastructure.sports.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {campusInfrastructure.sports.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {campusInfrastructure.sports.facilities.map((fac: string, idx: number) => (
                                            <span key={idx} className="px-3 py-1 bg-primary/5 text-primary-dark text-xs font-bold rounded-lg border border-primary/15">
                                                {fac}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div 
                                    onClick={() => openLabModal({ 
                                        name: campusInfrastructure.sports.title, 
                                        labNo: 'Sports Arena', 
                                        dept: 'Physical Education & Athletics', 
                                        hasPhoto: true, 
                                        images: campusInfrastructure.sports.images || [campusInfrastructure.sports.image],
                                        description: campusInfrastructure.sports.description 
                                    })}
                                    className="rounded-2xl overflow-hidden border border-slate-200 h-48 relative group cursor-pointer"
                                >
                                    <img 
                                        src={campusInfrastructure.sports.image} 
                                        alt="MSIT Sports Ground" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>View {campusInfrastructure.sports.images?.length || 6} Photos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Room & Health Center */}
                            <div id="medical" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6 md:col-span-2 lg:col-span-1">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-4">
                                        <Activity className="w-3.5 h-3.5" /> Health Care & Emergency Room
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-3">{campusInfrastructure.medical.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {campusInfrastructure.medical.description}
                                    </p>
                                    <div className="bg-red-50/90 rounded-2xl p-4 border border-red-100 mb-6">
                                        <div className="text-[11px] font-black uppercase tracking-wider text-red-700 mb-1 flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5" /> Medical Attendant Desk (Emergency Contact)
                                        </div>
                                        <div className="text-sm font-extrabold text-slate-900">{campusInfrastructure.medical.attendantName}</div>
                                        <div className="text-xs font-semibold text-slate-700 mt-2 flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5"><strong className="text-slate-500">Phone:</strong> <code className="bg-white px-2 py-0.5 rounded border border-red-200 font-mono text-red-700 font-bold">{campusInfrastructure.medical.attendantPhone}</code></span>
                                            <span className="flex items-center gap-1.5"><strong className="text-slate-500">Landline Ext:</strong> <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-slate-800 font-bold">{campusInfrastructure.medical.landline}</code></span>
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        {campusInfrastructure.medical.facilities.map((fac: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                                                <span>{fac}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Canteen & Cafeteria */}
                            <div id="canteen" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">
                                        <Coffee className="w-3.5 h-3.5" /> Dining & Cafeteria
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-3">{campusInfrastructure.canteen.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {campusInfrastructure.canteen.description}
                                    </p>
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 mb-4">
                                        Capacity: {campusInfrastructure.canteen.capacity} (Indoor & Outdoor Pergolas)
                                    </div>
                                </div>
                                <div 
                                    onClick={() => openLabModal({ 
                                        name: campusInfrastructure.canteen.title, 
                                        labNo: 'Rivanto Cafeteria', 
                                        dept: 'Student Amenities', 
                                        hasPhoto: true, 
                                        images: campusInfrastructure.canteen.images || [campusInfrastructure.canteen.image],
                                        description: campusInfrastructure.canteen.description 
                                    })}
                                    className="rounded-2xl overflow-hidden border border-slate-200 h-48 relative group cursor-pointer"
                                >
                                    <img 
                                        src={campusInfrastructure.canteen.image} 
                                        alt="Rivanto Canteen" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>View {campusInfrastructure.canteen.images?.length || 3} Photos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Law Block */}
                            {campusInfrastructure.lawBlock && (
                                <div id="law-block" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold mb-4">
                                            <Landmark className="w-3.5 h-3.5" /> Academic Wings
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-3">{campusInfrastructure.lawBlock.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                            {campusInfrastructure.lawBlock.description}
                                        </p>
                                    </div>
                                    <div 
                                        onClick={() => openLabModal({ 
                                            name: campusInfrastructure.lawBlock.title, 
                                            labNo: 'Law Block', 
                                            dept: 'Academic Facilities', 
                                            hasPhoto: true, 
                                            images: campusInfrastructure.lawBlock.images || [campusInfrastructure.lawBlock.image],
                                            description: campusInfrastructure.lawBlock.description 
                                        })}
                                        className="rounded-2xl overflow-hidden border border-slate-200 h-48 relative group cursor-pointer"
                                    >
                                        <img 
                                            src={campusInfrastructure.lawBlock.image} 
                                            alt="Law Block Architecture" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                            <Camera className="w-3.5 h-3.5" />
                                            <span>View {campusInfrastructure.lawBlock.images?.length || 4} Photos</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* NCC Unit */}
                            {campusInfrastructure.ncc && (
                                <div id="ncc" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-4">
                                            <ShieldCheck className="w-3.5 h-3.5" /> Defense Training & NCC
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-3">{campusInfrastructure.ncc.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                            {campusInfrastructure.ncc.description}
                                        </p>
                                    </div>
                                    <div 
                                        onClick={() => openLabModal({ 
                                            name: campusInfrastructure.ncc.title, 
                                            labNo: '7 DGBN Unit', 
                                            dept: 'National Cadet Corps', 
                                            hasPhoto: true, 
                                            images: campusInfrastructure.ncc.images || [campusInfrastructure.ncc.image],
                                            description: campusInfrastructure.ncc.description 
                                        })}
                                        className="rounded-2xl overflow-hidden border border-slate-200 h-48 relative group cursor-pointer"
                                    >
                                        <img 
                                            src={campusInfrastructure.ncc.image} 
                                            alt="7 DGBN NCC Cadets Parade" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                            <Camera className="w-3.5 h-3.5" />
                                            <span>View {campusInfrastructure.ncc.images?.length || 4} Photos</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Administration & Conference */}
                            {campusInfrastructure.admin && (
                                <div id="admin-offices" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card flex flex-col justify-between space-y-6">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-bold mb-4">
                                            <Briefcase className="w-3.5 h-3.5" /> Executive Governance
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-3">{campusInfrastructure.admin.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                            {campusInfrastructure.admin.description}
                                        </p>
                                    </div>
                                    <div 
                                        onClick={() => openLabModal({ 
                                            name: campusInfrastructure.admin.title, 
                                            labNo: 'Conference Hall', 
                                            dept: 'Executive Governance', 
                                            hasPhoto: true, 
                                            images: campusInfrastructure.admin.images || [campusInfrastructure.admin.image],
                                            description: campusInfrastructure.admin.description 
                                        })}
                                        className="rounded-2xl overflow-hidden border border-slate-200 h-48 relative group cursor-pointer"
                                    >
                                        <img 
                                            src={campusInfrastructure.admin.image} 
                                            alt="Conference Room with Portraits" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                                            <Camera className="w-3.5 h-3.5" />
                                            <span>View {campusInfrastructure.admin.images?.length || 3} Photos</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Banner link to full photo archive */}
                        <div className="bg-gradient-to-r from-slate-900 via-[#1c3157] to-slate-900 text-white rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <span className="text-blue-400 text-xs font-extrabold uppercase tracking-widest block">250+ Verified Photographs Available</span>
                                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Looking for the Complete Campus Photo Directory?</h3>
                                <p className="text-slate-300 text-xs md:text-sm max-w-xl">
                                    Explore all 17 categories including high-resolution sports action, computing research labs, residential blocks, and historic archives.
                                </p>
                            </div>
                            <Link
                                to="/virtual-tour?tab=archive"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
                            >
                                <Camera className="w-4 h-4" />
                                <span>Open Full Photo Archive</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}


                {/* =================================================== */}
                {/* TAB 3: INDUSTRY MOUS & COLLABORATIONS               */}
                {/* =================================================== */}
                {activeMainTab === 'mous' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Industry MOUs & Institutional Collaborations</h3>
                                    <p className="text-slate-600 text-xs sm:text-sm mt-1">
                                        Official Memorandums of Understanding for student internships, research lab setups, and industrial skill development.
                                    </p>
                                </div>

                                {/* Status Filter Pills */}
                                <div className="flex flex-wrap items-center gap-2 shrink-0">
                                    {['all', 'Active', 'In Process'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setMouFilter(status)}
                                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer ${
                                                mouFilter === status
                                                    ? 'bg-slate-900 text-white shadow-xs'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {status === 'all' ? `All MOUs (${itMous.length})` : status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Table */}
                            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-700 text-xs font-bold border-b border-slate-200">
                                            <th className="p-3.5">#</th>
                                            <th className="p-3.5">Industry Partner</th>
                                            <th className="p-3.5">Domain / Collaboration Area</th>
                                            <th className="p-3.5 whitespace-nowrap">MOU Date</th>
                                            <th className="p-3.5 whitespace-nowrap">Valid Until</th>
                                            <th className="p-3.5">Beneficiaries & Impact</th>
                                            <th className="p-3.5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredMous.map((mou) => (
                                            <tr key={mou.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-3.5 font-semibold text-slate-500 tabular-nums">{mou.id}</td>
                                                <td className="p-3.5 font-bold text-slate-900">{mou.partner}</td>
                                                <td className="p-3.5 text-slate-600">{mou.domain}</td>
                                                <td className="p-3.5 text-slate-600 tabular-nums whitespace-nowrap">{mou.mouDate}</td>
                                                <td className="p-3.5 text-slate-600 tabular-nums whitespace-nowrap">{mou.expiryDate}</td>
                                                <td className="p-3.5 text-slate-700">{mou.beneficiaries}</td>
                                                <td className="p-3.5">
                                                    <span className={`inline-block whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                                        mou.status === 'Active' 
                                                            ? 'bg-primary/10 text-primary' 
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        {mou.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Phones: one row per MOU instead of a table that scrolls sideways */}
                            <ul className="md:hidden divide-y divide-slate-200 border-y border-slate-200">
                                {filteredMous.map((mou) => (
                                    <li key={mou.id} className="py-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="text-sm font-bold text-slate-900 leading-snug">{mou.partner}</p>
                                            <span className={`shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                mou.status === 'Active'
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {mou.status}
                                            </span>
                                        </div>
                                        <p className="mt-0.5 text-xs text-slate-600 leading-snug">{mou.domain}</p>
                                        <p className="mt-1.5 text-[11px] text-slate-500 tabular-nums">Signed {mou.mouDate} · Valid until {mou.expiryDate}</p>
                                        <p className="mt-1 text-xs text-slate-700 leading-snug">{mou.beneficiaries}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

            </div>

            {/* =================================================== */}
            {/* LAB SPECIFICATIONS & GALLERY MODAL                  */}
            {/* =================================================== */}
            {selectedLabModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-mono font-bold rounded-md">
                                        {selectedLabModal.labNo}
                                    </span>
                                    <span className="text-xs font-bold text-slate-500 uppercase">
                                        {selectedLabModal.dept}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mt-1">
                                    {selectedLabModal.name}
                                </h3>
                            </div>
                            <button 
                                onClick={closeLabModal}
                                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">

                            {/* Gallery Preview if photos available */}
                            {selectedLabModal.hasPhoto && (selectedLabModal.images?.length ?? 0) > 0 ? (
                                <div className="space-y-3">
                                    <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                                        <img 
                                            src={selectedLabModal.images?.[modalImageIndex]} 
                                            alt={selectedLabModal.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {(selectedLabModal.images?.length ?? 0) > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setModalImageIndex((prev) => (prev > 0 ? prev - 1 : (selectedLabModal.images?.length ?? 1) - 1))}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-950/60 text-white rounded-full flex items-center justify-center hover:bg-slate-950 transition-colors cursor-pointer"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setModalImageIndex((prev) => (prev < (selectedLabModal.images?.length ?? 1) - 1 ? prev + 1 : 0))}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-950/60 text-white rounded-full flex items-center justify-center hover:bg-slate-950 transition-colors cursor-pointer"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    {(selectedLabModal.images?.length ?? 0) > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-1">
                                            {(selectedLabModal.images || []).map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setModalImageIndex(idx)}
                                                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                                        modalImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'
                                                    }`}
                                                >
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-8 bg-slate-100 rounded-2xl text-center space-y-2 text-slate-500">
                                    <Camera className="w-8 h-8 mx-auto text-slate-400" />
                                    <p className="text-xs font-semibold">Official photography pending for {selectedLabModal.labNo}</p>
                                </div>
                            )}

                            {/* Detailed Description */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Curriculum & Practical Scope:</h4>
                                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    {selectedLabModal.description}
                                </p>
                            </div>

                            {/* System Configurations */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">System Specifications:</h4>
                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/15 space-y-2 text-xs">
                                    <p className="text-slate-800">
                                        <strong className="text-primary-dark">Desktop Configurations:</strong> {selectedLabModal.systemConfig?.desktop}
                                    </p>
                                    {selectedLabModal.systemConfig?.server && (
                                        <p className="text-slate-800">
                                            <strong className="text-primary-dark">Server System:</strong> {selectedLabModal.systemConfig?.server}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Hardware Kits if available */}
                            {selectedLabModal.hardwareKits && selectedLabModal.hardwareKits.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Specialized Hardware & Kits:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {selectedLabModal.hardwareKits.map((kit, idx) => (
                                            <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2">
                                                <Wrench className="w-3.5 h-3.5 text-primary shrink-0" />
                                                <span>{kit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Software & Subjects */}
                            <div className="grid md:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Installed Software:</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(selectedLabModal.software || []).map((sw, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg border border-slate-200">
                                                {sw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subjects & Course Codes:</h4>
                                    <div className="space-y-1">
                                        {(selectedLabModal.subjects || []).map((sub, idx) => (
                                            <div key={idx} className="text-xs font-medium text-slate-800">
                                                <span className="font-mono font-bold text-primary">{sub.code}:</span> {sub.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Facilities;
