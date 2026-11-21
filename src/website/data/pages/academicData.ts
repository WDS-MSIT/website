import type { PageData } from '../../types';

export const academicData: Record<string, PageData> = {
    "cse": {
        title: "Computer Science & Engineering (CSE)",
        subtitle: "The Computer Science and Engineering Department was established in the year 2001 with the vision to offer Bachelor of Engineering degree in Computer Science & Engineering and impart world class education to the students.",
        seo_description: "The Computer Science and Engineering department at MSIT offers advanced curriculum in AI, software engineering, and systems for aspiring tech leaders.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Students collaborating in the MSIT Computer Science and Engineering laboratory",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Department Overview & HOD -->
                <section class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4 sm:pb-6">
                        <div>
                            <span class="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">Established 2001</span>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">Department of Computer Science & Engineering</h3>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NBA Accredited</span>
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NAAC 'A' Grade</span>
                        </div>
                    </div>

                    <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                        The Computer Science and Engineering Department was established in the year 2001 with the vision to offer Bachelor of Engineering degree in Computer Science & Engineering and impart world class education to the students.
                    </p>

                    <div class="p-3 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-base flex items-center justify-center shrink-0">
                            NK
                        </div>
                        <div>
                            <div class="text-[11px] text-primary font-bold uppercase tracking-wider">Head of Department (HOD)</div>
                            <h4 class="text-lg font-bold text-slate-900">Dr. Naresh Kumar</h4>
                            <p class="text-xs text-slate-500">Professor & HOD • 17+ Years Academic & Administrative Experience</p>
                        </div>
                    </div>
                </section>

                <!-- Vision & Mission (official wording from msit.in/cse) -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Vision & Mission</h3>
                    <div class="rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                        <div class="p-4 sm:p-8 bg-primary text-white">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-white/80 mb-3">Vision</h4>
                            <p class="text-base sm:text-xl leading-relaxed font-medium text-white">
                                To maintain academic excellence aiming to produce competent technocrats imbibed with ethical values to serve the national emerging technological needs.
                            </p>
                        </div>
                        <div class="p-4 sm:p-8">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Mission</h4>
                            <ol class="space-y-3 sm:space-y-4 list-none p-0 m-0">
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M1</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To impart quality engineering education to the students by providing effective teaching learning, research and application based innovative environment.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M2</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To inculcate creativity team-spirit, leadership and ethical competence through continuous collective curricular, co-curricular and extracurricular activities.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <!-- Program Educational Objectives (PEOs) -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Program Educational Objectives (PEOs)</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO1</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Analytical & Lifelong Learning</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To acquire a deep insight in mathematical, scientific & analytical skills and adopt self-motivating lifelong learning to explore cutting edge technologies.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO2</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Ethical Innovation & Societal Need</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To prepare graduate to meet the evolving technological needs of the country by promoting innovation, ethical practice and a commitment to serving society.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO3</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Leadership & Teamwork</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To acquire necessary technical knowledge to pursue successful professional career posing leadership and team spirit.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Program Specific Outcomes (PSOs) -->
                <section class="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-3">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">Program Specific Outcomes (PSOs)</h3>
                    <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700 font-normal">
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO1</span>
                            <span>Demonstrate fundamentals to resolve mathematical and computational problems in computer science.</span>
                        </div>
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO2</span>
                            <span>Explore evolutionary computing changes through innovative software engineering solutions.</span>
                        </div>
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO3</span>
                            <span>Gain modern computer environment knowledge for career advancement and research.</span>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Intake", value: "240 (180+60)", url: "/brochure#cutoff-ranks" },
            { label: "Established", value: "2001" },
            { label: "Faculty Strength", value: "35+ Members", url: "/faculty?dept=cse" },
            { label: "NBA Status", value: "Accredited", url: "/mandatory-disclosures#nba-accreditation-status" }
        ],
        // Shown in the sidebar instead of Key Highlights. Answers use facts already published on this site.
        faqs: [
            { q: "How many seats does B.Tech CSE have?", a: "240 sanctioned seats: 180 in the morning shift and 60 in the evening shift." },
            { q: "How do I get admission to B.Tech CSE?", a: "Admission is through GGSIPU counselling, based on your JEE Main rank." },
            { q: "Is the CSE programme accredited?", a: "Yes. The programme is accredited by the National Board of Accreditation (NBA). MSIT is affiliated to GGSIPU and approved by AICTE." },
            { q: "Who is the Head of Department?", a: "Dr. Naresh Kumar, Professor & HOD, with 17+ years of academic and administrative experience." },
            { q: "What labs does the department have?", a: "10 computing labs with high-performance systems for AI, operating systems, networking and data analytics." }
        ]
    },
    "it": {
        title: "Information Technology Engineering (IT)",
        subtitle: "Information Technology is the most prominent and rapidly developing field in today's world, engineering the digital backbone of tomorrow.",
        seo_description: "Discover the Information Technology (IT) department at Maharaja Surajmal Institute of Technology. Learn about our focus on cloud computing, IoT R&D, and data analytics.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Advanced networking and server infrastructure at the MSIT Information Technology department",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Department Overview & HOD -->
                <section class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4 sm:pb-6">
                        <div>
                            <span class="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">Faculty Strength ~35+</span>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">Department of Information Technology</h3>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NBA Accredited</span>
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NAAC 'A' Grade</span>
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">ISO 9001:2015</span>
                        </div>
                    </div>

                    <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                        Information Technology is the most prominent and rapidly developing field in today's world. The department features air-conditioned laboratories equipped with high-speed internet, modern compute nodes, and 10 active industry MOUs.
                    </p>

                    <div class="p-3 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-base flex items-center justify-center shrink-0">
                                TS
                            </div>
                            <div>
                                <div class="text-[11px] text-primary font-bold uppercase tracking-wider">Head of Department (HOD)</div>
                                <h4 class="text-lg font-bold text-slate-900">Prof. Tripti Sharma</h4>
                                <p class="text-xs text-slate-500">Professor & HOD • Ph.D., M.Tech (CSE), M.Phil (CS), B.E. (CSE), GATE Qualified</p>
                            </div>
                        </div>
                        <div class="text-xs sm:text-sm text-slate-600 font-normal pt-3 border-t border-slate-200 leading-relaxed">
                            <strong class="text-slate-900">Academic Record:</strong> 21+ years teaching experience; research focus in Wireless Sensor Networks, AI, and Machine Learning; recipient of multiple national/international academic awards. Host department for ICAIA 2026 conference.
                        </div>
                    </div>
                </section>

                <!-- Vision & Mission -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Vision & Mission</h3>
                    <div class="rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                        <div class="p-4 sm:p-8 bg-primary text-white">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-white/80 mb-3">Vision</h4>
                            <p class="text-base sm:text-xl leading-relaxed font-medium text-white">
                                To build a culture of innovation and research in students and make them capable to solve upcoming challenges of human life using computing.
                            </p>
                        </div>
                        <div class="p-4 sm:p-8">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Mission</h4>
                            <ol class="space-y-3 sm:space-y-4 list-none p-0 m-0">
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M1</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To develop 'educational pathways' so that students can take their career towards success.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M2</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To imbibe curiosity and support innovativeness by providing guidance to use the technology effectively.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M3</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To inculcate management skills, integrity and honesty through curricular, co-curricular and extra-curricular activities.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <!-- Program Educational Objectives (PEOs) -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Program Educational Objectives (PEOs)</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO1</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Industry Practice & Lifelong Learning</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Graduates prepared for IT industries, engaged in learning and applying new ideas effectively in software engineering environments.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO2</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Technical & Management Roles</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Graduates perform effectively as individual contributors and team members, advancing into technical and leadership roles.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO3</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Mathematical & Computing Foundation</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Graduates apply computing principles grounded in mathematics and science for complex enterprise software projects.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO4</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Higher Studies & Research</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Graduates prepared to pursue higher studies in teaching, academic research, and specialized IT domains.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Program Specific Outcomes (PSOs) -->
                <section class="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-3">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">Program Specific Outcomes (PSOs)</h3>
                    <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700 font-normal">
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO1</span>
                            <span>Ability to understand the principles and working of hardware and software aspects in information technology.</span>
                        </div>
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO2</span>
                            <span>Ability to explore and develop innovative ideas to solve real world problem using IT skills.</span>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Intake", value: "180 (120+60)", url: "/brochure#cutoff-ranks" },
            { label: "Faculty Strength", value: "30 Members", url: "/faculty?dept=it" },
            { label: "HOD Experience", value: "21+ Yrs", url: "/faculty?search=Sunesh+Malik" },
            { label: "NBA Status", value: "Accredited", url: "/mandatory-disclosures#nba-accreditation-status" }
        ],
        // Shown in the sidebar instead of Key Highlights. Answers use facts already published on this site.
        faqs: [
            { q: "How many seats does B.Tech IT have?", a: "180 sanctioned seats: 120 in the morning shift (1st Shift) and 60 in the evening shift (2nd Shift)." },
            { q: "How do I get admission to B.Tech IT?", a: "Admission is through GGSIPU counselling, based on your JEE Main rank." },
            { q: "Is the IT programme accredited?", a: "Yes. The programme is accredited by the National Board of Accreditation (NBA). MSIT is affiliated to GGSIPU and approved by AICTE." },
            { q: "Who is the Head of Department?", a: "Prof. Tripti Sharma, Professor & HOD, with 21+ years of teaching experience." },
            { q: "Does the department have industry tie-ups?", a: "Yes. The department has 10 active industry MOUs, alongside air-conditioned labs with high-speed internet." }
        ]
    },
    "ece": {
        title: "Electronics & Communication Engineering (ECE)",
        subtitle: "The Department of Electronics & Communication Engineering has a fine blend of experienced as well as young and dynamic personalities as faculty, involved in providing quality education.",
        seo_description: "Join the B.Tech ECE program at Maharaja Surajmal Institute of Technology. Explore our advanced labs for VLSI design, IoT, and satellite communication systems.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Modern VLSI design and signal processing equipment in the MSIT ECE lab",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Department Overview & HOD -->
                <section class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4 sm:pb-6">
                        <div>
                            <span class="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">28 Faculty • 7 Tech Staff</span>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">Department of Electronics & Communication Engineering</h3>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NBA Accredited</span>
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NAAC 'A' Grade</span>
                        </div>
                    </div>

                    <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                        The Department of Electronics & Communication Engineering which has a fine blend of experienced as well as young and dynamic personalities as faculty, is involved in providing quality education at Undergraduate (UG) level.
                    </p>

                    <div class="p-3 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-base flex items-center justify-center shrink-0">
                                SP
                            </div>
                            <div>
                                <div class="text-[11px] text-primary font-bold uppercase tracking-wider">Head of Department (HOD)</div>
                                <h4 class="text-lg font-bold text-slate-900">Dr. Sudesh Pahal</h4>
                                <p class="text-xs text-slate-500">Associate Professor & HOD • Ph.D., M.E., B.E. • Vidwan ID: 243358</p>
                            </div>
                        </div>
                        <div class="text-xs sm:text-sm text-slate-600 font-normal pt-3 border-t border-slate-200 leading-relaxed">
                            <strong class="text-slate-900">Research Specialization:</strong> Wireless sensor networks, vehicular ad-hoc networks (VANETs), AI in communications, and microelectronics design.
                        </div>
                    </div>
                </section>

                <!-- Vision & Mission -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Vision & Mission</h3>
                    <div class="rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                        <div class="p-4 sm:p-8 bg-primary text-white">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-white/80 mb-3">Vision</h4>
                            <p class="text-base sm:text-xl leading-relaxed font-medium text-white">
                                ECE department strives to become a centre of quality education to meet the global technological needs for the benefit of mankind.
                            </p>
                        </div>
                        <div class="p-4 sm:p-8">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Mission</h4>
                            <ol class="space-y-3 sm:space-y-4 list-none p-0 m-0">
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M1</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To impart high quality education in the field of electronics & communication engineering to meet the national and global challenges.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M2</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To provide adequate facilities, infrastructure and environment to the students as well as faculty members thereby creating an ambience conducive for teaching-learning process.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M3</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To empower the students by enhancing their soft skills and ethics to create social awareness and imbibe national values so as to become good citizen.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M4</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">Creating a thrust for life-long learning through interaction with outside world on contemporary issues and technological trends.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <!-- Program Educational Objectives (PEOs) -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Program Educational Objectives (PEOs)</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO1</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To prepare ECE graduates with strong foundation in engineering and technology for personal and professional growth.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO2</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To prepare ECE graduates with capability of serving and leading various organizations with acquired technical skills and knowledge.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO3</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To prepare ECE graduates with professional competence to successfully attempt various competitive exams, pursue higher studies, research and other professional activities.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO4</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To prepare ECE graduates with ability to address the challenging needs of society with ethics and integrity in global context.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Program Specific Outcomes (PSOs) -->
                <section class="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-3">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">Program Specific Outcomes (PSOs)</h3>
                    <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700 font-normal">
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO1</span>
                            <span>Apply foundational sciences and ECE knowledge for core and multidisciplinary technology development.</span>
                        </div>
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO2</span>
                            <span>Apply technical knowledge for professional careers and competitive examination success (GATE/IES/PSUs).</span>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Intake", value: "180 (120+60)", url: "/brochure#cutoff-ranks" },
            { label: "Faculty Strength", value: "28 Members", url: "/faculty?dept=ece" },
            { label: "Tech Staff", value: "7 Staff" },
            { label: "NBA Status", value: "Accredited", url: "/mandatory-disclosures#nba-accreditation-status" }
        ],
        // Shown in the sidebar instead of Key Highlights. Answers use facts already published on this site.
        faqs: [
            { q: "How many seats does B.Tech ECE have?", a: "180 sanctioned seats: 120 in the morning shift (1st Shift) and 60 in the evening shift (2nd Shift)." },
            { q: "How do I get admission to B.Tech ECE?", a: "Admission is through GGSIPU counselling, based on your JEE Main rank." },
            { q: "Is the ECE programme accredited?", a: "Yes. The programme is accredited by the National Board of Accreditation (NBA). MSIT is affiliated to GGSIPU and approved by AICTE." },
            { q: "Who is the Head of Department?", a: "Dr. Sudesh Pahal, Associate Professor & HOD, specialising in wireless sensor networks, VANETs and microelectronics design." },
            { q: "What labs does the department have?", a: "Labs for VLSI and microelectronics (Tanner Tools), antenna design (CST Studio) and digital signal processing (MATLAB), among others." }
        ]
    },
    "eee": {
        title: "Electrical & Electronics (EEE)",
        subtitle: "The Department of Electrical & Electronics Engineering has a fine blend of experienced as well as young and dynamic personalities as faculty.",
        seo_description: "Explore the Electrical & Electronics (EEE) branch at Maharaja Surajmal Institute of Technology. Focus on renewable energy, robotics, and automation excellence.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Sustainable power systems and industrial control units in the MSIT Electrical laboratory",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Department Overview & HOD -->
                <section class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4 sm:pb-6">
                        <div>
                            <span class="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">12 Faculty • 5 Tech Staff</span>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">Department of Electrical & Electronics Engineering</h3>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NBA Accredited</span>
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NAAC 'A' Grade</span>
                        </div>
                    </div>

                    <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                        The Department of Electrical & Electronics Engineering has a fine blend of experienced as well as young and dynamic personalities as faculty.
                    </p>

                    <div class="p-3 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-base flex items-center justify-center shrink-0">
                                SG
                            </div>
                            <div>
                                <div class="text-[11px] text-primary font-bold uppercase tracking-wider">Head of Department (HOD)</div>
                                <h4 class="text-lg font-bold text-slate-900">Dr. Sunil Gupta</h4>
                                <p class="text-xs text-slate-500">Associate Professor & HOD • Ph.D., M.E., B.Tech. • 19+ Years Exp (with MSIT since 2006)</p>
                            </div>
                        </div>
                        <div class="text-xs sm:text-sm text-slate-600 font-normal pt-3 border-t border-slate-200 leading-relaxed">
                            <strong class="text-slate-900">Department Strength:</strong> 1 Professor, 2 Associate Professors, 9 Assistant Professors, supported by 5 technical and laboratory staff.
                        </div>
                    </div>
                </section>

                <!-- Vision & Mission -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Vision & Mission</h3>
                    <div class="rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                        <div class="p-4 sm:p-8 bg-primary text-white">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-white/80 mb-3">Vision</h4>
                            <p class="text-base sm:text-xl leading-relaxed font-medium text-white">
                                To achieve global standards in the field of Electrical and Electronics Engineering to minimize skill gap between academia and industry.
                            </p>
                        </div>
                        <div class="p-4 sm:p-8">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Mission</h4>
                            <ol class="space-y-3 sm:space-y-4 list-none p-0 m-0">
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M1</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">Imparting quality technical education to the students of Electrical and Electronics Engineering with the supportive environment, preparing them for competitive exams.</span>
                                </li>
                                <li class="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-2.5 sm:gap-3 items-start m-0 p-0">
                                    <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold text-xs sm:text-sm flex items-center justify-center">M2</span>
                                    <span class="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-1 sm:pt-1.5">To confer the students with professional attitude, research aptitude, technical and communication skills with sensitivity towards the environment.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>

                <!-- Program Educational Objectives (PEOs) -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Program Educational Objectives (PEOs)</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO1</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To equip the students with fundamental knowledge of science and technology to excel in their career or pursue higher studies.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO2</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To inculcate creative, analytical and critical reasoning skills for real world challenges.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO3</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To contribute to society with professional and social ethics.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">PEO4</span>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                To instill the students with soft skills, team work skills, leadership qualities.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Program Specific Outcomes (PSOs) -->
                <section class="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-3">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">Program Specific Outcomes (PSOs)</h3>
                    <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-700 font-normal">
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO1</span>
                            <span>Apply the principles of basic sciences and Electrical and Electronics Engineering to design, analyze and solve problems.</span>
                        </div>
                        <div class="p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                            <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md border border-primary/20 shrink-0">PSO2</span>
                            <span>Apply the acquired technical knowledge for pursuing higher studies and successful professional career.</span>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Intake", value: "60 Seats", url: "/brochure#cutoff-ranks" },
            { label: "Faculty Strength", value: "12 Members", url: "/faculty?dept=eee" },
            { label: "Tech Staff", value: "5 Staff" },
            { label: "NBA Status", value: "Accredited", url: "/mandatory-disclosures#nba-accreditation-status" }
        ],
        // Shown in the sidebar instead of Key Highlights. Answers use facts already published on this site.
        faqs: [
            { q: "How many seats does B.Tech EEE have?", a: "The sanctioned intake for B.Tech EEE is 60 seats." },
            { q: "How do I get admission to B.Tech EEE?", a: "Admission is through GGSIPU counselling, based on your JEE Main rank." },
            { q: "Is the EEE programme accredited?", a: "Yes. The programme is accredited by the National Board of Accreditation (NBA). MSIT is affiliated to GGSIPU and approved by AICTE." },
            { q: "Who is the Head of Department?", a: "Dr. Sunil Gupta, Associate Professor & HOD, with 19+ years of experience and at MSIT since 2006." },
            { q: "What labs does the department have?", a: "Labs for electrical machines, power systems and protective relays, and electric drives and automation, among others." }
        ]
    },
    "applied-sciences": {
        title: "Department of Applied Sciences",
        subtitle: "The Department of Applied Sciences in Maharaja Surajmal Institute of Technology comprises Physics, Chemistry, Mathematics, Workshop, and Language departments.",
        seo_description: "Learn about the Applied Sciences department at Maharaja Surajmal Institute of Technology. We provide the foundational physics, chemistry, mathematics, and engineering workshops for B.Tech students.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Applied Sciences lab at MSIT where first-year students perform physics experiments",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Department Overview & HOD -->
                <section class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4 sm:pb-6">
                        <div>
                            <span class="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">33 Faculty Members • 1st Year Focus</span>
                            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">Department of Applied Sciences</h3>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">NAAC 'A' Grade</span>
                            <span class="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20">ISO 9001:2015</span>
                        </div>
                    </div>

                    <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                        The Department of Applied Sciences in Maharaja Surajmal Institute of Technology comprises of Physics, Chemistry, Workshop and Mathematics departments. It provides core scientific, mathematical, and mechanical foundations for all incoming engineering undergraduates.
                    </p>

                    <div class="p-3 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-base flex items-center justify-center shrink-0">
                                AG
                            </div>
                            <div>
                                <div class="text-[11px] text-primary font-bold uppercase tracking-wider">Head of Department (HOD)</div>
                                <h4 class="text-lg font-bold text-slate-900">Dr. Ajay Gahlot</h4>
                                <p class="text-xs text-slate-500">Associate Professor & HOD • Ph.D. in Physics, M.Tech. • 15+ Years Exp • Vidwan ID: 243475</p>
                            </div>
                        </div>
                        <div class="text-xs sm:text-sm text-slate-600 font-normal pt-3 border-t border-slate-200 leading-relaxed">
                            <strong class="text-slate-900">Research Interests:</strong> Plasma physics (dusty/strongly coupled plasma, fusion plasma), condensed matter physics. Department strength: ~33 faculty members (2 Professors, 5 Associate Professors, 26 Assistant Professors).
                        </div>
                    </div>
                </section>

                <!-- Core Subject Areas -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Core Subject Areas</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">01</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Engineering Mathematics</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Calculus, differential equations, linear algebra, vector analysis.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">02</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Applied Physics</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Optics, laser physics, quantum mechanics, electromagnetic theory.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">03</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Applied Chemistry</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Water technology, polymer chemistry, fuels, lubricant analysis.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">04</span>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Engineering Graphics & Workshop</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Technical drawing, CAD modeling, fitting, sheet metal, carpentry.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Digital Language Laboratory -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Digital Language Laboratory</h3>
                    <div class="rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                        <div class="p-4 sm:p-8 bg-primary text-white">
                            <p class="text-base sm:text-xl leading-relaxed font-medium text-white">
                                Equipped with 30 multimedia computer workstations running Orell Digital Language Lab software to enhance soft skills, phonetics, professional communication, and group discussion capabilities.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Faculty", value: "33 Members", url: "/faculty?dept=applied+sciences" },
            { label: "Focus", value: "First Year B.Tech" },
            { label: "HOD Exp", value: "15+ Yrs" },
            { label: "NAAC Rating", value: "'A' Grade", url: "/mandatory-disclosures#naac-accreditation-status" }
        ],
        // Shown in the sidebar instead of Key Highlights. Answers use facts already published on this site.
        faqs: [
            { q: "What does the Applied Sciences department teach?", a: "First-year B.Tech foundations: Engineering Mathematics, Applied Physics, Applied Chemistry, and Engineering Graphics & Workshop." },
            { q: "Which students does the department teach?", a: "All incoming B.Tech students, in their first year, across every branch." },
            { q: "Who is the Head of Department?", a: "Dr. Ajay Gahlot, Associate Professor & HOD, with 15+ years of experience and a Ph.D. in Physics." },
            { q: "How many faculty members are there?", a: "About 33: 2 Professors, 5 Associate Professors and 26 Assistant Professors." },
            { q: "What is the Digital Language Lab?", a: "A lab with 30 multimedia computers running Orell software for soft skills, phonetics and professional communication." }
        ]
    },
    "academic-calendar": {
        title: "Academic Calendar & Examination Guidelines",
        subtitle: "Official semester datesheets, internal evaluation weightage, and university exam ordinances at MSIT.",
        seo_description: "View official MSIT academic calendar, GGSIPU datesheets, internal examination weightage rules, and attendance requirements.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT academic block overview for official semester calendar",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <section>
                    <p class="text-lg text-slate-700 leading-relaxed">
                        The academic calendar of Maharaja Surajmal Institute of Technology aligns rigorously with Guru Gobind Singh Indraprastha University (GGSIPU) regulations, orchestrating a structured academic cycle across lecture semesters, internal evaluations, and university end-term examinations.
                    </p>
                </section>

                <!-- Examination & Evaluation Weightage -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-6">Examination Scheme & Weightage Rules</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-lg uppercase tracking-wider">Theory Courses (100 Marks Total)</span>
                            <ul class="mt-4 space-y-3 text-sm text-slate-700">
                                <li class="flex justify-between border-b border-slate-200 pb-2">
                                    <span class="font-semibold">Internal Continuous Assessment:</span>
                                    <span class="font-extrabold text-blue-700">25 Marks</span>
                                </li>
                                <li class="text-xs text-slate-500 pl-2">
                                    • Mid-Term / Minor Examination: <strong>15 Marks</strong><br>
                                    • Class Assignments, Quizzes & Regularity: <strong>10 Marks</strong>
                                </li>
                                <li class="flex justify-between pt-2">
                                    <span class="font-semibold">University End-Term Theory Exam:</span>
                                    <span class="font-extrabold text-indigo-700">75 Marks</span>
                                </li>
                            </ul>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider">Practical Labs (100 Marks Total)</span>
                            <ul class="mt-4 space-y-3 text-sm text-slate-700">
                                <li class="flex justify-between border-b border-slate-200 pb-2">
                                    <span class="font-semibold">Internal Lab Performance:</span>
                                    <span class="font-extrabold text-emerald-700">40 Marks</span>
                                </li>
                                <li class="text-xs text-slate-500 pl-2">
                                    • Day-to-day Lab Journal & Execution: <strong>20 Marks</strong><br>
                                    • Internal Lab Viva & Quiz: <strong>20 Marks</strong>
                                </li>
                                <li class="flex justify-between pt-2">
                                    <span class="font-semibold">External Practical / Viva Voce:</span>
                                    <span class="font-extrabold text-teal-700">60 Marks</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Datesheets, Re-Evaluation & Ordinance 11 -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-amber-600 pl-4 mb-6">University Regulations & Key Datesheets</h3>
                    <div class="space-y-4">
                        <div class="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl">
                            <h4 class="font-bold text-amber-950 text-base mb-2">📌 GGSIPU Ordinance 11 (Mandatory Attendance Requirement)</h4>
                            <p class="text-sm text-amber-900 leading-relaxed">
                                Students must secure <strong>not less than 75% attendance</strong> in every individual subject. Candidates falling below this statutory limit will be placed on the official detention list and prohibited from appearing in external semester examinations.
                            </p>
                        </div>
                        <div class="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                            <h4 class="font-bold text-slate-900 text-base mb-2">📄 Re-Checking & Re-Evaluation Notification Procedure</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">
                                Following publication of university results, students may apply for re-checking of answer scripts or inspection/certified copies within 15 days by submitting prescribed GGSIPU Examination Division forms alongside the requisite challan fee.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Current Sem", value: "Even (Jan-May)" },
            { label: "Working Days", value: "90+" }
        ],
        bulletPoints: [
            { label: "Download PDF Calendar", detail: "Access the verified official academic calendar approved by GGSIPU with dates for semester commencement, practicals, mid-terms, and final university examinations.", url: "/academic-calendar" },
            { label: "Exam Schedules", detail: "Complete date-sheet timelines and seating plan guidelines for GGSIPU End-Term Theory and Practical Examinations across all engineering branches.", url: "/academic-calendar#examination-scheme-and-weightage-rules" },
            { label: "List of Holidays", detail: "Official gazetted, restricted, and institutional holiday notifications notified by the university and MSIT administration.", url: "/academic-calendar" }
        ]
    },
    "timetable": {
        title: "Time Table & Syllabus",
        subtitle: "Curriculum structure and daily schedules for Maharaja Surajmal Institute of Technology.",
        seo_description: "Access the latest class timetables and B.Tech syllabus at Maharaja Surajmal Institute of Technology. Get detailed course structure and laboratory schedules.",
        category: "Academics",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Students in a technical lecture hall at MSIT following the semester syllabus",
        content: `
            <p class="mb-6">Access official GGSIPU syllabi for all departments and branches. The syllabus outlines learning objectives, textbooks, unit breakdowns, and evaluation schemes for every subject.</p>
            <h3 class="text-2xl font-semibold text-slate-900 mt-10 mb-4">Class Schedules</h3>
            <p class="mb-6">Department-wise timetables are updated at the start of every semester to ensure an optimal balance of lectures, tutorials, and intensive laboratory sessions.</p>
        `,
        stats: [
            { label: "Updated", value: "Start of Sem" },
            { label: "Format", value: "GGSIPU Pattern" }
        ],
        bulletPoints: [
            { label: "B.Tech Syllabus (All Branches)", detail: "Detailed credit structure, scheme of examinations, and course syllabus for CSE, IT, ECE, and EEE under GGSIPU scheme.", url: "/syllabus" },
            { label: "Section-wise Timetables", detail: "Weekly lecture schedules, tutorial slots, and classroom allotments organized section-wise for morning and evening shifts.", url: "/timetable" },
            { label: "Lab Batches", detail: "Sub-group batch divisions for hands-on programming, electronics, networking, and engineering physics/chemistry lab experiments.", url: "/timetable" }
        ]
    },
    "research": {
        title: "Research & Innovation Ecosystem",
        subtitle: "Advancing frontier computing, funded research projects, and intellectual property at MSIT.",
        seo_description: "Explore funded research grants, patents, IEEE conferences, and Innovation Council initiatives at Maharaja Surajmal Institute of Technology.",
        category: "Academics",
        heroImage: "/campus/main-academic-building.webp",
        heroImageAlt: "MSIT Advanced Computing Research Laboratories",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <section class="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
                    <p class="text-slate-700 text-sm sm:text-lg leading-relaxed font-normal m-0">
                        Maharaja Surajmal Institute of Technology fosters an intensive research and development ecosystem under the mentorship of Director Prof. (Dr.) Avanish Kumar Srivastava (former Director CSIR-AMPRI and Stanford-ranked top 2% global scientist), driving industrial innovation and multidisciplinary patents.
                    </p>
                </section>

                <!-- Sponsored Research Projects -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Sponsored Research Grants & Centers of Excellence</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <div class="flex flex-wrap items-center justify-between gap-2">
                                <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">Corporate CSR Grant</span>
                                <span class="text-base font-extrabold text-slate-900 tabular-nums">₹30,00,000/-</span>
                            </div>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">Center of Excellence in Computational Intelligence</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Funded by <strong class="text-slate-900">Petronet LNG Ltd.</strong>, this CoE in the Department of CSE is equipped with state-of-the-art multi-GPU deep learning servers, high-performance compute clusters, and cloud-assisted AI prototyping environments.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <div class="flex flex-wrap items-center justify-between gap-2">
                                <span class="inline-block px-2.5 py-1 bg-primary/5 text-primary font-bold text-xs rounded-lg border border-primary/20">AICTE National Scheme</span>
                                <span class="text-base font-extrabold text-slate-900 tabular-nums">₹1,10,00,000/-</span>
                            </div>
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">AICTE IDEA Lab Prototyping Infrastructure</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                The Idea Development, Evaluation & Application (IDEA) Lab provides 3D printers, laser cutters, embedded hardware workstations, and FPGA development kits to nurture hands-on product creation across all undergraduate departments.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Patents Table -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Published & Granted Patents (Selected Portfolio)</h3>
                    <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table class="w-full text-left text-sm text-slate-700 m-0">
                            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th class="px-5 py-3 font-bold">Patent Title</th>
                                    <th class="px-5 py-3 font-bold">Filing / Grant Authority</th>
                                    <th class="px-5 py-3 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200">
                                <tr>
                                    <td class="px-5 py-4 font-semibold text-slate-900">IoT-Enabled Real-Time Soil Nitrogen & Moisture Telemetry Probe</td>
                                    <td class="px-5 py-4 text-slate-600">Indian Patent Office (Govt. of India)</td>
                                    <td class="px-5 py-4"><span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border bg-primary text-white border-primary">Granted</span></td>
                                </tr>
                                <tr>
                                    <td class="px-5 py-4 font-semibold text-slate-900">Low-Power Embedded Hardware Loop for Indic Speech Synthesis</td>
                                    <td class="px-5 py-4 text-slate-600">Indian Patent Office (Govt. of India)</td>
                                    <td class="px-5 py-4"><span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border bg-primary/5 text-primary border-primary/20">Published</span></td>
                                </tr>
                                <tr>
                                    <td class="px-5 py-4 font-semibold text-slate-900">Autonomous Swarm Drone Navigation Protocol for Precision Agriculture</td>
                                    <td class="px-5 py-4 text-slate-600">Indian Patent Office (Govt. of India)</td>
                                    <td class="px-5 py-4"><span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border bg-primary/5 text-primary border-primary/20">Published</span></td>
                                </tr>
                                <tr>
                                    <td class="px-5 py-4 font-semibold text-slate-900">Nanocomposite Photocatalyst Device for Industrial Effluent Purification</td>
                                    <td class="px-5 py-4 text-slate-600">Indian Patent Office (Govt. of India)</td>
                                    <td class="px-5 py-4"><span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border bg-primary text-white border-primary">Granted</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- Conferences & IIC -->
                <section>
                    <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-6">Conferences, IEEE Proceedings & Innovation Council</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">IEEE Technically-Approved Conferences</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                MSIT convenes the biennial <strong class="text-slate-900">International Conference on Artificial Intelligence and Applications (ICAIA)</strong>, approved by IEEE Delhi Section, alongside national conference <strong class="text-slate-900">NCI-TIDE</strong>, with peer-reviewed proceedings indexed in Scopus and IEEE Xplore.
                            </p>
                        </div>

                        <div class="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 sm:space-y-3">
                            <h4 class="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">MoE Institutional Innovation Council (IIC)</h4>
                            <p class="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                Awarded high star ratings by the Ministry of Education (MoE) Innovation Cell. MSIT implements the <strong class="text-slate-900">National Innovation and Startup Policy (NISP)</strong>, providing patent filing incentives, pre-incubation grants, and student IP ownership.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Research Leadership & Governance Directorate -->
                <section>
                    <h3 class="text-2xl font-extrabold text-slate-900 mb-6">Research Governance & Leadership Directorate</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Dean Academics & Research -->
                        <div class="p-6 bg-linear-to-br from-slate-50 via-white to-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div class="space-y-4">
                                <div class="flex items-center gap-4">
                                    <div class="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-200 shrink-0 bg-slate-100">
                                        <img src="/faculty/naveen-dahiya.webp" alt="Prof. (Dr.) Naveen Dahiya" class="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span class="inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 rounded-md">
                                            Institutional Dean
                                        </span>
                                        <h4 class="text-lg font-bold text-slate-900 mt-1">Prof. (Dr.) Naveen Dahiya</h4>
                                        <p class="text-xs font-semibold text-blue-600">Dean (Academics & Research Leadership) & Professor, CSE</p>
                                    </div>
                                </div>
                                <p class="text-xs text-slate-600 font-light leading-relaxed">
                                    Heads institutional academic and research governance, doctoral scholar admissions under GGSIPU Ph.D. Research Centre (CSE & ECE), Scopus/WoS publication incentives, and editor-in-chief coordination for <em>Satyam: MSIT Journal of Research</em>.
                                </p>
                            </div>
                            <div class="pt-4 mt-2 border-t border-slate-100">
                                <a href="/faculty?search=Naveen+Dahiya" class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                                    <span>View Dean Profile & Scholarly Output</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>

                        <!-- Research Mentor & Director -->
                        <div class="p-6 bg-linear-to-br from-indigo-50/40 via-white to-white rounded-3xl border border-indigo-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div class="space-y-4">
                                <div class="flex items-center gap-4">
                                    <div class="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-200 shrink-0 bg-slate-100">
                                        <img src="/faculty/avanish-kumar.webp" alt="Prof. (Dr.) Avanish Kumar Srivastava" class="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span class="inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-900 rounded-md">
                                            Research Mentor & Patron
                                        </span>
                                        <h4 class="text-lg font-bold text-slate-900 mt-1">Prof. (Dr.) Avanish Kumar Srivastava</h4>
                                        <p class="text-xs font-semibold text-indigo-700">Director, MSIT | Stanford Top 2% Global Scientist</p>
                                    </div>
                                </div>
                                <p class="text-xs text-slate-600 font-light leading-relaxed">
                                    Mentors frontier scientific initiatives, sponsored research grants (AICTE, DST, CSIR), high-resolution microscopy facilities, and institutional intellectual property commercialization. Holds 12 patents and 460+ SCI publications.
                                </p>
                            </div>
                            <div class="pt-4 mt-2 border-t border-slate-100">
                                <a href="/faculty?search=Avanish+Kumar+Srivastava" class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
                                    <span>View Director Research Profile & Patents</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Publications", value: "1,200+", url: "/faculty" },
            { label: "Patents Filed", value: "35+", url: "#published-granted-patents-selected-portfolio" },
            { label: "Patents Granted", value: "12+", url: "#published-granted-patents-selected-portfolio" },
            { label: "Dean (Academics & Research)", value: "Prof. (Dr.) Naveen Dahiya", url: "/faculty?search=Naveen+Dahiya" }
        ],
        // Shown in the sidebar instead of the placeholder links. Answers use facts already on this page.
        faqs: [
            { q: "Who leads research at MSIT?", a: "Research is directed under Dean (Academics & Research) Prof. (Dr.) Naveen Dahiya and mentored by Director Prof. (Dr.) Avanish Kumar Srivastava, former Director of CSIR-AMPRI and Stanford Top 2% scientist." },
            { q: "What funded research centres does MSIT have?", a: "A Centre of Excellence in Computational Intelligence (CSE, funded by Petronet LNG) and the AICTE IDEA Lab for prototyping." },
            { q: "Can undergraduate students use the IDEA Lab?", a: "Yes. The IDEA Lab is open to students across all undergraduate departments for hands-on product building." },
            { q: "Which conferences does MSIT organise?", a: "The international conference ICAIA, approved by IEEE Delhi Section, and the national conference NCI-TIDE." },
            { q: "Does MSIT support student patents and startups?", a: "Yes. Under the National Innovation and Startup Policy, MSIT offers patent filing incentives, pre-incubation grants and student IP ownership." }
        ]
    }
};
