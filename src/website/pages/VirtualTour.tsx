import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { 
    Play, X, Compass, MapPin, Layers, Info, CheckCircle2, ChevronRight, ChevronLeft, 
    Eye, Video, Camera, Search, Filter, Grid3X3, Image as ImageIcon, Sparkles, Download, 
    Building2, ShieldCheck, Trophy, Activity, Flame, Home, Coffee, Briefcase, GraduationCap, 
    Award, BookOpen, Cpu, Zap, Users, Landmark, Smile
} from 'lucide-react';

import { tourStats, tourLocations, tourCategories as categories } from '../data/virtualTourData';
import type { TourLocation } from '../data/virtualTourData';
import { PHOTO_CATEGORIES, ALL_CAMPUS_PHOTOS } from '../data/photosData';
import { slugify } from '../utils/slugify';

const ICON_MAP = {
    Building2,
    ShieldCheck,
    Trophy,
    Activity,
    Flame,
    Home,
    Coffee,
    Briefcase,
    GraduationCap,
    Award,
    BookOpen,
    Cpu,
    Zap,
    Users,
    Landmark,
    Smile,
    Sparkles,
    Camera
};

const VirtualTour = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get('tab') === 'archive' || searchParams.get('tab') === 'gallery' ? 'archive' : 'hotspots';
    
    const [viewMode, setViewMode] = useState(currentTab);
    const [activeHotspotCategory, setActiveHotspotCategory] = useState('all');
    
    // Archive view states
    const [activeArchiveCategory, setActiveArchiveCategory] = useState('all');
    const [archiveSearchQuery, setArchiveSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(24);
    
    // Lightbox states
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxItems, setLightboxItems] = useState<any[]>([]);
    const [videoMedia, setVideoMedia] = useState<{ title: string; url: string } | null>(null);

    // Sync viewMode with search params
    useEffect(() => {
        const paramTab = searchParams.get('tab');
        if (paramTab === 'archive' || paramTab === 'gallery') {
            setViewMode('archive');
        }
    }, [searchParams]);

    const handleViewModeChange = (mode: 'archive' | 'hotspots') => {
        setViewMode(mode);
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (mode === 'archive') {
                next.set('tab', 'archive');
            } else {
                next.delete('tab');
            }
            return next;
        }, { replace: true });
    };

    // Filtered hotspots
    const filteredLocations = useMemo(() => {
        return activeHotspotCategory === 'all'
            ? tourLocations
            : tourLocations.filter(loc => loc.category === activeHotspotCategory);
    }, [activeHotspotCategory]);

    // Filtered archive photos
    const filteredArchivePhotos = useMemo(() => {
        return ALL_CAMPUS_PHOTOS.filter(photo => {
            const matchesCategory = activeArchiveCategory === 'all' || 
                photo.categoryId === activeArchiveCategory || 
                photo.folder === activeArchiveCategory;
            
            const q = archiveSearchQuery.toLowerCase().trim();
            const matchesQuery = !q || 
                photo.title.toLowerCase().includes(q) || 
                photo.description.toLowerCase().includes(q) || 
                photo.categoryName.toLowerCase().includes(q) || 
                photo.folder.toLowerCase().includes(q);

            return matchesCategory && matchesQuery;
        });
    }, [activeArchiveCategory, archiveSearchQuery]);

    // Reset pagination when category or query changes
    useEffect(() => {
        setVisibleCount(24);
    }, [activeArchiveCategory, archiveSearchQuery]);

    // Open video in lightbox
    const openVideo = (url: string, title: string) => {
        setVideoMedia({ url, title });
        setLightboxOpen(true);
    };

    // Open image in lightbox from an array
    const openPhotoLightbox = (items: any[], index: number) => {
        setVideoMedia(null);
        setLightboxItems(items);
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    // Open single hotspot image
    const openHotspotImage = (loc: TourLocation) => {
        const items = [{
            src: loc.panoramaUrl || loc.image,
            title: loc.title,
            description: loc.description,
            categoryName: loc.category.toUpperCase()
        }];
        openPhotoLightbox(items, 0);
    };

    // Keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!lightboxOpen) return;
        if (e.key === 'Escape') {
            setLightboxOpen(false);
        } else if (e.key === 'ArrowRight' && !videoMedia && lightboxItems.length > 1) {
            setLightboxIndex(prev => (prev + 1) % lightboxItems.length);
        } else if (e.key === 'ArrowLeft' && !videoMedia && lightboxItems.length > 1) {
            setLightboxIndex(prev => (prev - 1 + lightboxItems.length) % lightboxItems.length);
        }
    }, [lightboxOpen, videoMedia, lightboxItems]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const activePhoto = !videoMedia && lightboxItems.length > 0 ? lightboxItems[lightboxIndex] : null;

    return (
        <main className="min-h-screen bg-slate-50 transition-colors duration-300">
            <SEO 
                title="Virtual Campus Tour & Photo Directory" 
                description="Experience Maharaja Surajmal Institute of Technology. Take our interactive tour across 20 featured locations and explore the complete 250+ verified photograph archive."
                canonicalPath="/virtual-tour"
            />

            <PageHero 
                title="Explore MSIT" 
                accentTitle="Campus & Photos" 
                description="Step inside MSIT's vibrant 8.5-acre Janakpuri campus. Explore our academic buildings, advanced laboratories, central library, sports grounds, and historic memorials through 250+ verified photographs."
                breadcrumbs={[{ label: 'Virtual Tour' }]}
                heroImage="/campus/main-academic-building.webp"
                heroImageAlt="Authentic virtual tour of MSIT 8-storey academic block and campus grounds"
            />

            {/* Quick Stats Banner */}
            <section className="bg-white py-4 sm:py-7 border-b border-slate-200 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-3 sm:px-6">
                    <div className="grid grid-cols-4 gap-1 sm:gap-6">
                        {tourStats.map((stat, idx) => (
                            <div key={idx} className="text-center border-r last:border-0 border-slate-200 px-1">
                                <div className="font-[Libre_Baskerville,serif] text-base sm:text-2xl md:text-3xl font-bold text-primary tabular-nums leading-tight">{stat.value}</div>
                                <div className="text-[9px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wide sm:tracking-wider mt-1 leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Walkthrough Banner */}
            <section className="pt-12 pb-6 max-w-7xl mx-auto px-6">
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/5">
                    <div className="absolute top-0 right-0 w-[clamp(250px,40vw,500px)] h-[clamp(250px,40vw,500px)] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                    
                    <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
                        <div className="lg:col-span-6">
                            <span className="text-blue-400 font-extrabold tracking-[0.25em] text-xs uppercase mb-3 block">Official Tour Video</span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
                                MSIT Campus <br />Video Walkthrough
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed font-medium">
                                Take a guided walkthrough of our multi-storey engineering blocks, high-performance computing labs, central library, and student facilities led by student ambassadors.
                            </p>
                            <button 
                                onClick={() => openVideo('https://www.youtube.com/embed/WY6dTTsE4cY?autoplay=1', 'MSIT Campus Guided Walkthrough')}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/95 text-white font-bold text-xs tracking-wider uppercase rounded-2xl transition-all shadow-lg active:scale-95 group cursor-pointer"
                            >
                                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                                Watch Tour Video
                            </button>
                        </div>

                        <div className="lg:col-span-6">
                            <div 
                                onClick={() => openVideo('https://www.youtube.com/embed/WY6dTTsE4cY?autoplay=1', 'MSIT Campus Guided Walkthrough')}
                                className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group cursor-pointer shadow-2xl"
                            >
                                <img 
                                    src="https://img.youtube.com/vi/WY6dTTsE4cY/sddefault.jpg"
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://img.youtube.com/vi/WY6dTTsE4cY/hqdefault.jpg'; }}
                                    alt="Preview of the official MSIT campus tour video"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white font-mono text-xs">
                                    Full Walkthrough
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mode Switcher Tabs */}
            <section className="py-8 max-w-7xl mx-auto px-6" id="explore">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">Visual Campus Exploration</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {viewMode === 'hotspots' ? 'Curated Campus Hotspots (20 Stops)' : 'Complete Campus Photo Archive (250+ Photos)'}
                        </h2>
                    </div>

                    <div className="flex items-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/50 shadow-inner">
                        <button
                            onClick={() => handleViewModeChange('hotspots')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                viewMode === 'hotspots'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Tour Hotspots ({tourLocations.length})</span>
                        </button>
                        <button
                            onClick={() => handleViewModeChange('archive')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                viewMode === 'archive'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <Camera className="w-4 h-4 text-emerald-600" />
                            <span>Photo Archive ({ALL_CAMPUS_PHOTOS.length})</span>
                        </button>
                    </div>
                </div>

                {/* ======================================================== */}
                {/* VIEW 1: CURATED TOUR HOTSPOTS                            */}
                {/* ======================================================== */}
                {viewMode === 'hotspots' && (
                    <div className="mt-8 space-y-8 animate-fade-in">
                        {/* Hotspot Category Filter Pills */}
                        <div className="flex flex-wrap gap-2.5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveHotspotCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeHotspotCategory === cat.id
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Hotspots Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredLocations.map((loc) => (
                                <div
                                    key={loc.id}
                                    className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                                >
                                    <div className="relative h-64 overflow-hidden bg-slate-900">
                                        <img
                                            src={loc.image}
                                            alt={loc.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10">
                                                {loc.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-lg font-bold text-white drop-shadow-md leading-tight">
                                                {loc.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                            {loc.description}
                                        </p>

                                        {loc.highlights && loc.highlights.length > 0 && (
                                            <div className="pt-2 border-t border-slate-100 space-y-2">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Features</div>
                                                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700 font-semibold">
                                                    {loc.highlights.map((h, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 truncate">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                            <span className="truncate">{h}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => openHotspotImage(loc)}
                                            className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-98 cursor-pointer group-hover:border-primary"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Full Photograph
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ======================================================== */}
                {/* VIEW 2: COMPLETE PHOTO ARCHIVE (250+ PHOTOS)             */}
                {/* ======================================================== */}
                {viewMode === 'archive' && (
                    <div className="mt-8 space-y-8 animate-fade-in">
                        {/* Search & Stats Bar */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="relative w-full md:w-96">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={archiveSearchQuery}
                                    onChange={(e) => setArchiveSearchQuery(e.target.value)}
                                    placeholder="Search library, basketball, labs, hostel..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                                {archiveSearchQuery && (
                                    <button 
                                        onClick={() => setArchiveSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 self-start md:self-auto">
                                <span>Showing <strong className="text-slate-900">{Math.min(visibleCount, filteredArchivePhotos.length)}</strong> of <strong className="text-slate-900">{filteredArchivePhotos.length}</strong> photos</span>
                                {activeArchiveCategory !== 'all' && (
                                    <button 
                                        onClick={() => setActiveArchiveCategory('all')}
                                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold"
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category Carousel / Pills */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            <button
                                onClick={() => setActiveArchiveCategory('all')}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                                    activeArchiveCategory === 'all'
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                All Archive ({ALL_CAMPUS_PHOTOS.length})
                            </button>
                            {PHOTO_CATEGORIES.map((cat) => {
                                const IconComponent = ICON_MAP[cat.icon as keyof typeof ICON_MAP] || Camera;
                                const isSelected = activeArchiveCategory === cat.id || activeArchiveCategory === cat.folder;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveArchiveCategory(cat.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                                            isSelected
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        <IconComponent className="w-3.5 h-3.5" />
                                        <span>{cat.short}</span>
                                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {cat.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Photos Grid */}
                        {filteredArchivePhotos.length === 0 ? (
                            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
                                <Camera className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No matching photographs found</h3>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                                    Try adjusting your search terms or switch to another campus category.
                                </p>
                                <button
                                    onClick={() => { setActiveArchiveCategory('all'); setArchiveSearchQuery(''); }}
                                    className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredArchivePhotos.slice(0, visibleCount).map((photo, idx) => (
                                    <div
                                        key={photo.id}
                                        onClick={() => openPhotoLightbox(filteredArchivePhotos, idx)}
                                        className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                                    >
                                        <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                                            <img
                                                src={photo.src}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            
                                            <div className="absolute top-2.5 left-2.5">
                                                <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold rounded">
                                                    {photo.categoryShort}
                                                </span>
                                            </div>

                                            {photo.resolution && photo.resolution.includes('6000') && (
                                                <div className="absolute top-2.5 right-2.5">
                                                    <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black rounded uppercase tracking-wider">
                                                        24MP Hi-Res
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                                    {photo.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                                                    {photo.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        {visibleCount < filteredArchivePhotos.length && (
                            <div className="text-center pt-6">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 24)}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                                >
                                    <span>Load More Photographs ({filteredArchivePhotos.length - visibleCount} Remaining)</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Offline Tour Inquiry */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden border-t border-white/5 mt-16">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <Compass className="w-14 h-14 text-blue-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Need a Real Guided Campus Visit?</h2>
                    <p className="text-slate-300 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                        We organize offline campus visits for prospective students, parents, and corporate partners. Book an administrative tour session across departments, laboratories, and living complexes.
                    </p>
                    <a 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs tracking-widest uppercase rounded-2xl transition-all shadow-xl active:scale-95"
                    >
                        Schedule Campus Visit
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* Lightbox / Video & Image Viewer */}
            {lightboxOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/95 z-[100] flex flex-col items-center justify-center p-4 lg:p-8 animate-fade-in" 
                    onClick={() => setLightboxOpen(false)}
                >
                    <button 
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white rounded-full transition-colors z-50 bg-black/40 hover:bg-black/60 border border-white/10 shadow-lg cursor-pointer"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div 
                        className="w-full max-w-5xl flex flex-col items-center bg-black/80 rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative p-3 animate-slide-up" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {videoMedia ? (
                            <div className="w-full aspect-video">
                                <iframe
                                    className="w-full h-full rounded-2xl"
                                    src={videoMedia.url}
                                    title={videoMedia.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : activePhoto ? (
                            <div className="relative w-full flex flex-col items-center">
                                <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
                                    <img
                                        src={activePhoto.src}
                                        alt={activePhoto.title}
                                        className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                                    />

                                    {/* Previous / Next buttons */}
                                    {lightboxItems.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setLightboxIndex(prev => (prev - 1 + lightboxItems.length) % lightboxItems.length)}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer border border-white/10 shadow-lg"
                                                aria-label="Previous photo"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => setLightboxIndex(prev => (prev + 1) % lightboxItems.length)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer border border-white/10 shadow-lg"
                                                aria-label="Next photo"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Photo Details Footer */}
                                <div className="w-full mt-4 px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase rounded">
                                                {activePhoto.categoryName || activePhoto.categoryShort}
                                            </span>
                                            <h3 className="text-base font-bold">{activePhoto.title}</h3>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{activePhoto.description}</p>
                                    </div>
                                    <div className="text-right shrink-0 font-mono text-xs text-slate-400">
                                        {lightboxIndex + 1} / {lightboxItems.length}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </main>
    );
};

export default VirtualTour;
