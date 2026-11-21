import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, User, Hash, MessageSquare, ArrowRight, HelpCircle, Bell } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { searchSite } from '../search/searchSite';

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    const results = query ? searchSite(query) : { faculty: [], pages: [], qa: [], events: [] };
    const facultyResults = results.faculty || [];
    const pageResults = results.pages || [];
    const eventResults = results.events || [];
    const qaResults = results.qa || [];

    const totalResultsCount = facultyResults.length + pageResults.length + qaResults.length + eventResults.length;

    return (
        <div className="min-h-screen bg-slate-50 transition-colors duration-300">
            <SEO 
                title={query ? `Search Results for "${query}"` : "Search"} 
                description="Search for courses, departments, faculty, and academic resources at Maharaja Surajmal Institute of Technology. Find the information you need quickly today." 
                canonicalPath="/search"
            />
            <PageHero 
                title="Search Results for" 
                accentTitle={query ? `"${query}"` : "MSIT"} 
                description="Find the information you need quickly across Maharaja Surajmal Institute of Technology's departments, faculty, and resources."
                breadcrumbs={[{ label: 'Search' }]}
            />
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 md:p-12 mb-8">

                    {query ? (
                        <div className="space-y-8">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-6 gap-4">
                                <p className="text-lg text-slate-600">
                                    Showing results for <span className="font-semibold text-slate-900 border-b-2 border-blue-200 pb-0.5">"{query}"</span>
                                </p>
                                <span className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50 self-start sm:self-auto">
                                    {totalResultsCount} matching results found
                                </span>
                            </div>

                            {totalResultsCount > 0 ? (
                                <div className="space-y-10">
                                    {/* QA Answers Category */}
                                    {qaResults.length > 0 && (
                                        <div className="space-y-4">
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                                <MessageSquare size={14} className="text-blue-500" /> Quick Answers
                                            </h2>
                                            <div className="space-y-4">
                                                {qaResults.map((qa, idx) => (
                                                    <div key={idx} className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100/50 shadow-sm">
                                                        <h3 className="text-base font-bold text-blue-950 mb-2">Q: {qa.q}</h3>
                                                        <p className="text-sm text-slate-700 leading-relaxed font-light">{qa.a}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Faculty Category */}
                                    {facultyResults.length > 0 && (
                                        <div className="space-y-4">
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                <User size={14} /> Faculty Members
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {facultyResults.map((f, idx) => (
                                                    <Link 
                                                        key={idx} 
                                                        to={f.url} 
                                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group bg-slate-50/50"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                                <User size={18} />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-semibold text-slate-900 leading-none mb-1 group-hover:text-primary transition-colors">{f.name}</div>
                                                                <div className="text-xs text-slate-500 font-medium">{f.role} • <span className="font-bold text-primary">{f.dept}</span></div>
                                                            </div>
                                                        </div>
                                                        <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Pages Category */}
                                    {pageResults.length > 0 && (
                                        <div className="space-y-4">
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                <Hash size={14} /> Pages & Navigation
                                            </h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {pageResults.map((p, idx) => (
                                                    <Link 
                                                        key={idx} 
                                                        to={p.url} 
                                                        className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm text-slate-700 hover:text-primary transition-all bg-slate-50/50 group"
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                                                            <Hash size={14} />
                                                        </div>
                                                        <span className="text-sm font-bold">{p.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* News, Notices & Categorized Updates */}
                                    {eventResults.length > 0 && (
                                        <div className="space-y-4">
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                <Bell size={14} className="text-amber-500" /> Official Notices, News & Updates ({eventResults.length})
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {eventResults.map((ev, idx) => (
                                                    <Link 
                                                        key={idx} 
                                                        to={ev.url} 
                                                        className="flex flex-col justify-between p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group bg-slate-50/50"
                                                    >
                                                        <div>
                                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700">
                                                                    {ev.label}
                                                                </span>
                                                                <span className="text-[11px] font-semibold text-slate-400">{ev.date}</span>
                                                            </div>
                                                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug mb-2">
                                                                {ev.title}
                                                            </h3>
                                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                                {ev.summary}
                                                            </p>
                                                        </div>
                                                        <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-primary">
                                                            <span>Read full notice</span>
                                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No Results Found</h2>
                                    <p className="text-slate-500 max-w-md mx-auto">We couldn't find any departments, faculty members, or quick answers matching "{query}". Please check your spelling or try another term.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Search Query</h2>
                            <p className="text-slate-500 max-w-md mx-auto">Please enter a search term in the header search bar or use the command shortcut <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shadow-sm text-xs italic">Ctrl + K</kbd> to find matching college details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
