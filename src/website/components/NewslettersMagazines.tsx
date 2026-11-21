import React, { useState, useMemo } from 'react';
import { 
    BookOpen, 
    Calendar, 
    Clock, 
    Search, 
    ChevronRight, 
    Download, 
    Globe, 
    Briefcase, 
    Sparkles, 
    Cpu, 
    Radio, 
    PenTool, 
    FileText, 
    ArrowRight,
    Building2,
    GraduationCap,
    ExternalLink
} from 'lucide-react';

const PUBLICATIONS_DATA = [
    // COLLEGE LEVEL (1 Magazine & 1 Newsletter)
    {
        id: "college-magazine",
        name: "MSIT Annual College Magazine",
        publisher: "MSIT Editorial Board (College Level)",
        category: "College Level",
        type: "Magazine",
        description: "The flagship annual college magazine featuring institutional achievements, faculty publications, campus highlights, creative student writing, and year-in-review.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 99,
        dateAdded: "2026-06-30",
        icon: "BookOpen"
    },
    {
        id: "college-newsletter",
        name: "MSIT Annual Institutional Newsletter",
        publisher: "MSIT Director's Office (College Level)",
        category: "College Level",
        type: "Newsletter",
        description: "The official yearly institutional newsletter documenting NAAC & NBA milestones, NIRF rankings, policy updates, and campus infrastructure developments.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 97,
        dateAdded: "2026-07-01",
        icon: "Building2"
    },

    // CSE DEPARTMENT (1 Newsletter & 1 Magazine)
    {
        id: "cse-newsletter",
        name: "CSE Department Annual Newsletter",
        publisher: "Computer Science & Engineering Dept",
        category: "Departmental",
        type: "Newsletter",
        description: "Annual newsletter highlighting CSE research papers, hackathon winners, coding lab milestones, and departmental workshops.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 94,
        dateAdded: "2026-07-15",
        icon: "Cpu"
    },
    {
        id: "cse-magazine",
        name: "TechBytes — CSE Annual Magazine",
        publisher: "Computer Science & Engineering Dept",
        category: "Departmental",
        type: "Magazine",
        description: "Annual technical magazine featuring student software innovations, AI/ML research articles, algorithms breakdown, and alumni interviews.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 93,
        dateAdded: "2026-07-20",
        icon: "BookOpen"
    },

    // IT DEPARTMENT (1 Newsletter & 1 Magazine)
    {
        id: "it-newsletter",
        name: "IT Department Annual Newsletter",
        publisher: "Information Technology Dept",
        category: "Departmental",
        type: "Newsletter",
        description: "Yearly summary of IT department placements, open-source contributions, faculty achievements, and industry collaboration events.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 92,
        dateAdded: "2026-07-12",
        icon: "Globe"
    },
    {
        id: "it-magazine",
        name: "BitStream — IT Annual Magazine",
        publisher: "Information Technology Dept",
        category: "Departmental",
        type: "Magazine",
        description: "Annual magazine focusing on cloud computing, cybersecurity, web technology trends, and student project portfolios.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 91,
        dateAdded: "2026-07-18",
        icon: "BookOpen"
    },

    // ECE DEPARTMENT (1 Newsletter & 1 Magazine)
    {
        id: "ece-newsletter",
        name: "ECE Department Annual Newsletter",
        publisher: "Electronics & Communication Dept",
        category: "Departmental",
        type: "Newsletter",
        description: "Annual newsletter detailing VLSI lab developments, robotics workshops, semiconductor research, and ECE faculty seminars.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 88,
        dateAdded: "2026-07-10",
        icon: "Radio"
    },
    {
        id: "ece-magazine",
        name: "CircuitPulse — ECE Annual Magazine",
        publisher: "Electronics & Communication Dept",
        category: "Departmental",
        type: "Magazine",
        description: "Annual technical magazine highlighting embedded systems, IoT innovations, circuit design papers, and student hardware projects.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 87,
        dateAdded: "2026-07-22",
        icon: "BookOpen"
    },

    // EEE DEPARTMENT (1 Newsletter & 1 Magazine)
    {
        id: "eee-newsletter",
        name: "EEE Department Annual Newsletter",
        publisher: "Electrical & Electronics Dept",
        category: "Departmental",
        type: "Newsletter",
        description: "Yearly newsletter covering renewable energy lab projects, power systems research, smart grid technology, and student achievements.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 85,
        dateAdded: "2026-07-08",
        icon: "Sparkles"
    },
    {
        id: "eee-magazine",
        name: "Electra — EEE Annual Magazine",
        publisher: "Electrical & Electronics Dept",
        category: "Departmental",
        type: "Magazine",
        description: "Annual departmental magazine featuring articles on electric vehicles, automation, green energy, and electrical engineering breakthroughs.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 84,
        dateAdded: "2026-07-25",
        icon: "BookOpen"
    },

    // APPLIED SCIENCES (1 Newsletter & 1 Magazine)
    {
        id: "as-newsletter",
        name: "Applied Sciences Annual Newsletter",
        publisher: "Applied Sciences Department (1st Year)",
        category: "Departmental",
        type: "Newsletter",
        description: "Annual newsletter for 1st-year B.Tech students covering foundation labs, induction programs, physics & chemistry research, and math seminars.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 86,
        dateAdded: "2026-07-05",
        icon: "FileText"
    },
    {
        id: "as-magazine",
        name: "Genesis — Applied Sciences Annual Magazine",
        publisher: "Applied Sciences Department (1st Year)",
        category: "Departmental",
        type: "Magazine",
        description: "Annual magazine showcasing fresh 1st-year student talent, scientific essays, environmental projects, and academic orientation highlights.",
        frequency: "Annual (1 per Year)",
        pdfLink: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        popularity: 85,
        dateAdded: "2026-07-28",
        icon: "BookOpen"
    }
];

