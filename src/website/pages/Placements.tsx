import React, { useState, useEffect } from 'react';
import { Download, FileText, TrendingUp, Building2, Users, ArrowRight, Award, X, Mail, Linkedin, ChevronRight, Globe, Phone, Star } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import KeyFiguresStrip from '../components/KeyFiguresStrip';
import { facultyMembers } from '../data/facultyData';
import { useCmsPlacementFigures, useCmsPlacementRecords } from '../cms/placements';
import type { FacultyMember } from '../types';

const Placements = () => {
    const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    const getFacultyDetails = (nameQuery: string): FacultyMember => {
        const found = facultyMembers.find(f => f.name.toLowerCase().includes(nameQuery.toLowerCase()));
        return found ? {
            ...found,
            phone: found.phone || "+91 11 6521 5944" // Default T&P office number
        } : {
            name: nameQuery,
            role: "Faculty Member",
            dept: "MSIT",
            img: "/faculty/default-avatar.webp",
            bio: "Faculty coordinator helping facilitate placements for engineering streams.",
            email: "placements@msit.in",
            linkedin: "#",
            qual: "PhD / M.Tech",
            experience: "10+",
            publications: "N/A",
            patents: "N/A",
            phone: "011-65215944"
        };
    };

    const renderMemberAvatar = (details: FacultyMember, isDark = false, size = "large") => {
        const hasCustomImage = details.img && details.img !== '/faculty/default-avatar.webp' && !details.img.includes('default-avatar');
        if (hasCustomImage) {
            return (
                <img 
                    src={details.img} 
                    alt={details.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling instanceof HTMLElement) {
                            e.currentTarget.nextSibling.style.display = 'flex';
                        }
                    }}
                />
            );
        }
        const cleanName = details.name.replace(/Prof\.|Dr\.|Sh\.|Mr\.|Ms\.|\(Dr\.\)/gi, '').trim();
        const initials = cleanName.split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'TP';
        return (
            <div className={`w-full h-full flex items-center justify-center font-extrabold tracking-wider ${
                isDark 
                    ? 'bg-gradient-to-br from-primary to-slate-900 text-white shadow-inner' 
                    : 'bg-primary text-white shadow-inner'
            } ${size === 'large' ? 'text-2xl' : 'text-base'}`}>
                {initials}
            </div>
        );
    };

    const placementDirectors = [
        { nameQuery: "Harish Singh Rawat", committeeRole: "Director – Training & Placement (T&P)", branch: "Overall Head - T&P Department" },
        { nameQuery: "Mandeep Singh", committeeRole: "Director (Placements)", branch: "Corporate Relations & Placement Director" }
    ];

    const committeeMembers = [
        { nameQuery: "Meena Rao", committeeRole: "Convener", branch: "ECE" },
        { nameQuery: "Kavita Sheoran", committeeRole: "Co-convener", branch: "CSE" },
        { nameQuery: "Parveen Kumar", committeeRole: "Co-convener", branch: "IT" }
    ];

    const coordinators = [
        { nameQuery: "Parul Chaudhary", branch: "CSE-1" },
        { nameQuery: "Shaily Malik", branch: "CSE-2" },
        { nameQuery: "Pooja Kherwa", branch: "CSE-3" },
        { nameQuery: "Gunjan Beniwal", displayName: "Ms. Gunjan", branch: "CSE-E" },
        { nameQuery: "Sonika Malik", branch: "IT-1" },
        { nameQuery: "Meena Siwach", branch: "IT-2" },
        { nameQuery: "Minakshi Tomer", branch: "IT-E" },
        { nameQuery: "Sakshi Rajput", branch: "ECE-1" },
        { nameQuery: "Himani", branch: "ECE-2" },
        { nameQuery: "Suman Lata", displayName: "Ms. Sumanlata", branch: "ECE-E" },
        { nameQuery: "Rakhi Kamra", branch: "EEE" },
        { nameQuery: "Sachit Rathee", branch: "EEE" }
    ];

    // Placement Statistics Management (replaced by CMS Placement Years once the CMS answers)
    const filePlacementRecords = [

    // ...
        { year: "2025", link: "https://www.msit.in/media/uploads/2025/10/09/msit-placement-batch-2025.pdf" },
        { year: "2024", link: "https://www.msit.in/media/uploads/2025/06/02/placement-status-batch-2024.pdf" },
        { year: "2023", link: "https://www.msit.in/media/2024/04/09/batch-2023-placement-status-final.pdf" },
        { year: "2022", link: "https://www.msit.in/media/2024/04/09/batch-2022-placement-status-final.pdf" },
        { year: "2021", link: "https://www.msit.in/media/2021/08/26/2021-tpo.pdf" },
        { year: "2020", link: "https://www.msit.in/media/2021/09/08/placement.pdf" },
        { year: "2019", link: "https://www.msit.in/media/2019/05/14/nareshfinal2019.pdf" },
        { year: "2018", link: "https://www.msit.in/media/2018/09/13/placement-2018.pdf" },
        { year: "2017", link: "https://www.msit.in/media/2017/08/11/placements2017.pdf" },
        { year: "2016", link: "https://www.msit.in/media/2017/03/15/updated_pplacements_2016_sheet_xls_-_sheet1.pdf" },
        { year: "2015", link: "https://www.msit.in/media/2018/08/24/placment-2015.pdf" }
    ];

    const topRecruiters = [
        { name: "Google", category: "Product", logo: "/logos/recruiters/google.svg" },
        { name: "Microsoft", category: "Product", logo: "/logos/recruiters/microsoft.svg" },
        { name: "Amazon", category: "Product", logo: "/logos/recruiters/amazon.svg" },
        { name: "Adobe", category: "Product", logo: "/logos/recruiters/adobe.svg" },
        { name: "Samsung R&D", category: "Product", logo: "/logos/recruiters/samsung.svg" },
        { name: "Postman", category: "Product", logo: "/logos/recruiters/postman.svg" },
        { name: "ZS Associates", category: "Consulting", logo: "/logos/recruiters/zs.svg" },
        { name: "ION Trading", category: "Fintech", logo: "/logos/recruiters/ion.png" },
        { name: "Josh Technologies", category: "Product", logo: "/logos/recruiters/josh-technology-group.png" },
        { name: "TCS", category: "Services", logo: "/logos/recruiters/tcs.svg" },
        { name: "Infosys", category: "Services", logo: "/logos/recruiters/infosys.svg" },
        { name: "Wipro", category: "Services", logo: "/logos/recruiters/wipro.svg" },
        { name: "Accenture", category: "Services", logo: "/logos/recruiters/accenture.svg" },
        { name: "Cognizant", category: "Services", logo: "/logos/recruiters/cognizant.svg" },
        { name: "IBM", category: "Services", logo: "/logos/recruiters/ibm.svg" }
    ];

    const fileKeyFigures = [
        { value: "95%+", label: "Placement Rate", note: "For eligible stream students" },
        { value: "250+", label: "Recruiters", note: "Product & services companies" },
        { value: "₹1.2 Cr", label: "Highest Package", note: "National and global placements" },
        { value: "₹7–8.5 LPA", label: "Average Package", note: "Consistent upward salary trends" }
    ];
    const placementRecords = useCmsPlacementRecords(filePlacementRecords);
    const keyFigures = useCmsPlacementFigures(fileKeyFigures);

    const trainingPrograms = [
        {
            title: "Aptitude & Evaluation",
            description: "Regular diagnostics through leading assessment portals including AMCAT, CoCubes, and FNAT to evaluate quantitative and logical reasoning skills."
        },
        {
            title: "Coding Drills & Hackathons",
            description: "Continuous programming contests, competitive coding workshops, and hackathons to prepare students for technical interviews."
        },
        {
            title: "Technology Workshops",
            description: "Expert-led bootcamps focusing on trending domains such as Python programming, Machine Learning, Cloud Computing, and Web Technologies."
        },
        {
            title: "Mock Interviews & GDs",
            description: "Simulated face-to-face technical rounds, HR interview coaching, and structured Group Discussions to build confidence."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 transition-colors duration-300">
            <SEO 
                title="Placements" 
                description="Explore stellar placement records at Maharaja Surajmal Institute of Technology. Our graduates secure top roles at Google, Microsoft, and Amazon with 95%+ success." 
                canonicalPath="/placements"
            />
            <PageHero 
                title="Stellar Placement" 
                accentTitle="Records & Success" 
                description="Maharaja Surajmal Institute of Technology (MSIT) has a legacy of producing industry-ready engineers. Explore our decade-long track record of stellar placements."
                breadcrumbs={[{ label: 'Placements' }]}
                heroImage="/campus/conference-room.jpg"
                heroImageAlt="MSIT conference room used for placement interviews and pre-placement talks"
            />

            {/* Key figures: a slim strip over the hero */}
            <KeyFiguresStrip items={keyFigures} />

            {/* Recruiters Grid */}
            <div className="bg-slate-50 border-b border-slate-200 py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center mb-5 sm:mb-10">
                        <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-3 sm:mr-4 shrink-0" aria-hidden="true" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Industry Giants Scouting at MSIT</h2>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
                        {topRecruiters.map((company, index) => (
                            <div key={index} className="bg-white p-2 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-between text-center group hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[96px] sm:min-h-[145px]">
                                <div className="h-10 sm:h-14 w-full flex items-center justify-center p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50/80 group-hover:scale-105 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                                    <img 
                                        src={company.logo} 
                                        alt={`${company.name} logo`} 
                                        className="max-h-7 sm:max-h-10 max-w-[85%] sm:max-w-[120px] object-contain" 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                                <div className="w-full pt-2">
                                    <span className="text-[9px] sm:text-xs font-extrabold text-slate-800 group-hover:text-primary transition-colors uppercase tracking-wide sm:tracking-wider leading-tight block">{company.name}</span>
                                    <div className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] text-slate-500 font-bold tracking-wider sm:tracking-widest uppercase">{company.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 flex flex-col lg:flex-row gap-10 lg:gap-16">

                {/* Main Content Area */}
                <div className="flex-grow min-w-0 space-y-12 sm:space-y-16">
                    
                    {/* Training & Preparation Section */}
                    <div>
                        <div className="flex items-center mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
                            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-3 sm:mr-4 shrink-0" aria-hidden="true" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Training & Grooming Programs</h2>
                        </div>
                        <p className="text-slate-600 mb-5 sm:mb-8 text-base sm:text-lg leading-relaxed">
                            The Training & Placement cell structures intensive bootcamps and assessment modules to transform students into corporate-ready professionals:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                            {trainingPrograms.map((prog, index) => (
                                <div key={index} className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200/80 shadow-sm">
                                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2">{prog.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{prog.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placement Policy Section */}
                    <div>
                        <div className="flex items-center mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
                            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-3 sm:mr-4 shrink-0" aria-hidden="true" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Placement Policy & Guidelines</h2>
                        </div>
                        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 space-y-5 sm:space-y-6">
                            <div className="flex gap-4">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Academic Bottomline</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Students are advised to maintain a consistent score of <strong>60% and above</strong> throughout their professional streams to qualify for prime product and consulting placement drives.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Support for Unplaced Students</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        The T&P Cell provides dedicated coaching and prioritized session scheduling for students who are yet to secure placements during the starting phase of recruitment drives.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Industry Institution Interaction</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        To maintain alignment with market expectations, students undergo compulsory industrial training, minor/major research projects, and attend corporate webinar series.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placement Committee Section */}
                    <div>
                        <div className="flex items-center mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
                            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-3 sm:mr-4 shrink-0" aria-hidden="true" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Placement Committee</h2>
                        </div>
                        <p className="text-slate-600 mb-5 sm:mb-8 text-base sm:text-lg leading-relaxed">
                            Placement Committee MSIT has been formed with a strong emphasis and aim to achieve the target of 100% placements of all the interested and eligible students. The Committee facilitates the students and coordinates during campus drives.
                        </p>

                        {/* Directorate Leadership */}
                        <div className="mb-10">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                                <Star className="w-4 h-4 fill-primary text-primary" aria-hidden="true" /> Training & Placement Directorate Leadership
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                                {placementDirectors.map((director, i) => {
                                    const details = getFacultyDetails(director.nameQuery);
                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => setSelectedMember(details)}
                                            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                                        >
                                                                                        <div className="flex items-center gap-4 sm:gap-5">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 bg-slate-50">
                                                    {renderMemberAvatar(details, false, "large")}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider rounded mb-1.5">{director.branch}</span>
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">{details.name}</h3>
                                                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{director.committeeRole}</p>
                                                    <div className="mt-2 sm:mt-3 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                                                        View Profile & Details &rarr;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Committee Conveners */}
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Committee Conveners</h3>
                        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 sm:mb-8">
                            {committeeMembers.map((member, i) => {
                                const details = getFacultyDetails(member.nameQuery);
                                return (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedMember(details)}
                                        className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group text-center"
                                    >
                                        <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden mb-2 sm:mb-4 border-2 border-slate-100 bg-slate-50">
                                            {renderMemberAvatar(details, false, "large")}
                                        </div>
                                        <span className="inline-block px-1.5 sm:px-2.5 py-0.5 bg-primary/10 text-primary text-[8px] sm:text-[10px] font-bold uppercase tracking-wide sm:tracking-wider rounded mb-1">{details.dept || member.branch}</span>
                                        <h3 className="text-[11px] sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">{details.name}</h3>
                                        <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">{member.committeeRole}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Faculty Coordinators */}
                        <div className="bg-white p-3 sm:p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-3 sm:mb-6 text-center text-sm sm:text-base">Faculty Coordinators</h4>
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                                {coordinators.map((coord, i) => {
                                    const details = getFacultyDetails(coord.nameQuery);
                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => setSelectedMember(details)}
                                            className="bg-slate-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer group text-center min-w-0"
                                        >
                                            <h5 className="font-bold text-slate-800 group-hover:text-primary transition-colors text-[10px] sm:text-sm truncate">{coord.displayName || details.name}</h5>
                                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-slate-200 text-slate-600 text-[8px] font-bold uppercase rounded">{coord.branch}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* PDF Records Section */}
                    <div>
                        <div className="flex items-center mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-200">
                            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-3 sm:mr-4 shrink-0" aria-hidden="true" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Official Placement Records</h2>
                        </div>
                        <p className="text-slate-600 mb-5 sm:mb-8 text-base sm:text-lg leading-relaxed">
                            Transparency is our core value. View our detailed, year-wise historical placement data containing company lists, packages, and student achievements.
                        </p>

                        <div className="grid grid-cols-3 gap-2 sm:gap-6">
                            {placementRecords.map((record, index) => (
                                <a
                                    key={index}
                                    href={record.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white rounded-xl p-3 sm:p-6 border border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between gap-2"
                                >
                                    <div>
                                        <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-slate-500 mb-0.5 sm:mb-1">Batch of</div>
                                        <div className="text-lg sm:text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors tabular-nums">
                                            {record.year}
                                        </div>
                                    </div>
                                    <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                                        <Download className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-500 group-hover:text-primary" aria-label={`Download ${record.year} placement record`} />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 shrink-0">
                    <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-5 sm:p-8 lg:sticky lg:top-40 space-y-8">
                        <div className="hidden lg:block">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                <Building2 className="w-5 h-5 mr-3 text-primary" aria-hidden="true" />
                                Top Recruiters
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {topRecruiters.map((company, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-md text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-default"
                                    >
                                        {company.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="lg:pt-8 lg:border-t border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-2">Training & Placement Cell</h4>
                            <p className="text-sm text-slate-500 mb-4">
                                The T&P cell actively bridges the gap between academia and industry.
                            </p>
                            <div className="flex flex-col space-y-2 px-1">
                                <a href="tel:+911165215944" className="text-sm font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-2">
                                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" /> 011-65215944
                                </a>
                                <a href="mailto:placements@msit.in" className="text-sm font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-2">
                                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" /> placements@msit.in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Modal Popup */}
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-fade-in">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-backdrop-fade"
                        onClick={() => setSelectedMember(null)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-3xl sm:rounded-[2rem] shadow-2xl border border-slate-200 animate-scale-in">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Top banner / image */}
                        <div className="bg-white border-b border-slate-200 p-5 sm:p-8 pt-10 sm:pt-12 relative">
                                                        <div className="flex gap-4 sm:gap-6 items-center relative z-10">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 bg-slate-50">
                                    {renderMemberAvatar(selectedMember, false, "large")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider rounded mb-1.5 sm:mb-2">{selectedMember.dept}</span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug pr-10">{selectedMember.name}</h3>
                                    <p className="text-primary text-xs sm:text-sm font-medium line-clamp-2 mt-1">{selectedMember.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details body */}
                        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 bg-slate-50">
                            {selectedMember.bio && (
                                <div>
                                    <h4 className="font-sans! text-xs font-semibold text-slate-500 uppercase tracking-wider! mb-3 flex items-center gap-1.5">
                                        <FileText className="w-4 h-4 text-primary" aria-hidden="true" /> Professional Bio
                                    </h4>
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        {selectedMember.bio}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200">
                                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Qualification</div>
                                    <div className="text-sm font-medium text-slate-900 leading-snug">{selectedMember.qual || "N/A"}</div>
                                </div>
                                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200">
                                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Experience / Status</div>
                                    <div className="text-sm font-medium text-slate-900 leading-snug">{selectedMember.experience} Years</div>
                                </div>
                            </div>

                            {selectedMember.goodAt && selectedMember.goodAt.length > 0 && (
                                <div>
                                    <h4 className="font-sans! text-xs font-semibold text-slate-500 uppercase tracking-wider! mb-3 flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-primary fill-primary" aria-hidden="true" /> Key Focus Areas
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMember.goodAt.map((item, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-primary/5 border border-primary/20 rounded-md text-xs font-medium text-primary">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                                <div className="flex flex-col gap-2 shrink-0">
                                    <a 
                                        href={`mailto:${selectedMember.email}`}
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors truncate"
                                    >
                                        <Mail className="w-4 h-4 shrink-0" />
                                        <span className="truncate text-left">{selectedMember.email}</span>
                                    </a>

                                    <a 
                                        href={`tel:${(selectedMember.phone || '').replace(/\s+/g, '')}`}
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors truncate"
                                    >
                                        <Phone className="w-4 h-4 shrink-0" />
                                        <span className="truncate text-left">{selectedMember.phone}</span>
                                    </a>
                                </div>

                                <div className="flex gap-3 justify-end items-end">
                                    {selectedMember.pdfLink && (
                                        <a 
                                            href={selectedMember.pdfLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center transition-colors"
                                            title="View Official Profile PDF"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </a>
                                    )}
                                    {selectedMember.linkedin && (
                                        <a 
                                            href={selectedMember.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-xl flex items-center justify-center transition-colors"
                                            title="LinkedIn Profile"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Placements;
