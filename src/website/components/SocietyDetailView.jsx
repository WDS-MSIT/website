import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Calendar, MapPin, Mail, Phone, ExternalLink, ArrowRight,
    ChevronRight, ChevronLeft, ChevronDown, Award, Trophy, Users, Sparkles,
    Code2, GraduationCap, Layers, Share2, Cpu, Medal, FolderGit2,
    Github, FileText, BookOpen, FileCode, Presentation, HelpCircle,
    ShieldCheck, CheckCircle2, Globe, Heart, MessageSquare, ArrowUpRight,
    Search, Bell, Download
} from 'lucide-react';
import SEO from './SEO';

// Icon map for dynamic lookup
const iconMap = {
    Code2: Code2,
    Sparkles: Sparkles,
    Trophy: Trophy,
    GraduationCap: GraduationCap,
    Layers: Layers,
    Share2: Share2,
    Cpu: Cpu,
    Award: Award,
    Medal: Medal,
    FolderGit2: FolderGit2,
    Github: Github,
    FileText: FileText,
    BookOpen: BookOpen,
    FileCode: FileCode,
    Presentation: Presentation,
    HelpCircle: HelpCircle,
    ShieldCheck: ShieldCheck
};

const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = iconMap[iconName] || Sparkles;
    return <IconComponent className={className} />;
};

// Navigation sections matching reference image left menu
const NAV_ITEMS = [
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'objectives', label: 'Objectives', icon: Award },
    { id: 'activities', label: 'Activities', icon: Layers },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'projects', label: 'Projects & Research', icon: FolderGit2 },
    { id: 'people', label: 'People', icon: Users },
    { id: 'gallery', label: 'Media Gallery', icon: Sparkles },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'recruitment', label: 'Recruitment', icon: GraduationCap },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'connect', label: 'Connect', icon: Share2 }
];

