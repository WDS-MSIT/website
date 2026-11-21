import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Shield, BookOpen, Award, Users, ChevronRight, X } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Sitemap = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const siteCategories = [
        {
            title: "About MSIT",
            icon: <Globe className="w-5 h-5 text-blue-600" />,
            links: [
                { label: "Home / Welcome", path: "/" },
                { label: "About MSIT", path: "/about" },
                { label: "Vision & Mission", path: "/vision-mission" },
                { label: "History & Legacy", path: "/history" },
                { label: "SMES Society", path: "/smes" },
                { label: "Governing Body", path: "/govern" },
                { label: "Administration", path: "/administration" },
                { label: "Director's Message", path: "/fromdesk" },
                { label: "Meet the Team", path: "/team" },
            ]
        },
        {
            title: "Academics & Research",
            icon: <BookOpen className="w-5 h-5 text-indigo-650" />,
            links: [
                { label: "Computer Science & Engineering (CSE)", path: "/cse" },
                { label: "Information Technology Engineering (IT)", path: "/it" },
                { label: "Electronics & Communication Engineering (ECE)", path: "/ece" },
                { label: "Electrical & Electronics Engineering (EEE)", path: "/eee" },
                { label: "Applied Sciences (1st Year)", path: "/applied-sciences" },
                { label: "Academic Calendar", path: "/academic-calendar" },
                { label: "Syllabus Index", path: "/syllabus" },
                { label: "Time Table", path: "/timetable" },
                { label: "Faculty & Staff Directory", path: "/faculty" },
                { label: "Research & Publications", path: "/research" },
            ]
        },
        {
            title: "Admissions & Placements",
            icon: <Award className="w-5 h-5 text-emerald-600" />,
            links: [
                { label: "Information Brochure", path: "/brochure" },
                { label: "Online Fee Payment", path: "/online-fee" },
                { label: "Scholarships & Financial Aid", path: "/scholarships" },
                { label: "Placements Overview", path: "/placements" },
                { label: "Industry-Institute Interaction Cell (IIIC) & Internships", path: "/internship-cell" },
                { label: "Mandatory Disclosures", path: "/mandatory-disclosures" },
            ]
        },
        {
            title: "Student Life & Campus",
            icon: <Users className="w-5 h-5 text-purple-600" />,
            links: [
                { label: "Student Societies & Clubs", path: "/society" },
                { label: "Institution's Innovation Council (IIC MSIT)", path: "/iic" },
                { label: "GeekRoom MSIT", path: "/society-geekroom" },
                { label: "IEEE Student Branch", path: "/society-ieee" },
                { label: "MSIT NDLI Club", path: "/society-ndli" },
                { label: "eCell & Incubation Cell", path: "/society-ecell" },
                { label: "Unnat Bharat Abhiyan (UBA)", path: "/society-uba" },
                { label: "SPARK Research Hub", path: "/society-spark" },
                { label: "Events & Festivals", path: "/events" },
                { label: "Alumni Network", path: "/alumni-network" },
                { label: "Campus Virtual Tour", path: "/virtual-tour" },
                { label: "Campus Facilities", path: "/facilities" },
            ]
        },
        {
            title: "Support, Rules & Safety",
            icon: <Shield className="w-5 h-5 text-rose-600" />,
            links: [
                { label: "Result & Student Login Portal", path: "https://examweb.ggsipu.ac.in/web/login.jsp", external: true },
                { label: "Attendance Rules", path: "/attendance" },
                { label: "Anti-Ragging Guidelines", path: "/antiragging" },
                { label: "Disaster Management", path: "/disaster" },
                { label: "Student Discipline Committee", path: "/discipline" },
                { label: "Student Grievance Cell (SGRC)", path: "/student-grievance" },
                { label: "Contact Us", path: "/contact" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms of Use", path: "/terms" },
            ]
        }
    ];

    // Filter categories and links based on search query
    const filteredCategories = siteCategories.map(cat => {
        const matchingLinks = cat.links.filter(link =>
            link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.path.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...cat, links: matchingLinks };
    }).filter(cat => cat.links.length > 0);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 flex flex-col relative overflow-hidden">
            <SEO
                title="Sitemap - Maharaja Surajmal Institute of Technology"
                description="Explore all pages, sections, academic directories, student portals, and policy links of MSIT using our dynamic, Apple-style sitemap."
                canonicalPath="/sitemap"
            />

            {/* Uniform PageHero component matching all other website inner pages */}
            <PageHero
                title="Website"
                accentTitle="Sitemap"
                description="Find directories, academic portals, administrative cells, societies, support documents, and legal rules using the directory layout."
                breadcrumbs={[
                    { label: 'Directory' },
                    { label: 'Sitemap' }
                ]}
                heroImage="/campus-hero.webp"
                heroImageAlt="Maharaja Surajmal Institute of Technology campus overview sitemap page"
            />

            {/* Interactive Search Filter Bar */}
            <section className="relative z-10 py-6 px-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {searchQuery ? `Showing matches for "${searchQuery}"` : "Search directory index"}
                    </span>
                    <div className="relative w-full sm:max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter sitemap..."
                            className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-850 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all text-xs font-semibold focus:bg-white"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Apple Directory Grid Section */}
            <section className="relative z-10 max-w-7xl w-full mx-auto p-6 sm:p-12 flex-1">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No matching links found</h3>
                        <p className="text-slate-500 text-xs font-medium">Try searching another keyword (e.g., 'ragging', 'cse', 'fee')</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12 items-start">
                        {filteredCategories.map((category, idx) => (
                            <div key={idx} className="space-y-6">
                                {/* Category Header */}
                                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                                    {category.icon}
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                                        {category.title}
                                    </h2>
                                </div>

                                {/* Link Directory List - Optimized larger typography */}
                                <ul className="space-y-3.5">
                                    {category.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            {link.external ? (
                                                <a
                                                    href={link.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-between text-[13px] font-semibold text-slate-500 hover:text-blue-600 transition-colors py-0.5"
                                                >
                                                    <span className="relative py-0.5">
                                                        {link.label}
                                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                                                    </span>
                                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                                                </a>
                                            ) : (
                                                <Link
                                                    to={link.path}
                                                    className="group flex items-center justify-between text-[13px] font-semibold text-slate-500 hover:text-blue-600 transition-colors py-0.5"
                                                >
                                                    <span className="relative py-0.5">
                                                        {link.label}
                                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                                                    </span>
                                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Sitemap;
