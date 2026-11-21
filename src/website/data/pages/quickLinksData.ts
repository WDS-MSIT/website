import type { PageData } from '../../types';

export const quickLinksData: Record<string, PageData> = {
    "alumni-network": {
        title: "Alumni Network",
        subtitle: "A global community of innovators from Maharaja Surajmal Institute of Technology.",
        seo_description: "Connect with the global alumni network of Maharaja Surajmal Institute of Technology. Network with 15,000+ professionals and leaders across the world.",
        category: "Quick Links",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT global alumni network gathering with professionals and industry leaders",
        content: `
            <div class="space-y-16">
                <!-- Introduction -->
                <section>
                    <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                        Maharaja Surajmal Institute of Technology (MSIT) takes immense pride in its ever-growing family of 15,000+ alumni. Our graduates are leading innovation in top tech companies, founding successful startups, and serving the nation in administrative roles. The <strong>Alumni Network</strong> serves as a bridge between the institute and its graduates, fostering a lifelong bond of mutual growth and support.
                    </p>
                </section>

                <!-- Core Pillars -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">Core Pillars</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-blue-600">🤝</span> Mentorship
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Seniors provide valuable guidance to current students regarding career paths, higher education, and industry expectations.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-emerald-600">🌐</span> Networking
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Regular meets and digital platforms facilitate peer-to-peer networking among professionals across diverse industries.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-amber-600">💼</span> Job Referrals
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">A dedicated channel where alumni share job opportunities and refer talented MSITians within their organizations.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-purple-600">🎁</span> Giving Back
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Alumni contribute to the development of the institute through guest lectures, funding projects, and curriculum advice.</p>
                        </div>
                    </div>
                </section>

                <!-- Global Presence -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8">Global Footprint</h3>
                    <p class="text-sm text-slate-600 mb-6 leading-relaxed">Our alumni are making their mark in leading global organizations, including:</p>
                    <div class="flex flex-wrap gap-3">
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Google</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Microsoft</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Amazon</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Meta</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">ISRO</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">UPSC / Civil Services</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Major Startups</span>
                    </div>
                </section>

                <!-- Events -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">Alumni Engagement</h3>
                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <span class="text-blue-600 text-xl">🏠</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900">Annual Alumni Meet</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">The flagship 'Homecoming' event held every winter, where batches from across decades reunite on campus.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <span class="text-blue-600 text-xl">🎙️</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900">Expert Lectures</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">Regular interactive sessions where alumni share their journey and technological expertise with current students.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Verified Case Studies -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">Alumni Success Case Studies</h3>
                    <div class="grid grid-cols-1 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <div class="flex justify-between items-start gap-4 mb-3">
                                <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded text-[10px] uppercase tracking-wider border border-emerald-200">National Defense Achievement</span>
                                <span class="text-xs font-bold text-slate-400">Batch: 2019–2023</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-base mb-1">Kartikay Arya</h4>
                            <p class="text-xs text-blue-600 font-bold mb-3">B.Tech. Computer Science & Engineering (2nd Shift) | Indian Navy</p>
                            <p class="text-sm text-slate-600 leading-relaxed font-light">Secured <strong>All India Rank 1 (AIR-1)</strong> in the SSC Navy examination upon graduating from MSIT.</p>
                        </div>

                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <div class="flex justify-between items-start gap-4 mb-3">
                                <span class="px-2.5 py-0.5 bg-blue-50 text-blue-800 font-bold rounded text-[10px] uppercase tracking-wider border border-blue-200">Entrepreneurship & Support</span>
                                <span class="text-xs font-bold text-slate-400">Batch: 2015–2019</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-base mb-1">Varun Bansal</h4>
                            <p class="text-xs text-blue-600 font-bold mb-3">B.Tech. Electronics & Communication Engineering | Elegance Spark Innovation</p>
                            <p class="text-sm text-slate-600 leading-relaxed font-light">Founder of Elegance Spark Innovation. Sponsored the NCI-TIDE 2025 national conference at MSIT, officially noted as reflecting "the enduring bond between mentors and alumni."</p>
                        </div>

                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <div class="flex justify-between items-start gap-4 mb-3">
                                <span class="px-2.5 py-0.5 bg-purple-50 text-purple-800 font-bold rounded text-[10px] uppercase tracking-wider border border-purple-200">Fintech Engineering</span>
                                <span class="text-xs font-bold text-slate-400">Batch: 2019–2023 / 2021–2025</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-base mb-1">Prasanjeet Parasar & Saransh Kapoor</h4>
                            <p class="text-xs text-blue-600 font-bold mb-3">B.Tech. Computer Science & Engineering | ION</p>
                            <p class="text-sm text-slate-600 leading-relaxed font-light">Leading software engineers at fintech firm ION. Actively mentor current students on resume grinding, stakeholder evaluations, and fintech culture rounds.</p>
                        </div>
                    </div>
                </section>

                <!-- Registration -->
                <section class="p-8 bg-slate-900 rounded-3xl text-white">
                    <h3 class="text-2xl font-bold mb-4">Register as an Alumnus</h3>
                    <p class="text-slate-300 mb-8 leading-relaxed">Join the official alumni portal to stay updated with institutional news, events, and job referrals.</p>
                    <a href="#" class="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-all">
                        Join the Network
                    </a>
                </section>
            </div>
        `,
        stats: [
            { label: "Global Alumni", value: "15,000+" },
            { label: "Top Tech Hires", value: "2,000+" }
        ],
        bulletPoints: [
            { label: "Mentorship Program", detail: "Connect 1-on-1 with distinguished MSIT alumni working at Google, Microsoft, Amazon, and leading global investment banks for resume reviews and interview preparation.", url: "/alumni-network" },
            { label: "Annual Homecoming", detail: "Yearly reunion celebrating silver jubilee batches, alumni achievement awards, and networking sessions bridging past and present students.", url: "/alumni-network" },
            { label: "Digital Directory", detail: "Searchable verified alumni database allowing graduates worldwide to connect by graduation year, engineering discipline, and current company.", url: "/alumni-network" },
            { label: "Job Referral Hub", detail: "Internal career referral portal where senior alumni directly share open vacancies, internship tracks, and fast-track hiring referrals.", url: "/alumni-network" }
        ]
    },
    "society-ieee": {
        title: "IEEE MSIT",
        subtitle: "Advancing technology for humanity at Maharaja Surajmal Institute of Technology.",
        seo_description: "Learn about IEEE MSIT, the premier technical society of Maharaja Surajmal Institute of Technology. Explore workshops, hackathons, and global tech recognition.",
        category: "Student Societies",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "IEEE MSIT student branch members collaborating on a hardware project",
        content: `
            <div class="space-y-16">
                <!-- Introduction -->
                <section>
                    <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                        Established in 2009, <strong>IEEE MSIT</strong> is a prominent student branch of IEEE, aimed at advancing the technical skills, career prospects, and professional network of MSIT students. The branch provides numerous opportunities for undergraduates to enhance their practical knowledge and skills in various technical domains.
                    </p>
                </section>

                <!-- Chapters & Affinity Groups -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">Chapters & Affinity Groups</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">Computer Society (CS)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Focuses on CS fundamentals and emerging tech like Data Mining, Networking, Web Dev, and AR.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">Power & Energy Society (PES)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Explores the world of electrical power, practical projects like solar systems, and automation.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">Robotics & Automation Society (RAS)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Nurtures interest in robotics through antenna fabrication, Arduino workshops, and hardware projects.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">Women in Engineering (WiE)</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Empowers women in tech through the STAR initiative and social awareness programs.</p>
                        </div>
                    </div>
                </section>

                <!-- SIGs -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8">Special Interest Groups (SIGs)</h3>
                    <div class="flex flex-wrap gap-3">
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Cloud Computing (AWS/ELB)</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">DSA & Problem Solving</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Placement Preparation</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Python & Data Science</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Prototyping & Soldering</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">GSoC Mentorship</span>
                        <span class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Internet of Things (IoT)</span>
                    </div>
                </section>

                <!-- Activities -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">Major Activities</h3>
                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <span class="text-blue-600 text-xl">🚀</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900">Workshops & Hackathons</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">Regular sessions on Android/Web dev, Robotics, and AR to bridge the academic-industry gap.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <span class="text-blue-600 text-xl">🏆</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900">Annual Tech Fest - AVENSIS</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">Members play critical roles in organizing the flagship tech-fest, featuring coding marathons and innovation showcases.</p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <span class="text-blue-600 text-xl">💡</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900">IEEE Day Celebrations</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">Yearly celebrations featuring talks from industry leaders, alumni, and veteran researchers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Achievements -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">International & Regional Recognition</h3>
                    <div class="space-y-4 text-sm text-slate-600">
                        <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <strong>Outstanding Student Branch Award 2023</strong>: Ranked as the top branch in the Asia Pacific (R10) region.
                        </div>
                        <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <strong>PES R10 Excellence</strong>: Ranked #17 in the Asia-Pacific region and #1 in the Delhi Section.
                        </div>
                        <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <strong>Darrel Chong Award</strong>: Received consistently in 2023 and 2024 for impact-driven student activities.
                        </div>
                    </div>
                </section>

                <!-- Leadership -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 mb-8">Leadership Team</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-sm font-bold text-slate-900">Dr. Anupama Kaushik</div>
                            <div class="text-xs text-slate-500">Branch Counselor</div>
                        </div>
                        <div class="text-center">
                            <div class="text-sm font-bold text-slate-900">Shaurya Mishra</div>
                            <div class="text-xs text-slate-500">Chairperson</div>
                        </div>
                        <div class="text-center">
                            <div class="text-sm font-bold text-slate-900">Ishika Garg</div>
                            <div class="text-xs text-slate-500">Vice Chairperson</div>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Established", value: "2009" },
            { label: "R10 Rank", value: "#1" }
        ],
    },
    "attendance": {
        title: "Attendance Rules",
        subtitle: "Official guidelines and criteria for academic attendance compliance at MSIT.",
        seo_description: "Learn about the official B.Tech academic attendance requirements, relaxation criteria, medical provisions, and detention policies at Maharaja Surajmal Institute of Technology.",
        category: "Quick Links",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT campus bulletin board with official academic circulars and attendance guidelines",
        content: `
            <div class="space-y-16">
                <!-- Introduction -->
                <section>
                    <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                        At Maharaja Surajmal Institute of Technology (MSIT), regular attendance is considered a fundamental aspect of academic discipline and learning. In compliance with the ordinances of <strong>Guru Gobind Singh Indraprastha University (GGSIPU)</strong>, students are required to maintain a high level of attendance in both lectures and practical labs to remain eligible for university examinations.
                    </p>
                </section>

                <!-- Core Attendance Policy -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">Core Policy Ordinance</h3>
                    <div class="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl mb-8">
                        <h4 class="font-extrabold text-blue-900 mb-3 flex items-center gap-2">
                            <span>📌</span> The 75% Requirement
                        </h4>
                        <p class="text-sm text-slate-700 leading-relaxed">
                            Under GGSIPU Ordinance 11, every student is expected to attend <strong>not less than 75%</strong> of the total classes held in each subject (including lectures, tutorials, and practicals) in each semester. Falling below this threshold without approved reasons leads to direct disqualification from semester end-term examinations.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-red-500">⚠️</span> Detention Policy
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Students with attendance less than 75% in a semester will be placed on the Detained List. Detained students will not be allowed to sit for internal or external exams for those subjects.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-emerald-500">📊</span> Monthly Monitoring
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Attendance sheets are updated and published on notice boards and the student portal by the first week of every month to keep students informed.</p>
                        </div>
                    </div>
                </section>

                <!-- Relaxation and Leaves -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8">Relaxation & Leave Provisions</h3>
                    <p class="text-slate-600 text-sm mb-6 leading-relaxed">
                        The institute allows a maximum relaxation of <strong>up to 10%</strong> (minimum threshold reduced to 65%) under special circumstances, subject to prior approval and genuine supporting documents:
                    </p>
                    
                    <div class="space-y-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-blue-600">🩺</span> Medical Grounds
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed mb-4">
                                In case of severe illness, hospitalization, or medical emergency, students must submit a formal application along with a valid Medical Certificate, prescription slips, and fitness certificate issued by a registered medical practitioner.
                            </p>
                            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">Submit within 5 days of resuming classes</span>
                        </div>

                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-blue-600">🏆</span> Official Duty Leaves (OD)
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed mb-4">
                                Students representing MSIT in university-approved sports matches, national hackathons, technical conferences, or official cultural festivals can apply for Duty Leaves. The leave must be recommended by the faculty coordinator and approved by the HOD.
                            </p>
                            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Requires prior formal approval</span>
                        </div>
                    </div>
                </section>

                <!-- Procedures -->
                <section class="p-8 bg-slate-900 rounded-3xl text-white">
                    <h3 class="text-2xl font-bold mb-4">Procedure for Submitting Leave Applications</h3>
                    <ol class="list-decimal list-inside space-y-4 text-slate-300 text-sm leading-relaxed mb-8">
                        <li>Obtain the standard attendance leave application form from your respective Department office.</li>
                        <li>Attach the required supporting credentials (original medical bills, certificates, or duty certificates).</li>
                        <li>Get the application signed by your class mentor/counselor and submit it to the HOD's office for approval.</li>
                        <li>Verify that the status is updated on the online student ERP portal once approved.</li>
                    </ol>
                    <div class="flex gap-4">
                        <a href="/brochure" class="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-all">
                            View Information Bulletin
                        </a>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Required Minimum", value: "75%" },
            { label: "Medical Buffer", value: "Up to 10%" },
            { label: "Update Frequency", value: "Monthly" }
        ],
        bulletPoints: [
            { label: "IP University Ordinance 11", detail: "Mandates minimum 75% aggregate classroom and lab attendance to be eligible to appear in the end-term semester examinations.", url: "/attendance" },
            { label: "Medical Certificate Policy", detail: "Submission of government-hospital medical fitness certificates within 3 working days to claim condonation of absence up to 5%.", url: "/attendance" },
            { label: "Official Duty Leaves (OD)", detail: "Attendance consideration for students officially representing MSIT at university tournaments, national hackathons, and paper presentations.", url: "/attendance" },
            { label: "Detained List Penalties", detail: "Consequences of attendance falling below 70% leading to debarment from end-term examinations and mandatory semester repetition.", url: "/attendance" }
        ]
    },
    "society-ndli": {
        title: "MSIT NDLI Club",
        subtitle: "Strength through Collaboration",
        seo_description: "Learn about the MSIT NDLI Club, promoting digital literacy, lifelong learning, and knowledge sharing through the National Digital Library of India.",
        category: "Student Societies",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT NDLI Club events and resources",
        content: `
            <div class="space-y-16">
                <!-- Introduction -->
                <section>
                    <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                        The National Digital Library of India (NDLI) is a digital initiative sponsored by the Ministry of Education, Government of India, and developed by IIT Kharagpur. The <strong>MSIT NDLI Club</strong> was established at Maharaja Surajmal Institute of Technology in April 2021 to promote digital learning and knowledge sharing.
                    </p>
                </section>

                <!-- About the Society -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">About the Society</h3>
                    <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
                        <p>NDLI and NDLI Club are initiatives under the Ministry of Education, Government of India, through the National Mission on Education through Information and Communication Technology (NMEICT).</p>
                        <p>MSIT is a member of both NDLI and NDLI Club. NDLI provides access to extensive digital learning resources, while the NDLI Club promotes their effective utilization through competitions, training sessions, workshops, and other learning activities.</p>
                        <p>Students can participate in NDLI Club activities and generate event participation certificates through the NDLI Club platform.</p>
                    </div>
                </section>

                <!-- Mission & Vision -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">Mission & Vision</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-emerald-600">🎯</span> Mission
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">To promote digital literacy, lifelong learning, and knowledge sharing by providing students easy access to NDLI resources and opportunities for learning beyond the regular curriculum. The Club aims to foster academic excellence, research, innovation, creativity, and professional skills.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-blue-600">🔭</span> Vision
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">To empower students with digital skills and easy access to learning and research resources. It serves as a central platform for registering and managing Institute events, promoting systematic event planning, documentation, transparency, and coordination.</p>
                        </div>
                    </div>
                </section>

                <!-- Event Registration Process -->
                <section class="p-8 bg-blue-50/50 border border-blue-100 rounded-3xl">
                    <h3 class="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <span>📝</span> Event Registration Process
                    </h3>
                    <p class="text-slate-700 text-sm mb-6 leading-relaxed">
                        All students, student societies, clubs, and event coordinators are hereby informed that <strong>all events/activities organized at MSIT are required to be registered through the MSIT NDLI Club</strong> for proper documentation, coordination, and creation of a digital repository.
                    </p>
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 class="font-bold text-slate-900 mb-4">Steps for Event Coordinators:</h4>
                        <ol class="list-decimal list-inside space-y-3 text-sm text-slate-600 leading-relaxed">
                            <li>Fill and submit the MSIT Event Application Form.</li>
                            <li>Get it initially signed by the Director (MSIT).</li>
                            <li>Submit the duly filled form to the concerned MSIT NDLI Club authorities (President & Vice President) for further processing.</li>
                            <li>Provide the required event details (poster, date, time, venue, event description).</li>
                            <li>Ensure that the event is registered <em>before</em> its commencement.</li>
                            <li>Ensure to have a minimum of <strong>100 participants</strong> registered via the MSIT NDLI club.</li>
                            <li>Finally, get it signed by the Director MSIT after the completion of the event along with the event report.</li>
                        </ol>
                    </div>
                </section>

                <!-- Activities & Membership -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8">Activities & Offerings</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">Major Activities</h4>
                            <ul class="list-disc list-inside space-y-2 text-sm text-slate-600 leading-relaxed">
                                <li>Organizing workshops, seminars, and training programmes.</li>
                                <li>Conducting physical and virtual events through the NDLI Club platform.</li>
                                <li>Facilitating registration, documentation, and uploading of Institute events.</li>
                                <li>Creating a digital repository of MSIT events.</li>
                            </ul>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">What Students Gain</h4>
                            <ul class="list-disc list-inside space-y-2 text-sm text-slate-600 leading-relaxed">
                                <li>Access to NDLI Digital Resources.</li>
                                <li>Learning and skill development through activities.</li>
                                <li>Participation Certificates for NDLI Club events.</li>
                                <li>Academic and professional growth beyond the curriculum.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Achievements -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-purple-600 pl-4 mb-8">Achievements & Recognition</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-100 rounded-xl flex items-start gap-3">
                            <span class="text-purple-600 text-xl mt-0.5">🏆</span>
                            <div>
                                <h4 class="font-bold text-slate-900 text-sm">NDLI Club Excellence Award (Nov 2025)</h4>
                                <p class="text-xs text-slate-600 leading-relaxed mt-1">Selected among the Top 11 Performing NDLI Clubs in India for 2024–2025. Received at the 4th International Symposium on Knowledge Engineering for Digital Library Design (KEDLD-2025) by IIT Kharagpur.</p>
                            </div>
                        </div>
                        <div class="p-4 bg-purple-50 border border-purple-100 rounded-xl flex items-start gap-3">
                            <span class="text-purple-600 text-xl mt-0.5">🏅</span>
                            <div>
                                <h4 class="font-bold text-slate-900 text-sm">Certificate of Appreciation (Aug 2023)</h4>
                                <p class="text-xs text-slate-600 leading-relaxed mt-1">Adjudged as One of the Best Performing NDLI Clubs in Delhi, India by IIT Kharagpur, Ministry of Education.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Leadership -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 mb-8">Contact & Leadership</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center p-4">
                            <div class="text-sm font-bold text-slate-900">Dr. Reetu Verma & Dr. Nidhi Gupta</div>
                            <div class="text-xs text-slate-500">Faculty Coordinators</div>
                        </div>
                        <div class="text-center p-4">
                            <div class="text-sm font-bold text-slate-900">Ms. Disha</div>
                            <div class="text-xs text-slate-500">President (Student)</div>
                        </div>
                        <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div class="text-xs text-slate-500 mb-1">Contact Details</div>
                            <div class="text-sm font-bold text-blue-600 truncate">ndliclub@msit.in</div>
                            <div class="text-xs font-bold text-slate-700 mt-1">9971079829</div>
                            <div class="text-xs text-slate-500 mt-2">Maharaja Surajmal Central Library</div>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Established", value: "2021" },
            { label: "India Rank (2025)", value: "Top 11" }
        ],
        bulletPoints: [
            { 
                label: "Event Registration Portal", 
                detail: "Register for upcoming National Digital Library of India (NDLI) Club reading challenges, literary quizzes, and scholarly workshops.",
                url: "https://ndl.iitkgp.ac.in/",
                actionText: "Open NDLI Portal"
            },
            { 
                label: "NDLI Resources", 
                detail: "Access millions of digitized academic books, research articles, thesis papers, and video lectures curated by IIT Kharagpur.",
                url: "https://ndl.iitkgp.ac.in/",
                actionText: "Explore Digital Archives"
            },
            { 
                label: "Participation Certificates", 
                detail: "All active participants in NDLI workshops, book reviews, and national competitions receive verified e-certificates endorsed by IIT Kharagpur and MSIT."
            },
            { 
                label: "Skill Development Workshops", 
                detail: "Hands-on training sessions covering academic research methodology, digital archive indexing, reference management, and open-access scholarly journals."
            }
        ]
    },
    "society-geekroom": {
        title: "GeekRoom MSIT",
        subtitle: "Where Geeks Belong",
        seo_description: "Geek Room MSIT is the founding chapter of one of India's largest student-led tech communities. Join us for hackathons, coding competitions, and workshops.",
        category: "Technical Societies",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Geek Room MSIT hackathons and coding events",
        content: `
            <div class="space-y-16">
                <!-- Introduction -->
                <section>
                    <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                        Geek Room MSIT is the founding chapter of <strong>Geek Room</strong> — one of India's largest student-led tech communities — bringing together developers, designers, and innovators at Maharaja Surajmal Institute of Technology through hackathons, workshops, and hands-on tech events.
                    </p>
                </section>

                <!-- About the Society -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 mb-8">The Founding Legacy</h3>
                    <div class="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
                        <p>Geek Room began in 2023 right here at MSIT, as a small WhatsApp group of like-minded tech enthusiasts started by three students — Manas, Arnav, and Pratham. What started as an informal circle of people who just wanted to build, learn, and geek out together has since grown into a nationwide community of over 50,000 members, with chapters across multiple colleges in India.</p>
                        <p>As the original chapter, Geek Room MSIT carries that founding legacy forward on campus — organizing hackathons, coding competitions, tech talks, workshops, and networking sessions that give students real, hands-on exposure to the tech industry.</p>
                        <p>The society is a space for anyone curious about technology, regardless of year or branch, to learn by doing, collaborate on projects, and build a portfolio and network that extends well beyond college.</p>
                    </div>
                </section>

                <!-- Mission & Vision -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-emerald-600 pl-4 mb-8">Mission & Vision</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-emerald-600">🎯</span> Mission
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">To connect like-minded people in tech and give every student at MSIT a space to learn, build, and grow together — through hands-on events, real projects, and a community that has each other's back.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span class="text-blue-600">🔭</span> Vision
                            </h4>
                            <p class="text-sm text-slate-600 leading-relaxed">To be the launchpad where every MSIT student's tech journey begins — carrying forward Geek Room's founding legacy of building India's largest, most impactful student tech community, one hackathon and one idea at a time.</p>
                        </div>
                    </div>
                </section>

                <!-- Recruitment & Membership -->
                <section class="p-8 bg-blue-50/50 border border-blue-100 rounded-3xl">
                    <div class="flex flex-col md:flex-row gap-8 items-start">
                        <div class="flex-1">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">
                                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                Recruitment Open
                            </div>
                            <h3 class="text-2xl font-bold text-slate-900 mb-4">Think. Build. Create. Lead.</h3>
                            <p class="text-sm text-slate-600 leading-relaxed mb-4">
                                We're looking for students who are curious, passionate, and willing to learn, build, and contribute. Whether you're into DSA, Development, Emerging Technologies, Marketing & PR, or creative and interdisciplinary work, there's a place for you here.
                            </p>
                            <p class="text-sm text-slate-600 leading-relaxed font-semibold">
                                No prior experience is required. What matters is your willingness to learn, take initiative, and contribute to the community. Open to First, Second, and Third-year students!
                            </p>
                        </div>
                        <div class="w-full md:w-auto shrink-0 pt-4 md:pt-0 md:pl-8 md:border-l border-blue-100">
                            <a href="https://forms.gle/4XZTPfbjwJhNuhzq9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                Apply Now
                            </a>
                        </div>
                    </div>
                </section>

                <!-- Activities & What You Learn -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4 mb-8">What We Do</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">Major Activities</h4>
                            <ul class="list-disc list-inside space-y-2 text-sm text-slate-600 leading-relaxed">
                                <li>Technical workshops on AI/ML, Web, and App Dev.</li>
                                <li>Career-guidance sessions mapping tech career tracks.</li>
                                <li>High-quality hackathons and coding competitions.</li>
                                <li>Networking sessions with seniors, alumni, and industry speakers.</li>
                            </ul>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-card">
                            <h4 class="font-bold text-slate-900 mb-3">What You Gain</h4>
                            <ul class="list-disc list-inside space-y-2 text-sm text-slate-600 leading-relaxed">
                                <li>Practical, project-based exposure to in-demand skills.</li>
                                <li>Hackathon experience: building and pitching a project.</li>
                                <li>Professional network spanning MSIT alumni and industry mentors.</li>
                                <li>Clarity on career direction through tailored guidance sessions.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Events & Achievements -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-purple-600 pl-4 mb-8">Events & Highlights</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                            <h4 class="font-bold text-slate-900 text-sm mb-2 text-purple-700">Upcoming: GEEKROOM MEETUP</h4>
                            <p class="text-xs text-slate-600 leading-relaxed">Stay tuned on our social media for the exact date, venue, and registration links for our next big meetup!</p>
                        </div>
                        
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3">
                            <h4 class="font-bold text-slate-900 text-sm">Major Past Events</h4>
                            <div class="space-y-3">
                                <div>
                                    <h5 class="text-xs font-bold text-slate-800">Geek Insights (April 2024)</h5>
                                    <p class="text-xs text-slate-600 leading-relaxed">A career-guidance event at MSIT walking B.Tech students through tech career tracks: web development, app development, AI/ML, open-source, and DSA. Drew ~120 participants.</p>
                                </div>
                                <div>
                                    <h5 class="text-xs font-bold text-slate-800">AI Basics Seminar for IT (Sept 2024)</h5>
                                    <p class="text-xs text-slate-600 leading-relaxed">Run jointly with MSIT's IT Department, covering AI/ML/deep learning fundamentals and AI career pathways. Drew ~140 participants.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- FAQs -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-orange-500 pl-4 mb-8">Frequently Asked Questions</h3>
                    <div class="space-y-4">
                        <details class="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-slate-900">
                                <span>What is Geek Room MSIT?</span>
                                <span class="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p class="text-slate-600 mt-3 group-open:animate-fadeIn p-4 pt-0 text-sm leading-relaxed">
                                The founding chapter of Geek Room, one of India's largest student-led tech communities, started at MSIT in 2023. It brings students together through hands-on events in coding, AI, and web/app development, and hackathons.
                            </p>
                        </details>
                        <details class="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-slate-900">
                                <span>Who can join? Do I need to know how to code?</span>
                                <span class="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p class="text-slate-600 mt-3 group-open:animate-fadeIn p-4 pt-0 text-sm leading-relaxed">
                                Any MSIT student, from any year or branch can join. No prior coding experience needed! Several flagship events are built specifically to help students discover a tech track and build fundamentals from zero.
                            </p>
                        </details>
                        <details class="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 text-slate-900">
                                <span>Is Geek Room MSIT connected to the larger Geek Room community?</span>
                                <span class="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p class="text-slate-600 mt-3 group-open:animate-fadeIn p-4 pt-0 text-sm leading-relaxed">
                                Yes. As the founding chapter, MSIT members get direct access to Geek Room's national network of 50,000+ members and its chapters at other colleges.
                            </p>
                        </details>
                    </div>
                </section>

                <!-- Leadership & Contact -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 mb-8">Contact, Leadership & Alumni</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div class="text-sm font-bold text-slate-900">Prof. Rinki Dwivedi</div>
                            <div class="text-xs text-slate-500">Faculty Coordinator</div>
                        </div>
                        <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div class="text-sm font-bold text-slate-900">Jagriti Rai</div>
                            <div class="text-xs text-slate-500">President (Student)</div>
                        </div>
                        <div class="text-center p-4 bg-blue-50 rounded-xl border border-blue-100 lg:col-span-2">
                            <div class="text-xs text-slate-500 mb-1">Contact Us</div>
                            <div class="text-sm font-bold text-blue-600">team@geekroom.in</div>
                            <div class="text-xs font-bold text-slate-700 mt-1">9518844615</div>
                            <div class="text-xs font-bold text-slate-700 mt-1"><a href="https://geekroom.co.in" target="_blank" class="hover:underline">geekroom.co.in</a></div>
                        </div>
                    </div>
                    
                    <div class="bg-slate-50 rounded-xl border border-slate-100 p-6">
                        <h4 class="font-bold text-slate-900 mb-4">Founders & Notable Alumni</h4>
                        <div class="flex flex-wrap gap-3">
                            <a href="https://linkedin.com/in/themanasai" target="_blank" class="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors">Manas Chopra</a>
                            <a href="https://www.linkedin.com/in/akshay-kumar-sharma-37aa55256/" target="_blank" class="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors">Akshay Kumar Sharma</a>
                            <a href="https://www.linkedin.com/in/pratham1908" target="_blank" class="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors">Pratham Batra</a>
                            <a href="https://www.linkedin.com/in/arnav-gupta-437a66256" target="_blank" class="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors">Arnav Gupta</a>
                        </div>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Established", value: "2023" },
            { label: "Network Members", value: "50,000+" }
        ],
        bulletPoints: [
            {
                label: "Founding Chapter",
                detail: "MSIT is the birthplace of Geek Room, growing from a campus coding club into an all-India developer network of 50,000+ engineers.",
                url: "https://geekroom.co.in",
                actionText: "Visit Geek Room Community"
            },
            {
                label: "Hackathons & Competitions",
                detail: "Organizes flagship hackathons including HackMSIT, Code-a-Thon, and algorithmic problem-solving sprint contests with cash prizes and sponsor bounties.",
                url: "/events",
                actionText: "View Campus Events"
            },
            { 
                label: "Official Website", 
                detail: "Explore Geek Room initiatives, upcoming national hackathons, partner sponsor networks, and student community perks.",
                url: "https://geekroom.co.in",
                actionText: "Open Website"
            },
            { 
                label: "Instagram", 
                detail: "Follow @geekroom_msit for live event announcements, hackathon recaps, photo galleries, and member highlights.",
                url: "https://www.instagram.com/geekroom_msit/",
                actionText: "Visit Instagram"
            }
        ]
    },
    "society-ecell": {
        title: "eCell & Incubation Cell MSIT",
        subtitle: "Fostering innovation, student startups, and entrepreneurial leadership at MSIT.",
        seo_description: "Explore eCell and Incubation Cell at MSIT. Learn about campus startups, incubator facilities in Lab 218, pitch competitions, and startup mentorship.",
        category: "Student Societies",
        heroImage: "/campus/ecell-noticeboard-entrance.webp",
        heroImageAlt: "eCell MSIT noticeboard and incubation cell entrance",
        content: `
            <div class="space-y-12">
                <section>
                    <p class="text-lg text-slate-600 leading-relaxed">
                        Established in 2014, <strong>eCell & Incubation Cell MSIT</strong> is the premier entrepreneurial hub at Maharaja Surajmal Institute of Technology, operating under the National Innovation and Startup Policy (NISP) framework.
                    </p>
                </section>
            </div>
        `,
        stats: [
            { label: "Established", value: "2014" },
            { label: "MoU Partners", value: "20+" }
        ],
        bulletPoints: [
            {
                label: "Startup Incubation (Lab 218)",
                detail: "Dedicated co-working and prototyping space inside Lab 218 equipped with high-speed internet, conference facilities, and cloud credits for MSIT student founders."
            },
            {
                label: "Envisage Entrepreneurship Fest",
                detail: "Annual flagship entrepreneurship summit featuring investor pitch days, startup bootcamps, Shark Tank style simulations, and founder keynotes.",
                url: "/events",
                actionText: "Explore Annual Fests"
            },
            {
                label: "Hult Prize MSIT Chapter",
                detail: "On-campus edition of the prestigious global student social entrepreneurship challenge tackling UN Sustainable Development Goals."
            },
            { 
                label: "Official eCell Website", 
                detail: "Official portal of the Entrepreneurship & Incubation Cell at MSIT featuring upcoming E-Summits, startup incubations, pitch sessions, and founder network.",
                url: "https://www.ecellmsit.in/",
                actionText: "Visit ecellmsit.in"
            },
            { 
                label: "NISP Portal", 
                detail: "National Innovation and Startup Policy guidelines facilitating student intellectual property protection, venture incubation, and faculty mentoring.",
                url: "https://nisp.msit.in",
                actionText: "Open NISP Portal"
            }
        ]
    },
    "society-uba": {
        title: "Unnat Bharat Abhiyan (UBA) Cell MSIT",
        subtitle: "Transforming Rural India Through Knowledge and Innovation.",
        seo_description: "Learn about Unnat Bharat Abhiyan Cell at MSIT. Discover social initiatives, village development plans, and community outreach across adopted villages.",
        category: "Student Societies",
        heroImage: "/campus/student-gathering-courtyard.webp",
        heroImageAlt: "UBA MSIT student volunteers gathered in campus courtyard",
        content: `
            <div class="space-y-12">
                <section>
                    <p class="text-lg text-slate-600 leading-relaxed">
                        The <strong>Unnat Bharat Abhiyan (UBA) Cell</strong> at MSIT is a flagship initiative under the Ministry of Education, connecting higher education with rural community development across 5 adopted villages.
                    </p>
                </section>
            </div>
        `,
        stats: [
            { label: "Established", value: "2018" },
            { label: "Adopted Villages", value: "5" }
        ],
        bulletPoints: [
            {
                label: "Village Baseline Surveys",
                detail: "Comprehensive door-to-door socio-economic and infrastructural surveys conducted across 5 adopted rural villages around Delhi-NCR."
            },
            {
                label: "Rural Technical Interventions",
                detail: "Engineering projects deploying low-cost solar lighting, water quality monitoring, and waste management technologies in rural communities."
            },
            {
                label: "Gram Sabha Engagement",
                detail: "Regular participatory planning sessions with village panchayat councils and local leaders to co-create sustainable development solutions."
            },
            { 
                label: "UBA National Portal", 
                detail: "Flagship program under the Ministry of Education connecting higher education institutions with rural India to identify development challenges.",
                url: "https://unnatbharatabhiyan.gov.in",
                actionText: "Visit National Portal"
            }
        ]
    },
    "society-spark": {
        title: "SPARK Research Hub MSIT",
        subtitle: "Student Platform for Advancement, Research & Knowledge.",
        seo_description: "Discover SPARK, the student research and think tank hub at MSIT. Learn about research mentorship, IEEE and Scopus paper publishing, and grant guidance.",
        category: "Student Societies",
        heroImage: "/campus-lab.webp",
        heroImageAlt: "Students working on research and engineering experiments in laboratory",
        content: `
            <div class="space-y-12">
                <section>
                    <p class="text-lg text-slate-600 leading-relaxed">
                        Founded in 2025, <strong>SPARK (Student Platform for Advancement, Research & Knowledge)</strong> is MSIT's dedicated research think tank promoting student paper publishing, grant writing, and academic innovation.
                    </p>
                </section>
            </div>
        `,
        stats: [
            { label: "Established", value: "2025" },
            { label: "Indexed Papers", value: "30+" }
        ],
        bulletPoints: [
            {
                label: "Research Mentorship & Labs",
                detail: "Faculty-guided research clusters assisting undergraduate students in formulating research problem statements and conducting lab experiments.",
                url: "/research",
                actionText: "Visit Research Department"
            },
            {
                label: "LaTeX & Paper Writing Workshops",
                detail: "Structured bootcamps teaching students scientific typesetting in Overleaf/LaTeX, citation management with Zotero/Mendeley, and journal formatting."
            },
            {
                label: "Scopus & IEEE Indexing",
                detail: "Targeted peer-review assistance helping students publish papers in Q1/Q2 Scopus journals and prestigious IEEE conference proceedings."
            },
            {
                label: "Research Travel Grants",
                detail: "Funding support provided by MSIT and AICTE schemes for students presenting accepted papers at national and international conferences."
            }
        ]
    },
    "iic": {
        title: "Institution's Innovation Council (IIC MSIT)",
        subtitle: "Promoting innovation, ideation, and student entrepreneurship under MoE Innovation Cell guidelines at MSIT.",
        seo_description: "Explore the Institution's Innovation Council (IIC) at Maharaja Surajmal Institute of Technology. Discover 4-star MHRD recognition, hackathons, ideation challenges, and startup mentorship.",
        category: "Student Societies",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT students working on innovation projects and hackathons under Institution's Innovation Council",
        content: `
            <div class="not-prose my-2">
                <div class="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                    <div class="relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
                            Ministry of Education (MoE) Innovation Cell
                        </div>
                        <h3 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">IIC MSIT</h3>
                        <p class="text-slate-600 text-lg leading-relaxed mb-6">
                            Institution Innovation Council of MSIT is established under the directions of the Ministry of Education (MoE), Govt. of India, to promote innovation and entrepreneurship in the institution through multitudinous modes leading to an innovation promotion ecosystem across the campus.
                        </p>
                        
                        <div class="mb-8">
                            <h4 class="text-xl font-bold text-slate-800 mb-3">Mission & Activities</h4>
                            <p class="text-slate-600 leading-relaxed">
                                We conduct various innovation and entrepreneurship-related activities to identify and reward innovations while sharing success stories. We organize periodic workshops, seminars, and interactions with entrepreneurs, investors, and professionals, creating a robust mentor pool for student innovators. 
                            </p>
                            <p class="text-slate-600 leading-relaxed mt-3">
                                Through active networking with national entrepreneurship development bodies, IIC organizes Hackathons, idea competitions, and mini-challenges with active involvement from student chapters including IEEE, E-Cell, Arambh, TechSoc, Octave, and Prakriti.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all group/card cursor-default">
                                <div class="mb-4 text-amber-500">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                </div>
                                <h4 class="text-slate-900 font-bold mb-2">MHRD Recognition</h4>
                                <p class="text-sm text-slate-500">Awarded 4 Golden Stars by the Ministry of Education's Innovation Cell (MIC).</p>
                            </div>
                            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all group/card cursor-default">
                                <div class="mb-4 text-blue-500">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h4 class="text-slate-900 font-bold mb-2">Global Achievements</h4>
                                <p class="text-sm text-slate-500">1st Prize at UNESCO India-Africa Hackathon 2022 (Monalika Kapoor).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        sidebarHtml: `
            <div class="flex flex-col gap-4">
                <a href="https://iic.msit.in/" target="_blank" rel="noopener noreferrer" class="block w-full bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 text-center font-bold py-4 rounded-xl transition-all shadow-sm">
                    Visit Official IIC Portal &rarr;
                </a>
                
                <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Core Activities</h4>
                    <ul class="space-y-4">
                        <li class="flex gap-3 text-sm text-slate-700"><span class="text-blue-500 font-bold">✓</span> Hackathons & Idea Competitions</li>
                        <li class="flex gap-3 text-sm text-slate-700"><span class="text-blue-500 font-bold">✓</span> Innovation Workshops</li>
                        <li class="flex gap-3 text-sm text-slate-700"><span class="text-blue-500 font-bold">✓</span> Investor Seminars</li>
                        <li class="flex gap-3 text-sm text-slate-700"><span class="text-blue-500 font-bold">✓</span> Mentorship Pool</li>
                    </ul>
                </div>

                <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Leadership</h4>
                    <p class="text-xs text-slate-500">Convener</p>
                    <p class="text-sm font-bold text-slate-900">Dr. Sudesh Pahal</p>
                    <p class="text-xs text-slate-600 mt-1">HOD & Associate Professor (ECE)</p>
                    <a href="/faculty?search=Sudesh+Pahal" class="inline-block mt-2 text-xs font-bold text-blue-600 hover:underline">View Faculty Profile &rarr;</a>
                </div>
            </div>
        `,
        stats: [
            { label: "Star Rating", value: "4-Star (MHRD)" },
            { label: "Annual Hackathons", value: "15+" }
        ],
        bulletPoints: [
            {
                label: "Ministry of Education Mandate",
                detail: "IIC MSIT is an initiative established under MoE's Innovation Cell (Govt. of India) to systematically encourage campus startups, ideation hackathons, technology incubations, and research IPR.",
                url: "https://iic.msit.in/",
                actionText: "Visit Official IIC Portal"
            },
            {
                label: "UNESCO India-Africa Hackathon",
                detail: "MSIT student Monalika Kapoor secured 1st prize at the prestigious international UNESCO India-Africa Hackathon 2022 under the mentorship of IIC faculty."
            },
            {
                label: "Student Chapters Alignment",
                detail: "IIC partners closely with IEEE, E-Cell, GeekRoom, and TechSoc to organize cross-disciplinary innovation challenges and prototype incubations.",
                url: "/society-ecell",
                actionText: "Explore E-Cell Incubation"
            }
        ]
    }
};

// Aliases
quickLinksData["society-iic"] = quickLinksData["iic"];