const SocietyDetailView = ({ society }) => {
    const [activeSection, setActiveSection] = useState('about');
    const [galleryTab, setGalleryTab] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = NAV_ITEMS;

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            // Must tightly match the yOffset (-120) from scrollToSection + a small buffer (20px)
            // Otherwise, short sections will be incorrectly hijacked by the next section!
            const triggerLine = 140; 
            
            const candidates = [];
            for (const item of NAV_ITEMS) {
                const element = document.getElementById(item.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= triggerLine) {
                        candidates.push({ id: item.id, top: rect.top });
                    }
                }
            }
            
            if (candidates.length > 0) {
                // Find the candidate with the highest top value (closest to the trigger line)
                const bestTop = Math.max(...candidates.map(c => c.top));
                // Get all candidates on this same vertical row
                const rowCandidates = candidates.filter(c => Math.abs(c.top - bestTop) < 20);
                const rowIds = rowCandidates.map(c => c.id);
                
                setActiveSection(prev => {
                    // If the previously active section is on this same row, keep it highlighted
                    if (rowIds.includes(prev)) return prev;
                    // Otherwise, default to the first one in the row
                    return rowIds[0];
                });
            } else {
                setActiveSection(NAV_ITEMS[0].id);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Call once on mount to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter gallery
    const filteredGallery = galleryTab === 'all' 
        ? society.gallery 
        : society.gallery.filter(item => item.category === galleryTab);

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
            <SEO 
                title={`${society.name} | MSIT Student Societies`}
                description={society.overview || society.tagline}
                canonicalPath={`/${society.slug}`}
            />

            {/* =========================================================
                TOP HERO BANNER (Dark sleek theme with Society identity)
               ========================================================= */}
            <section className="bg-slate-950 text-white pt-28 sm:pt-40 pb-16 px-4 sm:px-8 border-b border-slate-900 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left: Logo Emblem & Main Info */}
                        <div className="lg:col-span-8 flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                            {/* Monogram / Logo Box */}
                            <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-2xl relative group overflow-hidden ${society.logo ? 'bg-white/95 p-2' : 'bg-slate-900 border-2 border-slate-800 p-2 sm:p-4'}`}>
                                {society.logo ? (
                                    <img src={society.logo} alt={`${society.name} Logo`} className="w-full h-full object-contain rounded-xl" />
                                ) : (
                                    <>
                                        <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-wider font-mono">
                                            {society.logoSymbol || "</>"}
                                        </div>
                                        <span className="text-xs font-black tracking-widest text-slate-300 mt-2">
                                            {society.logoText || "MSI(T)"}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Title, Badges & Actions */}
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                                        {society.name}
                                    </h1>
                                    <span className="px-3 py-1 bg-slate-800/90 text-slate-300 border border-slate-700 rounded-md text-[11px] font-semibold uppercase tracking-wider">
                                        {society.category}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                                    <span className="px-1.5 py-0.5 bg-purple-900/60 border border-purple-700/50 rounded text-xs font-mono">
                                        {society.shortName}
                                    </span>
                                    <span>{society.tagline}</span>
                                </div>

                                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                                    {society.overview}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-3">
                                    <a 
                                        href={society.joinUrl || "#recruitment"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                                    >
                                        <span>Join Our Society</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>

                                    {society.website && (
                                        <a 
                                            href={society.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 rounded-xl text-xs font-bold transition-all active:scale-95"
                                        >
                                            <span>Visit Official Website</span>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Key Facts Meta Box (Matches dark right card in reference) */}
                        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
                            <div className="flex items-center gap-3 text-xs">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Established</div>
                                    <div className="text-white font-bold">{society.established}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <Layers className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Department / Branch</div>
                                    <div className="text-white font-bold">{society.department}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Society Email</div>
                                    <a href={`mailto:${society.email}`} className="text-blue-400 hover:underline font-bold truncate block">
                                        {society.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Contact Number</div>
                                    <div className="text-white font-bold">{society.phone}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Meeting Location</div>
                                    <div className="text-white font-bold">{society.officeRoom || society.location}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                QUICK STATS STRIP (Pill / Cards bar below hero)
               ========================================================= */}
            <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8 shadow-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                    <div className="flex items-center gap-3 px-2 py-1">
                        <Calendar className="w-5 h-5 text-indigo-600 shrink-0" />
                        <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Established</div>
                            <div className="text-xs font-bold text-slate-900">{society.established}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 py-1">
                        <Layers className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Department / Branch</div>
                            <div className="text-xs font-bold text-slate-900 truncate">{society.department}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 py-1">
                        <Mail className="w-5 h-5 text-purple-600 shrink-0" />
                        <div className="overflow-hidden">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Society Email</div>
                            <div className="text-xs font-bold text-slate-900 truncate">{society.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 py-1">
                        <Users className="w-5 h-5 text-indigo-600 shrink-0" />
                        <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Student Coordinator</div>
                            <div className="text-xs font-bold text-slate-900 truncate">
                                {society.people?.student?.name}
                                <span className="block text-[10px] text-slate-500 font-normal">President</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 py-1">
                        <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Faculty Coordinator</div>
                            <div className="text-xs font-bold text-slate-900 truncate">
                                {society.people?.faculty?.name}
                                <span className="block text-[10px] text-slate-500 font-normal">{society.people?.faculty?.designation}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 py-1">
                        <Award className="w-5 h-5 text-purple-600 shrink-0" />
                        <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Membership</div>
                            <div className="text-xs font-bold text-slate-900">{society.membership}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
                MAIN TWO-COLUMN WORKSPACE WITH STICKY SIDEBAR
               ========================================================= */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* =========================================================
                        LEFT SIDEBAR: SECTION NAVIGATOR & PROMO CTA
                       ========================================================= */}
                    <aside className="lg:col-span-3 sticky top-40 z-30 lg:space-y-6">
                        
                        {/* Navigation Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-3 overflow-hidden mb-6 lg:mb-0">
                            {/* Mobile Toggle Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-full flex items-center justify-between lg:hidden px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-700"
                            >
                                <span>Jump to Section</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Desktop Title (Hidden on Mobile) */}
                            <div className="hidden lg:block text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 py-2">
                                Jump to Section
                            </div>

                            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:grid-rows-[1fr] lg:opacity-100 ${isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="pt-2 mt-2 border-t border-slate-100 lg:border-none lg:mt-0 lg:pt-0">
                                        <nav className="space-y-1">
                                            {navItems.map((item) => {
                                                const IconComponent = item.icon;
                                                const isActive = activeSection === item.id;
                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => {
                                                            scrollToSection(item.id);
                                                            setIsMobileMenuOpen(false); // Auto close on mobile
                                                        }}
                                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                                                            isActive 
                                                                ? 'bg-purple-50 text-purple-700 font-bold border-l-4 border-purple-600 shadow-sm' 
                                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                        }`}
                                                    >
                                                        <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                                                        <span>{item.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Join CTA Card (Matches reference bottom left card) */}
                        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
                            
                            <div className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-1">Be a part of</div>
                            <h3 className="text-base font-black mb-3">{society.name}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-5 font-normal">
                                Learn, build, collaborate and grow with our community across MSIT and nationwide.
                            </p>
                            
                            <a
                                href={society.joinUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-center text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95"
                            >
                                Join Our Community
                            </a>
                        </div>
                    </aside>

                    {/* =========================================================
                        RIGHT MAIN COLUMN: RICH CONTENT SECTIONS
                       ========================================================= */}
                    <main className="lg:col-span-9 space-y-16">

                        {/* SECTION: ABOUT THIS SOCIETY */}
                        <section id="about" className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                                    ABOUT THIS SOCIETY
                                </span>
                            </div>

                            {/* Story & Detailed About */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                <div className="md:col-span-8 space-y-6">
                                    
                                    {/* Detailed Story Box */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative pl-8">
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-l-2xl"></div>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                                            <Sparkles className="w-4 h-4" />
                                            <span>Detailed About</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {society.detailedAbout}
                                        </p>
                                    </div>

                                    {/* Mission, Vision, Objectives cards */}
                                    <div className="space-y-4">
                                        
                                        {/* Mission */}
                                        <div id="mission" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                                                <Award className="w-5 h-5" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-bold text-slate-900">Mission</h4>
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    {society.mission}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Vision */}
                                        <div id="vision" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-bold text-slate-900">Vision</h4>
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    {society.vision}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Objectives */}
                                        <div id="objectives" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                                <span>Objectives</span>
                                            </div>
                                            <ul className="space-y-2.5 text-xs text-slate-600 pl-1">
                                                {society.objectives?.map((obj, i) => (
                                                    <li key={i} className="flex items-start gap-2.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0"></span>
                                                        <span className="leading-relaxed">{obj}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                {/* Right Side: Hero Photo & Glance Box */}
                                <div className="md:col-span-4 space-y-6">
                                    
                                    {/* Team/Event Photo */}
                                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
                                        <img 
                                            src={society.heroImage} 
                                            alt={society.name} 
                                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="p-3 bg-slate-900 text-white text-center text-[11px] font-medium">
                                            {society.name} Community Snapshot
                                        </div>
                                    </div>

                                    {/* Quick Links Card */}
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
                                        <div className="font-bold text-slate-900 mb-2">Quick Links</div>
                                        <button onClick={() => scrollToSection('events')} className="w-full flex items-center gap-2 text-slate-600 hover:text-purple-600 py-1 transition-colors">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Upcoming Events</span>
                                        </button>
                                        <button onClick={() => scrollToSection('achievements')} className="w-full flex items-center gap-2 text-slate-600 hover:text-purple-600 py-1 transition-colors">
                                            <Trophy className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Achievements</span>
                                        </button>
                                        <button onClick={() => scrollToSection('projects')} className="w-full flex items-center gap-2 text-slate-600 hover:text-purple-600 py-1 transition-colors">
                                            <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Projects</span>
                                        </button>
                                        <button onClick={() => scrollToSection('resources')} className="w-full flex items-center gap-2 text-slate-600 hover:text-purple-600 py-1 transition-colors">
                                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Resources</span>
                                        </button>
                                        <a href={society.joinUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 text-purple-700 font-semibold py-1 hover:underline">
                                            <Users className="w-3.5 h-3.5 text-purple-600" />
                                            <span>Join Team</span>
                                        </a>
                                    </div>

                                    {/* Society At A Glance Table */}
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2.5">
                                        <div className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                                            Society At A Glance
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Category</span>
                                            <span className="font-bold text-slate-800">{society.category}</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Short Name</span>
                                            <span className="font-bold text-slate-800">{society.shortName}</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Established</span>
                                            <span className="font-bold text-slate-800">{society.established}</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Office / Room</span>
                                            <span className="font-bold text-slate-800">{society.location}</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-slate-50">
                                            <span className="text-slate-400">Membership</span>
                                            <span className="font-bold text-emerald-600">{society.membership}</span>
                                        </div>
                                        {society.website && (
                                            <div className="flex justify-between py-1 border-b border-slate-50">
                                                <span className="text-slate-400">Website</span>
                                                <a href={society.website} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                                                    <span>{society.websiteLabel || society.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-slate-400">Social</span>
                                            <div className="flex gap-2 text-slate-500">
                                                {society.socials?.instagram && (
                                                    <a href={society.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                                                        <Globe className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {society.socials?.linkedin && (
                                                    <a href={society.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
                                                        <Share2 className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {society.socials?.youtube && (
                                                    <a href={society.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                                                        <Presentation className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                        {/* SECTION: WHAT WE DO (Activities Carousel / Multi-card Strip) */}
                        <section id="activities" className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                                    WHAT WE DO
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                {society.whatWeDo?.map((item, i) => (
                                    <div 
                                        key={i} 
                                        className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 group-hover:bg-purple-600 group-hover:text-white text-purple-600 flex items-center justify-center mb-3 transition-colors">
                                            {renderIcon(item.icon, "w-5 h-5")}
                                        </div>
                                        <div className="text-xs font-bold text-slate-900 mb-1">
                                            {item.title}
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-tight">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION: EVENTS (Upcoming Featured + Past Grid) */}
                        <section id="events" className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                                    EVENTS
                                </span>
                                <Link to="/events" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    <span>View All Events</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                                
                                {/* Featured Upcoming Event Card (Dark Purple Theme) */}
                                {society.events?.upcoming && (
                                    <div className="md:col-span-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-2xl p-6 text-white border border-purple-900/50 shadow-lg flex flex-col justify-between relative overflow-hidden">
                                        
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="px-2.5 py-1 bg-purple-600/80 text-[10px] font-bold uppercase tracking-wider rounded-md">
                                                    Upcoming Event
                                                </span>
                                                <div className="flex gap-1">
                                                    <button className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70">
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    <button className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Date Box + Title */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-16 h-16 rounded-xl bg-purple-600/30 border border-purple-500/40 flex flex-col items-center justify-center shrink-0">
                                                    <div className="text-2xl font-black">{society.events.upcoming.day}</div>
                                                    <div className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                                                        {society.events.upcoming.month} {society.events.upcoming.year}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-black tracking-tight uppercase text-white mb-1">
                                                        {society.events.upcoming.title}
                                                    </h3>
                                                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                                                        {society.events.upcoming.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date, Time & Venue strip */}
                                        <div className="pt-4 border-t border-white/10 text-[11px] text-slate-300 flex flex-wrap gap-4 items-center">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                                                <span>{society.events.upcoming.dateString}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span>|</span>
                                                <span>{society.events.upcoming.timeString}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                                                <span>{society.events.upcoming.location}</span>
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {/* Past Events Grid */}
                                <div className="md:col-span-6 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-slate-700">Past Events</span>
                                        <Link to="/events" className="text-[11px] font-semibold text-blue-600 hover:underline">
                                            View Gallery →
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {society.events?.past?.map((evt, i) => (
                                            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
                                                <img 
                                                    src={evt.image} 
                                                    alt={evt.title} 
                                                    className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="p-2.5">
                                                    <div className="text-[11px] font-bold text-slate-900 truncate">
                                                        {evt.title}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 font-medium">
                                                        {evt.date}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* SECTION: ACHIEVEMENTS, PROJECTS & RESOURCES (3-Column Layout) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Column 1: Achievements */}
                            <section id="achievements" className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                                        ACHIEVEMENTS
                                    </span>
                                    <span className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">
                                        View All →
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {society.achievements?.map((ach, i) => (
                                        <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                                {renderIcon(ach.icon, "w-4 h-4")}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{ach.title}</h4>
                                                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{ach.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Column 2: Projects & Research */}
                            <section id="projects" className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                                        PROJECTS & RESEARCH
                                    </span>
                                    <span className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">
                                        View All →
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {society.projects?.map((proj, i) => (
                                        <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                {renderIcon(proj.icon, "w-4 h-4")}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                                                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{proj.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Column 3: Resources */}
                            <section id="resources" className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                                        RESOURCES
                                    </span>
                                    <span className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">
                                        View All →
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {society.resources?.map((res, i) => (
                                        <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                                {renderIcon(res.icon, "w-4 h-4")}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{res.title}</h4>
                                                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{res.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* SECTION: PEOPLE & TEAM (Faculty, Student, Core Team) */}
                        <section id="people" className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                                    PEOPLE
                                </span>
                                <Link to="/faculty" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    <span>View All</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                
                                {/* Faculty Coordinator Card */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                                    <img 
                                        src={society.people?.faculty?.image || "/faculty/rinky-dwivedi.webp"} 
                                        alt={society.people?.faculty?.name} 
                                        className="w-14 h-14 rounded-full object-cover border-2 border-purple-100 shrink-0"
                                    />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{society.people?.faculty?.name}</h4>
                                        <div className="text-xs text-slate-500">{society.people?.faculty?.role}</div>
                                        <div className="text-[11px] font-semibold text-purple-700">{society.people?.faculty?.designation}</div>
                                    </div>
                                </div>

                                {/* Student Coordinator Card */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                                    <img 
                                        src={society.people?.student?.image || "/ananya-iyer.webp"} 
                                        alt={society.people?.student?.name} 
                                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shrink-0"
                                    />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{society.people?.student?.name}</h4>
                                        <div className="text-xs text-slate-500">{society.people?.student?.role}</div>
                                        <div className="text-[11px] font-semibold text-blue-700">{society.people?.student?.department}</div>
                                    </div>
                                </div>

                                {/* Core Team Card */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-4 h-4 text-purple-600" />
                                        <div className="text-xs font-bold text-slate-900">Core Team</div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 mb-3">
                                        Meet our amazing core team members and leads
                                    </p>
                                    <div className="flex items-center">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {society.people?.coreTeam?.map((member, i) => (
                                                <img 
                                                    key={i} 
                                                    src={member.image} 
                                                    alt={member.name} 
                                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-3 text-[11px] font-bold text-slate-600">
                                            {society.people?.coreTeamCount || "+ More"}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* SECTION: GALLERY & MEDIA */}
                        <section id="gallery" className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-4">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                                    GALLERY & MEDIA
                                </span>
                                
                                {/* Filter Tabs */}
                                <div className="flex gap-2">
                                    {[
                                        { id: 'all', label: 'All Media' },
                                        { id: 'society', label: 'Society Photos' },
                                        { id: 'events', label: 'Event Photos' }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setGalleryTab(tab.id)}
                                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                                galleryTab === tab.id
                                                    ? 'bg-purple-600 text-white shadow-sm'
                                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Photos Grid (Matches 4-card photo row in reference) */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {filteredGallery?.map((item, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setLightboxImage(item.image)}
                                        className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group cursor-pointer aspect-video bg-slate-900"
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                            <span className="text-[10px] text-white font-medium truncate">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center pt-2">
                                <Link
                                    to="/virtual-tour"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                                >
                                    <span>View Full Gallery</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </section>

                        {/* SECTION: BOTTOM ACTION CARDS (Announcements, Recruitment, FAQ, Connect) */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            {/* Announcements */}
                            <div id="announcements" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                                        Announcements
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-normal">
                                        Latest notices, schedules, and important information.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => scrollToSection('events')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                        <span>View All</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Recruitment */}
                            <div id="recruitment" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                                        Recruitment
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-normal">
                                        Join our passionate team and be a part of the journey!
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <a 
                                        href={society.recruitment?.formUrl || society.joinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
                                    >
                                        <span>Apply Now</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div id="faq" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                                        <HelpCircle className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                                        FAQ
                                    </h4>
                                    <p className="text-[11px] text-slate-500 leading-normal">
                                        Frequently asked questions and detailed answers.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button 
                                        onClick={() => {
                                            const faqEl = document.getElementById('faq-accordion');
                                            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                                    >
                                        <span>View FAQ</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Connect With Us */}
                            <div id="connect" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                                        Connect With Us
                                    </h4>
                                    <div className="flex gap-2.5">
                                        {society.socials?.instagram && (
                                            <a href={society.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center text-slate-600 transition-colors">
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                        {society.socials?.linkedin && (
                                            <a href={society.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-slate-600 transition-colors">
                                                <Share2 className="w-4 h-4" />
                                            </a>
                                        )}
                                        {society.socials?.youtube && (
                                            <a href={society.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-slate-600 transition-colors">
                                                <Presentation className="w-4 h-4" />
                                            </a>
                                        )}
                                        {society.email && (
                                            <a href={`mailto:${society.email}`} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center text-slate-600 transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-xs font-bold text-slate-500">
                                        Follow Us
                                    </span>
                                </div>
                            </div>

                        </section>

                        {/* EXPANDABLE FAQ ACCORDION */}
                        {society.faqs && society.faqs.length > 0 && (
                            <section id="faq-accordion" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-purple-600" />
                                    <span>Frequently Asked Questions</span>
                                </h3>
                                <div className="space-y-3">
                                    {society.faqs.map((faq, i) => (
                                        <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
                                            <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-xs text-slate-900 bg-slate-50/50 hover:bg-slate-50">
                                                <span>{faq.q}</span>
                                                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                                            </summary>
                                            <p className="p-4 pt-2 text-xs text-slate-600 leading-relaxed bg-white">
                                                {faq.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                    </main>

                </div>
            </div>

            {/* LIGHTBOX MODAL FOR GALLERY */}
            {lightboxImage && (
                <div 
                    onClick={() => setLightboxImage(null)}
                    className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
                >
                    <img 
                        src={lightboxImage} 
                        alt="Enlarged gallery view" 
                        className="max-w-4xl max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
                    />
                </div>
            )}

        </div>
    );
};

export default SocietyDetailView;
