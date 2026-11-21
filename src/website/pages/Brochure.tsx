import React, { useState } from 'react';
import { Download, CalendarDays, FileText, ChevronDown, ChevronUp, Sparkles, BookOpen, Clock, ShieldCheck, ArrowRight, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import KeyFiguresStrip from '../components/KeyFiguresStrip';

const Brochure = () => {
    const [showOlder, setShowOlder] = useState(false);
    const [activeQuotaTab, setActiveQuotaTab] = useState('delhi'); // 'delhi' | 'outside'

    const latestBrochure = {
        year: "2026 - 2027",
        title: "MSIT Official Information Bulletin 2026–27",
        subtitle: "Official Prospectus & Academic Guidelines",
        description: "Comprehensive information on undergraduate B.Tech admissions, approved seat intake (CSE, IT, ECE, EEE across 1st & 2nd shifts), JEE Main cut-off ranks, fee structure breakdown, placement records, and campus infrastructure.",
        link: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
        mirrorLink: "https://ipu.admissions.nic.in",
        highlight: true,
        features: [
            { title: "Complete Intake & Shift Matrix", anchor: "#cutoff-ranks", isInternal: true },
            { title: "JEE Main Cut-Off Ranks", anchor: "#cutoff-ranks", isInternal: true, badge: "View Table" },
            { title: "Detailed Fee Breakdown (2026–27)", anchor: "/online-fee", isRoute: true },
            { title: "Campus Placement Statistics", anchor: "/placements", isRoute: true }
        ]
    };

    const cutoffData = [
        {
            branch: "Computer Science & Engineering (Shift 1)",
            code: "CSE-1",
            shift: "1st Shift (Morning)",
            intake: "180 + 60",
            delhiOpening: "28,450",
            delhiClosing: "58,920",
            outsideOpening: "18,200",
            outsideClosing: "38,150",
            topRecruiter: "Google / Microsoft"
        },
        {
            branch: "Computer Science & Engineering (Shift 2)",
            code: "CSE-2",
            shift: "2nd Shift (Evening)",
            intake: "60",
            delhiOpening: "59,100",
            delhiClosing: "78,400",
            outsideOpening: "38,500",
            outsideClosing: "49,600",
            topRecruiter: "Amazon / Adobe"
        },
        {
            branch: "Information Technology (Shift 1)",
            code: "IT-1",
            shift: "1st Shift (Morning)",
            intake: "120",
            delhiOpening: "61,200",
            delhiClosing: "82,300",
            outsideOpening: "40,100",
            outsideClosing: "52,400",
            topRecruiter: "Atlassian / Cisco"
        },
        {
            branch: "Information Technology (Shift 2)",
            code: "IT-2",
            shift: "2nd Shift (Evening)",
            intake: "60",
            delhiOpening: "83,000",
            delhiClosing: "96,800",
            outsideOpening: "52,800",
            outsideClosing: "63,200",
            topRecruiter: "Oracle / Infosys"
        },
        {
            branch: "Electronics & Communication Engineering (Shift 1)",
            code: "ECE-1",
            shift: "1st Shift (Morning)",
            intake: "120",
            delhiOpening: "84,500",
            delhiClosing: "1,18,600",
            outsideOpening: "53,400",
            outsideClosing: "75,800",
            topRecruiter: "Qualcomm / Texas Instruments"
        },
        {
            branch: "Electronics & Communication Engineering (Shift 2)",
            code: "ECE-2",
            shift: "2nd Shift (Evening)",
            intake: "60",
            delhiOpening: "1,19,000",
            delhiClosing: "1,48,200",
            outsideOpening: "76,200",
            outsideClosing: "91,500",
            topRecruiter: "Samsung / Synopsys"
        },
        {
            branch: "Electrical & Electronics Engineering",
            code: "EEE",
            shift: "1st Shift (Morning)",
            intake: "60",
            delhiOpening: "1,24,000",
            delhiClosing: "1,94,500",
            outsideOpening: "78,900",
            outsideClosing: "1,19,400",
            topRecruiter: "L&T / Schneider Electric"
        }
    ];

    const olderBrochures = [
        {
            year: "2025 - 2026",
            title: "Information Bulletin 2025–26",
            subtitle: "Academic Year 2025–2026 Prospectus",
            link: "https://www.msit.in/media/uploads/2025/07/msit-information-bulletin-2025-26.pdf",
            description: "Official admission brochure and course guidelines for the 2025-26 academic session."
        },
        {
            year: "2024 - 2025",
            title: "Information Bulletin 2024–25",
            subtitle: "Academic Year 2024–2025 Prospectus",
            link: "https://www.msit.in/media/2024/07/18/msit-information-bulletin-2024-25.pdf",
            description: "Official admission brochure and course guidelines for the 2024-25 academic session."
        },
        {
            year: "2023 - 2024",
            title: "Information Bulletin 2023–24",
            subtitle: "Academic Year 2023–2024 Prospectus",
            link: "https://www.msit.in/media/uploads/2023/07/msit-information-bulletin-2023-24.pdf",
            description: "Official prospectus detailing seat matrix, cutoffs, and guidelines for 2023-24."
        },
        {
            year: "2022 - 2023",
            title: "Information Bulletin 2022–23",
            subtitle: "Academic Year 2022–2023 Prospectus",
            link: "https://www.msit.in/media/uploads/2022/07/msit-information-bulletin-2022-23.pdf",
            description: "Official information booklet for admissions and academic regulations (2022-23)."
        },
        {
            year: "2021 - 2022",
            title: "Information Bulletin 2021–22",
            subtitle: "Academic Year 2021–2022 Prospectus",
            link: "https://www.msit.in/media/uploads/2021/07/msit-information-bulletin-2021-22.pdf",
            description: "Official information bulletin and institutional overview for 2021-22."
        },
        {
            year: "2020 - 2021",
            title: "Information Bulletin 2020–21",
            subtitle: "Academic Year 2020–2021 Prospectus",
            link: "https://www.msit.in/media/uploads/2020/07/msit-information-bulletin-2020-21.pdf",
            description: "Archived admission bulletin and academic prospectus for 2020-21."
        }
    ];

    const scrollToCutoff = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('cutoff-ranks');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <main className="min-h-screen bg-slate-50/50 transition-colors duration-300">
            <SEO 
                title="Information Brochure & JEE Main Cut-Off Ranks" 
                description="Download official MSIT admission brochure and view JEE Main B.Tech cut-off ranks for CSE, IT, ECE, EEE across Delhi and Outside Delhi quotas." 
                canonicalPath="/brochure"
            />
            <PageHero 
                title="Information" 
                accentTitle="Bulletins & Brochure" 
                description="Download official MSIT Information Brochures, explore JEE Main cut-off rank matrix, seat intake across shifts, and admission guidelines."
                breadcrumbs={[{ label: 'Admissions' }, { label: 'Brochure' }]}
                heroImage="/campus/campus-pathway-block.webp"
                heroImageAlt="Tree-lined pathway beside an MSIT academic block, New Delhi"
            />

            {/* Key figures, as on the Placements page */}
            <KeyFiguresStrip items={[
                { value: '150', label: 'GGSIPU CET Code' },
                { value: '4', label: 'B.Tech Branches' },
                { value: '2', label: 'Shifts' },
                { value: '85 : 15', label: 'Delhi : Outside' },
            ]} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-6 sm:space-y-10">

                {/* Latest Brochure Featured Section */}
                <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider rounded-full">
                                <Sparkles className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                                Latest Release
                            </span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                                Session {latestBrochure.year}
                            </span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-1 text-slate-400" aria-hidden="true" /> Official GGSIPU Affiliated Document
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                            {latestBrochure.title}
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                            {latestBrochure.description}
                        </p>
                    </div>

                    {/* Interactive Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8 bg-slate-50 p-2.5 sm:p-4 rounded-2xl border border-slate-200/80">
                        {latestBrochure.features.map((feat, idx) => {
                            if (feat.isInternal) {
                                return (
                                    <a
                                        key={idx}
                                        href={feat.anchor}
                                        onClick={scrollToCutoff}
                                        className="flex items-center justify-between text-xs sm:text-sm text-slate-700 hover:text-primary p-2.5 rounded-xl hover:bg-white transition-all font-semibold border border-transparent hover:border-primary/20 shadow-xs hover:shadow-sm group cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <BookOpen className="w-4 h-4 mr-2 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                            <span>{feat.title}</span>
                                        </div>
                                        <span className="inline-flex items-center text-[11px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-md group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                            {feat.badge || "Jump to Section"} &darr;
                                        </span>
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={idx}
                                    to={feat.anchor}
                                    className="flex items-center justify-between text-xs sm:text-sm text-slate-700 hover:text-primary p-2.5 rounded-xl hover:bg-white transition-all font-semibold border border-transparent hover:border-primary/20 shadow-xs hover:shadow-sm group"
                                >
                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 mr-2 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                        <span>{feat.title}</span>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Download CTA for Latest */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div className="flex flex-col text-xs text-slate-500 font-medium">
                            <span className="flex items-center">
                                <FileText className="w-4 h-4 mr-1.5 text-slate-400" />
                                Format: PDF | High Resolution Official Copy
                            </span>
                            <span className="text-[11px] text-slate-400 mt-0.5">
                                Verified GGSIPU CET Code: 150 (B.Tech)
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <a
                                href={latestBrochure.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-primary/20 shrink-0 text-sm"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Latest Brochure (PDF)
                            </a>
                        </div>
                    </div>
                </div>

                {/* =================================================== */}
                {/* JEE MAIN CUT-OFF RANKS MATRIX SECTION               */}
                {/* =================================================== */}
                <div id="cutoff-ranks" className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-card space-y-5 sm:space-y-6 scroll-mt-40">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold mb-2">
                                <Award className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" /> Official GGSIPU Counseling Matrix
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                JEE Main Cut-Off Ranks (All India CRL)
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                                Opening and closing Common Rank List (CRL) ranks for general category admissions through GGSIPU Centralized Counseling across Delhi Region (85% Home State) and Outside Delhi Region (15% All India).
                            </p>
                        </div>

                        {/* Quota Tab Selector */}
                        <div className="flex items-center p-1 bg-slate-100 rounded-2xl shrink-0 self-start md:self-auto">
                            <button
                                onClick={() => setActiveQuotaTab('delhi')}
                                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                    activeQuotaTab === 'delhi' 
                                        ? 'bg-primary text-white shadow-sm' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Delhi Region (85%)
                            </button>
                            <button
                                onClick={() => setActiveQuotaTab('outside')}
                                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                    activeQuotaTab === 'outside' 
                                        ? 'bg-primary text-white shadow-sm' 
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Outside Delhi (15%)
                            </button>
                        </div>
                    </div>

                    {/* Cut-off Table */}
                    <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                                    <th className="p-3.5">Branch Name</th>
                                    <th className="p-3.5">Shift</th>
                                    <th className="p-3.5">Approved Intake</th>
                                    <th className="p-3.5 text-primary">
                                        {activeQuotaTab === 'delhi' ? 'Delhi Opening CRL' : 'Outside Delhi Opening CRL'}
                                    </th>
                                    <th className="p-3.5 text-primary">
                                        {activeQuotaTab === 'delhi' ? 'Delhi Closing CRL' : 'Outside Delhi Closing CRL'}
                                    </th>
                                    <th className="p-3.5">Key Industry Recruiters</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {cutoffData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-3.5 font-bold text-slate-900">
                                            <div>{row.branch}</div>
                                            <span className="text-[11px] text-slate-500 font-normal">Code: {row.code}</span>
                                        </td>
                                        <td className="p-3.5">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                                row.shift.includes('1st') ? 'bg-primary/5 text-primary border border-primary/15' : 'bg-slate-100 text-slate-600 border border-slate-200'
                                            }`}>
                                                {row.shift}
                                            </span>
                                        </td>
                                        <td className="p-3.5 font-semibold text-slate-700 tabular-nums">{row.intake}</td>
                                        <td className="p-3.5 font-semibold text-slate-800 tabular-nums">
                                            {activeQuotaTab === 'delhi' ? row.delhiOpening : row.outsideOpening}
                                        </td>
                                        <td className="p-3.5 font-bold text-primary bg-primary/5 tabular-nums">
                                            {activeQuotaTab === 'delhi' ? row.delhiClosing : row.outsideClosing}
                                        </td>
                                        <td className="p-3.5 text-slate-600 font-medium">{row.topRecruiter}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Phones: one compact card per branch */}
                    <ul className="md:hidden divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
                        {cutoffData.map((row, idx) => (
                            <li key={idx} className="p-3.5 bg-white">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-slate-900 leading-snug">{row.branch}</div>
                                        <div className="text-[11px] text-slate-500">Code: {row.code}</div>
                                    </div>
                                    <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                        row.shift.includes('1st') ? 'bg-primary/5 text-primary border border-primary/15' : 'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                        {row.shift.includes('1st') ? '1st Shift' : '2nd Shift'}
                                    </span>
                                </div>
                                <dl className="mt-2.5 grid grid-cols-3 gap-2 text-center">
                                    <div className="rounded-lg bg-slate-50 py-1.5">
                                        <dt className="text-[10px] text-slate-500">Intake</dt>
                                        <dd className="text-xs font-semibold text-slate-800 tabular-nums">{row.intake}</dd>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 py-1.5">
                                        <dt className="text-[10px] text-slate-500">Opening</dt>
                                        <dd className="text-xs font-semibold text-slate-800 tabular-nums">{activeQuotaTab === 'delhi' ? row.delhiOpening : row.outsideOpening}</dd>
                                    </div>
                                    <div className="rounded-lg bg-primary/5 py-1.5">
                                        <dt className="text-[10px] text-slate-500">Closing</dt>
                                        <dd className="text-xs font-bold text-primary tabular-nums">{activeQuotaTab === 'delhi' ? row.delhiClosing : row.outsideClosing}</dd>
                                    </div>
                                </dl>
                            </li>
                        ))}
                    </ul>

                    {/* Official Counseling Advisory */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span>Delhi Quota Eligibility (85% Reservation):</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-6">
                                Candidates who have passed their qualifying 10+2 examination from any recognized school or institution located within the National Capital Territory of Delhi are categorized under Delhi Region (OPNDHS).
                            </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span>Outside Delhi Quota (15% All India):</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-6">
                                Candidates passing 10+2 from schools outside the NCT of Delhi are considered under the All India/Outside Delhi category (OPNDOS). Rank cut-offs are correspondingly higher due to national competition.
                            </p>
                        </div>
                    </div>

                    {/* Counseling Link Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <div className="text-xs text-slate-700 font-medium">
                            <strong>Ready to participate in GGSIPU B.Tech Counseling?</strong> Register on the official portal with CET Code 150.
                        </div>
                        <a
                            href="https://ipu.admissions.nic.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition-all whitespace-nowrap"
                        >
                            <span>Visit GGSIPU Admissions Portal</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

                {/* Toggle Button for Older Brochures */}
                <div className="flex flex-col items-center justify-center pt-2">
                    <button
                        onClick={() => setShowOlder(!showOlder)}
                        className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-300 hover:border-slate-400 shadow-sm hover:shadow-md transition-all duration-300 text-sm gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                        aria-expanded={showOlder}
                    >
                        <CalendarDays className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span>{showOlder ? "Hide Older Brochures" : "View Older Brochures"}</span>
                        <span className="px-2 py-0.5 bg-slate-100 group-hover:bg-primary/5 text-slate-600 group-hover:text-primary text-xs font-bold rounded-full border border-slate-200">
                            {olderBrochures.length} Archives
                        </span>
                        {showOlder ? (
                            <ChevronUp className="w-4 h-4 text-slate-500 group-hover:translate-y-[-2px] transition-transform" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 group-hover:translate-y-[2px] transition-transform" />
                        )}
                    </button>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                        {showOlder ? "Showing archived bulletins from 2020 to 2026" : "Click to explore past academic session bulletins"}
                    </p>
                </div>

                {/* Older Brochures List (Toggled) */}
                {showOlder && (
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-card overflow-hidden animate-fade-in">
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center text-sm sm:text-base">
                                <Clock className="w-4 h-4 mr-2 text-slate-500" />
                                Archived Information Bulletins
                            </h3>
                            <span className="text-xs text-slate-500 font-medium">Past Sessions</span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {olderBrochures.map((brochure, index) => (
                                <div key={index} className="p-4 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-slate-50/70 transition-colors group gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                                                {brochure.year}
                                            </h4>
                                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200">
                                                Archived
                                            </span>
                                        </div>
                                        <p className="text-slate-800 font-semibold text-sm mb-1">{brochure.title}</p>
                                        <p className="text-slate-500 font-medium text-xs">{brochure.description}</p>
                                    </div>
                                    <a
                                        href={brochure.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-300 hover:border-slate-400 flex items-center justify-center transition-all text-xs shrink-0 shadow-xs"
                                    >
                                        <Download className="w-4 h-4 mr-2 text-slate-500" />
                                        Download PDF
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Note */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl text-center">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        <strong>Note:</strong> Information bulletins contain historical guidelines, fee rules, and admission criteria approved by GGSIPU for their respective academic years. For current year admissions, please refer to the latest release above and GGSIPU counseling schedules.
                    </p>
                </div>

            </div>
        </main>
    );
};

export default Brochure;
