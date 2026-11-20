import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Link2, Calendar, Tag, Share2, Printer } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { isCmsNewsId, useCmsNewsItem } from '../cms/news';

const newsDb = {
    "1": {
        id: 1,
        label: "NEWS",
        title: "MSIT establishes state-of-the-art AICTE IDEA Lab & Advanced Research Facilities",
        date: "MAR 02, 2026",
        color: "border-blue-600",
        bgImage: "/campus/main-academic-building.webp",
        summary: "MSIT has established an AICTE IDEA Lab and advanced multidisciplinary research infrastructure backed by national science grants.",
        content: `
            <p class="mb-6">Maharaja Surajmal Institute of Technology (MSIT), New Delhi has achieved a significant milestone with the establishment of the <strong>AICTE IDEA (Idea Development, Evaluation & Application) Lab</strong> and high-performance computing clusters supported by national research bodies and research funding from the Department of Science and Technology (DST).</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Establishment of the Advanced Computing Research Lab</h3>
            <p class="mb-6">The research grant and institutional funding are directed towards upgrading dedicated laboratory spaces within the MSIT 8-storey academic block. The center houses high-performance computing workstations, FPGA embedded systems, IoT test benches, and enterprise-grade GPU servers for deep learning models.</p>
            <p class="mb-6">Prof. (Dr.) Avanish Kumar Srivastava, Director of MSIT (former Director of CSIR-AMPRI and Stanford top 2% global scientist), stated: <em>"This advanced facility is a testament to the high-caliber research conducted by our faculty members and students. With this setup, we aim to bridge the gap between academic theory and real-world industrial engineering systems."</em></p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Areas of Focus</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Artificial Intelligence & Machine Learning:</strong> Training domain-specific neural models, computer vision, and speech processing for national mission applications.</li>
                <li><strong>Cybersecurity & Applied Cryptography:</strong> Securing network architectures and modern IoT communication protocols.</li>
                <li><strong>Embedded Systems & Robotics:</strong> Prototyping real-time embedded hardware loops, microcontrollers, and automation systems in the AICTE IDEA Lab.</li>
            </ul>
        `,
        attachments: [
            { name: "Official Grant Announcement & Press Release.pdf", size: "2.4 MB", url: "#" },
            { name: "Research Infrastructure Blueprint & Timeline.pdf", size: "4.8 MB", url: "#" }
        ],
        links: [
            { name: "Department of Science and Technology Portal", url: "https://dst.gov.in" },
            { name: "MSIT Research & Innovation Department", url: "/research" }
        ]
    },
    "2": {
        id: 2,
        label: "EVENT",
        title: "Global Web3 & Blockchain Summit to be hosted at MSIT Campus",
        date: "FEB 28, 2026",
        color: "border-emerald-500",
        bgImage: "/campus/auditorium-cultural-fest.webp",
        summary: "MSIT has been selected as the official venue partner for the 2026 Global Web3 & Blockchain Summit, bringing together 2,000+ tech visionaries.",
        content: `
            <p class="mb-6">In a major victory for our student innovation clubs, the global organizing committee of the <strong>Web3 Developer Forum</strong> has chosen Maharaja Surajmal Institute of Technology as the anchor host venue for the upcoming **Global Web3 & Blockchain Summit 2026**.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">What to Expect</h3>
            <p class="mb-6">The summit, scheduled from <strong>October 15 to 17, 2026</strong>, will witness keynotes from Ethereum Foundation engineers, polygon protocol designers, security auditors, and founders of leading decentralized systems. Parallel tracks will cover smart-contract formal verification, Zero-Knowledge Rollups, and Decentralized Autonomous Organizations (DAOs) in corporate governance.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Student Hackathon & Placements</h3>
            <p class="mb-6">A major highlight of the event is the <strong>36-hour continuous Hackathon</strong> sponsored by major Web3 venture funds, offering cash prizes of up to $50,000 and direct internship placements with global remote companies.</p>
        `,
        attachments: [
            { name: "Summit Full Brochure & Speaker Directory.pdf", size: "3.2 MB", url: "#" },
            { name: "Hackathon Guidelines & Rules.pdf", size: "1.1 MB", url: "#" }
        ],
        links: [
            { name: "Register for the Hackathon (Google Forms)", url: "https://docs.google.com" },
            { name: "Web3 Summit Official Global Site", url: "https://web3devforum.org" }
        ]
    },
    "3": {
        id: 3,
        label: "STORY",
        title: "MSIT Alumni community secures offers across Google, Microsoft, Amazon, and ION Trading with highest domestic package of ₹45+ LPA",
        date: "FEB 15, 2026",
        color: "border-purple-500",
        bgImage: "/campus/student-gathering-courtyard.webp",
        summary: "MSIT graduates continue to excel across top-tier multinational product firms with standout placement packages and industry-leading compensation.",
        content: `
            <p class="mb-6">Maharaja Surajmal Institute of Technology celebrates a spectacular placement season with students from the Computer Science & Engineering (CSE) and Information Technology (IT) departments securing top-tier engineering roles at multinational technology leaders including Google, Microsoft, Amazon, Adobe, Postman, and ION Trading.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Placement Milestones & CTC Highlights</h3>
            <p class="mb-6">The graduating batches recorded an outstanding highest domestic package of <strong>₹45+ LPA</strong>, with over 750+ total offers extended by more than 120 visiting recruiters. MSIT's dedicated Training and Placement Cell facilitated comprehensive technical training modules, mock DSA interviews, and industry mentorship sessions throughout the recruitment drive.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Advice from Placed Alumni</h3>
            <p class="mb-6">Alumni mentors shared: <em>"A strong foundation in Data Structures, System Design, Operating Systems, and hands-on open-source projects is the key differentiator for competitive product-company recruitment."</em></p>
        `,
        attachments: [
            { name: "Apple Placement Prep Kit & Sample Problems.pdf", size: "1.8 MB", url: "#" }
        ],
        links: [
            { name: "Read Placement Cell Alumni Interview", url: "/placements" },
            { name: "MSIT Alumni Association Network", url: "https://alumni.msit.in" }
        ]
    },
    "4": {
        id: 4,
        label: "STORY",
        title: "Grand Finale of SIH 2025 Concludes: MSIT Declared Winner in Ministry of AYUSH Category",
        date: "DEC 12, 2025",
        color: "border-blue-600",
        bgImage: "/campus/campus-pathway-block.webp",
        summary: "MSIT Janakpuri secured top honors in the Ministry of AYUSH category at the Smart India Hackathon 2025 Grand Finale.",
        content: `
            <p class="mb-6">The Grand Finale of the Smart India Hackathon (SIH) 2025 concluded on 12 December 2025 at Galgotias University. In the Ministry of AYUSH category, Maharaja Surajmal Institute of Technology, Janakpuri, New Delhi, was declared a winner alongside Sri Krishna College of Engineering and Technology, Tamil Nadu.</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Ministry Evaluation and AYUSH Solutions</h3>
            <p class="mb-6">Project evaluations were conducted by official ministry assessment teams including Dr. Shalini Rai from the Ministry of AYUSH, evaluating original technology solutions based on originality, technological feasibility, and social impact.</p>
        `,
        attachments: [
            { name: "SIH 2025 Official Winner Certificate.pdf", size: "1.2 MB", url: "#" }
        ],
        links: [
            { name: "Smart India Hackathon Portal", url: "https://sih.gov.in" }
        ]
    },
    "5": {
        id: 5,
        label: "EVENT",
        title: "MSIT to Host 4th International Conference on Artificial Intelligence and Applications (ICAIA 2026)",
        date: "NOV 19, 2026",
        color: "border-emerald-500",
        bgImage: "/campus/main-academic-building.webp",
        summary: "MSIT announced the 4th International Conference ICAIA-2026, technically approved by the IEEE Delhi Section.",
        content: `
            <p class="mb-6">Maharaja Surajmal Institute of Technology (MSIT), New Delhi, is organizing the 4th International Conference on Artificial Intelligence and Applications (ICAIA 2026) on 19–20 November 2026.</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">IEEE Delhi Section Technical Approval</h3>
            <p class="mb-6">Technically approved by the IEEE Delhi Section, the conference brings together global academic researchers, industry experts, and practitioners to discuss computational intelligence models, deep learning architectures, and applied AI systems.</p>
        `,
        attachments: [
            { name: "ICAIA 2026 Brochure & Paper Submissions.pdf", size: "3.4 MB", url: "#" }
        ],
        links: [
            { name: "Conference Official Site", url: "https://icaia-msit.in/" }
        ]
    },
    "6": {
        id: 6,
        label: "NEWS",
        title: "Department of CSE Receives Grant from Petronet LNG Ltd. for Center of Excellence",
        date: "AUG 15, 2025",
        color: "border-purple-500",
        bgImage: "/campus/central-library-hall.webp",
        summary: "Petronet LNG Ltd. awarded ₹30 lakh to MSIT's Department of CSE to establish a CoE in Computational Intelligence.",
        content: `
            <p class="mb-6">The Department of Computer Science & Engineering at Maharaja Surajmal Institute of Technology received a financial grant of ₹30 lakh from Petronet LNG Ltd.</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Computational Intelligence Infrastructure</h3>
            <p class="mb-6">The grant funding is explicitly designated to establish a Center of Excellence of Computational research and development, providing advanced computational infrastructure for AI and data science research.</p>
        `,
        attachments: [
            { name: "Petronet Grant Approval Letter.pdf", size: "850 KB", url: "#" }
        ],
        links: [
            { name: "MSIT Achievement Notice", url: "https://www.msit.in/achievement/3/" }
        ]
    },
    "7": {
        id: 7,
        label: "EVENT",
        title: "MSIT Conducts National Conference NCI-TIDE 2025",
        date: "DEC 15, 2025",
        color: "border-blue-600",
        bgImage: "/campus/auditorium-cultural-fest.webp",
        summary: "MSIT hosted the National Conference NCI-TIDE 2025 covering emerging technologies and interdisciplinary engineering.",
        content: `
            <p class="mb-6">Maharaja Surajmal Institute of Technology organized the National Conference on Integrating Technologies, Ideas and Disciplines for Engineering Innovation (NCI-TIDE 2025).</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Keynote Address and Sponsorship</h3>
            <p class="mb-6">The event featured a keynote address by Dr. Prerna Gaur on Internet of Things (IoT) applications in automation and intelligent engineering systems, alongside peer-reviewed research paper sessions for journal publication. Corporate sponsorship support was provided by ECE department alumnus Varun Bansal through Elegance Spark Innovation.</p>
        `,
        attachments: [
            { name: "NCI-TIDE 2025 Complete Report.pdf", size: "1.9 MB", url: "#" }
        ],
        links: [
            { name: "Official Report PDF Link", url: "https://www.msit.in/media/uploads/2025/12/16/nci-tide2025-report.pdf" }
        ]
    },
    "8": {
        id: 8,
        label: "EVENT",
        title: "Placement Cell Conducts Placement Preparation Session with ION Alumni and Seniors",
        date: "AUG 30, 2024",
        color: "border-emerald-500",
        bgImage: "/campus/campus-canteen-kiosk.webp",
        summary: "MSIT Placement Cell organized an interactive preparation session featuring CSE alumni and placed seniors working at ION.",
        content: `
            <p class="mb-6">The Placement Cell at MSIT conducted an interactive placement preparation session focused on recruitment strategies for fintech firm ION.</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Alumni Mentorship and Guidance</h3>
            <p class="mb-6">Featuring Saransh Kapoor, Sunidee Jaiswal (CSE 2021–2025), and alumnus Prasanjeet Parasar (CSE 2019–2023), the session provided technical guidance on resume grinding, stakeholder evaluation, case studies, and culture fit rounds conducted by global talent leaders.</p>
        `,
        attachments: [
            { name: "ION Prep Session Report.pdf", size: "1.1 MB", url: "#" }
        ],
        links: [
            { name: "Placement Cell Notice", url: "https://www.msit.in/media/2024/08/30/report-_placement-talk_ion.pdf" }
        ]
    },
    "9": {
        id: 9,
        label: "EVENT",
        title: "E-Cell MSIT Organizes Flagship E-Summit 2026",
        date: "MAR 26, 2026",
        color: "border-purple-500",
        bgImage: "/campus/ecell-noticeboard-entrance.webp",
        summary: "E-Cell MSIT conducted its annual flagship E-Summit 2026 to foster student entrepreneurship.",
        content: `
            <p class="mb-6">The Entrepreneurship Cell (E-Cell) of MSIT hosted its annual flagship E-Summit 2026 on March 26–27, 2026.</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Competitions & Venture Building</h3>
            <p class="mb-6">The summit featured business plan competitions, startup pitch sessions, ideathons, and interactive guest lectures designed to nurture technical entrepreneurship and venture building among engineering students.</p>
        `,
        attachments: [],
        links: [
            { name: "MSIT Events Calendar", url: "https://www.msit.in/events" }
        ]
    },
    "10": {
        id: 10,
        label: "EVENT",
        title: "MSC MSIT Organizes HackMSIT 1.0 Hackathon",
        date: "APR 10, 2026",
        color: "border-emerald-500",
        bgImage: "/campus/student-gathering-courtyard.webp",
        summary: "36-hour non-stop student hackathon with 500+ participants building open-source projects, AI prototypes, and developer tools.",
        content: `
            <p class="mb-6 leading-relaxed">The <strong>Microsoft Student Chapter (MSC)</strong> at Maharaja Surajmal Institute of Technology is thrilled to host the inaugural edition of its flagship national hackathon — <strong>HackMSIT 1.0</strong> — on April 10–12, 2026 at the MSIT campus grounds in New Delhi.</p>

            <p class="mb-6 leading-relaxed">Gathering more than <strong>500+ top student developers, AI researchers, and engineering innovators</strong> from over 80+ universities across India, HackMSIT 1.0 is a high-energy 36-hour sprint dedicated to solving real-world challenges with bleeding-edge technology.</p>

            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Hackathon Innovation Tracks</h3>
            <p class="mb-4 leading-relaxed">Participants can build, hack, and pitch across four high-impact domains:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-600">
                <li><strong>Artificial Intelligence & Autonomous Agents:</strong> Generative models, autonomous workflows, computer vision, and multi-modal assistants designed to elevate daily productivity and research.</li>
                <li><strong>Web3 & Decentralized Infrastructure:</strong> Scalable dApps, decentralized identity, zero-knowledge verification, and cross-chain financial primitives.</li>
                <li><strong>HealthTech & Assistive Technologies:</strong> Diagnostic intelligence, IoT health monitors, accessibility tools for differently-abled citizens, and telemedicine networks.</li>
                <li><strong>Open Innovation & Smart Campus:</strong> Next-generation campus automation, sustainable resource tracking, clean mobility, and developer infrastructure.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Mentorship & Industry Keynotes</h3>
            <p class="mb-6 leading-relaxed">Throughout the 36-hour build window, teams will receive hands-on mentoring from senior software architects and technology leaders from Microsoft, GitHub, Devfolio, Google, and premier venture-backed startups. Interactive technical breakout sessions on prompt engineering, scalable cloud deployment, and system architecture will guide teams towards robust production prototypes.</p>

            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Prizes, Bounties & Fast-Track Hiring</h3>
            <p class="mb-6 leading-relaxed">With a combined prize pool exceeding <strong>₹2,50,000 INR</strong>, winning teams take home substantial cash awards, Microsoft Azure and GitHub credits, exclusive swag kits, and interview fast-track opportunities with our corporate hiring partners:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-600">
                <li><strong>Overall Winner (1st Prize):</strong> ₹1,00,000 Cash Prize + ₹1.5L Cloud Credits + Winner Trophies</li>
                <li><strong>1st Runner Up (2nd Prize):</strong> ₹60,000 Cash Prize + Cloud Credits + Certificates of Excellence</li>
                <li><strong>2nd Runner Up (3rd Prize):</strong> ₹40,000 Cash Prize + Cloud Credits</li>
                <li><strong>Track Champions & Special Bounties:</strong> ₹50,000 dedicated track prizes for Best All-Girls Team, Best Web3 Hack, and Most Innovative AI Prototype.</li>
            </ul>

            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Event Schedule & Registration Details</h3>
            <p class="mb-6 leading-relaxed">Team registrations are open on the official Devfolio portal. Shortlisted finalists will receive confirmation letters with campus access passes. Accommodation, high-speed campus Wi-Fi, 24/7 snacks, and continuous power backup are fully arranged at the MSIT campus.</p>
        `,
        attachments: [
            { name: "HackMSIT 1.0 Rulebook & Problem Statements.pdf", size: "1.8 MB", url: "/events" },
            { name: "Participant Guidelines & Code of Conduct.pdf", size: "620 KB", url: "/events" }
        ],
        links: [
            { name: "Register on Devfolio Portal", url: "https://devfolio.co/" },
            { name: "Microsoft Student Chapter MSIT", url: "/society-geekroom" },
            { name: "View All MSIT Campus Events", url: "/events" }
        ]
    },
    "11": {
        id: 11,
        label: "STORY",
        title: "Team 'Courtroom Cartel' Secures First Prize in Smart India Hackathon 2023",
        date: "DEC 20, 2023",
        color: "border-emerald-500",
        bgImage: "/campus/campus-panoramic-field.webp",
        summary: "Student team 'Courtroom Cartel' from MSIT won the first prize in Smart India Hackathon 2023.",
        content: `
            <p class="mb-6">Student developer team "Courtroom Cartel" representing Maharaja Surajmal Institute of Technology won the 1st prize in the national Smart India Hackathon (SIH) 2023 Grand Finale.</p>
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Competitions Highlights</h3>
            <p class="mb-6">Additionally, fellow MSIT team "Semicolon" secured 2nd place in SIH 2023, showcasing the institution's strong competitive programming and problem-solving culture.</p>
        `,
        attachments: [],
        links: [
            { name: "MSIT Homepage", url: "https://msit.in/" }
        ]
    },
    "12": {
        id: 12,
        label: "ACADEMICS",
        title: "MSIT Academic Calendar & Examination Schedule Released for 2026 Sessions",
        date: "APR 05, 2026",
        color: "border-indigo-600",
        bgImage: "/campus/central-library-hall.webp",
        summary: "Official academic calendar, mid-term datesheets, semester break timings, and university end-term examination guidelines published for B.Tech students.",
        content: `
            <p class="mb-6">The Office of the Dean of Academic Affairs at Maharaja Surajmal Institute of Technology has officially notified the approved <strong>Academic Calendar for the 2026 Academic Session</strong> in strict concordance with Guru Gobind Singh Indraprastha University (GGSIPU) statutory norms.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Semester Timelines & Key Deadlines</h3>
            <p class="mb-6">The calendar schedules comprehensive instructional lecture weeks, continuous internal evaluation dates, laboratory project submissions, and preparatory study leaves leading directly into the university end-term practical and theory examinations.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Examination Ordinance & Attendance Thresholds</h3>
            <p class="mb-6">Students are reminded that the <strong>75% minimum attendance rule</strong> under GGSIPU Ordinance 11 is mandatory for appearing in mid-term and semester end-term tests. Departmental mentors and class coordinators will review bi-weekly attendance rosters.</p>
        `,
        attachments: [
            { name: "Official MSIT Academic Calendar 2026.pdf", size: "1.4 MB", url: "/academic-calendar" },
            { name: "Internal Evaluation Guidelines & Marks Weightage.pdf", size: "850 KB", url: "/academic-calendar" }
        ],
        links: [
            { name: "View Full Academic Calendar Page", url: "/academic-calendar" },
            { name: "Syllabus Index & Course Schemes", url: "/syllabus" },
            { name: "Time Table & Lecture Schedules", url: "/timetable" }
        ]
    },
    "13": {
        id: 13,
        label: "ACADEMICS",
        title: "GGSIPU Curriculum Upgrade: Advanced AI, Cloud Architecture & Autonomous Electives Adopted",
        date: "MAR 18, 2026",
        color: "border-indigo-600",
        bgImage: "/campus/main-academic-building.webp",
        summary: "Curriculum overhaul across CSE, IT, ECE, and EEE departments introduces industry-aligned electives, quantum computing fundamentals, and autonomous project credits.",
        content: `
            <p class="mb-6">In accordance with the National Education Policy (NEP 2020) and AICTE Model Curriculum recommendations, MSIT has integrated enhanced departmental curricula across all 4 undergraduate engineering disciplines.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">New Advanced Elective Tracks</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Generative AI & LLM Systems:</strong> Deep learning architectures, transformer attention models, and scalable GPU inference.</li>
                <li><strong>Cloud Architecture & DevSecOps:</strong> Distributed systems design, Kubernetes orchestration, and automated CI/CD pipelines.</li>
                <li><strong>VLSI Chip Design & Semiconductor Engineering:</strong> Verilog HDL prototyping and ASIC testing in the MSIT IDEA Lab.</li>
                <li><strong>Electric Vehicles & Clean Grid Systems:</strong> Battery management controllers and modern smart grid automation.</li>
            </ul>
        `,
        attachments: [
            { name: "Updated B.Tech Scheme & Syllabus Framework.pdf", size: "3.2 MB", url: "/syllabus" }
        ],
        links: [
            { name: "Department of Computer Science & Engineering (CSE)", url: "/cse" },
            { name: "Department of Information Technology (IT)", url: "/it" },
            { name: "Syllabus Index", url: "/syllabus" }
        ]
    },
    "14": {
        id: 14,
        label: "ADMISSIONS",
        title: "Admissions Open for B.Tech Batch 2026–30: Information Brochure & Counseling Schedule",
        date: "APR 02, 2026",
        color: "border-amber-600",
        bgImage: "/campus/msit-main-gate.webp",
        summary: "Complete admission guidelines, seat matrix for 1st & 2nd shift programs, GGSIPU CET / JEE Main cutoff trends, and online application portal are now active.",
        content: `
            <p class="mb-6">Maharaja Surajmal Institute of Technology, ranked consistently among the top tier engineering colleges affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), announces admissions for the <strong>B.Tech Class of 2026–2030</strong>.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Programs Offered & Seat Matrix</h3>
            <p class="mb-6">Admissions are conducted across two shifts: <strong>First Shift (Morning)</strong> and <strong>Second Shift (Evening)</strong> across CSE, IT, ECE, and EEE programs with a total annual sanctioned intake of 840 seats.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Counseling & Eligibility Criteria</h3>
            <p class="mb-6">Candidates must qualify in JEE Main (Paper 1) conducted by the National Testing Agency (NTA) and register on the central GGSIPU online counseling portal. Detailed cutoff trends and seat reservation rules are provided in the official information brochure.</p>
        `,
        attachments: [
            { name: "MSIT Information Bulletin 2026-27.pdf", size: "5.6 MB", url: "/brochure" },
            { name: "Seat Matrix & Cutoff Trends (2023-2025).pdf", size: "1.2 MB", url: "/brochure" }
        ],
        links: [
            { name: "Information Brochure & Seat Matrix", url: "/brochure" },
            { name: "Online Fee Payment Portal", url: "/online-fee" },
            { name: "GGSIPU Admissions Portal", url: "https://ipu.admissions.nic.in" }
        ]
    },
    "15": {
        id: 15,
        label: "ADMISSIONS",
        title: "MSIT Merit-cum-Means Scholarships & Financial Assistance Schemes Announced for 2026-27",
        date: "MAR 12, 2026",
        color: "border-amber-600",
        bgImage: "/campus/foundation-stone-plaque.webp",
        summary: "Institutional scholarships, EWS fee waivers, and Delhi Government financial assistance portals open with awards up to 100% tuition coverage for deserving scholars.",
        content: `
            <p class="mb-6">Surajmal Memorial Education Society (SMES) and MSIT administration reinforce our enduring mission that financial constraints should never hinder academic excellence. The scholarship application window for academic year 2026-27 is now officially open.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Available Financial Aid Categories</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li><strong>SMES Merit-cum-Means Scholarship:</strong> Financial assistance for academically high-achieving students with family income under ₹2.5 LPA.</li>
                <li><strong>Delhi Govt. Merit-cum-Means Scheme:</strong> Up to 100% tuition fee waiver for EWS category students and 50% waiver for eligible income slabs.</li>
                <li><strong>Special Branch Excellence Awards:</strong> Awarded to university rank-holders and department toppers each semester.</li>
            </ul>
        `,
        attachments: [
            { name: "Scholarship Guidelines & Application Form.pdf", size: "980 KB", url: "/scholarships" }
        ],
        links: [
            { name: "Scholarships & Financial Aid Overview", url: "/scholarships" },
            { name: "Delhi Government e-District Portal", url: "https://edistrict.delhigovt.nic.in" }
        ]
    },
    "16": {
        id: 16,
        label: "PLACEMENTS",
        title: "MSIT 2026 Placement Season Reaches ₹1.2 Cr International Offer & 95%+ Placement Rate",
        date: "MAR 28, 2026",
        color: "border-rose-600",
        bgImage: "/campus-excellence.webp",
        summary: "Over 250+ top global recruiters including Google, Amazon, Microsoft, Apple, and ION Trading extend 850+ job offers to graduating engineers.",
        content: `
            <p class="mb-6">The Training and Placement Cell (T&P) of Maharaja Surajmal Institute of Technology is delighted to report record-breaking corporate hiring statistics for the graduating engineering batch of 2026.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Placement Milestones</h3>
            <p class="mb-6">This season achieved an all-time peak international package of <strong>₹1.2 Crore per annum</strong>, an average package of <strong>₹8.5 LPA</strong>, and domestic top compensation reaching ₹45+ LPA. More than 250 marquee employers participated in on-campus and hybrid hiring rounds.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Prominent Recruiters</h3>
            <p class="mb-6">Leading software engineering, quantitative finance, semiconductor, and consulting firms including Google, Microsoft, Amazon, Adobe, ION Trading, Postman, Samsung R&D, ZS Associates, and Cisco recruited extensively from MSIT.</p>
        `,
        attachments: [
            { name: "Annual Placement Report & Salary Statistics 2026.pdf", size: "2.8 MB", url: "/placements" }
        ],
        links: [
            { name: "Full Placements Statistics & Records", url: "/placements" },
            { name: "Alumni Network & Career Mentorship", url: "/alumni-network" }
        ]
    },
    "17": {
        id: 17,
        label: "PLACEMENTS",
        title: "Summer Internship Drive 2026: 180+ Pre-Placement Offers (PPOs) Bagged by 3rd-Year Engineers",
        date: "FEB 20, 2026",
        color: "border-rose-600",
        bgImage: "/campus/student-gathering-courtyard.webp",
        summary: "MSIT Training & Placement Cell concludes high-stipend corporate internship hiring with premier software, semiconductor, and fintech firms.",
        content: `
            <p class="mb-6">The MSIT Industry-Institute Interaction & Internship Cell (IIIC) has wrapped up its summer recruitment drive with 180+ pre-placement offers (PPOs) and high-stipend summer internships for pre-final year students.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Industry Exposure & Stipend Benchmarks</h3>
            <p class="mb-6">Students secured monthly stipends reaching up to <strong>₹1.5 Lakh per month</strong> across top-tier multinational software development labs, quant trading firms, and AI research startups.</p>
        `,
        attachments: [
            { name: "Internship Policy & Guidelines.pdf", size: "750 KB", url: "/internship-cell" }
        ],
        links: [
            { name: "MSIT IIIC & Internship Cell Portal", url: "/internship-cell" },
            { name: "Placements Overview", url: "/placements" }
        ]
    },
    "18": {
        id: 18,
        label: "NOTICES",
        title: "Urgent Examination Notice: End-Term Theory & Practical Datesheet Published",
        date: "APR 08, 2026",
        color: "border-sky-600",
        bgImage: "/campus/campus-pathway-block.webp",
        summary: "All regular and reappear candidates are instructed to review the official university datesheet, verify admit cards, and note hall ticket release dates.",
        content: `
            <p class="mb-6">The Office of the Controller of Examinations has officially released the detailed datesheet for the <strong>End-Term Theory & Practical Examinations (May–June 2026)</strong> for all B.Tech branches.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Examination Hall Regulations</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
                <li>Candidates must carry their printed <strong>Admit Card</strong> along with their official Institute Identity Card.</li>
                <li>Entry to examination halls closes strictly 15 minutes before exam commencement.</li>
                <li>Electronic gadgets, smartwatches, and programmable calculators are strictly prohibited inside the hall.</li>
            </ul>
        `,
        attachments: [
            { name: "End-Term Theory & Practical Datesheet (May-June 2026).pdf", size: "1.9 MB", url: "/academic-calendar" },
            { name: "Examination Center Guidelines & Code of Conduct.pdf", size: "640 KB", url: "/academic-calendar" }
        ],
        links: [
            { name: "Academic Calendar & Examination Ordinance", url: "/academic-calendar" },
            { name: "Student Login Portal", url: "https://examweb.ggsipu.ac.in" }
        ]
    },
    "19": {
        id: 19,
        label: "NOTICES",
        title: "Mandatory Notice regarding 75% Attendance Compliance for Examination Eligibility",
        date: "MAR 15, 2026",
        color: "border-sky-600",
        bgImage: "/campus/main-academic-building.webp",
        summary: "In accordance with GGSIPU Ordinance 11, students falling below statutory attendance thresholds must submit medical documentation to HOD offices immediately.",
        content: `
            <p class="mb-6">All students of B.Tech 1st, 2nd, 3rd, and 4th years are hereby notified that the minimum attendance requirement of <strong>75% in all registered theory and laboratory courses</strong> is statutory under GGSIPU Ordinance 11.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Medical Certificate Submission</h3>
            <p class="mb-6">Students whose attendance has been impacted by medical illness or hospitalization must submit authenticated medical certificates counter-signed by guardians to their respective department HODs within 7 working days.</p>
        `,
        attachments: [
            { name: "GGSIPU Ordinance 11 Attendance Regulations.pdf", size: "520 KB", url: "/attendance" }
        ],
        links: [
            { name: "Attendance Rules & Criteria", url: "/attendance" },
            { name: "Student Grievance Redressal Committee", url: "/student-grievance" }
        ]
    },
    "20": {
        id: 20,
        label: "RESEARCH",
        title: "MSIT Faculty & Scholars Publish 45+ Research Papers in IEEE, Springer & Scopus Q1 Journals",
        date: "MAR 10, 2026",
        color: "border-teal-600",
        bgImage: "/campus-lab.webp",
        summary: "Significant academic milestone in generative AI, VLSI chip architecture, biomedical robotics, and clean renewable energy systems by MSIT research teams.",
        content: `
            <p class="mb-6">Maharaja Surajmal Institute of Technology congratulates faculty members, doctoral scholars, and undergraduate researchers for achieving a record milestone of <strong>45+ peer-reviewed publications</strong> in top-tier IEEE, Springer, Elsevier, and Scopus Q1 indexed journals during this academic cycle.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Interdisciplinary Breakthroughs</h3>
            <p class="mb-6">Published investigations span high-impact domains including federated learning for privacy-preserving healthcare analytics, neuromorphic hardware accelerators, multi-agent reinforcement learning for UAV swarms, and high-efficiency perovskite photovoltaic materials.</p>
        `,
        attachments: [
            { name: "Faculty Research Compendium & Citation Index 2026.pdf", size: "3.5 MB", url: "/research" }
        ],
        links: [
            { name: "Research & Publications Hub", url: "/research" },
            { name: "SPARK Student Think Tank", url: "/society-spark" }
        ]
    }
};