const PREVIOUS_ISSUES = [
    { name: "MSIT Annual College Magazine 2025", volume: "Vol. 4 (2025–26)", downloadUrl: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf" },
    { name: "MSIT Annual Institutional Newsletter 2025", volume: "Vol. 4 (2025–26)", downloadUrl: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf" },
    { name: "MSIT Annual College Magazine 2024", volume: "Vol. 3 (2024–25)", downloadUrl: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf" },
    { name: "MSIT Annual College Magazine 2023", volume: "Vol. 2 (2023–24)", downloadUrl: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf" }
];

const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
    switch (iconName) {
        case "Building2": return <Building2 className={className} />;
        case "Globe": return <Globe className={className} />;
        case "Briefcase": return <Briefcase className={className} />;
        case "Sparkles": return <Sparkles className={className} />;
        case "Cpu": return <Cpu className={className} />;
        case "Radio": return <Radio className={className} />;
        case "PenTool": return <PenTool className={className} />;
        case "FileText": return <FileText className={className} />;
        default: return <BookOpen className={className} />;
    }
};

const NewslettersMagazines = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Popular');

    // Filter & Sort
    const filteredPublications = useMemo(() => {
        let list = [...PUBLICATIONS_DATA];

        if (selectedCategory !== 'All') {
            list = list.filter(pub => {
                if (selectedCategory === 'Newsletters') return pub.type === 'Newsletter';
                if (selectedCategory === 'Magazines') return pub.type === 'Magazine';
                if (selectedCategory === 'College Level') return pub.category === 'College Level';
                if (selectedCategory === 'Departmental') return pub.category === 'Departmental';
                return true;
            });
        }

        if (sortBy === 'Popular') {
            list.sort((a, b) => b.popularity - a.popularity);
        } else if (sortBy === 'A-Z') {
            list.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'Recently Added') {
            list.sort(
                (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
            );
        }

        return list;
    }, [selectedCategory, sortBy]);

    // Cover colour carries the type: magazines in primary blue, newsletters in slate.
    const coverClass = (type: string) => (type === 'Magazine' ? 'bg-primary' : 'bg-slate-800');

    return (
        <div className="w-full text-slate-800">
            <section className="max-w-[92rem] mx-auto px-4 sm:px-6 py-8 sm:py-16">

                {/* Publication policy */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Annual institutional & departmental releases</h2>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
                        In accordance with MSIT academic policy, publications are produced on a strict annual cycle: the <strong className="text-slate-900">college produces 1 Magazine & 1 Newsletter</strong> every year, and <strong className="text-slate-900">each academic department produces 1 Newsletter & 1 Magazine</strong> every year.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
                        {[
                            { Icon: Building2, title: 'College level · 2 a year', text: "1 Annual College Magazine (MSIT Editorial Board) + 1 Annual Institutional Newsletter (Director's Office)." },
                            { Icon: GraduationCap, title: 'Departmental · 2 per department a year', text: 'Each department (CSE, IT, ECE, EEE, Applied Sciences) publishes 1 Annual Newsletter & 1 Annual Magazine every year.' },
                        ].map(({ Icon, title, text }) => (
                            <div key={title} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-10 sm:space-y-16">

                    {/* Catalogue */}
                    <div className="space-y-4 sm:space-y-8">

                        <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                {selectedCategory === 'All' ? 'Publications' : selectedCategory}
                            </h3>
                            <span className="text-xs sm:text-sm text-slate-500 tabular-nums">{filteredPublications.length} titles</span>
                        </div>

                        {/* Filters & sort */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 sm:pb-6 select-none">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {['All', 'Newsletters', 'Magazines', 'College Level', 'Departmental'].map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        aria-pressed={selectedCategory === category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-full border whitespace-nowrap transition-colors cursor-pointer ${
                                            selectedCategory === category
                                                ? 'bg-primary border-primary text-white'
                                                : 'bg-white border-slate-200 text-slate-600 hover:text-primary'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <label className="flex items-center gap-2 shrink-0">
                                <span className="text-xs font-semibold text-slate-500">Sort by</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                                >
                                    <option value="Popular">Popular</option>
                                    <option value="A-Z">A–Z</option>
                                    <option value="Recently Added">Recently added</option>
                                </select>
                            </label>
                        </div>

                        {filteredPublications.length === 0 ? (
                            <div className="p-8 sm:p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
                                <p className="text-sm text-slate-600">No publications in this category yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                                {filteredPublications.map(pub => (
                                    <div
                                        key={pub.id}
                                        className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-5 shadow-sm flex gap-3 sm:gap-5 hover:border-primary/40 transition-colors"
                                    >
                                        {/* Cover */}
                                        <div className={`w-20 sm:w-28 ${coverClass(pub.type)} rounded-xl p-2.5 sm:p-4 flex flex-col justify-between text-white shrink-0`}>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/85">{pub.type}</span>
                                            <IconRenderer iconName={pub.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white/90" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-col justify-between flex-1 min-w-0">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm leading-snug">{pub.name}</h4>
                                                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1 mb-1.5 sm:mb-2">
                                                    {pub.publisher}
                                                </span>
                                                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">{pub.description}</p>
                                            </div>
                                            <div className="space-y-3 pt-2.5 sm:pt-3 border-t border-slate-200">
                                                <div className="hidden sm:flex justify-between items-center text-[11px] font-semibold text-slate-500">
                                                    <span>Annual</span>
                                                    <span>{pub.category}</span>
                                                </div>
                                                <a
                                                    href={pub.pdfLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-colors flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white"
                                                >
                                                    <Download className="w-3.5 h-3.5" aria-hidden="true" /> Download PDF
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Archive of earlier issues */}
                    <section>
                        <div className="space-y-3 sm:space-y-6">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Archived annual issues</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                                {PREVIOUS_ISSUES.map((issue, idx) => (
                                    <a
                                        key={idx}
                                        href={issue.downloadUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary/40 transition-colors group"
                                    >
                                        <div className={`w-10 h-13 sm:w-12 sm:h-16 ${issue.name.includes('Newsletter') ? 'bg-slate-800' : 'bg-primary'} rounded-md shrink-0 flex items-end p-1.5 text-white`}>
                                            <BookOpen className="w-4 h-4 opacity-80" aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-primary transition-colors">{issue.name}</h4>
                                            <span className="text-xs text-slate-500">{issue.volume}</span>
                                        </div>
                                        <Download className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors shrink-0" aria-label="Download PDF" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
            </section>
        </div>
    );
};

export default NewslettersMagazines;
