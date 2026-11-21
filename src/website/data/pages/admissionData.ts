import type { PageData } from '../../types';

export const admissionData: Record<string, PageData> = {
    "brochure": {
        title: "Information Brochure",
        subtitle: "Everything you need to know about joining Maharaja Surajmal Institute of Technology.",
        seo_description: "Download the official info brochure of Maharaja Surajmal Institute of Technology. Get details on courses, placements, faculty, and vibrant campus life at MSIT.",
        category: "Admissions",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Cover of the official MSIT information brochure featuring campus life and academic highlights",
        content: `
            <div class="space-y-12">
                <!-- Overview -->
                <section>
                    <p class="text-lg text-slate-700 leading-relaxed">
                        Maharaja Surajmal Institute of Technology (MSIT), New Delhi is an 'A' Grade NAAC & NBA accredited premier engineering institution affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi and approved by AICTE, Ministry of Education, Govt. of India.
                    </p>
                </section>

                <!-- Sanctioned Intake & Shifts Table -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-primary pl-4 mb-6">Approved Academic Programs & Shifts</h3>
                    <p class="text-sm text-slate-600 mb-4">MSIT operates two dedicated academic shifts offering four-year B.Tech degree programs:</p>
                    <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table class="w-full text-left text-sm text-slate-700">
                            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-700 border-b border-slate-200">
                                <tr>
                                    <th class="px-6 py-4 font-bold">Branch / Specialization</th>
                                    <th class="px-6 py-4 font-bold">1st Shift (Morning: 8:00 AM - 2:30 PM)</th>
                                    <th class="px-6 py-4 font-bold">2nd Shift (Evening: 12:30 PM - 7:00 PM)</th>
                                    <th class="px-6 py-4 font-bold">Total Intake</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr class="hover:bg-primary/5 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-900">Computer Science & Engineering (CSE)</td>
                                    <td class="px-6 py-4 font-semibold text-primary">180 Seats</td>
                                    <td class="px-6 py-4 font-semibold text-primary">60 Seats</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">240</td>
                                </tr>
                                <tr class="hover:bg-primary/5 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-900">Information Technology (IT)</td>
                                    <td class="px-6 py-4 font-semibold text-primary">120 Seats</td>
                                    <td class="px-6 py-4 font-semibold text-primary">60 Seats</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">180</td>
                                </tr>
                                <tr class="hover:bg-primary/5 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-900">Electronics & Communication Engineering (ECE)</td>
                                    <td class="px-6 py-4 font-semibold text-primary">120 Seats</td>
                                    <td class="px-6 py-4 font-semibold text-primary">60 Seats</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">180</td>
                                </tr>
                                <tr class="hover:bg-primary/5 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-900">Electrical & Electronics Engineering (EEE)</td>
                                    <td class="px-6 py-4 font-semibold text-primary">60 Seats</td>
                                    <td class="px-6 py-4 text-slate-400">N/A</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">60</td>
                                </tr>
                                <tr class="bg-slate-50 font-bold">
                                    <td class="px-6 py-4 text-slate-900">Total Regular Sanctioned Intake</td>
                                    <td class="px-6 py-4 text-primary">480 Seats</td>
                                    <td class="px-6 py-4 text-primary">180 Seats</td>
                                    <td class="px-6 py-4 text-primary text-base font-bold">660 Seats</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary leading-relaxed font-medium">
                        <strong>Lateral Entry (LE B.Tech):</strong> 10% supernumerary seats in the 2nd Year (3rd Semester) are reserved across branches for State Board Diploma holders and B.Sc. Graduates through GGSIPU CET Code 128 / 129.
                    </div>
                </section>

                <!-- JEE Main Cut-offs Table -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-primary pl-4 mb-6">JEE Main Opening & Closing Cut-Off Ranks</h3>
                    <p class="text-sm text-slate-600 mb-4">Admissions are governed strictly through centralized online counseling conducted by GGSIPU based on All India Common Rank List (CRL) in JEE Main (Paper 1):</p>
                    <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table class="w-full text-left text-sm text-slate-700">
                            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-700 border-b border-slate-200">
                                <tr>
                                    <th class="px-5 py-3 font-bold">Branch & Shift</th>
                                    <th class="px-5 py-3 font-bold">Delhi Region (85% Quota) Round 1</th>
                                    <th class="px-5 py-3 font-bold">Delhi Region Closing (Round 3 / Spot)</th>
                                    <th class="px-5 py-3 font-bold">Outside Delhi (15% Quota) Closing</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-mono text-xs">
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">CSE (1st Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">32,450 - 45,800</td>
                                    <td class="px-5 py-3 font-bold text-primary">54,200</td>
                                    <td class="px-5 py-3 font-bold text-primary">24,800</td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">CSE (2nd Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">46,200 - 58,900</td>
                                    <td class="px-5 py-3 font-bold text-primary">68,400</td>
                                    <td class="px-5 py-3 font-bold text-primary">34,500</td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">IT (1st Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">52,100 - 66,400</td>
                                    <td class="px-5 py-3 font-bold text-primary">76,800</td>
                                    <td class="px-5 py-3 font-bold text-primary">38,900</td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">IT (2nd Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">67,800 - 79,500</td>
                                    <td class="px-5 py-3 font-bold text-primary">89,200</td>
                                    <td class="px-5 py-3 font-bold text-primary">46,700</td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">ECE (1st Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">78,400 - 98,200</td>
                                    <td class="px-5 py-3 font-bold text-primary">1,12,000</td>
                                    <td class="px-5 py-3 font-bold text-primary">58,600</td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">ECE (2nd Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">99,800 - 1,22,400</td>
                                    <td class="px-5 py-3 font-bold text-primary">1,38,500</td>
                                    <td class="px-5 py-3 font-bold text-primary">72,400</td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-5 py-3 font-bold text-slate-900 font-sans">EEE (1st Shift)</td>
                                    <td class="px-5 py-3 text-slate-700">1,18,000 - 1,48,000</td>
                                    <td class="px-5 py-3 font-bold text-primary">1,78,000</td>
                                    <td class="px-5 py-3 font-bold text-primary">89,500</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- Annual Fee Structure Table -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-primary pl-4 mb-6">Fee Structure Breakdown (Academic Year 2026–27)</h3>
                    <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white mb-6">
                        <table class="w-full text-left text-sm text-slate-700">
                            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-700 border-b border-slate-200">
                                <tr>
                                    <th class="px-6 py-3 font-bold">Fee Component</th>
                                    <th class="px-6 py-3 font-bold">1st Year Amount (INR)</th>
                                    <th class="px-6 py-3 font-bold">Subsequent Years (INR)</th>
                                    <th class="px-6 py-3 font-bold">Remarks</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-3 font-bold text-slate-900">Academic / Tuition Fee</td>
                                    <td class="px-6 py-3 font-semibold">₹1,35,000/-</td>
                                    <td class="px-6 py-3 font-semibold">₹1,35,000/-</td>
                                    <td class="px-6 py-3 text-xs text-slate-500">As notified by State Fee Regulatory Committee</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3 font-bold text-slate-900">University Charges</td>
                                    <td class="px-6 py-3 font-semibold">₹20,000/-</td>
                                    <td class="px-6 py-3 font-semibold">₹20,000/-</td>
                                    <td class="px-6 py-3 text-xs text-slate-500">Remitted directly to GGSIPU</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3 font-bold text-slate-900">Student Activity Fee</td>
                                    <td class="px-6 py-3 font-semibold">₹2,000/-</td>
                                    <td class="px-6 py-3 font-semibold">₹2,000/-</td>
                                    <td class="px-6 py-3 text-xs text-slate-500">Societies, Technical fests, Sports & Library</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3 font-bold text-slate-900">Security Deposit</td>
                                    <td class="px-6 py-3 font-semibold">₹10,000/-</td>
                                    <td class="px-6 py-3 text-slate-400">N/A</td>
                                    <td class="px-6 py-3 text-xs text-slate-500">One-time, 100% Refundable after degree completion</td>
                                </tr>
                                <tr class="bg-primary/5 font-bold">
                                    <td class="px-6 py-4 text-slate-900">Total Payable at Admission</td>
                                    <td class="px-6 py-4 text-primary text-base font-bold">₹1,67,000/-</td>
                                    <td class="px-6 py-4 text-slate-700 text-base font-bold">₹1,57,000/-</td>
                                    <td class="px-6 py-4 text-xs font-semibold text-primary">Payable online via Net Banking / Cards / Demand Draft</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- Management Quota Policy -->
                <section>
                    <h3 class="text-2xl font-bold text-slate-900 border-l-4 border-primary pl-4 mb-6">Management Quota Admission Schedule & Rules</h3>
                    <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-sm text-slate-700 leading-relaxed">
                        <p>In accordance with the <em>Delhi Professional Colleges or Institutions Act, 2007</em> and GGSIPU guidelines, 10% of sanctioned intake seats are allotted under Management Quota.</p>
                        <ul class="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600 font-medium">
                            <li><strong>Merit Transparency:</strong> Admissions are conducted strictly on merit determined by JEE Main rank / qualifying 10+2 PCM percentage. Merit lists are displayed on the public notice board and college portal.</li>
                            <li><strong>Zero Capitation:</strong> MSIT does not charge or accept any capitation fee or donation. Fees are identical to regular university quota.</li>
                            <li><strong>Fee Refund Policy:</strong> In case of withdrawal, fee refunds follow strict AICTE and UGC guidelines with full refund minus processing fee (max ₹1,000) if surrendered prior to the last notified date.</li>
                        </ul>
                    </div>
                </section>
            </div>
        `,
        stats: [
            { label: "Total Intake", value: "660" },
            { label: "Shifts", value: "Morning & Evening" },
            { label: "Affiliation", value: "GGSIPU" },
            { label: "Accreditation", value: "NAAC 'A'" }
        ],
        bulletPoints: [
            { label: "Download PDF Brochure", detail: "Official MSIT Information Brochure containing intake capacity, seat reservation policies, faculty profiles, and fee structures.", url: "/brochure" },
            { label: "Admission Requirements", detail: "Eligibility criteria: Pass 10+2 with minimum 55% in PCM and English, with valid JEE Main rank through centralized GGSIPU online counseling.", url: "/brochure" },
            { label: "Counseling Walkthrough", detail: "Step-by-step guidance on GGSIPU online registration, choice filling, document verification, seat allotment, and reporting at MSIT campus.", url: "/brochure" }
        ]
    },
    "online-fee": {
        title: "Online Fee Payment",
        subtitle: "Official fee payment portal & annual fee breakdown for Maharaja Surajmal Institute of Technology.",
        seo_description: "Pay academic fees online at Maharaja Surajmal Institute of Technology via the official Octopod portal. View detailed annual fee breakdown and official notices.",
        category: "Admissions",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Official MSIT online fee payment portal and digital transaction interface overview",
        content: `
            <p class="font-[Libre_Baskerville,serif] text-base sm:text-[1.375rem] leading-relaxed sm:leading-[1.6] text-slate-900 mb-6 sm:mb-8">MSIT provides direct access to the official Octopod fee payment portal for all academic fee transactions. Students can securely pay their tuition, annual academic, and hostel fees using Net Banking, UPI, or Credit/Debit Cards.</p>
        `,
        bulletPoints: [
            { label: "Proceed to Official Fee Portal", url: "https://octopod.co.in/student/admission/81a9421f2cfc48f2e5f5278efa47382b" },
            { label: "Download Official Fee Notice PDF", url: "https://www.msit.in/media/news/fee-submission-notice-for-the-academic-year-2026-27.pdf" },
            { label: "Fee Refund & Surrender Policy", url: "https://www.msit.in/media/notices/delhi-professional-colleges-institutions-act-2007.pdf" }
        ]
    },
    "scholarships": {
        title: "Scholarships & Financial Aid",
        subtitle: "Merit recognized and potential supported at Maharaja Surajmal Institute of Technology.",
        seo_description: "Explore scholarship opportunities at Maharaja Surajmal Institute of Technology. We offer merit-based and financial aid schemes to support deserving students.",
        category: "Admissions",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "MSIT students receiving merit scholarships and financial aid certificates on stage",
        content: `
            <p class="font-[Libre_Baskerville,serif] text-base sm:text-[1.375rem] leading-relaxed sm:leading-[1.6] text-slate-900 mb-6 sm:mb-10">Maharaja Surajmal Institute of Technology actively supports students by facilitating access to diverse institutional, state, and central scholarship programs. Deserving students can avail themselves of financial support based on merit, economic status, or category requirements.</p>

            <!-- SECTION 1: DELHI GOVERNMENT SCHEMES -->
            <div class="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-1.5 h-5 bg-primary rounded-full"></span>
                    Delhi State Government Schemes
                </h3>
                
                <div class="grid grid-cols-1 gap-3 sm:gap-6">
                    <!-- Scheme 1: Merit-cum-Means -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div class="space-y-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/5 text-primary">Delhi Govt (GNCTD)</span>
                                <h4 class="text-lg font-bold text-slate-900">Merit-cum-Means Linked Financial Assistance Scheme</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">Extends crucial financial support to meritorious and needy students pursuing higher education in NCT Delhi. Under this scheme, the Delhi Higher Education Trust through the Directorate of Higher Education (DHE) reimburses full or partial tuition fees based on family income criteria.</p>
                            </div>
                            <div class="flex flex-row md:flex-col gap-2 shrink-0">
                                <a href="http://www.ipu.ac.in/dsw_policy.php" target="_blank" rel="noopener noreferrer" class="px-4 py-2 text-xs font-bold text-center text-primary bg-white hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/20">View Guidelines</a>
                                <a href="https://edistrict.delhigovt.nic.in/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 text-xs font-bold text-center text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-xs">Apply Online</a>
                            </div>
                        </div>
                    </div>

                    <!-- Scheme 2: Post Matric SC/ST/OBC -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div class="space-y-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/5 text-primary">Welfare Department</span>
                                <h4 class="text-lg font-bold text-slate-900">Post Matric Scholarship for SC/ST/OBC Students</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">A centrally sponsored scheme implemented by the Department for the Welfare of SC/ST/OBC. It provides financial assistance to students belonging to reserved categories for pursuing post-matriculation or post-secondary studies (college/university levels) in India.</p>
                            </div>
                            <div class="flex shrink-0">
                                <a href="http://www.scstwelfare.delhigovt.nic.in/" target="_blank" rel="noopener noreferrer" class="w-full md:w-auto px-4 py-2 text-xs font-bold text-center text-primary bg-white hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/20">Official Portal</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: UNIVERSITY LEVEL SCHEMES -->
            <div class="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-1.5 h-5 bg-primary rounded-full"></span>
                    GGSIP University Schemes
                </h3>
                
                <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div class="space-y-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/5 text-primary">GGSIPU DSW</span>
                            <h4 class="text-lg font-bold text-slate-900">Economically Weaker Section (EWS) Scheme</h4>
                            <p class="text-sm text-slate-600 leading-relaxed">Guru Gobind Singh Indraprastha University grants financial assistance to students belonging to the Economically Weaker Sections of society. The scheme aims to enhance institutional access and support students facing severe economic hardships during their studies.</p>
                        </div>
                        <div class="flex shrink-0">
                            <a href="http://www.ipu.ac.in/dsw_policy.php" target="_blank" rel="noopener noreferrer" class="w-full md:w-auto px-4 py-2 text-xs font-bold text-center text-primary bg-white hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/20">DSW Schemes</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 3: NATIONAL & AICTE SCHEMES -->
            <div class="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-1.5 h-5 bg-primary rounded-full"></span>
                    National & AICTE Technical Schemes
                </h3>
                
                <div class="grid grid-cols-1 gap-3 sm:gap-6">
                    <!-- Scheme 1: Pragati -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div class="space-y-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/5 text-primary">AICTE MHRD</span>
                                <h4 class="text-lg font-bold text-slate-900">Pragati Scholarship Scheme for Girl Students</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">A prestigious initiative implemented by AICTE on behalf of the Ministry of Education. It aims to empower girls with the knowledge, skills, and self-confidence needed to pursue technical careers by providing financial aid for technical and professional programs.</p>
                            </div>
                            <div class="flex shrink-0">
                                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" class="w-full md:w-auto px-4 py-2 text-xs font-bold text-center text-primary bg-white hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/20">Apply on NSP</a>
                            </div>
                        </div>
                    </div>

                    <!-- Scheme 2: Saksham -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div class="space-y-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/5 text-primary">AICTE MHRD</span>
                                <h4 class="text-lg font-bold text-slate-900">Saksham Scholarship Scheme for Specially Abled Students</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">Designed by the Ministry of Education and implemented by AICTE, this program encourages and supports specially-abled children to pursue higher technical education, ensuring they get equal learning opportunities and prep for a successful future.</p>
                            </div>
                            <div class="flex shrink-0">
                                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" class="w-full md:w-auto px-4 py-2 text-xs font-bold text-center text-primary bg-white hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/20">Apply on NSP</a>
                            </div>
                        </div>
                    </div>

                    <!-- Scheme 3: NSP Central -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div class="space-y-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Central Government</span>
                                <h4 class="text-lg font-bold text-slate-900">Centrally Sponsored Schemes (National Scholarship Portal)</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">A unified national portal acting as a single-window solution for central government scholarships. Enables everything from application submission, verification, processing, and direct benefit transfer (DBT) of funds to students.</p>
                            </div>
                            <div class="flex shrink-0">
                                <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" class="w-full md:w-auto px-4 py-2 text-xs font-bold text-center text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-xs">National Portal</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 4: SCHOLARSHIP COMMITTEE & FACULTY LEADERSHIP -->
            <div class="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span class="w-1.5 h-5 bg-primary rounded-full"></span>
                    Scholarship Committee & Faculty Leadership
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed">
                    The MSIT Scholarship & Financial Aid Committee oversees student welfare schemes, reviews applications, verifies state/central portal submissions, and coordinates institutional financial aid disbursals.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Head & Convener -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                                <img src="/faculty/puneet-azad.webp" alt="Prof. (Dr.) Puneet Azad" class="w-full h-full object-cover" />
                            </div>
                            <div class="space-y-1 min-w-0">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide sm:tracking-wider leading-snug bg-primary/10 text-primary">
                                    Convener & Academic Head
                                </span>
                                <h4 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">Prof. (Dr.) Puneet Azad</h4>
                                <p class="text-[11px] sm:text-xs font-medium text-primary leading-snug">Professor (ECE Dept) & Dean Academics</p>
                                <p class="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3 sm:line-clamp-none">
                                    Heads institutional scholarship verification, Merit-cum-Means (MCM) approval, NSP & Delhi Govt portal Nodal Desk, and overall student financial assistance schemes.
                                </p>
                                <div class="pt-1.5 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-700">
                                    <a href="mailto:puneet.azad@msit.in" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:text-primary hover:border-primary/30 transition-colors">
                                        puneet.azad@msit.in
                                    </a>
                                    <a href="/faculty?search=Puneet+Azad" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                        View Faculty Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Co-Coordinator / Industry Scholarships -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                                <img src="/faculty/sunesh-malik.webp" alt="Dr. Sunesh Malik" class="w-full h-full object-cover" />
                            </div>
                            <div class="space-y-1 min-w-0">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide sm:tracking-wider leading-snug bg-primary/10 text-primary">
                                    Industry & Corporate Scholarship Incharge
                                </span>
                                <h4 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">Dr. Sunesh Malik</h4>
                                <p class="text-[11px] sm:text-xs font-medium text-primary leading-snug">Associate Professor (IT Department)</p>
                                <p class="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3 sm:line-clamp-none">
                                    Coordinates corporate and industry-sponsored scholarships (such as Optum Scholarship) and departmental scholarship allocations for IT & CS students.
                                </p>
                                <div class="pt-1.5 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-700">
                                    <a href="mailto:suneshmalik@msit.in" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:text-primary hover:border-primary/30 transition-colors">
                                        suneshmalik@msit.in
                                    </a>
                                    <a href="/faculty?search=Sunesh+Malik" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                        View Faculty Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SC/ST & Social Welfare Cell Convener -->
                    <div class="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all">
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                                <img src="/faculty/naresh-kumar.webp" alt="Prof. (Dr.) Naresh Kumar" class="w-full h-full object-cover" />
                            </div>
                            <div class="space-y-1 min-w-0">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide sm:tracking-wider leading-snug bg-primary/10 text-primary">
                                    SC/ST Welfare Cell Convener
                                </span>
                                <h4 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">Prof. (Dr.) Naresh Kumar</h4>
                                <p class="text-[11px] sm:text-xs font-medium text-primary leading-snug">Professor (CSE Dept) & SC/ST Welfare Convener</p>
                                <p class="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3 sm:line-clamp-none">
                                    Handles Post-Matric SC/ST/OBC category scholarship verification, social welfare grants, and state welfare portal approvals.
                                </p>
                                <div class="pt-1.5 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-slate-700">
                                    <a href="mailto:nareshkumar@msit.in" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:text-primary hover:border-primary/30 transition-colors">
                                        nareshkumar@msit.in
                                    </a>
                                    <a href="/faculty?search=Naresh+Kumar" class="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                        View Faculty Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Nodal Administrative Desk -->
                    <div class="p-4 sm:p-6 bg-primary/5 text-slate-900 rounded-2xl sm:rounded-3xl border border-primary/15">
                        <div class="space-y-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-primary border border-primary/20">
                                Institutional Nodal Desk
                            </span>
                            <h4 class="text-base sm:text-lg font-bold">MSIT Scholarship & Verification Desk</h4>
                            <p class="text-xs text-slate-600 leading-relaxed">
                                For physical document verification, portal approval stamps, e-District Delhi / NSP queries, and official receipt collection.
                            </p>
                            <div class="pt-3 space-y-1.5 text-xs text-slate-600">
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold text-slate-800">Address:</span> Ground Floor, Main Academic Building, MSIT
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold text-slate-800">Phone:</span> Office Landline: 011-45037193 / 011-25552556
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold text-slate-800">Email:</span> Desk Email: director@msit.in
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 5: DOCUMENT DOWNLOADS -->
            <div class="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-3xl">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h4 class="text-base font-bold text-slate-900 font-sans">Official Scholarship Notice</h4>
                        <p class="text-xs text-slate-500 font-light mt-1">Download the official reference PDF issued by the MSIT scholarship and aid department.</p>
                    </div>
                    <a href="https://msit.in/media/navigations/scholarships.pdf" download target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-xs gap-2 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Official PDF
                    </a>
                </div>
            </div>
        `,
        statsStrip: true,
        stats: [
            { label: "Annual Dispersal", value: "₹2.5 Cr+" },
            { label: "Beneficiaries", value: "400+" },
            { label: "Schemes Listed", value: "6" }
        ],
        bulletPoints: [
            { label: "Convener: Prof. (Dr.) Puneet Azad", detail: "Prof. (Dr.) Puneet Azad (Professor, ECE & Dean Academics) heads the MSIT Scholarship & Financial Aid Committee." },
            { label: "Merit Scholarships & MCM", detail: "Delhi State Government MCM Linked Financial Assistance Scheme." },
            { label: "EWS Financial Aid & DSW", detail: "GGSIPU Economically Weaker Section Financial Assistance Scheme." },
            { label: "AICTE Pragati & Saksham", detail: "AICTE National Portal Scholarships for Girls and Specially-Abled Students." }
        ]
    },
    "mandatory-disclosures": {
        title: "Mandatory Disclosures",
        subtitle: "Commitment to absolute transparency at Maharaja Surajmal Institute of Technology.",
        seo_description: "View the official mandatory disclosures of Maharaja Surajmal Institute of Technology. Access AICTE approval, NBA accreditation, and audit reports for MSIT.",
        category: "Admissions",
        heroImage: "/campus-hero.webp",
        heroImageAlt: "Official AICTE and NBA mandatory disclosure documents for MSIT institutional transparency",
        content: `
            <p class="font-[Libre_Baskerville,serif] text-base sm:text-[1.375rem] leading-relaxed sm:leading-[1.6] text-slate-900 mb-6 sm:mb-8">In absolute compliance with the All India Council for Technical Education (AICTE), the University Grants Commission (UGC), and GGSIPU, MSIT publishes its mandatory disclosures for public review.</p>
            
            <!-- ACCREDITATION TABLES/CARDS -->
            <div class="space-y-8 mt-8">
                <!-- NBA CARD -->
                <div class="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/60 bg-white shadow-xs">
                    <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        NBA Accreditation Status
                    </h3>
                    <div class="grid grid-cols-2 gap-4 sm:gap-6 text-sm">
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Programmes/Courses Accredited</span>
                            <p class="text-slate-800 font-medium">CSE, IT, ECE, EEE (All eligible UG programmes)</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
                            <p class="text-slate-800 font-medium">Accredited</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied for Accreditation</span>
                            <p class="text-slate-800 font-medium">None (All eligible programmes are fully accredited)</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Programmes Not Applied</span>
                            <p class="text-slate-800 font-medium">None</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-6 border-t border-slate-100 flex">
                        <a href="https://www.msit.in/media/uploads/2025/08/27/nba_2023_all_depts_merged.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/5 text-primary hover:bg-primary-dark hover:text-white rounded-xl text-xs font-bold transition-all border border-primary/20 shadow-xs hover:shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View NBA Certificates (PDF)
                        </a>
                    </div>
                </div>

                <!-- NAAC CARD -->
                <div class="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/60 bg-white shadow-xs">
                    <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        NAAC Accreditation Status
                    </h3>
                    <div class="grid grid-cols-2 gap-4 sm:gap-6 text-sm">
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Accreditation Grade</span>
                            <p class="text-slate-800 font-medium">'A' Grade Status</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Effective Date</span>
                            <p class="text-slate-800 font-medium">September 21, 2022</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-6 border-t border-slate-100 flex">
                        <a href="https://www.msit.in/media/2022/12/23/naac.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/5 text-primary hover:bg-primary-dark hover:text-white rounded-xl text-xs font-bold transition-all border border-primary/20 shadow-xs hover:shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View NAAC Certificate (PDF)
                        </a>
                    </div>
                </div>

                <!-- NIRF RANKING CARD -->
                <div class="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xs space-y-6">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                            <h3 class="text-lg font-bold text-slate-900">National Institutional Ranking Framework (NIRF)</h3>
                        </div>
                        <span class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                            NIRF 2024 & NIRF 2023 (Govt. of India)
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Evaluation Year & Body</span>
                            <p class="text-slate-900 font-bold text-base">NIRF 2024</p>
                            <p class="text-xs text-slate-500 font-medium">Ministry of Education (MoE), Govt. of India</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Engineering Category Band</span>
                            <p class="text-primary font-bold text-base">Rank Band 201–300</p>
                            <p class="text-xs text-slate-500 font-medium">Verified under Engineering Discipline</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">NIRF Institutional ID</span>
                            <p class="text-slate-800 font-semibold text-sm tabular-nums">IR-E-C-32863</p>
                            <p class="text-xs text-slate-500 font-medium">MSIT C-4 Janakpuri, New Delhi</p>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                        <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Official Verification & Classification:</span>
                        <p class="text-xs text-slate-600 leading-relaxed">
                            MSIT participates strictly under the NIRF Engineering category with institutional code IR-E-C-32863. Commercial listing portals claiming Rank Band 101–150 or 151–200 conflate engineering data with our non-engineering sister institution, Maharaja Surajmal Institute (MSI). All official NIRF scores and parameter metrics can be verified directly on the Ministry of Education's official portal.
                        </p>
                    </div>

                    <div class="flex flex-wrap items-center gap-3 pt-2">
                        <a 
                            href="https://www.nirfindia.org/Rankings/2024/EngineeringRanking.html" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                        >
                            <span>Official NIRF India 2024 Portal Proof</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                        <a 
                            href="https://www.msit.in/media/uploads/2024/02/15/nirf_data_2024.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-xs transition-all"
                        >
                            <span>MSIT NIRF Data Filing (PDF)</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </a>
                    </div>
                </div>

                <!-- FINANCIAL AUDIT REPORTS & BALANCE SHEETS CARD -->
                <div class="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/60 bg-white shadow-xs">
                    <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        Institutional Financial Audit Reports & Balance Sheets
                    </h3>
                    <p class="text-sm text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                        Surajmal Memorial Education Society and MSIT publish annual audited financial statements, balance sheets, and chartered accountant audit reports in absolute compliance with regulatory mandates.
                    </p>

                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
                        <!-- 2023-24 -->
                        <a href="https://www.msit.in/media/notices/mandatory-disclosure_PSXfseX.pdf" target="_blank" rel="noopener noreferrer" class="p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-200 hover:border-primary/20 transition-all flex flex-col justify-between group">
                            <div>
                                <span class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase tracking-wider">FY 2023–24</span>
                                <h4 class="text-sm font-bold text-slate-900 group-hover:text-primary mt-2">Audited Balance Sheet</h4>
                                <p class="text-xs text-slate-500 mt-1">As at 31st March 2024</p>
                            </div>
                            <div class="mt-4 flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                Download PDF &rarr;
                            </div>
                        </a>

                        <!-- 2022-23 -->
                        <a href="https://www.msit.in/media/uploads/2023/11/16/nba_2023_all_depts.pdf" target="_blank" rel="noopener noreferrer" class="p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-200 hover:border-primary/20 transition-all flex flex-col justify-between group">
                            <div>
                                <span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-md uppercase tracking-wider">FY 2022–23</span>
                                <h4 class="text-sm font-bold text-slate-900 group-hover:text-primary mt-2">Audited Financial Statement</h4>
                                <p class="text-xs text-slate-500 mt-1">As at 31st March 2023</p>
                            </div>
                            <div class="mt-4 flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                Download PDF &rarr;
                            </div>
                        </a>

                        <!-- 2021-22 & Archives -->
                        <a href="https://www.msit.in/media/notices/mandatory-disclosure_PSXfseX.pdf" target="_blank" rel="noopener noreferrer" class="p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-200 hover:border-primary/20 transition-all flex flex-col justify-between group">
                            <div>
                                <span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-md uppercase tracking-wider">FY 2021–22 & Archives</span>
                                <h4 class="text-sm font-bold text-slate-900 group-hover:text-primary mt-2">Audit Report Archive</h4>
                                <p class="text-xs text-slate-500 mt-1">Historical Statements & Filings</p>
                            </div>
                            <div class="mt-4 flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                Download PDF &rarr;
                            </div>
                        </a>
                    </div>
                </div>

                <!-- FULL DISCLOSURE CARD -->
                <div class="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/15 bg-primary/5">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Full Mandatory Disclosure</h3>
                    <p class="text-slate-600 text-sm mb-5 sm:mb-6 leading-relaxed">Download the complete, comprehensive Mandatory Disclosure document containing detailed institutional data, academic profiles, and audit reports.</p>
                    <a href="https://www.msit.in/media/notices/mandatory-disclosure_PSXfseX.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-semibold transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Full Document (PDF)
                    </a>
                </div>
            </div>
        `,
        statsStrip: true,
        stats: [
            { label: "NAAC Grade", value: "A" },
            { label: "NBA Accredited", value: "All UG" },
            { label: "NIRF Engg. Band", value: "201–300" },
            { label: "Accredited Programmes", value: "4" }
        ],
        bulletPoints: [
            { label: "NBA Certificates (All Depts)", detail: "Official NBA Accreditation documents for CSE, IT, ECE, and EEE programs." },
            { label: "NAAC Grade A Document", detail: "Official NAAC Grade 'A' institutional accreditation certificate." },
            { label: "Financial Audit Reports & Balance Sheets", detail: "Annual audited financial statements, balance sheets, and chartered accountant audit reports." },
            { label: "Full Disclosure PDF", detail: "Comprehensive AICTE Mandatory Disclosure filing." }
        ]
    }
};
