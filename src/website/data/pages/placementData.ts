import type { PageData } from '../../types';

export const placementData: Record<string, PageData> = {
    "placements": {
        title: "Careers & Placements",
        subtitle: "Launching careers at top global tech firms from Maharaja Surajmal Institute of Technology.",
        seo_description: "Experience record-breaking placements at Maharaja Surajmal Institute of Technology. Our graduates secure top roles at Google, Microsoft, Amazon, and MAANG.",
        category: "Placements",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT students celebrating successful job placements at top technology firms like Google and Amazon",
        content: `
            <p class="mb-6">The MSIT Placement Cell is highly aggressive and renowned across North India. We consistently achieve placement records exceeding 95%, with students securing software engineering roles at MAANG companies and top tier startups.</p>
            <h3 class="text-2xl font-semibold text-slate-900 mt-10 mb-4">Industry Readiness</h3>
            <p class="mb-6">Beyond bringing companies to campus, the cell organizes intensive technical mock interviews, aptitude training, resume building workshops, and expert sessions on competitive programming.</p>
        `,
        stats: [
            { label: "Highest Package", value: "₹1.2Cr" },
            { label: "Top Recruiters", value: "Google, MS, Amazon" }
        ],
        bulletPoints: [
            { 
                label: "Placement Statistics 2024", 
                detail: "MSIT achieved a 95%+ placement record with 850+ total job offers across premier tech corporations, with the highest international CTC reaching ₹1.2 Crore.",
                url: "/placements",
                actionText: "View Full Placement Stats"
            },
            { 
                label: "Top Recruiters", 
                detail: "Over 250+ top global recruiters participate in MSIT campus hiring drives, including Google, Microsoft, Amazon, Apple, Adobe, Atlassian, and ION Trading.",
                url: "/placements",
                actionText: "Explore Recruiters Directory"
            },
            { 
                label: "Placement Policy", 
                detail: "MSIT follows a student-first 'One Student, One Job' policy with dream tier upgrades for premium offers above 10 LPA and 20 LPA thresholds.",
                url: "/placements",
                actionText: "Read Policy Guidelines"
            }
        ]
    },
    "internship-cell": {
        title: "Industry-Institute Interaction Cell (IIIC) & Internship Cell",
        subtitle: "Bridging academia, industry partnerships, and corporate internships under AICTE guidelines at MSIT.",
        seo_description: "Explore the Industry-Institution-Interaction Cell (IIIC) & Internship Cell at Maharaja Surajmal Institute of Technology (MSIT). Discover AICTE internship portal integration, industry MoUs, summer training, industrial visits, and PPO tracking.",
        category: "Placements",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Engineering interns from MSIT collaborating on industrial software and engineering projects in a corporate setting",
        content: `
            <div class="not-prose my-2">
                <div class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
                    <div>
                        <h3 class="font-[Libre_Baskerville,serif] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">IIIC MSIT</h3>
                        <p class="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                            The <strong>Industry-Institution-Interaction Cell (IIIC) & Internship Cell</strong> at Maharaja Surajmal Institute of Technology is established under the statutory guidelines of the <strong>All India Council for Technical Education (AICTE)</strong>. It serves as the institutional gateway synchronizing academic curricula with corporate engineering practices, cultivating high-value industrial linkages, structured internships, and pre-placement opportunities for undergraduate engineers.
                        </p>
                        
                        <div class="mb-8">
                            <h4 class="text-lg sm:text-xl font-bold text-slate-800 mb-3">Core Mandate & Strategic Objectives</h4>
                            <p class="text-slate-600 leading-relaxed">
                                The primary mission of IIIC is to systematically eliminate the gap between collegiate theoretical instruction and modern enterprise engineering workflows. Through active coordination with corporate leadership, public sector undertakings (PSUs), and tech conglomerates, the cell spearheads comprehensive summer internships, live industrial research projects, sponsored curriculum enrichment, and on-site factory and lab visits.
                            </p>
                            <p class="text-slate-600 leading-relaxed mt-3">
                                IIIC directly manages student registrations and verification on the <strong>National AICTE Internship Portal</strong>, facilitating verified corporate, government, and virtual internships across disciplines with top industry stipends reaching up to ₹1,20,000 per month.
                            </p>
                        </div>

                        <!-- 4 Pillars Grid -->
                        <div class="grid grid-cols-2 gap-2.5 sm:gap-4 my-6 sm:my-8">
                            <div class="bg-slate-50 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all group/card cursor-default">
                                <div class="mb-2 sm:mb-4 text-primary">
                                    <svg class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                </div>
                                <h4 class="text-slate-900 text-sm sm:text-base font-bold leading-snug mb-1 sm:mb-2">AICTE Guidelines & Mandate</h4>
                                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Formally aligned with AICTE internship policies, integrating national credits and digital certifications.</p>
                            </div>
                            <div class="bg-slate-50 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all group/card cursor-default">
                                <div class="mb-2 sm:mb-4 text-primary">
                                    <svg class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <h4 class="text-slate-900 text-sm sm:text-base font-bold leading-snug mb-1 sm:mb-2">10+ Active Corporate MoUs</h4>
                                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Collaborations with AAI, TPDDL, NIELIT, ONGC, Brain Mentors, AI-SHALA, and IoT Academy.</p>
                            </div>
                            <div class="bg-slate-50 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all group/card cursor-default">
                                <div class="mb-2 sm:mb-4 text-primary">
                                    <svg class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <h4 class="text-slate-900 text-sm sm:text-base font-bold leading-snug mb-1 sm:mb-2">68%+ PPO Conversion</h4>
                                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Summer engineering internships actively convert into full-time offers with top multinationals.</p>
                            </div>
                            <div class="bg-slate-50 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all group/card cursor-default">
                                <div class="mb-2 sm:mb-4 text-primary">
                                    <svg class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                                <h4 class="text-slate-900 text-sm sm:text-base font-bold leading-snug mb-1 sm:mb-2">Digital NOC Verification</h4>
                                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Standardized approval protocol ensuring academic credits, attendance, and corporate mentoring.</p>
                            </div>
                        </div>

                        <div class="space-y-4 sm:space-y-6 pt-4 border-t border-slate-100">
                            <h4 class="text-lg sm:text-xl font-bold text-slate-800">Key Functions & Student Services</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="flex gap-3">
                                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true"></span>
                                    <div>
                                        <h5 class="font-bold text-slate-900 text-sm">AICTE Internship Coordination</h5>
                                        <p class="text-xs text-slate-600 mt-0.5">Assisting students in registering, verifying profiles, and securing roles via the National AICTE Internship Portal.</p>
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true"></span>
                                    <div>
                                        <h5 class="font-bold text-slate-900 text-sm">Industrial Field Tours & Visits</h5>
                                        <p class="text-xs text-slate-600 mt-0.5">Organizing periodic industrial excursions to power grids, automation lines, and cloud data centers.</p>
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true"></span>
                                    <div>
                                        <h5 class="font-bold text-slate-900 text-sm">Executive Technical Masterclasses</h5>
                                        <p class="text-xs text-slate-600 mt-0.5">Conducting seminars and interactive masterclasses led by distinguished chief technology officers and industry veterans.</p>
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true"></span>
                                    <div>
                                        <h5 class="font-bold text-slate-900 text-sm">Faculty Industry Upskilling (FDPs)</h5>
                                        <p class="text-xs text-slate-600 mt-0.5">Conducting joint faculty training programs with industry specialists on state-of-the-art developer tooling.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        sidebarHtml: `
            <div class="flex flex-col gap-4">
                <a href="https://internship.aicte-india.org/" target="_blank" rel="noopener noreferrer" class="block w-full bg-primary hover:bg-primary-dark text-white text-center font-bold py-3.5 sm:py-4 rounded-xl transition-colors shadow-sm">
                    AICTE Internship Portal &rarr;
                </a>
                
                <a href="/placements" class="block w-full bg-white border-2 border-slate-300 hover:border-primary hover:text-primary text-slate-700 text-center font-bold py-3.5 rounded-xl transition-all shadow-sm">
                    Placement & T&P Overview &rarr;
                </a>

                <a href="/facilities?tab=labs#industry-mous" class="block w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 text-center font-semibold py-3 rounded-xl transition-all text-sm">
                    View Active Industry MoUs &rarr;
                </a>
                
                <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Cell Administration</h4>
                    <p class="text-sm font-bold text-slate-900">Industry-Institution-Interaction Cell</p>
                    <p class="text-xs text-slate-600 mt-1">Training, Placement & IIIC Directorate</p>
                    <p class="text-xs text-slate-600">Room #408, 4th Floor, MSIT Campus</p>
                    <div class="mt-4 pt-3 border-t border-slate-200/60 space-y-2 text-xs text-slate-600">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-slate-700">Email:</span> iiic@msit.in
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-slate-700">Phone:</span> +91-11-25528117
                        </div>
                    </div>
                </div>

                <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Focus Areas</h4>
                    <ul class="space-y-3">
                        <li class="flex gap-2.5 text-xs text-slate-700"><svg class="w-3.5 h-3.5 mt-px text-primary shrink-0" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> AICTE National Internship Portal</li>
                        <li class="flex gap-2.5 text-xs text-slate-700"><svg class="w-3.5 h-3.5 mt-px text-primary shrink-0" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Enterprise Industry MoUs</li>
                        <li class="flex gap-2.5 text-xs text-slate-700"><svg class="w-3.5 h-3.5 mt-px text-primary shrink-0" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Summer & Winter Internships</li>
                        <li class="flex gap-2.5 text-xs text-slate-700"><svg class="w-3.5 h-3.5 mt-px text-primary shrink-0" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Industrial Visits & Technology Tours</li>
                        <li class="flex gap-2.5 text-xs text-slate-700"><svg class="w-3.5 h-3.5 mt-px text-primary shrink-0" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Standardized NOC Protocol & PPOs</li>
                    </ul>
                </div>
            </div>
        `,
        statsStrip: true,
        stats: [
            { label: "Internships", value: "500+", url: "/placements" },
            { label: "Avg Stipend", value: "₹40k/mo" },
            { label: "Highest Stipend", value: "₹1.2L/mo" },
            { label: "PPO Conversion", value: "68%+" }
        ],
        bulletPoints: [
            {
                label: "Ongoing Internship Drives",
                detail: "MSIT Industry-Institute Interaction & Training Placement Cell facilitates continuous on-campus and virtual hiring drives for 3rd and 4th-year engineering students across premier tech corporations and unicorn startups with monthly stipends up to ₹1,20,000.",
                url: "/placements",
                actionText: "View Placement & Internship Drives"
            },
            {
                label: "PPO Conversion Rate",
                detail: "Over 68% of summer engineering internships secured by MSIT pre-final students successfully convert into full-time Pre-Placement Offers (PPOs) prior to final-year graduation, with offers from companies like Google, Microsoft, Amazon, and ION Group.",
                url: "/placements",
                actionText: "Explore Placement Records"
            },
            {
                label: "Mandatory NOC Guidelines",
                detail: "Students pursuing 6th/8th semester internships must obtain a formal No Objection Certificate (NOC) by submitting their offer letter, maintaining 75%+ mandatory attendance, and securing approval from their Departmental HOD and IIIC Convener.",
                url: "/attendance",
                actionText: "Check Attendance & NOC Rules"
            },
            {
                label: "Active Industry MoUs",
                detail: "Strategic collaborations with Airports Authority of India (AAI), Tata Power DDL, NIELIT, ONGC, Brain Mentors, AI-SHALA, and The IoT Academy enabling live project internships and industry certifications.",
                url: "/facilities?tab=labs#industry-mous",
                actionText: "Review Active MoUs"
            }
        ]
    }
};

// Aliases for seamless direct routing
placementData["iiic"] = placementData["internship-cell"];
placementData["iiic-cell"] = placementData["internship-cell"];
