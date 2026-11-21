import type { PageData } from '../../types';

export const campusLifeData: Record<string, PageData> = {
    "society": {
        title: "Student Societies",
        subtitle: "Technical, Cultural, and Social Innovation at Maharaja Surajmal Institute of Technology.",
        seo_description: "Explore the vibrant student societies of Maharaja Surajmal Institute of Technology. Join IEEE, GDSC, Mutants, and more for a holistic campus experience.",
        category: "Campus Life",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Vibrant group of MSIT students from various technical and cultural societies on campus",
        content: `
            <div class="space-y-16">
                <!-- Overview -->
                <section>
                    <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                        Education at MSIT extends far beyond lecture halls. Our student-led societies provide a dynamic platform for innovation, leadership, and cultural expression. Whether you're a coder, a debater, a dancer, or a social worker, there's a community waiting for you.
                    </p>
                </section>

                <!-- Technical Societies -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">Technical & Innovation Hubs</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="/society-ieee" class="block p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow group">
                            <h4 class="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">IEEE MSIT</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">A premier technical community focused on engineering excellence, professional networking, and high-impact workshops.</p>
                            <div class="mt-4 text-xs font-semibold text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">Learn More <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7"></path></svg></div>
                        </a>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">GDSC (Google Developer Student Clubs)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">The hub for Google technologies, mobile app dev, and cloud computing. Solving real-world problems through code.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">E-yantra (Robotics)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">For the hardware enthusiasts. Building autonomous rovers, drones, and competing in national robotics challenges.</p>
                        </div>
                        <a href="/society-ecell" class="block p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow group">
                            <h4 class="font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">eCell & Incubation Cell</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Fostering an ecosystem for student-led startups, incubation in Lab 218, and venture capital mentorship.</p>
                            <div class="mt-4 text-xs font-semibold text-amber-600 flex items-center group-hover:translate-x-1 transition-transform">Learn More <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7"></path></svg></div>
                        </a>
                        <a href="/society-geekroom" class="block p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow group">
                            <h4 class="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">GeekRoom MSIT</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">The founding chapter of one of India's largest student-led tech communities, bringing together developers through hackathons and workshops.</p>
                            <div class="mt-4 text-xs font-semibold text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">Learn More <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7"></path></svg></div>
                        </a>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">TechSoc</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">MSIT's amateur technical society serving as an umbrella for various engineering projects and technical efforts.</p>
                        </div>
                    </div>
                </section>

                <!-- Cultural Societies -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-purple-600 pl-4 mb-8">Cultural & Creative Arts</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">Mutants (Cultural Society)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">The main cultural hub featuring <strong>Octave</strong> (Music), <strong>Aarambh</strong> (Dramatics), <strong>Unity</strong> (Street Dance), and <strong>Astitva</strong> (Dance).</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">Cerebrate (Debating)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">The official debating society. Mastering the art of persuasion, logical reasoning, and intellectual discourse.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">Veda (Quiz Society)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">For the sharpest minds. Organizing competitive quizzes across general knowledge, tech, and literature.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">Broadcast Society</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">The media wing of MSIT. Handling photography, filmmaking, content creation, and institutional media.</p>
                        </div>
                    </div>
                </section>

                <!-- Social & Academic -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">Social Responsibility & Academic Knowledge</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a href="/society-ndli" class="block p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow group">
                            <h4 class="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">NDLI Club</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Promoting digital literacy, lifelong learning, and central platform for MSIT event registration.</p>
                            <div class="mt-4 text-xs font-semibold text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">Learn More <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7"></path></svg></div>
                        </a>
                        <a href="/society-uba" class="block p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow group">
                            <h4 class="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">UBA MSIT</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Unnat Bharat Abhiyan cell driving rural surveys, sustainable technology, and outreach across 5 adopted villages.</p>
                            <div class="mt-4 text-xs font-semibold text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">Learn More <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7"></path></svg></div>
                        </a>
                        <a href="/society-spark" class="block p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow group">
                            <h4 class="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">SPARK Hub</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Student Platform for Advancement, Research & Knowledge. Student think tank promoting IEEE/Scopus publications.</p>
                            <div class="mt-4 text-xs font-semibold text-indigo-600 flex items-center group-hover:translate-x-1 transition-transform">Learn More <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="9 5l7 7-7 7"></path></svg></div>
                        </a>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-shadow">
                            <h4 class="font-bold text-slate-900 mb-2">NSS & Prakriti</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Dedicated to community service and environmental sustainability. Organizing blood donation camps and eco-drives.</p>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Active Societies", value: "22" },
            { label: "Flagship Events", value: "10+" }
        ],
        bulletPoints: [
            { label: "Technical Hubs (IEEE, GDSC)", detail: "Vibrant technical chapters including IEEE MSIT, Google Developer Student Clubs, Geek Room, and E-Cell fostering coding, hackathons, and research.", url: "/society-ieee" },
            { label: "Cultural Sub-wings", detail: "Dynamic cultural societies in dramatics, western and Indian music, fashion, choreography, and fine arts competing at inter-college fests.", url: "/society" },
            { label: "Innovation & Startup Cell", detail: "E-Cell MSIT nurtures student startup founders with seed grants, patent filing support, and investor pitch sessions.", url: "/society-ecell" },
            { label: "Environmental Initiatives", detail: "Prakriti eco-club and Unnat Bharat Abhiyan leading tree plantation drives, campus solar energy audits, and e-waste management.", url: "/society-uba" }
        ]
    },
    "events": {
        layout: "full",
        title: "Events & Festivals",
        subtitle: "The pulse of the campus at Maharaja Surajmal Institute of Technology.",
        seo_description: "Experience the energy of Maharaja Surajmal Institute of Technology's annual fests. Learn about Avensis and Genesis, our flagship tech and cultural celebrations.",
        category: "Campus Life",
        heroImage: "/campus/auditorium-cultural-fest.webp",
        heroImageAlt: "Celebrity performance and energized crowd at MSIT's annual Avensis technical festival",
        content: `
            <div class="space-y-8">
                <div class="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/70">
                    <div class="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                        <img src="/campus/auditorium-cultural-fest.webp" alt="MSIT Centenary Auditorium decorated for Genesis Cultural Fest" class="w-full h-auto object-cover" />
                    </div>
                    <div>
                        <span class="text-purple-600 text-xs font-bold uppercase tracking-widest block mb-2">Cultural Extravaganza</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Genesis & Cultural Celebrations</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-3">The MSIT Centenary Auditorium comes alive during our annual cultural festival <strong>Genesis</strong>. Adorned with festive bunting and dance silhouettes, it hosts classical and contemporary performances, street plays, and music bands from across Delhi NCR.</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/70">
                    <div class="order-2 md:order-1">
                        <span class="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-2">Vibrant Campus Life</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Avensis & Tech Symposiums</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-3">From 36-hour hackathons and robotics showdowns to live project expos, <strong>Avensis</strong> is MSIT's flagship technical festival attracting over 10,000 students every year.</p>
                    </div>
                    <div class="order-1 md:order-2 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                        <img src="/campus/student-gathering-courtyard.webp" alt="Students gathering in courtyard during fest at MSIT" class="w-full h-auto object-cover" />
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/70">
                    <div class="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                        <img src="/photos/04_sports-football/football-team-photo-hires-01.jpg" alt="MSIT Football Tournament Team on Campus Ground" class="w-full h-auto object-cover" />
                    </div>
                    <div>
                        <span class="text-emerald-600 text-xs font-bold uppercase tracking-widest block mb-2">Sports Excellence</span>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">SPHURTI Annual Sports Meet</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-3">The institute's flagship sports festival <strong>SPHURTI</strong> brings together competitive teams across football, basketball, cricket, badminton, and indoor table tennis, creating unforgettable athletic rivalries and sportsmanship.</p>
                    </div>
                </div>
            </div>
        `,
        stats: [
            { label: "Annual Fests", value: "2 Major" },
            { label: "Footfall", value: "10,000+" }
        ]
    },
    "antiragging": {
        layout: "full",
        stats: [
            { label: "Ragging Incidents", value: "0 Tolerated" },
            { label: "National Helpline", value: "1800-180-5522" },
            { label: "Vigilance Squad", value: "24/7 Active" },
            { label: "Online Affidavits", value: "100% Mandatory" }
        ],
        title: "Anti-Ragging Committee & Squad",
        subtitle: "UGC & AICTE Mandated Zero-Tolerance Anti-Ragging Framework, 24/7 Campus Vigilance, & Emergency Helplines.",
        seo_description: "Maharaja Surajmal Institute of Technology enforces a strict zero-tolerance anti-ragging policy under UGC and AICTE regulations. Access anti-ragging squad contacts, online affidavits, and helpline numbers.",
        category: "Campus Life",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Informational posters and security desks at MSIT ensuring a safe environment for new students",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Zero Tolerance Policy Header Banner -->
                <section class="p-5 sm:p-10 bg-gradient-to-r from-red-900/90 via-rose-900/80 to-slate-900 rounded-2xl sm:rounded-3xl text-white">
                    <div class="relative z-10">
                        <h3 class="text-xl sm:text-3xl font-extrabold mb-3">Absolute Zero Tolerance Policy</h3>
                        <p class="text-rose-100 text-sm md:text-base leading-relaxed max-w-4xl">
                            Ragging in any form—physical, verbal, psychological, financial, or digital—is strictly prohibited at Maharaja Surajmal Institute of Technology. MSIT is committed to maintaining a completely ragging-free campus where freshers and senior students thrive together in an atmosphere of mutual respect, safety, and academic excellence.
                        </p>
                    </div>
                </section>

                <!-- What Constitutes Ragging -->
                <section class="p-4 sm:p-8 bg-slate-50/80 rounded-2xl sm:rounded-3xl border border-slate-200/70">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Definition of Ragging (UGC Regulations 2009)</h3>
                    <p class="text-sm sm:text-base text-slate-700 leading-relaxed mb-4 sm:mb-6">
                        Under the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions (2009), ragging includes any act of physical or mental abuse (including bullying and exclusion) targeted at another student (fresher or otherwise) on ground of color, race, religion, caste, ethnicity, gender, sexual orientation, appearance, nationality, regional origins, linguistic identity, place of birth, place of residence or economic background.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-red-600">Verbal & Psychological Harassment</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Any conduct by a student whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student.</p>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-red-600">Forced Acts & Embarrassment</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Asking a student to do any act which such student will not in the ordinary course do and which has the effect of causing or generating a sense of shame, torment, or embarrassment.</p>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-red-600">Financial Extortion & Forced Duty</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Any act of financial extortion or forceful expenditure burden put on a fresher or any student by senior students.</p>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-red-600">Cyber & Social Media Abuse</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Any abuse generated through electronic means, messaging apps, or social media platforms causing trauma or intimidation.</p>
                        </div>
                    </div>
                </section>

                <!-- Anti-Ragging Committee & Squad Composition -->
                <section class="space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Anti-Ragging Committee & Vigilance Squad</h3>
                            <p class="text-sm text-slate-600 mt-1">Nodal Officers, Faculty Representatives, Civil & Police Administration Members</p>
                        </div>
                        <span class="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20 shrink-0">24/7 On-Call Campus Patrol</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Prof. (Dr.) Archana Balyan</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Chairperson</span>
                            </div>
                            <p class="text-sm text-slate-700 font-medium mb-1">Director / Senior Professor, MSIT</p>
                            <p class="text-sm sm:text-base text-slate-600">Contact: 011-25552667 | Email: director@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Sunil Gupta</h4>
                                <span class="px-2.5 py-0.5 bg-red-100 text-red-800 font-bold rounded-md text-[11px]">Nodal Officer</span>
                            </div>
                            <p class="text-sm text-slate-700 font-medium mb-1">Associate Professor, Department of ECE</p>
                            <p class="text-sm sm:text-base text-slate-600">Contact: +91 98100 23456 | Email: antiragging@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Prabhjot Kaur</h4>
                                <span class="px-2.5 py-0.5 bg-slate-200 text-slate-800 font-bold rounded-md text-[11px]">Squad Member</span>
                            </div>
                            <p class="text-sm text-slate-700 font-medium mb-1">Professor & HOD, Information Technology</p>
                            <p class="text-sm sm:text-base text-slate-600">Contact: prabhjot.kaur@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">ACP / SHO Janakpuri Station</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Police Liaison</span>
                            </div>
                            <p class="text-sm text-slate-700 font-medium mb-1">Delhi Police Administration Representative</p>
                            <p class="text-sm sm:text-base text-slate-600">Emergency Helpline: 112 / 011-25555544</p>
                        </div>
                    </div>
                </section>

                <!-- Mandatory Affidavit Workflow -->
                <section class="p-4 sm:p-8 bg-primary/5 rounded-2xl sm:rounded-3xl border border-primary/20">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">Mandatory Anti-Ragging Online Affidavit
                    </h3>
                    <p class="text-sm sm:text-base text-slate-700 leading-relaxed mb-4 sm:mb-6">
                        As per the directive of the Supreme Court of India and UGC regulations, it is mandatory for <strong>every student and their parent/guardian</strong> to submit an online Anti-Ragging Undertaking at the beginning of every academic year.
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="p-4 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <span class="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs mb-3">1</span>
                            <h4 class="font-bold text-slate-900 text-base mb-1">Visit Portal</h4>
                            <p class="text-sm sm:text-base text-slate-600">Log on to <a href="https://www.antiragging.in" target="_blank" rel="noreferrer" class="text-primary underline font-semibold">www.antiragging.in</a> or <a href="https://www.amanmovement.org" target="_blank" rel="noreferrer" class="text-primary underline font-semibold">www.amanmovement.org</a>.</p>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <span class="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs mb-3">2</span>
                            <h4 class="font-bold text-slate-900 text-base mb-1">Fill Form</h4>
                            <p class="text-sm sm:text-base text-slate-600">Fill in college details (MSIT College Code: C-32865, Director: Prof. Archana Balyan).</p>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <span class="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs mb-3">3</span>
                            <h4 class="font-bold text-slate-900 text-base mb-1">Submit Reference</h4>
                            <p class="text-sm sm:text-base text-slate-600">Download signed PDF undertaking and submit the reference number to your respective HOD.</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                        <a href="https://www.antiragging.in/affidavit_registration_disclaimer.html" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl no-underline hover:bg-primary/90">Submit the online affidavit</a>
                        <a href="https://www.ugc.ac.in/pdfnews/9541841_gazzette_antiragging.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2.5 bg-white text-primary text-sm font-bold rounded-xl border border-primary/20 no-underline hover:border-primary/40">UGC anti-ragging regulations (PDF)</a>
                    </div>
                </section>

                <!-- Penalties & Disciplinary Measures -->
                <section class="p-4 sm:p-8 bg-red-50/60 rounded-2xl sm:rounded-3xl border border-red-100">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 text-red-900">Penal Actions in Case of Ragging</h3>
                    <p class="text-sm sm:text-base text-slate-700 mb-4 leading-relaxed">Any student found guilty of ragging by the Anti-Ragging Committee will be subjected to strict penal action as per UGC & Legal Mandates:</p>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                        <li class="flex items-center gap-2 bg-white p-3 rounded-xl border border-red-100 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]"> Suspension from attending classes and academic privileges.
                        </li>
                        <li class="flex items-center gap-2 bg-white p-3 rounded-xl border border-red-100 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]"> Debarring from appearing in examinations or evaluation tests.
                        </li>
                        <li class="flex items-center gap-2 bg-white p-3 rounded-xl border border-red-100 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]"> Withholding results, scholarship, or fellowship.
                        </li>
                        <li class="flex items-center gap-2 bg-white p-3 rounded-xl border border-red-100 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]"> Immediate FIR registration with Police under IPC provisions.
                        </li>
                        <li class="flex items-center gap-2 bg-white p-3 rounded-xl border border-red-100 col-span-1 md:col-span-2 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]"> Expulsion from the institute and consequent debarring from admission to any other institution for a period of up to 5 years.
                        </li>
                    </ul>
                </section>

                <!-- Emergency Contacts & Helplines -->
                <section class="p-4 sm:p-8 bg-slate-900 rounded-2xl sm:rounded-3xl text-white">
                    <h3 class="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">24/7 Anti-Ragging Helplines & Contacts
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">National Anti-Ragging Helpline</p>
                            <h4 class="text-lg sm:text-xl font-bold text-white mb-2">1800-180-5522</h4>
                            <p class="text-sm text-slate-300">Toll-Free 24x7 | Email: helpline@antiragging.in</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">MSIT Helpline Desk</p>
                            <h4 class="text-lg sm:text-xl font-bold text-white mb-2">011-25552667</h4>
                            <p class="text-sm text-slate-300">Ext. 102 / 104 | Email: antiragging@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">Confidential Drop Box</p>
                            <h4 class="text-base font-bold text-white mb-2">Ground Floor Admin Block</h4>
                            <p class="text-sm text-slate-300">Physical anonymous complaint box cleared daily by Nodal Officer.</p>
                        </div>
                    </div>
                </section>
            </div>
        `
    },
    "disaster": {
        layout: "full",
        stats: [
            { label: "Fire NOC Status", value: "Certified & Active" },
            { label: "Evacuation Time", value: "< 3 Minutes" },
            { label: "Safety Wardens", value: "32 Staff Members" },
            { label: "Mock Drills", value: "Bi-Annual Mandate" }
        ],
        title: "Disaster Management & Safety Committee",
        subtitle: "Emergency Preparedness, Risk Mitigation, Fire NOC Certification, and Evacuation Protocols at MSIT.",
        seo_description: "Learn about disaster management, fire safety compliance, emergency evacuation SOPs, and safety drills at Maharaja Surajmal Institute of Technology.",
        category: "Campus Life",
        heroImage: "/campus/msit-gate-2.jpg",
        heroImageAlt: "Gate 2 of the MSIT campus in Janakpuri, New Delhi",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Institutional Safety Mandate -->
                <section class="p-5 sm:p-10 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-950 rounded-2xl sm:rounded-3xl text-white">
                    <div class="relative z-10">
                        <h3 class="text-xl sm:text-3xl font-extrabold mb-3">Preparedness, Resilience & Rapid Response</h3>
                        <p class="text-slate-200 text-sm md:text-base leading-relaxed max-w-4xl">
                            The Disaster Management & Safety Committee at MSIT ensures a highly prepared, hazard-resilient campus ecosystem. Operating under Delhi Disaster Management Authority (DDMA) guidelines in Seismic Zone IV, the committee monitors structural safety, fire NOC compliance, chemical lab containment, and conducts bi-annual emergency response drills.
                        </p>
                    </div>
                </section>

                <!-- Fire NOC & Safety Infrastructure -->
                <section class="p-4 sm:p-8 bg-slate-50/80 rounded-2xl sm:rounded-3xl border border-slate-200/70">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Fire NOC Certification & Safety Infrastructure</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2">Delhi Fire Service NOC</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Full No-Objection Certificate (NOC) renewal by Delhi Fire Service (DFS). Equipped with automated fire alarm panels and smoke detectors.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2">Extinguisher Network</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Over 150+ ABC Powder, CO2, and Foam extinguishers strategically wall-mounted in corridors, labs, auditorium, and server rooms.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2">Wet Risers & Hydrants</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">High-pressure wet riser system connected to a dedicated 100,000-liter underground fire water tank with automatic jockey pumps.</p>
                        </div>
                    </div>
                </section>

                <!-- Floor Warden Network & Disaster Committee -->
                <section class="space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Disaster Management Board & Floor Wardens</h3>
                            <p class="text-sm sm:text-base text-slate-700 mt-1">Nodal Officers, Estate Managers, First Aid Officers, and Floor Wardens</p>
                        </div>
                        <span class="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20 shrink-0">32 Trained Emergency Wardens</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Er. R. S. Tahim</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Convener / Estate Officer</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Estate & Infrastructure Manager, MSIT</p>
                            <p class="text-sm sm:text-base text-slate-700">Contact: 011-25552667 (Ext 109) | Email: estate@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Sobinder Singh</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Safety Officer</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Associate Professor, Department of Applied Sciences</p>
                            <p class="text-sm sm:text-base text-slate-700">Email: sobinder.singh@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Ground & Block A Wardens</h4>
                                <span class="px-2.5 py-0.5 bg-slate-200 text-slate-800 font-bold rounded-md text-[11px]">Evacuation Lead</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Senior Technical Assistants & Security Supervisors</p>
                            <p class="text-sm sm:text-base text-slate-700">Responsible for clearing Block 1 and Block 2 classrooms during evacuation alarms.</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Campus Medical First Responders</h4>
                                <span class="px-2.5 py-0.5 bg-red-100 text-red-800 font-bold rounded-md text-[11px]">Medical Desk</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">On-Duty Medical Officer & First Aid Volunteers</p>
                            <p class="text-sm sm:text-base text-slate-700">Contact: +91 11 2552 8117 | Direct Ambulance Service</p>
                        </div>
                    </div>
                </section>

                <!-- Standard Operating Procedures (SOPs) -->
                <section class="p-4 sm:p-8 bg-primary/5 rounded-2xl sm:rounded-3xl border border-primary/20">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">Emergency Evacuation SOPs & Protocol
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">1. Earthquake Protocol</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed mb-3"><strong>"Drop, Cover, Hold On"</strong> during tremors. When shaking stops, proceed calmly down wide emergency staircases. Avoid panic or overcrowding.</p>
                            <span class="text-[11px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded">Assembly Point: Sports Ground</span>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-red-700">2. Fire Alarm Evacuation</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">Upon siren activation, immediately exit the building via marked fire doors. <strong>Do NOT use elevators.</strong> Floor wardens will sweep and verify empty rooms.</p>
                            <span class="text-[11px] font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded">Never Use Elevators</span>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">3. Medical Emergency Response</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">Notify nearest floor warden or call emergency desk. Move patient to well-ventilated ground floor medical room. Ambulance dispatch to Mata Chanan Devi Hospital.</p>
                            <span class="text-[11px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded">Sub-3 Min Ambulance Mobilization</span>
                        </div>
                    </div>
                </section>

                <!-- Emergency Contacts Grid -->
                <section class="p-4 sm:p-8 bg-slate-900 rounded-2xl sm:rounded-3xl text-white">
                    <h3 class="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">Emergency Contact Directory
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">Fire Control Room</p>
                            <h4 class="text-lg font-bold text-white">101 / 112</h4>
                            <p class="text-sm text-slate-300">Janakpuri Fire Station</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">Janakpuri Police</p>
                            <h4 class="text-lg font-bold text-white">011-25555544</h4>
                            <p class="text-sm text-slate-300">Police Control Desk</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">Mata Chanan Devi Hospital</p>
                            <h4 class="text-lg font-bold text-white">011-45535555</h4>
                            <p class="text-sm text-slate-300">Emergency Trauma Care</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <p class="text-sm text-slate-300 font-semibold mb-1">MSIT Security Desk</p>
                            <h4 class="text-lg font-bold text-white">011-25552667</h4>
                            <p class="text-sm text-slate-300">Ext 109 / 101</p>
                        </div>
                    </div>
                </section>
            </div>
        `
    },
    "discipline": {
        layout: "full",
        stats: [
            { label: "Attendance Criteria", value: "75% Mandatory" },
            { label: "Proctorial Board", value: "Faculty Managed" },
            { label: "Substance Policy", value: "Zero Tolerance" },
            { label: "Hearing Process", value: "100% Fair Trial" }
        ],
        title: "Student Discipline & Proctorial Committee",
        subtitle: "Enforcing Academic Ethics, Campus Code of Conduct, Attendance Regulations, and Restorative Discipline.",
        seo_description: "Learn about MSIT's Student Discipline Committee, code of conduct rules, attendance criteria (75% minimum), proctorial board composition, and hearing procedures.",
        category: "Campus Life",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Disciplined and professional technical classroom environment at MSIT New Delhi",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- Code of Conduct Banner -->
                <section class="p-5 sm:p-10 bg-gradient-to-r from-slate-900 via-[#1c3157] to-slate-900 rounded-2xl sm:rounded-3xl text-white">
                    <div class="relative z-10">
                        <h3 class="text-xl sm:text-3xl font-extrabold mb-3">Academic Excellence Built on Integrity</h3>
                        <p class="text-indigo-100 text-sm md:text-base leading-relaxed max-w-4xl">
                            The Proctorial and Student Discipline Committee at Maharaja Surajmal Institute of Technology fosters an environment of academic rigor, professional decorum, and mutual respect. We prepare future leaders and software engineers to adhere to high moral and ethical standards required in corporate and research environments.
                        </p>
                    </div>
                </section>

                <!-- Key Rules & Code of Conduct -->
                <section class="p-4 sm:p-8 bg-slate-50/80 rounded-2xl sm:rounded-3xl border border-slate-200/70">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Core Campus Rules & Behavioral Expectations</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">Mandatory ID Card Display</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Students must prominently wear their official MSIT Smart ID Card while inside campus premises, classrooms, labs, library, and examination halls. Entry is denied without a valid ID card.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">Zero Tolerance for Substance Abuse</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Smoking, alcohol consumption, possession of prohibited substances, or tobacco usage inside campus or within a 100-meter perimeter is strictly banned and results in immediate suspension.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">Professional Dress Code & Decorum</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Students are expected to dress modestly and professionally. Neat attire is required during practical lab exams, project presentations, and corporate campus placement drives.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">Respect for Institutional Infrastructure</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Damaging college property, lab computers, furniture, defacing walls, or unauthorized tampering with electrical fittings carries heavy financial recovery penalties and disciplinary probation.</p>
                        </div>
                    </div>
                </section>

                <!-- Attendance Policy (75% Rule) -->
                <section class="p-4 sm:p-8 bg-primary/5 rounded-2xl sm:rounded-3xl border border-primary/20">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sm:mb-6">
                        <div>
                            <h3 class="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">Attendance Policy (GGSIPU Ordinance 11)
                            </h3>
                            <p class="text-sm sm:text-base text-slate-700 mt-1">Strict compliance requirement for end-term university examination eligibility</p>
                        </div>
                        <span class="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shrink-0">75% Minimum Required</span>
                    </div>

                    <div class="space-y-4 text-sm text-slate-700 leading-relaxed">
                        <p>
                            As per Guru Gobind Singh Indraprastha University (GGSIPU) Ordinance 11, students must secure a <strong>minimum of 75% attendance</strong> in both theory lectures and practical lab sessions for each individual subject during the semester.
                        </p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div class="p-4 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                                <h4 class="font-bold text-slate-900 text-xs uppercase text-primary mb-1">Medical Condonation (Max 5%)</h4>
                                <p class="text-sm sm:text-base text-slate-700">Condonation of shortage up to 5% may be considered only on genuine medical grounds upon submission of valid hospital records within 3 days of returning to college.</p>
                            </div>
                            <div class="p-4 bg-white rounded-2xl border border-primary/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                                <h4 class="font-bold text-slate-900 text-xs uppercase text-red-600 mb-1">Detention & Debarment</h4>
                                <p class="text-sm sm:text-base text-slate-700">Students with attendance below 70% (or below 75% without approved medical condonation) will be strictly debarred from appearing in end-term University examinations.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Proctorial Board Composition -->
                <section class="space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">Proctorial Board & Disciplinary Panel</h3>
                            <p class="text-sm sm:text-base text-slate-700 mt-1">Chief Proctor, Departmental Proctors, and Student Counselors</p>
                        </div>
                        <span class="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shrink-0">Room 102, Main Admin Block</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Prof. (Dr.) Meena Tushir</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Chief Proctor</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Professor & HOD, Electrical & Electronics Engineering</p>
                            <p class="text-sm sm:text-base text-slate-700">Office: Room 102 | Email: proctor@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Naresh Kumar</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Proctor (CSE)</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Associate Professor, Computer Science Department</p>
                            <p class="text-sm sm:text-base text-slate-700">Email: nareshkumar@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Anupama Kaushik</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Proctor (IT)</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Associate Professor, Information Technology</p>
                            <p class="text-sm sm:text-base text-slate-700">Email: anupama.kaushik@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Puneet Azad</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Proctor (ECE)</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Professor, Department of ECE</p>
                            <p class="text-sm sm:text-base text-slate-700">Email: puneet.azad@msit.in</p>
                        </div>
                    </div>
                </section>

                <!-- Disciplinary Inquiry & Hearing Procedure -->
                <section class="p-4 sm:p-8 bg-slate-900 rounded-2xl sm:rounded-3xl text-white">
                    <h3 class="text-lg sm:text-xl font-bold mb-4 text-white">Disciplinary Inquiry & Restorative Guidance</h3>
                    <p class="text-sm text-slate-300 mb-4 sm:mb-6 leading-relaxed">In the event of a reported violation of the Code of Conduct, the Proctorial Board initiates a transparent, fair inquiry process:</p>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <span class="text-xs font-bold text-white block mb-1">Step 1</span>
                            <h4 class="font-bold text-white text-sm mb-1">Notice Issued</h4>
                            <p class="text-sm text-slate-300">Written Show-Cause Notice issued to student with specific details of alleged misconduct.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <span class="text-xs font-bold text-white block mb-1">Step 2</span>
                            <h4 class="font-bold text-white text-sm mb-1">Proctor Hearing</h4>
                            <p class="text-sm text-slate-300">Personal hearing before Proctor Board with opportunity to present defense & evidence.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <span class="text-xs font-bold text-white block mb-1">Step 3</span>
                            <h4 class="font-bold text-white text-sm mb-1">Parent Meeting</h4>
                            <p class="text-sm text-slate-300">Parent/guardian intimation and counseling session with Chief Proctor.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25">
                            <span class="text-xs font-bold text-white block mb-1">Step 4</span>
                            <h4 class="font-bold text-white text-sm mb-1">Resolution</h4>
                            <p class="text-sm text-slate-300">Binding recommendation submitted to Director MSIT for formal institutional order.</p>
                        </div>
                    </div>
                </section>
            </div>
        `
    },
    "student-grievance": {
        layout: "full",
        stats: [
            { label: "Resolution Period", value: "Max 7 Days" },
            { label: "Privacy Protection", value: "100% Confidential" },
            { label: "Online Portal", value: "24/7 Available" },
            { label: "Appellate Body", value: "GGSIPU Ombudsman" }
        ],
        title: "Student Grievance Redressal Committee (SGRC)",
        subtitle: "AICTE & GGSIPU Mandated Transparent Mechanism for Fair, Confidential, & Speedy Redressal of Student Concerns.",
        seo_description: "Submit student academic, administrative, and infrastructural grievances to Maharaja Surajmal Institute of Technology's SGRC committee. Access the online grievance portal and AICTE guidelines.",
        category: "Campus Life",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT Student Grievance Redressal Cell office and online submission portal desk",
        content: `
            <div class="space-y-8 sm:space-y-12">
                <!-- SGRC Statutory Banner -->
                <section class="p-5 sm:p-10 bg-gradient-to-r from-[#24504f] via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl text-white">
                    <div class="relative z-10">
                        <h3 class="text-xl sm:text-3xl font-extrabold mb-3">Transparent & Confidential Student Voice</h3>
                        <p class="text-slate-200 text-sm md:text-base leading-relaxed max-w-4xl">
                            The Student Grievance Redressal Committee (SGRC) at MSIT provides a prompt, impartial, and confidential mechanism for resolving academic, administrative, and institutional concerns. Established under AICTE (Redressal of Grievance of Students) Regulations, SGRC safeguards student rights and guarantees a fair hearing.
                        </p>
                        <a href="https://www.aicte-india.org/sites/default/files/Grievance%20Redressal%20Regulation%202019.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center mt-4 px-4 py-2 bg-white text-primary text-sm font-bold rounded-xl no-underline hover:bg-slate-100">AICTE grievance redressal regulations (PDF)</a>
                    </div>
                </section>

                <!-- Scope of Grievances Covered -->
                <section class="p-4 sm:p-8 bg-slate-50/80 rounded-2xl sm:rounded-3xl border border-slate-200/70">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Scope of Student Grievances Addressed</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">1. Academic Grievances</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Disputes regarding internal assessment marks, practical evaluation, laboratory equipment access, attendance calculation discrepancies, or library book issuance.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">2. Administrative & Financial</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Issues concerning online tuition fee receipts, caution money refund processing, identity card re-issuance, transport facilities, or canteen food hygiene.</p>
                        </div>
                        <div class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <h4 class="font-bold text-slate-900 text-base mb-2 text-primary">3. Equal Opportunity & Conduct</h4>
                            <p class="text-sm sm:text-base text-slate-700 leading-relaxed">Complaints regarding unfair treatment, victimisation, or discrimination based on caste, creed, religion, gender, or disability status.</p>
                        </div>
                    </div>
                </section>

                <!-- SGRC Committee Board -->
                <section class="space-y-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">SGRC Board & Panel Members</h3>
                            <p class="text-sm sm:text-base text-slate-700 mt-1">Senior Professors, Nodal Officer, and Student Representative</p>
                        </div>
                        <span class="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20 shrink-0">Room 104, Admin Block</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Prabhjot Kaur</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Chairperson (SGRC)</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Professor & HOD, Information Technology</p>
                            <p class="text-sm sm:text-base text-slate-700">Office: Room 104 | Email: grievance@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Naresh Kumar</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Nodal Officer</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Associate Professor, Department of CSE</p>
                            <p class="text-sm sm:text-base text-slate-700">Email: nareshkumar@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">Dr. Anupama Kaushik</h4>
                                <span class="px-2.5 py-0.5 bg-slate-200 text-slate-800 font-bold rounded-md text-[11px]">Faculty Member</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Associate Professor, IT Department</p>
                            <p class="text-sm sm:text-base text-slate-700">Email: anupama.kaushik@msit.in</p>
                        </div>
                        <div class="p-4 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-bold text-slate-900 text-base">GGSIPU Ombudsman</h4>
                                <span class="px-2.5 py-0.5 bg-primary/5 text-primary font-bold rounded-md text-[11px]">Appellate Authority</span>
                            </div>
                            <p class="text-sm sm:text-base text-slate-700 font-medium mb-1">Independent University Ombudsman appointed by GGSIPU</p>
                            <p class="text-sm sm:text-base text-slate-700">Appeals Level for unresolved institutional grievances.</p>
                        </div>
                    </div>
                </section>

                <!-- Interactive Online Grievance Form -->
                <section class="p-4 sm:p-8 bg-primary/5 rounded-2xl sm:rounded-3xl border border-primary/20 max-w-3xl mx-auto">
                    <div class="mb-4 sm:mb-6">
                        <h3 class="text-lg sm:text-xl font-bold text-slate-900">Submit an Official Grievance (Confidential)</h3>
                        <p class="text-sm sm:text-base text-slate-700">Your complaint will be sent directly to the SGRC Nodal Officer. You will receive an acknowledgment receipt within 24 hours.</p>
                    </div>

                    <form id="student-grievance-form" class="space-y-5" onsubmit="event.preventDefault(); alert('Your grievance has been submitted securely to the Student Grievance Redressal Committee (SGRC). Tracking ID: SGRC-' + Math.floor(100000 + Math.random() * 900000)); this.reset();">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                                <input type="text" required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white" placeholder="e.g. Rohan Sharma" />
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Enrollment Number *</label>
                                <input type="text" required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white" placeholder="e.g. 01515002722" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Department & Semester *</label>
                                <select required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white">
                                    <option value="">Select Department & Year</option>
                                    <option value="CSE-1">CSE (1st Shift)</option>
                                    <option value="CSE-2">CSE (2nd Shift)</option>
                                    <option value="IT-1">IT (1st Shift)</option>
                                    <option value="IT-2">IT (2nd Shift)</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="AS">Applied Sciences</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Grievance Category *</label>
                                <select required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white">
                                    <option value="">Select Category</option>
                                    <option value="Academic">Academic / Marks / Attendance</option>
                                    <option value="Fee">Fee Payment / Security Deposit</option>
                                    <option value="Infrastructure">Laboratory / Library / Canteen</option>
                                    <option value="Harassment">Harassment / Discrimination</option>
                                    <option value="Other">Other Institutional Matter</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Student Email *</label>
                                <input type="email" required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white" placeholder="rohan@example.com" />
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mobile Phone *</label>
                                <input type="tel" required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Grievance Subject *</label>
                            <input type="text" required class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white" placeholder="Brief subject line describing your issue" />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Detailed Description *</label>
                            <textarea required rows="4" class="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white" placeholder="Provide complete facts, dates, course codes, or names relevant to your grievance..."></textarea>
                        </div>

                        <button type="submit" class="w-full py-3 bg-white/10 hover:bg-white/10 text-white rounded-xl font-bold uppercase text-xs tracking-wider transition-all active:scale-95 cursor-pointer">
                            Submit Grievance to SGRC Panel
                        </button>
                    </form>
                </section>
            </div>
        `
    },
    "newsletters-magazines": {
        title: "Newsletters & Magazines",
        subtitle: "Stay connected with the latest news, opportunities, achievements, events and publications from across MSIT. Subscribe to what interests you.",
        seo_description: "Access official newsletters, research journals, bulletins, and magazines of Maharaja Surajmal Institute of Technology. Subscribe to updates and download issues.",
        category: "Student Life",
        heroImage: "/campus/library-journals-rack.jpg",
        heroImageAlt: "Journals and magazines on the display rack in the MSIT library",
        content: ""
    }
};

// Aliases for seamless route resolution
campusLifeData["anti-ragging"] = campusLifeData["antiragging"];
campusLifeData["grievance"] = campusLifeData["student-grievance"];
campusLifeData["grievance-cell"] = campusLifeData["student-grievance"];
campusLifeData["student-grievance-cell"] = campusLifeData["student-grievance"];
campusLifeData["student-grievances"] = campusLifeData["student-grievance"];
campusLifeData["disaster-management"] = campusLifeData["disaster"];
campusLifeData["disciplinary-committee"] = campusLifeData["discipline"];
campusLifeData["discipline-committee"] = campusLifeData["discipline"];
