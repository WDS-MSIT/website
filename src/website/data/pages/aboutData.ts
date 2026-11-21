import type { PageData } from '../../types';

export const aboutData: Record<string, PageData> = {
    "vision-mission": {
        title: "Vision & Mission",
        subtitle: "Shaping the future of technology and society at Maharaja Surajmal Institute of Technology.",
        seo_description: "Discover the vision and mission of Maharaja Surajmal Institute of Technology. Learn how we shape the future of engineering with excellence and ethical values.",
        category: "About MSIT",
        heroImage: "/photos/01_campus-exterior/founder-bust-maharaja-surajmal-01.jpg",
        heroImageAlt: "Maharaja Surajmal memorial bronze bust at MSIT campus, New Delhi",
        content: `
            <div class="space-y-4 sm:space-y-6">
                <section class="not-prose rounded-2xl sm:rounded-3xl bg-surface ring-1 ring-slate-200/80 p-5 sm:p-10">
                    <h3 class="font-[Libre_Baskerville,serif] text-base sm:text-xl font-bold text-primary m-0 mb-2 sm:mb-4">Vision</h3>
                    <p class="font-[Libre_Baskerville,serif] text-base sm:text-[1.375rem] leading-relaxed sm:leading-[1.6] text-slate-900 m-0">To become one of the most admired centers of academic excellence in the field of Engineering &amp; Technology for all-round professional development of students to enable them to meet the growing technological needs of the country.</p>
                </section>

                <section class="not-prose rounded-2xl sm:rounded-3xl bg-surface ring-1 ring-slate-200/80 p-5 sm:p-10">
                    <h3 class="font-[Libre_Baskerville,serif] text-base sm:text-xl font-bold text-primary m-0 mb-2 sm:mb-4">Mission</h3>
                    <p class="font-[Libre_Baskerville,serif] text-base sm:text-[1.375rem] leading-relaxed sm:leading-[1.6] text-slate-900 m-0">Developing new paradigm in imparting education in the fields of Engineering and Technology and to imbibe national values leading to student's empowerment, with a view to prepare them to meet the national and global challenges.</p>
                </section>
            </div>
        `,
        stats: [
            { label: "Global Alumni", value: "15,000+", link: "/alumni-network", desc: "Connect with 15k+ alumni across global tech leaders" },
            { label: "Research Centers", value: "4", link: "/facilities?tab=labs#research-centers", desc: "Explore AI, IoT, VLSI & Robotics Centers of Excellence" }
        ]
    },
    "history": {
        title: "History & Legacy",
        subtitle: "Over two decades of academic excellence at Maharaja Surajmal Institute of Technology.",
        seo_description: "Explore the legacy of Maharaja Surajmal Institute of Technology since 2001. Learn about our foundation under the Surajmal Memorial Education Society in Delhi.",
        category: "About MSIT",
        heroImage: "/photos/10_plaques-notice-boards-achievements/foundation-stone-plaque-01.jpg",
        heroImageAlt: "Foundation Stone of Maharaja Surajmal Institute laid by President Neelam Sanjiva Reddy, 12 December 1978",
        content: `
            <div class="space-y-8">
                <div class="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/70">
                    <div class="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                        <img src="/photos/10_plaques-notice-boards-achievements/foundation-stone-plaque-01.jpg" alt="Foundation Stone laid by President Neelam Sanjiva Reddy, 12 December 1978" class="w-full h-auto object-cover" />
                    </div>
                    <div>
                        <span class="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-2">Historic Milestone</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Foundation Stone (12 Dec 1978)</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-3">The historic foundation stone of the institute was ceremoniously laid by <strong>Shri Neelam Sanjiva Reddy</strong>, President of India, on Tuesday, 12 December 1978. The auspicious ceremony was presided over by <strong>Chaudhary Charan Singh</strong>.</p>
                        <p class="text-slate-500 text-xs">Surajmal Memorial Education Society was founded in 1972 at Janakpuri with an aim to impart quality technical education to rural and urban youth alike.</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/70">
                    <div class="order-2 md:order-1">
                        <span class="text-blue-700 text-xs font-bold uppercase tracking-widest block mb-2">Our Guiding Light</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Maharaja Surajmal (1707–1763)</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-3">Named after the visionary Bharatpur ruler Maharaja Surajmal, who firmly believed that <em>humanity is the only true religion of man</em>. He dedicated his life to national integration, fearless justice, and the upliftment of farmers and artisans.</p>
                        <p class="text-slate-500 text-xs">The bronze memorial bust located in the campus courtyard serves as an enduring source of inspiration for generations of engineers.</p>
                    </div>
                    <div class="order-1 md:order-2 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                        <img src="/photos/01_campus-exterior/founder-bust-maharaja-surajmal-01.jpg" alt="Memorial Bronze Bust of Maharaja Surajmal (1707-1763)" class="w-full h-auto object-cover" />
                    </div>
                </div>

                <div>
                    <h3 class="text-2xl font-semibold text-slate-900 mt-6 mb-4">Establishment of MSIT</h3>
                    <p class="text-slate-700 leading-relaxed">Maharaja Surajmal Institute of Technology was formally established in 2001 with the approval of AICTE, Ministry of Education, and affiliation with Guru Gobind Singh Indraprastha University (GGSIPU), Delhi. Over the last two decades, MSIT has emerged as an undisputed pioneer in North Indian technical education.</p>
                </div>
            </div>
        `,
        stats: [
            { label: "Society Founded", value: "1972" },
            { label: "Foundation Stone", value: "1978" },
            { label: "B.Tech Inception", value: "2001" },
            { label: "Campus Area", value: "8 Acres" }
        ],
        bulletPoints: [
            { 
                label: "Foundation Stone Dec 12, 1978", 
                detail: "The historic foundation stone of the institute was ceremoniously laid by Shri Neelam Sanjiva Reddy, President of India, on December 12, 1978, in an auspicious ceremony presided over by Chaudhary Charan Singh, marking the birth of a premier educational landmark in New Delhi.",
                url: "/virtual-tour#foundation-stone-plaque"
            },
            { 
                label: "Affiliated to GGSIPU", 
                detail: "MSIT has been permanently affiliated to Guru Gobind Singh Indraprastha University (GGSIPU), Delhi since its inception in 2001, consistently securing top academic ranks, Chancellor Gold Medals, and university merit positions.",
                url: "/mandatory-disclosures"
            },
            { 
                label: "AICTE Approved Grade A", 
                detail: "Approved by the All India Council for Technical Education (AICTE), Ministry of Education, Govt. of India, with NAAC Grade 'A' and NBA accreditations across all its core engineering departments.",
                url: "/mandatory-disclosures#nba-accreditation-status"
            }
        ]
    },
    "about": {
        title: "Defining Excellence",
        subtitle: "A legacy of engineering brilliance, innovation, and holistic development since 2001.",
        seo_description: "Discover the legacy of Maharaja Surajmal Institute of Technology. Learn about our mission to provide excellence in engineering and technology since 2001.",
        category: "About MSIT",
        heroImage: "/campus/main-academic-building.webp",
        heroImageAlt: "Maharaja Surajmal Institute of Technology campus overview, New Delhi",
        content: `
            <div class="space-y-10 sm:space-y-14">
                <section class="not-prose">
                    <p class="font-[Libre_Baskerville,serif] text-lg sm:text-[1.6rem] leading-relaxed sm:leading-[1.5] text-slate-900 m-0">
                        Maharaja Surajmal Institute of Technology (MSIT) is an institution that stands for excellence, innovation, and integrity. Since its inception in 2001, MSIT has been dedicated to providing high-quality technical education and fostering an environment where students can realize their full potential.
                    </p>
                    <div class="mt-6 sm:mt-10 pt-5 sm:pt-8 border-t border-slate-200 grid sm:grid-cols-[minmax(0,1fr)_11rem] gap-5 sm:gap-10">
                        <p class="text-sm sm:text-base text-slate-700 leading-relaxed m-0">
                            The institute has over a short span of time acquired and developed impressive infrastructure, expertise and resources for imparting high-quality engineering education. Operating from a spacious seven-storeyed building with a built-up area of 17,837 sq.m, MSIT provides a serene and intellectually stimulating environment.
                        </p>
                        <dl class="m-0 grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-5">
                            <div class="min-w-0">
                                <dt class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Established</dt>
                                <dd class="m-0 mt-0.5 font-[Libre_Baskerville,serif] text-base sm:text-lg font-bold text-primary leading-tight">2001</dd>
                            </div>
                            <div class="min-w-0">
                                <dt class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Campus</dt>
                                <dd class="m-0 mt-0.5 font-[Libre_Baskerville,serif] text-base sm:text-lg font-bold text-primary leading-tight">Seven storeys</dd>
                            </div>
                            <div class="min-w-0">
                                <dt class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">Affiliated to</dt>
                                <dd class="m-0 mt-0.5 font-[Libre_Baskerville,serif] text-base sm:text-lg font-bold text-primary leading-tight">GGSIPU</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section class="border-t border-slate-100 pt-10 max-sm:pt-8">
                    <h3 class="text-2xl font-bold text-slate-900 mb-8 text-center sm:text-left max-sm:text-xl max-sm:mb-4">Accreditations & Affiliations</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-sm:grid-cols-2 max-sm:gap-3">
                        
                        <a href="https://msit.in/media/uploads/2026/04/07/aicte-eoa-merged.pdf" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-6 max-sm:p-3 bg-slate-50/50 rounded-3xl max-sm:rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-white hover:shadow-card hover:scale-[1.02] transition-all group cursor-pointer text-center no-underline">
                            <img src="/aicte-logo.png" alt="AICTE Approved Badge" class="h-24 w-24 object-contain mb-4 max-sm:h-14 max-sm:w-14 max-sm:my-1 group-hover:scale-105 transition-transform" />
                            <h4 class="font-bold text-slate-900 mb-1 max-sm:text-sm max-sm:leading-snug">Approved by AICTE</h4>
                            <p class="text-xs font-black uppercase tracking-widest text-orange-700 mb-2 max-sm:text-[9px] max-sm:tracking-wider max-sm:mb-0 max-sm:leading-snug">Extension of Approval (2026)</p>
                            <p class="text-xs text-slate-500 leading-relaxed mt-2 max-sm:hidden">Official Extension of Approval for Maharaja Surajmal Institute of Technology.</p>
                            <span class="mt-auto pt-4 max-sm:pt-2 text-xs max-sm:text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">View EOA Proof &rarr;</span>
                        </a>

                        <a href="https://msit.in/media/uploads/2025/09/09/merged.pdf" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-6 max-sm:p-3 bg-slate-50/50 rounded-3xl max-sm:rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-card hover:scale-[1.02] transition-all group cursor-pointer text-center no-underline">
                            <img src="/ggsipu-logo.png" alt="GGSIPU Affiliation Seal" class="h-24 w-24 object-contain mb-4 max-sm:h-14 max-sm:w-14 max-sm:my-1 group-hover:scale-105 transition-transform" />
                            <h4 class="font-bold text-slate-900 mb-1 max-sm:text-sm max-sm:leading-snug">GGSIPU Affiliated</h4>
                            <p class="text-xs font-black uppercase tracking-widest text-blue-700 mb-2 max-sm:text-[9px] max-sm:tracking-wider max-sm:mb-0 max-sm:leading-snug">Primary Affiliating University</p>
                            <p class="text-xs text-slate-500 leading-relaxed mt-2 max-sm:hidden">Official affiliation letters and consolidated archives from GGSIPU.</p>
                            <span class="mt-auto pt-4 max-sm:pt-2 text-xs max-sm:text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Affiliation Proof &rarr;</span>
                        </a>

                        <a href="https://msit.in/media/2022/12/23/naac.pdf" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-6 max-sm:p-3 bg-slate-50/50 rounded-3xl max-sm:rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-card hover:scale-[1.02] transition-all group cursor-pointer text-center no-underline">
                            <img src="/naac-logo.png" alt="NAAC Accredited Badge" class="h-24 w-24 object-contain mb-4 max-sm:h-14 max-sm:w-14 max-sm:my-1 group-hover:scale-105 transition-transform" />
                            <h4 class="font-bold text-slate-900 mb-1 max-sm:text-sm max-sm:leading-snug">NAAC Accredited</h4>
                            <p class="text-xs font-black uppercase tracking-widest text-emerald-700 mb-2 max-sm:text-[9px] max-sm:tracking-wider max-sm:mb-0 max-sm:leading-snug">'A' Grade Status</p>
                            <p class="text-xs text-slate-500 leading-relaxed mt-2 max-sm:hidden">Accredited by the National Assessment and Accreditation Council.</p>
                            <span class="mt-auto pt-4 max-sm:pt-2 text-xs max-sm:text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">View NAAC Proof &rarr;</span>
                        </a>

                        <a href="https://msit.in/media/uploads/2025/08/27/nba_2023_all_depts_merged.pdf" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-6 max-sm:p-3 bg-slate-50/50 rounded-3xl max-sm:rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-card hover:scale-[1.02] transition-all group cursor-pointer text-center no-underline">
                            <img src="/nba-logo.png" alt="NBA Accredited Badge" class="h-24 w-24 object-contain mb-4 max-sm:h-14 max-sm:w-14 max-sm:my-1 group-hover:scale-105 transition-transform" />
                            <h4 class="font-bold text-slate-900 mb-1 max-sm:text-sm max-sm:leading-snug">NBA Accredited</h4>
                            <p class="text-xs font-black uppercase tracking-widest text-blue-700 mb-2 max-sm:text-[9px] max-sm:tracking-wider max-sm:mb-0 max-sm:leading-snug">CSE, IT, ECE, EEE</p>
                            <p class="text-xs text-slate-500 leading-relaxed mt-2 max-sm:hidden">Specifically accredited B.Tech engineering departments.</p>
                            <span class="mt-auto pt-4 max-sm:pt-2 text-xs max-sm:text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">View NBA Proof &rarr;</span>
                        </a>

                        <a href="https://msit.in/media/2024/07/04/doc-20240704-wa0028.pdf" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-6 max-sm:p-3 bg-slate-50/50 rounded-3xl max-sm:rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-card hover:scale-[1.02] transition-all group cursor-pointer text-center no-underline">
                            <img src="/iso-logo.png" alt="ISO Certification Badge" class="h-24 w-24 object-contain mb-4 max-sm:h-14 max-sm:w-14 max-sm:my-1 group-hover:scale-105 transition-transform" />
                            <h4 class="font-bold text-slate-900 mb-1 max-sm:text-sm max-sm:leading-snug">ISO Certified</h4>
                            <p class="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 max-sm:text-[9px] max-sm:tracking-wider max-sm:mb-0 max-sm:leading-snug">ISO 9001:2015</p>
                            <p class="text-xs text-slate-500 leading-relaxed mt-2 max-sm:hidden">Certified for international quality standards in higher education services.</p>
                            <span class="mt-auto pt-4 max-sm:pt-2 text-xs max-sm:text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Certificate &rarr;</span>
                        </a>

                        <a href="https://msit.in/media/2024/09/25/aishe-2024-merged.pdf" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center p-6 max-sm:p-3 bg-slate-50/50 rounded-3xl max-sm:rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-white hover:shadow-card hover:scale-[1.02] transition-all group cursor-pointer text-center no-underline">
                            <img src="/aishe-logo.png" alt="AISHE Listed Badge" class="h-24 w-24 object-contain mb-4 max-sm:h-14 max-sm:w-14 max-sm:my-1 group-hover:scale-105 transition-transform" />
                            <h4 class="font-bold text-slate-900 mb-1 max-sm:text-sm max-sm:leading-snug">AISHE Listed</h4>
                            <p class="text-xs font-black uppercase tracking-widest text-purple-700 mb-2 max-sm:text-[9px] max-sm:tracking-wider max-sm:mb-0 max-sm:leading-snug">MHRD Registered</p>
                            <p class="text-xs text-slate-500 leading-relaxed mt-2 max-sm:hidden">Listed under the All India Survey on Higher Education registry.</p>
                            <span class="mt-auto pt-4 max-sm:pt-2 text-xs max-sm:text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">View AISHE Proof &rarr;</span>
                        </a>

                    </div>
                </section>

                <section>
                    <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mt-0 mb-4 sm:mb-6">Teaching Methodology</h3>
                    <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                        <div class="border-t border-slate-200 pt-4">
                            <h4 class="text-base font-bold text-slate-900 mb-1.5">Comprehensive Learning</h4>
                            <p class="text-sm text-slate-700 leading-relaxed">Traditional classroom teaching is supplemented by regular tests, tutorials, group discussions, and industrial exposure by way of visits and summer training.</p>
                        </div>
                        <div class="border-t border-slate-200 pt-4">
                            <h4 class="text-base font-bold text-slate-900 mb-1.5">Interactive Sessions</h4>
                            <p class="text-sm text-slate-700 leading-relaxed">The atmosphere is synergetic with participative sessions, instilling a sense of team spirit, responsibility, and professional integrity.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mt-0 mb-4 sm:mb-6">Infrastructure & Facilities</h3>
                    <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                        <div class="border-t border-slate-200 pt-4">
                            <h4 class="text-base font-bold text-slate-900 mb-1.5">Computing Laboratories</h4>
                            <p class="text-sm text-slate-700 leading-relaxed">Six modern air-conditioned labs covering Software Engg, AI & Robotics, DBMS, and more with industry-standard software.</p>
                        </div>
                        <div class="border-t border-slate-200 pt-4">
                            <h4 class="text-base font-bold text-slate-900 mb-1.5">Technical Hubs</h4>
                            <p class="text-sm text-slate-700 leading-relaxed">Well-equipped labs for Applied Sciences, Electrical Engg, VLSI Design, and Satellite Communication.</p>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "University Rank", value: "#1" },
            { label: "Built-up Area", value: "17,837 sqm" }
        ]
    },
    "administration": {
        title: "Administration",
        subtitle: "Guided by visionaries at Maharaja Surajmal Institute of Technology.",
        seo_description: "Meet the leadership team at Maharaja Surajmal Institute of Technology. Learn about our administrative structure and commitment to high academic standards.",
        category: "About MSIT",
        heroImage: "/campus/main-academic-building.webp",
        heroImageAlt: "MSIT Administrative Block and Director's Office entrance",
        content: `
            <p class="mb-6">The leadership at MSIT is helmed by distinguished academicians and administrative experts dedicated to maintaining the highest standards of institutional governance. Under the leadership of our Director, Prof. (Dr.) Avanish Kumar Srivastava, the institute continuously strives for excellence.</p>
            <h3 class="text-2xl font-semibold text-slate-900 mt-10 mb-4">Director's Office</h3>
            <p class="mb-6">Prof. (Dr.) Avanish Kumar Srivastava leads MSIT with a focus on robust academic standards and dynamic professional development. Together with the administrative staff, they ensure a transparent, progressive, and student-centric campus environment.</p>
            <div class="grid md:grid-cols-2 gap-6 my-8">
                <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="/photos/08_admin-offices-conference/conference-room-portraits-01.jpg" alt="Executive Conference Hall with Founding Visionaries Portraits" class="w-full h-56 object-cover" />
                    <div class="p-3 bg-slate-50 text-slate-700 text-xs font-semibold">Executive Conference Room & Governing Council Board</div>
                </div>
                <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src="/photos/08_admin-offices-conference/admin-office-interior-01.jpg" alt="MSIT Administrative Offices" class="w-full h-56 object-cover" />
                    <div class="p-3 bg-slate-50 text-slate-700 text-xs font-semibold">Central Administrative Services & Registrar Office</div>
                </div>
            </div>
        `,
        stats: [
            { label: "Leadership", value: "Director & Staff" },
            { label: "Focus", value: "Student-Centric" }
        ],
        bulletPoints: [
            { 
                label: "Director: Prof. (Dr.) Avanish Kumar Srivastava", 
                detail: "Internationally acclaimed scientist, FNAE Fellow, and former CSIR Director leading MSIT's research ecosystem, global academic partnerships, and innovation-driven pedagogy.",
                url: "/faculty?id=dir-1"
            },
            { 
                label: "Administrative Stability", 
                detail: "Robust, transparent institutional governance supported by Surajmal Memorial Education Society, ensuring disciplined administration, student welfare focus, and zero-profit operations.",
                url: "/fromdesk"
            },
            { 
                label: "Academic Excellence", 
                detail: "State-of-the-art laboratory facilities, seasoned faculty mentorship, continuous faculty development programs, and outstanding academic outcomes across all departments.",
                url: "/academics"
            }
        ]
    },
    "govern": {
        title: "Governing Body",
        subtitle: "The visionary leadership driving Maharaja Surajmal Institute of Technology.",
        seo_description: "Discover the esteemed assembly of educationists and industry experts governing Maharaja Surajmal Institute of Technology to ensure strategic excellence.",
        category: "About MSIT",
        heroImage: "/campus/main-academic-building.webp",
        heroImageAlt: "Governing Body meeting area at Mahogany Surajmal Institute",
        content: `
            <p class="mb-8 leading-relaxed">The Governing Body and Advisory Board of Maharaja Surajmal Institute of Technology consist of esteemed educationists, industry leaders, and representatives who steer the strategic growth and academic quality of the institute.</p>
            
            <div class="space-y-12">
                <!-- TOP LEADERSHIP GRID -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="/faculty?id=gb-chairman" class="group block p-6 rounded-3xl border border-slate-200/60 bg-linear-to-br from-amber-50/30 via-white to-white shadow-xs hover:border-amber-500/20 hover:shadow-md transition-all">
                        <div class="flex justify-between items-start">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                    <img src="/kaptan-singh.jpg" alt="Sh. Kaptan Singh" class="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <span class="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">Chairman</span>
                                    <h4 class="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">Sh. Kaptan Singh</h4>
                                    <p class="text-xs text-slate-500 font-medium mt-1">Governing Body Chairman, SMES</p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                    <a href="/faculty?id=dir-1" class="group block p-6 rounded-3xl border border-slate-200/60 bg-linear-to-br from-blue-50/30 via-white to-white shadow-xs hover:border-blue-500/20 hover:shadow-md transition-all">
                        <div class="flex justify-between items-start">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                    <img src="/faculty/avanish-kumar.webp" alt="Prof. (Dr.) Avanish Kumar Srivastava" class="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">Member Secretary</span>
                                    <h4 class="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">Prof. (Dr.) Avanish Kumar Srivastava</h4>
                                    <p class="text-xs text-slate-500 font-medium mt-1">Director, MSIT</p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                </div>

                <!-- Nominees of the Society -->
                <div class="space-y-4 pt-6 border-t border-slate-100">
                    <h4 class="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span class="w-1.5 h-4 bg-primary rounded-full"></span>
                        Nominees of the Society
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <a href="/faculty?id=gb-esha" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Smt. Esha Jakhar" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Smt. Esha Jakhar</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Senior Vice President, SMES</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-ajit" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/ajit-singh.png" alt="Sh. Ajit Singh Chaudhary" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Ajit Singh Chaudhary</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Secretary, SMES</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-rajpal" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/rajpal-singh.png" alt="Sh. Rajpal Singh Solanki" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Rajpal Singh Solanki</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Treasurer, SMES</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-sanjeev" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. Sanjeev Kumar" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Sanjeev Kumar</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Society Nominee</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-ss" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. S. S. Solanki" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. S. S. Solanki</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Society Nominee</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Educationists -->
                <div class="space-y-4 pt-6 border-t border-slate-100">
                    <h4 class="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span class="w-1.5 h-4 bg-emerald-600 rounded-full"></span>
                        Educationists
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <a href="/faculty?id=gb-nirjar" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Prof. R.S. Nirjar" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. R.S. Nirjar</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Former VC & Chairman AICTE</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-rana" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. Tejbir Singh Rana" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Tejbir Singh Rana</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Associate Professor, DU</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-vrat" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Prof. Prem Vrat" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. Prem Vrat</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Former Director, IIT Roorkee</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-dabas" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. B.D. Dabas" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. B.D. Dabas</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Educationist</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-shyam" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. Shyam Singh" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Shyam Singh</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Educationist</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Representatives of Industry -->
                <div class="space-y-4 pt-6 border-t border-slate-100">
                    <h4 class="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span class="w-1.5 h-4 bg-purple-600 rounded-full"></span>
                        Representatives of Industry
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/faculty?id=gb-gahlot" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. Raj Singh Gahlot" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Raj Singh Gahlot</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Industrialist & Engineer</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=gb-subhash" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Sh. Subhash Chaudhary" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Sh. Subhash Chaudhary</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Business Management</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Teacher Representatives -->
                <div class="space-y-4 pt-6 border-t border-slate-100">
                    <h4 class="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span class="w-1.5 h-4 bg-rose-600 rounded-full"></span>
                        Teacher Representatives
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/faculty?id=as-3" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/man-singh-beniwal.webp" alt="Prof. Man Singh Beniwal" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. Man Singh Beniwal</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Professor, Physics</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=cse-8" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/kavita-sheoran.webp" alt="Dr. Kavita Sheoran" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Dr. Kavita Sheoran</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Associate Professor, CSE</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Advisory Board -->
                <div class="space-y-4 pt-6 border-t border-slate-100">
                    <h4 class="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span class="w-1.5 h-4 bg-indigo-650 rounded-full"></span>
                        Advisory Board
                    </h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/faculty?id=adv-ansari" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Prof. A. Q. Ansari" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. A. Q. Ansari</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Dept. of Electrical Engineering, Jamia Millia Islamia</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=adv-kaushik" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Prof. Saroj Kaushik" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. Saroj Kaushik</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Dept. of Computer Science & Engineering, IIT Delhi</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=adv-joshi" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Prof. S. D. Joshi" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. S. D. Joshi</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Dept. of Electrical Engineering, IIT Delhi</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=adv-singh" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Dr. Rajendra Singh" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Dr. Rajendra Singh</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Dept. of Physics, IIT Delhi</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=adv-kudale" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Mr. Arun Kudale" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Mr. Arun Kudale</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Managing Director, Kudale Instruments Pvt. Ltd.</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                        <a href="/faculty?id=adv-kumar" class="group block p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 transition-all hover:shadow-md">
                            <div class="flex items-center justify-between gap-3">
                                <div class="flex items-center gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                                        <img src="/faculty/staff-avatar.webp" alt="Prof. Vikram Kumar" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <span class="block font-semibold text-slate-900 group-hover:text-primary transition-colors text-sm truncate">Prof. Vikram Kumar</span>
                                        <span class="block text-[10px] text-slate-400 font-medium mt-0.5 truncate">Dept. of Physics, IIT Delhi</span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 group-hover:text-primary transition-all transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `,
        stats: [
            { label: "Chairman", value: "Sh. Kaptan Singh" },
            { label: "Secretary", value: "Sh. Ajit Singh" }
        ],
        bulletPoints: [
            { 
                label: "15 Governing Members", 
                detail: "Distinguished council of senior educationists, society trustees, university nominees, and industry leaders steering institutional policy and infrastructure development.",
                url: "/faculty"
            },
            { 
                label: "6 Advisory Members", 
                detail: "Renowned senior professors and former directors from IIT Delhi, Jamia Millia Islamia, and National Physical Laboratory advising on curriculum and research benchmarks.",
                url: "/faculty"
            },
            { 
                label: "IIT & JMI Affiliates", 
                detail: "Strategic advisory inputs from national academic luminaries ensuring high-impact research, PhD mentorship, and outcome-based engineering education.",
                url: "/facilities?tab=labs#research-centers"
            }
        ]
    },
    "fromdesk": {
        title: "From The Desk",
        subtitle: "Messages from the honorable leadership of Maharaja Surajmal Institute of Technology.",
        seo_description: "Read messages from the leadership of Maharaja Surajmal Institute of Technology. Learn about our commitment to quality technical education and student success.",
        category: "About MSIT",
        heroImage: "/campus/campus-pathway-block.webp",
        heroImageAlt: "MSIT President and Secretary's official desk area",
        content: `
            <style>
                .tab-content { display: none; }
                #tab-pres:checked ~ .content-pres { display: block; animation: fadeIn 0.4s ease-in-out; }
                #tab-sec:checked ~ .content-sec { display: block; animation: fadeIn 0.4s ease-in-out; }
                #tab-treas:checked ~ .content-treas { display: block; animation: fadeIn 0.4s ease-in-out; }
                #tab-dir:checked ~ .content-dir { display: block; animation: fadeIn 0.4s ease-in-out; }

                #tab-pres:checked ~ .tab-headers label[for="tab-pres"],
                #tab-sec:checked ~ .tab-headers label[for="tab-sec"],
                #tab-treas:checked ~ .tab-headers label[for="tab-treas"],
                #tab-dir:checked ~ .tab-headers label[for="tab-dir"] {
                    border-color: #1e4a9b;
                    color: #1e4a9b;
                    background-color: rgba(30, 74, 155, 0.06);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>

            <div class="w-full">
                <!-- Radio Inputs (hidden) -->
                <input type="radio" name="desk-tabs" id="tab-pres" class="hidden" checked />
                <input type="radio" name="desk-tabs" id="tab-sec" class="hidden" />
                <input type="radio" name="desk-tabs" id="tab-treas" class="hidden" />
                <input type="radio" name="desk-tabs" id="tab-dir" class="hidden" />

                <!-- Tab Headers -->
                <div class="tab-headers grid grid-cols-4 sm:flex border-b border-slate-200 mb-6 sm:mb-10 gap-0 sm:gap-2 pb-px">
                    <label for="tab-pres" class="cursor-pointer text-center px-1 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-all select-none rounded-t-xl hover:bg-slate-50">
                        President
                    </label>
                    <label for="tab-sec" class="cursor-pointer text-center px-1 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-all select-none rounded-t-xl hover:bg-slate-50">
                        Secretary
                    </label>
                    <label for="tab-treas" class="cursor-pointer text-center px-1 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-all select-none rounded-t-xl hover:bg-slate-50">
                        Treasurer
                    </label>
                    <label for="tab-dir" class="cursor-pointer text-center px-1 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-all select-none rounded-t-xl hover:bg-slate-50">
                        Director
                    </label>
                </div>

                <!-- Tab Content: President -->
                <div class="tab-content content-pres">
                    <div class="flex flex-col-reverse md:flex-row gap-6 md:gap-10 items-start">
                        <div class="flex-1 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
                            <p>The foundation of socio-economic development of a country is the education of its youth in general and technical education in particular. Technical education is an instrument which uses the tools of science and makes the natural resources available for the people at large. Therefore the institutes which are providing technical education to the Indian youth are playing important role in the development of this country.</p>
                            <p>The history of development of technical education in India dates back to 1847 when the first engineering college, Thomson College of Engineering (which later became IIT Roorkee), was established by the British at Roorkee in Uttar Pradesh. The growth of technical institutes during British India was slow, but after independence socio-economic development became the priority program of our planners and leaders. Consequently, a large number of technical institutes have been started by the Central and State Govts including Indian Institutes of Technology, Indian Institutes of Information Technology and National Institutes of Technology. Besides this, a large number of Private Technical Institutes have been set up across the country.</p>
                            <p>Unfortunately, profit motives of a number of private operators have adversely affected the quality of technical education rendering large number of graduating students from such institutions unemployable. Ours is also a non-government institute established and run by Surajmal Memorial Education Society which aims to create centers of excellence to educate and produce technically competent graduates to meet emerging requirements of the dynamics of the development market, government or private. The strategy of the Society to achieve this goal is reflected in the following aspects of its work culture:</p>
                            <ol class="list-decimal pl-6 space-y-2 mt-4 text-slate-700 font-medium">
                                <li>No profit making from this Institute.</li>
                                <li>Strictly follow the standards and norms prescribed by AICTE & Affiliating University regarding infrastructure and faculty including their numbers, salary and other facilities.</li>
                                <li>Appointment of qualified and competent faculty and provide environment for their development and academic growth as the Society considers that good teachers produce good students.</li>
                                <li>Extra course inputs to students commensurate with market requirement, Inculcate discipline and moral values among students.</li>
                                <li>Strong and effective mechanism for placement.</li>
                                <li>Transparency in all aspects of working.</li>
                            </ol>
                            <p class="mt-4">This work culture has its own reward. Today, our 100% graduating students are getting placement in reputed companies of the country and they are earning name and fame by their competence and hard work. MSIT is now recognized as an important centre of technical education and is marching ahead to become one of the premier technical institutes of the country.</p>
                            <div class="pt-6 border-t border-slate-100">
                                <h4 class="text-lg font-bold text-slate-900">Sh. Kaptan Singh</h4>
                                <p class="text-sm font-semibold text-primary">President,</p>
                                <p class="text-xs text-slate-500 font-medium">Surajmal Memorial Education Society</p>
                            </div>
                        </div>
                        <figure class="w-44 sm:w-56 md:w-64 shrink-0 mx-auto md:mx-0 m-0 md:sticky md:top-36 self-start">
                            <div class="bg-slate-50 p-2.5 sm:p-3 rounded-3xl border border-slate-200/60 shadow-xs">
                                <img src="/kaptan-singh.jpg" alt="Sh. Kaptan Singh, President SMES" class="w-full h-auto aspect-square object-cover rounded-2xl grayscale-30" />
                            </div>
                            <figcaption class="mt-3 text-center">
                                <span class="block text-sm sm:text-base font-bold text-slate-900 leading-snug">Sh. Kaptan Singh</span>
                                <span class="block mt-0.5 text-xs text-slate-600 leading-snug">President, Surajmal Memorial Education Society</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <!-- Tab Content: Secretary -->
                <div class="tab-content content-sec">
                    <div class="flex flex-col-reverse md:flex-row gap-6 md:gap-10 items-start">
                        <div class="flex-1 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
                            <p>It makes me very happy to get in touch with you through the website.</p>
                            <p>In the times of arduous competition, we are moving forward with a vision of holistic development of our students as technical professionals who will not only contribute with their knowledge and skills to the field engineering but also add value to the social life at large with their educated and sensitive thoughts and action. We believe that proper education is related to the exposure to new techniques and methods and a conducive atmosphere, therefore we have made continuous effort towards upgrading our infrastructure and quality of education.</p>
                            <p>We are proud to have well equipped Labs and seminar halls, a rich library, well built hostels, a sizable auditorium, to cater to the various pedagogical and accommodative requirements of our students. Our keenness on multifarious development of our faculty and students can be seen in our extensive organization of various academic and technical programs for them. Every year a number of faculty development programs are organized across departments for the professional growth of our teaching community. Besides, many expert lectures by distinguished academicians from IIT Delhi and other reputed technical organizations, are routinely arranged. A fundamental requirement of any good institute is a well developed Information System to ensure monitoring and evaluation of key indicators, and to provide information critical to all concerned.</p>
                            <p>Our institute website aims at an easy access to all relevant information about the institute and I hope that the masses find the information included in the website useful.</p>
                            <div class="pt-6 border-t border-slate-100">
                                <h4 class="text-lg font-bold text-slate-900">Sh. Ajit Singh Chaudhary</h4>
                                <p class="text-sm font-semibold text-primary">Secretary,</p>
                                <p class="text-xs text-slate-500 font-medium">Surajmal Memorial Education Society</p>
                            </div>
                        </div>
                        <figure class="w-44 sm:w-56 md:w-64 shrink-0 mx-auto md:mx-0 m-0 md:sticky md:top-36 self-start">
                            <div class="bg-slate-50 p-2.5 sm:p-3 rounded-3xl border border-slate-200/60 shadow-xs">
                                <img src="/ajit-singh.png" alt="Sh. Ajit Singh, Secretary SMES" class="w-full h-auto aspect-square object-cover rounded-2xl grayscale-30" />
                            </div>
                            <figcaption class="mt-3 text-center">
                                <span class="block text-sm sm:text-base font-bold text-slate-900 leading-snug">Sh. Ajit Singh Chaudhary</span>
                                <span class="block mt-0.5 text-xs text-slate-600 leading-snug">Secretary, Surajmal Memorial Education Society</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <!-- Tab Content: Treasurer -->
                <div class="tab-content content-treas">
                    <div class="flex flex-col-reverse md:flex-row gap-6 md:gap-10 items-start">
                        <div class="flex-1 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
                            <p>The new website is only a feather in the cap of the robust technical and communicative infrastructure of Maharaja Surajmal Institute of Technology. This website will serve as a strong medium to show case our attributes and achievements by virtue of which we enjoy a great reputation amongst the leading colleges and institutes affiliated to Guru Gobind Singh Indraprastha University.</p>
                            <p>Maharaja Surajmal Institute of Technology has acquired and earned a coveted name and fame over a period of time and has become one of the most admired and preferred centre of academic excellence in the field of engineering and technology for all round integrated professional growth to match and meet the technological needs of the country. We aim to provide our students a composite and comprehensive technical education for a satisfying and professional career in life. To achieve this, we take care from the very beginning quality class room, teaching by trend, competent and qualified faculty members with exposure to the application of concepts through lab experiments, industrial visits and expert lectures of eminent personalities and experts in their field of specialization. Besides, we provide congenial atmosphere to the students for their all round enhancement of inter-personal communication skills.</p>
                            <p>I am sure that the website will enable a better transmission of relevant information to the various stakeholders of the institute which will help in building up and strengthening the relationship among them and ensure success of our institute.</p>
                            <div class="pt-6 border-t border-slate-100">
                                <h4 class="text-lg font-bold text-slate-900">Sh. Rajpal Singh Solanki</h4>
                                <p class="text-sm font-semibold text-primary">Treasurer,</p>
                                <p class="text-xs text-slate-500 font-medium">Surajmal Memorial Education Society</p>
                            </div>
                        </div>
                        <figure class="w-44 sm:w-56 md:w-64 shrink-0 mx-auto md:mx-0 m-0 md:sticky md:top-36 self-start">
                            <div class="bg-slate-50 p-2.5 sm:p-3 rounded-3xl border border-slate-200/60 shadow-xs">
                                <img src="/rajpal-singh.png" alt="Sh. Rajpal Singh Solanki, Treasurer SMES" class="w-full h-auto aspect-square object-cover rounded-2xl grayscale-30" />
                            </div>
                            <figcaption class="mt-3 text-center">
                                <span class="block text-sm sm:text-base font-bold text-slate-900 leading-snug">Sh. Rajpal Singh Solanki</span>
                                <span class="block mt-0.5 text-xs text-slate-600 leading-snug">Treasurer, Surajmal Memorial Education Society</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <!-- Tab Content: Director -->
                <div class="tab-content content-dir">
                    <div class="flex flex-col-reverse md:flex-row gap-6 md:gap-10 items-start">
                        <div class="flex-1 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
                            <p>Dear Students, Faculty Members, Alumni and Visitors,</p>
                            <p>It gives me immense pleasure to welcome you to Maharaja Surajmal Institute of Technology (MSIT) — an institution that blends academic excellence with a culture of innovation, curiosity, and values.</p>
                            <p>At MSIT, we believe that engineering education is not just about mastering concepts and technologies, but about shaping individuals who can think critically, solve real-world problems, and contribute meaningfully to society. Our commitment is to create an environment where every student feels encouraged to explore, question, experiment, and grow.</p>
                            <p>Students are at the heart of everything we do. You are the driving force of this institution. I urge each one of you to take full advantage of the resources available around you — dedicated faculty, well-equipped laboratories, active student societies, innovation clubs, and strong industry linkages. Participate in projects, research, hackathons, internships, and community initiatives. These experiences will shape your technical abilities as well as your confidence, leadership, and character.</p>
                            <p>To the faculty and staff: your dedication, mentorship, and unwavering support form the backbone of MSIT. Together, let us continue to create a learning ecosystem that is dynamic, collaborative, and aligned with emerging global needs.</p>
                            <p>Our alumni remain an invaluable part of our journey. Your achievements inspire our students, and your continued engagement strengthens the MSIT community. I invite you to remain connected and contribute through guidance, collaboration, and industry-academia partnerships.</p>
                            <p>As MSIT moves forward with a clear vision and renewed energy, let us collectively strive to reach greater heights — academically, professionally, and ethically. I encourage our students to dream big, work diligently, stay curious, and believe in their potential. The world needs engineers who are not only skilled, but also compassionate and forward-thinking; I am confident that MSIT students will continue to uphold this spirit.</p>
                            <p>Wishing every student success, growth, and an enriching journey ahead at MSIT.</p>
                            <div class="pt-6 border-t border-slate-100">
                                <h4 class="text-lg font-bold text-slate-900">Prof. (Dr.) Avanish Kumar Srivastava</h4>
                                <p class="text-sm font-semibold text-primary">Director,</p>
                                <p class="text-xs text-slate-500 font-medium">Maharaja Surajmal Institute of Technology</p>
                            </div>
                        </div>
                        <figure class="w-44 sm:w-56 md:w-64 shrink-0 mx-auto md:mx-0 m-0 md:sticky md:top-36 self-start">
                            <div class="bg-slate-50 p-2.5 sm:p-3 rounded-3xl border border-slate-200/60 shadow-xs">
                                <img src="/avanish-kumar-desk.png" alt="Prof. (Dr.) Avanish Kumar Srivastava, Director MSIT" class="w-full h-auto aspect-square object-cover rounded-2xl grayscale-30" />
                            </div>
                            <figcaption class="mt-3 text-center">
                                <span class="block text-sm sm:text-base font-bold text-slate-900 leading-snug">Prof. (Dr.) Avanish Kumar Srivastava</span>
                                <span class="block mt-0.5 text-xs text-slate-600 leading-snug">Director, Maharaja Surajmal Institute of Technology</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        `,
        stats: [
            { label: "Leadership Messages", value: "4" },
            { label: "Governing Society", value: "SMES" }
        ]
    },
    "facilities": {
        title: "Campus & Facilities",
        subtitle: "A modern ecosystem for focused learning at Maharaja Surajmal Institute of Technology.",
        seo_description: "Explore the 8-acre eco-friendly campus of Maharaja Surajmal Institute of Technology. Discover our advanced labs, library, and modern hostel facilities in Delhi.",
        category: "About MSIT",
        heroImage: "/campus/campus-panoramic-field.webp",
        heroImageAlt: "Campus facilities and modern academic infrastructure at MSIT",
        content: `
            <p class="mb-6">MSIT operates on a beautiful 8-acre eco-friendly campus in Janakpuri, New Delhi. Originally in a four-storey building (6279 sq.m), it was shifted to a more spacious seven-storey building with a built-up area of 17,837 sq.m, acquiring impressive infrastructure and resources for high-quality engineering education.</p>
            <h3 class="text-2xl font-semibold text-slate-900 mt-10 mb-4">State-of-the-Art Resources</h3>
            <p class="mb-6">The infrastructure consists of well-lit lecture halls, fully furnished labs, seminar halls, staff rooms, and a large playground. It includes six modern air-conditioned networked computer labs, an Enterprise Central Library, and high-speed radio-link internet access.</p>
            <h3 class="text-2xl font-semibold text-slate-900 mt-10 mb-4">Hostel & Living</h3>
            <p class="mb-6">The Maharaja Mahendra Pratap Hostel provides accommodation to around 200 boys and 100 girls in a spacious and elegant four-storey building with hygienic and nutritious food. A well-organized canteen with a 60-70 seating capacity is available on campus.</p>
        `,
        stats: [
            { label: "Built-up Area", value: "17,837 sqm" },
            { label: "Campus Size", value: "8 Acres" }
        ],
        bulletPoints: [
            { 
                label: "Central Library", 
                detail: "Multi-tiered air-conditioned learning hub with over 60,000+ volumes, IEEE/Scopus digital access, DELNET network, and quiet research carrels for scholars.",
                url: "/facilities?tab=library"
            },
            { 
                label: "Maharaja Mahendra Pratap Hostel", 
                detail: "Modern on-campus residential accommodation for 200+ boys and 100+ girls featuring nutritious dining, high-speed Wi-Fi, and 24x7 security surveillance.",
                url: "/facilities#hostel-and-living"
            },
            { 
                label: "Advanced Computing Hubs", 
                detail: "Networked high-performance computing centers equipped with core i7 systems, high-bandwidth leased lines, and specialized AI/IoT research setups.",
                url: "/facilities?tab=labs"
            },
            { 
                label: "Sports & Medical Care", 
                detail: "Extensive football stadium field, championship basketball courts, indoor sports arena, and an on-campus Medical Room with resident Medical Assistant.",
                url: "/facilities?tab=library#sports"
            }
        ]
    },
    "smes": {
        title: "Surajmal Memorial Education Society",
        subtitle: "The foundation of Maharaja Surajmal Institute of Technology.",
        seo_description: "Learn about the Surajmal Memorial Education Society (SMES), the philanthropic force behind Maharaja Surajmal Institute of Technology and its quality mission.",
        category: "About MSIT",
        heroImage: "/photos/01_campus-exterior/founder-bust-maharaja-surajmal-01.jpg",
        heroImageAlt: "Surajmal Memorial Education Society flagship banner on campus",
        content: `
            <p class="mb-6">The Surajmal Memorial Education Society (SMES) was established with a singular objective: to disseminate quality education and foster intellectual growth across the nation. MSIT is the flagship engineering institute of the SMES family.</p>
            <h3 class="text-2xl font-semibold text-slate-900 mt-10 mb-4">A Philanthropic Vision</h3>
            <p class="mb-6">Driven by philanthropic ideals rather than commercial interests, the society ensures that premier education remains accessible, prioritizing infrastructure development and faculty excellence above all.</p>
        `,
        stats: [
            { label: "Institutions", value: "4" },
            { label: "Total Students", value: "8,000+" }
        ],
        bulletPoints: [
            { 
                label: "Educational Trust", 
                detail: "Founded in 1972, Surajmal Memorial Education Society (SMES) is a premier non-profit educational body dedicated to rural and urban youth empowerment through excellence in engineering and management education.",
                url: "https://surajmalmemorialeducationsociety.org/"
            },
            { 
                label: "Philanthropic Initiatives", 
                detail: "Institutional scholarship endowments, student fee concessions, and merit-cum-means awards ensuring that financial limitations never hinder talented scholars.",
                url: "/scholarships"
            },
            { 
                label: "Community Outreach", 
                detail: "Rural talent upliftment camps, environmental conservation drives, blood donation drives, and active community initiatives inspired by Maharaja Surajmal.",
                url: "/society-uba"
            }
        ]
    },
    "contact": {
        title: "Get in Touch",
        subtitle: "The MSIT administrative desk is here to assist you with any inquiries.",
        seo_description: "Contact Maharaja Surajmal Institute of Technology. Find our address, phone number, and official email for admissions, administration, and support.",
        category: "Contact Us",
        heroImage: "/campus/msit-main-gate.webp",
        heroImageAlt: "MSIT Contact desk and visitor reception area in Janakpuri",
        content: `
            <div class="space-y-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="tel:01145037193" class="group block p-8 bg-white rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-card-hover transition-all cursor-pointer">
                        <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 1.11L8.09 9.91a16 16 0 0 0 6 6l2.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Phone Inquiries</h4>
                        <p class="text-2xl font-bold text-slate-900">011-45037193</p>
                        <p class="text-sm text-slate-400 mt-2">Mon - Sat: 9:00 AM - 5:00 PM</p>
                    </a>
                    
                    <a href="mailto:director@msit.in" class="group block p-8 bg-white rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-card-hover transition-all cursor-pointer">
                        <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Email Support</h4>
                        <p class="text-2xl font-bold text-slate-900">director@msit.in</p>
                        <p class="text-sm text-slate-400 mt-2">Expect a response within 24 hours.</p>
                    </a>
                </div>

                <div class="p-10 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden relative group">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold text-slate-900 mb-6">Campus Location</h3>
                        <p class="text-lg text-slate-600 leading-relaxed max-w-xl">
                            Maharaja Surajmal Institute of Technology <br />
                            C-4 Janakpuri, New Delhi <br />
                            Delhi — 110058, India
                        </p>
                    </div>
                </div>
            </div>
        `,
        stats: [
            { label: "Admin Staff", value: "45+" },
            { label: "Response Time", value: "< 24h" }
        ],
        bulletPoints: [
            { label: "Anti-Ragging Helpline", detail: "National Anti-Ragging Helpline: 1800-180-5522. You can also contact the MSIT campus squad at antiragging@msit.in for immediate assistance." },
            { label: "Hostel Warden Contact", detail: "For Maharaja Mahendra Pratap Hostel queries, contact the Chief Warden at warden@msit.in or call the hostel administration desk at +91 11-25528117." },
            { label: "Grievance Portal", detail: "Students and staff can register their complaints and grievances online through our dedicated portal. All issues are addressed strictly within 48 hours." }
        ]
    }
};