const NewsDetail = () => {
    const { id } = useParams();
    // CMS updates and events have ids "u-<slug>" / "e-<slug>" and are read from the CMS.
    const isCms = isCmsNewsId(id);
    const cmsItem = useCmsNewsItem(id);

    // Retrieve from local storage to allow admin-published news/events
    const storedEvents = typeof window !== 'undefined' ? (localStorage.getItem('msit_events_v4') || localStorage.getItem('msit_events_v3') || localStorage.getItem('msit_events_v2') || localStorage.getItem('msit_events')) : null;
    const localEventsList = storedEvents ? JSON.parse(storedEvents) : [];
    const localItem = localEventsList.find(e => String(e.id) === String(id));
    const dbItem = newsDb[id] || {};
    
    if (isCms && cmsItem === undefined) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <p className="text-slate-500">Loading…</p>
            </main>
        );
    }

    // Merge: if localItem exists, prioritize local properties but ensure content, attachments, links, and images fall back to dbItem
    const item = isCms ? (cmsItem || null) : localItem ? {
        ...dbItem,
        ...localItem,
        content: (localItem.content && localItem.content.trim()) ? localItem.content : (dbItem.content || `<p class="text-slate-600 leading-relaxed font-medium">${localItem.summary || localItem.title}</p>`),
        attachments: (localItem.attachments && localItem.attachments.length > 0) ? localItem.attachments : (dbItem.attachments || []),
        links: (localItem.links && localItem.links.length > 0) ? localItem.links : (dbItem.links || []),
        bgImage: localItem.bgImage || localItem.image || dbItem.bgImage || '/campus/main-academic-building.webp'
    } : (newsDb[id] || null);

    if (!item) {
        return (
            <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
                <p className="text-slate-500 mb-6">The news article or event story you are looking for does not exist.</p>
                <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl transition-all shadow-md">
                    Back to Home
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 transition-colors duration-300">
            <SEO 
                title={item.title} 
                description={item.summary} 
                canonicalPath={`/news-event/${id}`} 
            />

            <PageHero 
                title={item.label}
                accentTitle="Article Detail"
                description={item.title}
                breadcrumbs={[
                    { label: 'News & Events', url: '/' },
                    { label: item.label }
                ]}
                heroImage={item.bgImage}
                heroImageAlt={item.title}
            />

            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Main Content Area */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
                            {/* Meta Bar */}
                            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-500 mb-8 border-b border-slate-100 pb-6">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {item.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-primary" />
                                    {item.label}
                                </span>
                                <div className="ml-auto flex gap-4">
                                    <button onClick={() => window.print()} className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer" aria-label="Print article">
                                        <Printer className="w-4 h-4" /> Print
                                    </button>
                                </div>
                            </div>

                            {/* Heading */}
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-8">
                                {item.title}
                            </h2>

                            {/* HTML Content; CMS items render their rich text as React elements, never raw HTML */}
                            {item.richText ? (
                                <article className="max-w-none text-slate-600 text-lg leading-relaxed font-medium space-y-6 [&_h2]:text-2xl [&_h3]:text-2xl [&_:is(h2,h3)]:font-bold [&_:is(h2,h3)]:text-slate-900 [&_:is(h2,h3)]:mt-10 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline">
                                    <RichText data={item.richText} />
                                </article>
                            ) : (
                                <article
                                    className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium [&_h3]: [&_strong]:"
                                    dangerouslySetInnerHTML={{ __html: item.content || "" }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Links & PDFs */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        {/* Attachments Section */}
                        {item.attachments && item.attachments.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Official Attachments (PDFs)
                                </h3>
                                <div className="space-y-4">
                                    {item.attachments.map((file, idx) => (
                                        <a 
                                            key={idx}
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="flex items-start gap-4 p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-2xl group transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="text-sm font-semibold text-slate-800 truncate group-hover:text-primary transition-colors">{file.name}</div>
                                                <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{file.size}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Resource Links Section */}
                        {item.links && item.links.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                    <Link2 className="w-5 h-5 text-primary" />
                                    Related Resources
                                </h3>
                                <div className="space-y-3">
                                    {item.links.map((link, idx) => (
                                        link.url.startsWith('http') ? (
                                            <a 
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl group transition-all text-sm font-semibold text-slate-700 hover:text-primary"
                                            >
                                                <span>{link.name}</span>
                                                <Link2 className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                            </a>
                                        ) : (
                                            <Link 
                                                key={idx}
                                                to={link.url}
                                                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl group transition-all text-sm font-semibold text-slate-700 hover:text-primary"
                                            >
                                                <span>{link.name}</span>
                                                <Link2 className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back To Home CTA */}
                        <div className="p-8 rounded-3xl bg-slate-900 border border-transparent text-white shadow-sm flex flex-col justify-between h-48">
                            <div>
                                <h4 className="text-lg font-bold mb-2">Back to Newsroom</h4>
                                <p className="text-slate-400 text-xs leading-relaxed font-semibold">Want to read other college updates or look up active events?</p>
                            </div>
                            <Link to="/" className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Go Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NewsDetail;
