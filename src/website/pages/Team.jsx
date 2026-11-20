import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { Users, Code, Award, GraduationCap, X, Mail, Linkedin, Github, ExternalLink, Calendar, Star, FileText, ChevronRight, Globe } from 'lucide-react';


const Team = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    const teamData = {
        teachers: [
            {
                id: 'vikrant-shokeen',
                name: 'Dr. Vikrant Shokeen',
                role: 'Assistant Professor & Advisory Lead',
                dept: 'Computer Science & Engineering',
                img: '/faculty/vikrant-shokeen.webp',
                bio: 'Dr. Vikrant Shokeen is an Assistant Professor in the CSE Department at MSIT. He holds a Ph.D. and specializes in Machine Learning and Image Processing, with significant research in medical imaging for lung cancer detection. Mentors the development team on core architectural guidelines, system scalability, and software best practices.',
                email: 'vikrantshokeen@msit.in',
                linkedin: 'https://in.linkedin.com/in/vikrant-shokeen-61870123',
                qualifications: 'Ph.D., M.Tech., B.Tech.',
                experience: '4+ Years',
                contributions: [
                    'Supervised Core Software Engineering standards',
                    'Guided security architecture planning',
                    'Coordinated college administration communications'
                ]
            },
            {
                id: 'rinky-dwivedi',
                name: 'Dr. Rinky Dwivedi',
                role: 'Professor, HOD & Content Coordinator',
                dept: 'Computer Science & Engineering',
                img: '/faculty/rinky-dwivedi.webp',
                bio: 'Dr. Rinky Dwivedi is a Professor and the Head of Department (CSE) at MSIT. She holds a Ph.D. from DTU specializing in Agile Method Engineering. With over 19 years of teaching and research experience, her work focuses on Software Engineering and Soft Computing. Oversees the design metrics, content validation, accessibility standard compliance, and structural flow of the portal.',
                email: 'rinkydwivedi@msit.in',
                linkedin: 'https://in.linkedin.com/in/dr-rinky-dwivedi-0843615',
                qualifications: 'Ph.D. (DTU), M.E. (DCE), B.Tech.',
                experience: '19+ Years',
                contributions: [
                    'Led Web Accessibility compliance validation',
                    'Supervised informational layout structural design',
                    'Managed content verification guidelines'
                ]
            }
        ],
        students: [
            {
                id: 'jayant-olhyan',
                name: 'Jayant Olhyan',
                role: 'Lead Full-Stack Developer & UI Architect',
                dept: '2st Year, CSE',
                img: '/team/jayant-olhyan.webp',
                bio: 'Passionate software engineer specializing in modern React frameworks, interactive motions, and responsive design systems. Responsible for frontend development and design alignment.',
                email: 'jayantolhyan@gmail.com',
                linkedin: 'https://www.linkedin.com/in/jayant-olhyan/',
                github: 'https://github.com/JayantOlhyan',
                qualifications: 'B.Tech CSE (Batch of 2029)',
                experience: '1st Year Student',
                contributions: [
                    'Designed and built entire React UI system',
                    'Implemented dynamic custom transitions and animations',
                    'Optimized production compilation benchmarks'
                ]
            },
            {
                id: 'pawan-singh',
                name: 'Pawan Singh',
                role: 'Vice President & Head of Quality Assurance Department',
                dept: '2nd Year, IT',
                img: '/team/pawan-singh.webp',
                bio: 'Vice President and Head of Quality Assurance Department. Responsible for quality assurance frameworks, performance optimization, structural testing, and cross-departmental coordination.',
                email: 'pawansinghmahori@gmail.com',
                portfolio: 'https://pawan-singh-portfolio.example.com', // Placeholder for portfolio website
                linkedin: 'https://www.linkedin.com/in/pawansinghmahori/',
                github: 'https://github.com/PawanSinghMahori',
                qualifications: 'B.Tech IT - 1 (Batch of 2029)',
                experience: 'Vice President & QA Head',
                contributions: [
                    'Heads Quality Assurance & Testing Department',
                    'Audits accessibility compliance and user experience standards',
                    'Oversees quality metrics and cross-functional project deliverables'
                ]
            },
            {
                id: 'abhay-mishra',
                name: 'Abhay Mishra',
                role: 'Student Designer & Social Media Lead',
                dept: '2nd Year, ECE',
                img: '/team/abhay-mishra.webp',
                bio: 'Student designer focused on UI/UX layout design and social media management. Creates visual assets, refines user experience flows, and manages online outreach.',
                email: 'bravemishra2007@gmail.com',
                linkedin: 'https://linkedin.com',
                github: 'https://github.com',
                qualifications: 'B.Tech ECE (Batch of 2028)',
                experience: '2nd Year Student',
                contributions: [
                    'Designed UI/UX layouts and visual branding assets',
                    'Managed social media campaigns and public outreach',
                    'Collaborated on web interface aesthetics and user flows'
                ]
            }
        ]
    };

    return (
        <main className="min-h-screen bg-slate-50 transition-colors duration-300">
            <SEO 
                title="Meet The Team" 
                description="Discover the core development team and faculty coordinators who built the Maharaja Surajmal Institute of Technology website."
                canonicalPath="/team"
            />

            <PageHero 
                title="Meet The" 
                accentTitle="Core Team" 
                description="The talented engineers, faculty mentors, and coordinators behind the MSIT digital experience. Click on any member to explore their contributions, roles, and socials."
                breadcrumbs={[{ label: 'Meet the Team' }]}
                heroImage="/campus-hero.webp"
                heroImageAlt="MSIT Core Development Team and Academic Staff"
            />

            {/* FACULTY SECTION */}
            <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="text-primary font-black tracking-[0.2em] text-xs uppercase mb-3 block">Guidance & Compliance</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Faculty Coordinators</h2>
                    <p className="text-slate-500 text-sm mt-3 font-semibold">Distinguished professors providing core oversight, requirements management, and academic compliance for the project.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {teamData.teachers.map((member) => (
                        <div 
                            key={member.id}
                            onClick={() => setSelectedMember(member)}
                            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-row gap-4 sm:gap-6 items-center"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 ring-2 ring-slate-100">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="inline-block px-2 py-0.5 bg-blue-50 text-primary text-[10px] font-black uppercase tracking-wider rounded mb-1">{member.dept}</span>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{member.name}</h3>
                                <p className="text-slate-500 text-xs font-semibold line-clamp-2 mt-0.5">{member.role}</p>
                                <span className="text-primary text-xs font-bold mt-2 sm:mt-3 inline-flex items-center gap-1">
                                    View Profile <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* STUDENTS SECTION */}
            <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-200">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <span className="text-blue-600 font-black tracking-[0.2em] text-xs uppercase mb-3 block">Engineering & Design</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Student Developers</h2>
                    <p className="text-slate-500 text-sm mt-3 font-semibold">Core students from Computer Science & Information Technology engineering batches building and optimizing the platform.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                    {teamData.students.map((member) => (
                        <div 
                            key={member.id}
                            onClick={() => setSelectedMember(member)}
                            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex gap-4 items-center mb-4 sm:mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-slate-100">
                                        <img 
                                            src={member.img} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/faculty/default-avatar.webp';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded mb-1">{member.dept}</span>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{member.name}</h3>
                                        <p className="text-slate-500 text-xs font-semibold line-clamp-2">{member.role}</p>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3 mb-5 sm:mb-6">
                                    {member.bio}
                                </p>
                            </div>

                            <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-primary font-bold text-xs">
                                <span>Explore Contributions</span>
                                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                                    <ChevronRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

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
                        <div className="bg-slate-900 text-white p-5 sm:p-8 pt-10 sm:pt-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px]"></div>
                            <div className="flex gap-4 sm:gap-6 items-center relative z-10">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shrink-0">
                                    <img 
                                        src={selectedMember.img} 
                                        alt={selectedMember.name} 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = '/faculty/default-avatar.webp';
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded mb-1.5 sm:mb-2 border border-white/5">{selectedMember.dept}</span>
                                    <h3 className="text-xl sm:text-2xl font-black truncate">{selectedMember.name}</h3>
                                    <p className="text-blue-300 text-xs sm:text-sm font-semibold line-clamp-2 mt-0.5">{selectedMember.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details body */}
                        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 bg-[#f8fafc]">
                            <div>
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-blue-500" /> Professional Bio
                                </h4>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                                    {selectedMember.bio}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Qualification</div>
                                    <div className="text-xs font-extrabold text-slate-800">{selectedMember.qualifications}</div>
                                </div>
                                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Experience / Status</div>
                                    <div className="text-xs font-extrabold text-slate-800">{selectedMember.experience}</div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                                    <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" /> Key Project Contributions
                                </h4>
                                <ul className="space-y-3">
                                    {selectedMember.contributions.map((item, idx) => (
                                        <li key={idx} className="flex gap-2 items-start text-xs font-semibold text-slate-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                                <a 
                                    href={`mailto:${selectedMember.email}`}
                                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors truncate"
                                >
                                    <Mail className="w-4 h-4 shrink-0" />
                                    <span className="truncate">{selectedMember.email}</span>
                                </a>

                                <div className="flex gap-3 justify-end">
                                    {selectedMember.portfolio && (
                                        <a 
                                            href={selectedMember.portfolio} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center transition-colors"
                                            title="Portfolio Website"
                                        >
                                            <Globe className="w-4 h-4" />
                                        </a>
                                    )}
                                    {selectedMember.linkedin && (
                                        <a 
                                            href={selectedMember.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-[#0077B5] hover:bg-[#005a8a] text-white rounded-xl flex items-center justify-center transition-colors"
                                            title="LinkedIn Portfolio"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {selectedMember.github && (
                                        <a 
                                            href={selectedMember.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center transition-colors"
                                            title="GitHub Profile"
                                        >
                                            <Github className="w-4 h-4" />
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

export default Team;
