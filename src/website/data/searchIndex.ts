import { facultyMembers } from './facultyData';
import { pagesData } from './pagesData';
import { labData, campusInfrastructure } from './facilitiesData';
import { tourLocations } from './virtualTourData';
import { societiesData } from './societiesData';
import { slugify, createSlugifier } from '../utils/slugify';

type SearchEntry = {
    title: string;
    url: string;
    keywords?: string;
    body?: string;
};

/**
 * Strips HTML tags, decodes common entities, and normalizes whitespace.
 */
function stripHtml(html: string | null | undefined): string {
    if (!html || typeof html !== 'string') return '';
    return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Helper to limit plain text to ~1,200 chars for index compactness
 */
function truncateText(text: string | null | undefined, limit = 1200): string {
    if (!text) return '';
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= limit) return clean;
    return clean.slice(0, limit);
}

/**
 * Static core routes for primary site navigation
 */
const staticPages: SearchEntry[] = [
    { title: "Home", url: "/", keywords: "home, main, mainpage, index, maharaja surajmal institute of technology, msit" },
    { title: "Faculty & Staff Directory", url: "/faculty", keywords: "faculty, teachers, staff, directory, prof, assistant, associate, hod, dean, professors" },
    { title: "Academic Calendar", url: "/academic-calendar", keywords: "calendar, dates, exams, holidays, schedule, academic, mid term, end term" },
    { title: "Syllabus Index", url: "/syllabus", keywords: "syllabus, curriculum, course, subjects, study, btech, cse, it, ece, eee" },
    { title: "Time Table", url: "/timetable", keywords: "timetable, schedule, classes, periods, timing, section, routine" },
    { title: "Information Bulletin (Brochure)", url: "/brochure", keywords: "brochure, bulletin, admissions, booklet, prospectus, seat matrix, eligibility" },
    { title: "Online Fee Payment", url: "/online-fee", keywords: "fees, payment, online, tuition, transaction, portal, bank, fee structure" },
    { title: "Placements Overview", url: "/placements", keywords: "placements, jobs, salary, companies, recruit, package, highest package, average package" },
    { title: "Industry-Institute Interaction Cell (IIIC) & Internship Cell", url: "/internship-cell", keywords: "iiic, industry institute interaction cell, internship cell, internships, training, summer, stipend, cell, industry training, aicte portal, noc, ppo, mous" },
    { title: "Scholarships & Financial Aid", url: "/scholarships", keywords: "scholarships, aid, financial, grant, support, fee waiver, ews" },
    { title: "Student Societies & Clubs", url: "/society", keywords: "societies, clubs, techsoc, iosd, cultural, extracurricular, student life, music, dance, drama" },
    { title: "Institution's Innovation Council (IIC MSIT)", url: "/iic", keywords: "iic, institute innovation council, innovation council, moe, mic, mhrd, 4-star, hackathon, sudesh pahal" },
    { title: "IEEE Student Branch", url: "/society-ieee", keywords: "ieee, society, branch, research, networking, student chapter" },
    { title: "NDLI Club", url: "/society-ndli", keywords: "ndli, club, library, digital library, event registration, national digital library, society, student chapter" },
    { title: "GeekRoom MSIT", url: "/society-geekroom", keywords: "geekroom, geek room, hackathon, coding, tech community, web development, app development, ai, ml, society, techsoc" },
    { title: "eCell & Incubation Cell", url: "/society-ecell", keywords: "ecell, e-cell, incubation, startup, entrepreneurship, nisp, investor, pitch, business, funding, lab 218" },
    { title: "Unnat Bharat Abhiyan (UBA) Cell", url: "/society-uba", keywords: "uba, unnat bharat abhiyan, rural development, social responsibility, village survey, community service, nss, adopted villages" },
    { title: "SPARK Research Hub", url: "/society-spark", keywords: "spark, research, think tank, papers, ieee, scopus, grants, publication, latex, student research" },
    { title: "Research & Publications", url: "/research", keywords: "research, journals, papers, patents, projects, publications, scopus, ieee" },
    { title: "Events & News", url: "/events", keywords: "events, news, updates, festivals, notices, hackathons, workshops" },
    { title: "Alumni Network", url: "/alumni-network", keywords: "alumni, meet, network, seniors, graduation, passout" },
    { title: "Result & Student Login Portal", url: "https://examweb.ggsipu.ac.in/web/login.jsp", keywords: "student, login, result, results, marks, grades, exam, examweb, ggsipu" },
    { title: "Attendance Rules", url: "/attendance", keywords: "attendance, rules, policy, criteria, leave, medical, detention, 75%" },
    { title: "Privacy Policy", url: "/privacy", keywords: "privacy, policy, data, security, terms" },
    { title: "Terms of Use", url: "/terms", keywords: "terms, conditions, use, legal, agreement" },
    { title: "Anti-Ragging Guidelines", url: "/antiragging", keywords: "antiragging, ragging, policy, safety, discipline, helpline" },
    { title: "Disaster Management", url: "/disaster", keywords: "disaster, management, safety, emergency, drill, fire safety" },
    { title: "Student Discipline Committee", url: "/discipline", keywords: "discipline, rules, conduct, behavior, suspension, code of conduct" },
    { title: "Student Grievance Redressal Committee (SGRC)", url: "/student-grievance", keywords: "grievance, sgrc, complaint, academic, marks, fee, harassment, ombudsman, aicte" },
    { title: "Meet the Core Team", url: "/team", keywords: "team, developers, project, creators, website, jayant, pawan, abhay" },
    { title: "Website Sitemap", url: "/sitemap", keywords: "sitemap, directory, index, all pages, navigation" }
];

/**
 * Builds page and section entries from pagesData
 */
const dynamicPages: SearchEntry[] = [];
const dynamicSections: SearchEntry[] = [];

Object.entries(pagesData).forEach(([slug, data]) => {
    const rawContent = data.content || '';
    const plainBody = stripHtml(rawContent);

    // 1. Whole Page Entry
    dynamicPages.push({
        title: data.title,
        url: `/${slug}`,
        keywords: [
            data.title,
            data.subtitle,
            data.category,
            data.seo_description,
            ...(data.bulletPoints || []).map(b => (typeof b === 'string' ? b : `${b.label || ''} ${b.detail || ''}`))
        ].filter(Boolean).join(", ").toLowerCase(),
        body: truncateText(plainBody)
    });

    // 2. Headings Entries (<h3> / <h4>)
    if (rawContent) {
        const getSlug = createSlugifier();
        // Regex matches each h3 or h4 block and its content until the next heading or end
        const headingRegex = /<(h[34])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>([\s\S]*?)(?=(?:<h[34]|\s*$))/gi;
        let match;
        while ((match = headingRegex.exec(rawContent)) !== null) {
            const rawHeading = match[2];
            const sectionContent = match[3];
            const headingText = stripHtml(rawHeading);
            if (!headingText) continue;

            const anchorId = getSlug(headingText);
            const sectionBody = stripHtml(sectionContent);

            dynamicSections.push({
                title: `${headingText} · ${data.title}`,
                url: `/${slug}#${anchorId}`,
                keywords: [headingText, data.title, data.category].filter(Boolean).join(", ").toLowerCase(),
                body: truncateText(`${headingText}. ${sectionBody}`)
            });
        }
    }
});

/**
 * Facilities & Infrastructure Entries
 */
const facilityEntries = [
    // Library
    {
        title: "Central Library · Campus Facilities",
        url: "/facilities?tab=library#central-library",
        keywords: "central library, library, books, reading room, koha, opac, journals, book bank, ndli",
        body: truncateText(`${campusInfrastructure.library.title}. ${campusInfrastructure.library.description} ${campusInfrastructure.library.features.join('. ')}`)
    },
    // Hostel
    {
        title: "Hostel Accommodation · Campus Facilities",
        url: "/facilities?tab=library#hostel",
        keywords: "hostel, boys hostel, girls hostel, accommodation, residential, mess, rooms",
        body: truncateText(`${campusInfrastructure.hostel.title}. ${campusInfrastructure.hostel.description} ${campusInfrastructure.hostel.amenities.join('. ')}`)
    },
    // Sports Grounds
    {
        title: "Sports & Athletic Grounds · Campus Facilities",
        url: "/facilities?tab=library#sports",
        keywords: "sports, grounds, football, cricket, basketball, volleyball, badminton, athletics, sphurti, playground",
        body: truncateText(`${campusInfrastructure.sports.title}. ${campusInfrastructure.sports.description} ${campusInfrastructure.sports.facilities.join('. ')}`)
    },
    // Medical Center
    {
        title: "Campus Medical Room & Emergency Care · Facilities",
        url: "/facilities?tab=library#medical",
        keywords: "medical, emergency, health care, doctor, first aid, clinic, ambulance, hospital",
        body: truncateText(`${campusInfrastructure.medical.title}. ${campusInfrastructure.medical.description} ${campusInfrastructure.medical.facilities.join('. ')}`)
    },
    // Canteen
    {
        title: "Campus Canteen & Cafeteria",
        url: "/virtual-tour#tree-shaded-canteen-and-food-kiosk",
        keywords: "canteen, cafeteria, food, meals, snacks, mess, dining, kiosk, tea",
        body: truncateText(`${campusInfrastructure.canteen.description} Capacity: ${campusInfrastructure.canteen.capacity}. Tree-shaded campus food kiosk offering wholesome meals, refreshments and snacks.`)
    },
    // Banking & ATM
    {
        title: "On-Campus Banking & ATM · Facilities",
        url: "/facilities?tab=library",
        keywords: "bank, banking, atm, cash, financial, transaction",
        body: truncateText(`${campusInfrastructure.banking.name}. ${campusInfrastructure.banking.description}`)
    }
];

/**
 * Lab Entries from labData
 */
const labEntries = labData.map(lab => ({
    title: `${lab.name} (${lab.labNo}) · Facilities`,
    url: `/facilities?tab=labs#${lab.id}`,
    keywords: [lab.name, lab.labNo, lab.dept, ...(lab.software || []), ...(lab.subjects || []).map(s => `${s.code} ${s.name}`)].filter(Boolean).join(", ").toLowerCase(),
    body: truncateText(`${lab.name} ${lab.labNo} ${lab.dept}. ${lab.description} Config: ${lab.systemConfig?.desktop || ''} ${lab.systemConfig?.server || ''} Software: ${(lab.software || []).join(', ')}`)
}));

/**
 * Virtual Tour Hotspot Entries
 */
const tourEntries = tourLocations.map(loc => ({
    title: `${loc.title} · Virtual Tour`,
    url: `/virtual-tour#${slugify(loc.title)}`,
    keywords: [loc.title, loc.category, ...(loc.highlights || [])].filter(Boolean).join(", ").toLowerCase(),
    body: truncateText(`${loc.title} (${loc.category}). ${loc.description} ${loc.highlights.join('. ')}`)
}));

/**
 * Society Section Entries
 */
const societySectionEntries: SearchEntry[] = [];
Object.entries(societiesData).forEach(([socSlug, soc]) => {
    // About
    if (soc.detailedAbout || soc.overview) {
        societySectionEntries.push({
            title: `About ${soc.name}`,
            url: `/${socSlug}#about`,
            keywords: `${soc.name}, ${soc.shortName}, about, overview`,
            body: truncateText(`${soc.name}. ${soc.overview || ''} ${soc.detailedAbout || ''}`)
        });
    }
    // Objectives
    if (soc.objectives && soc.objectives.length > 0) {
        societySectionEntries.push({
            title: `Objectives · ${soc.name}`,
            url: `/${socSlug}#objectives`,
            keywords: `${soc.name}, objectives, mission, vision`,
            body: truncateText(`${soc.name} Objectives: ${soc.objectives.join('. ')}`)
        });
    }
    // Events: a society may keep an array or { upcoming, past }.
    const events = soc.events;
    const eventList = Array.isArray(events) ? events : events?.upcoming ? [events.upcoming] : [];
    if (eventList.length > 0) {
        societySectionEntries.push({
            title: `Events · ${soc.name}`,
            url: `/${socSlug}#events`,
            keywords: `${soc.name}, events, hackathons, workshops`,
            body: truncateText(`${soc.name} Events: ${eventList.map((e: any) => `${e.title || ''} ${e.desc || ''}`).join('. ')}`)
        });
    }
    // People
    if (soc.people) {
        societySectionEntries.push({
            title: `People & Team · ${soc.name}`,
            url: `/${socSlug}#people`,
            keywords: `${soc.name}, people, team, coordinators, president`,
            body: truncateText(`${soc.name} Coordinators: Faculty ${soc.people.faculty?.name || ''}, Student ${soc.people.student?.name || ''}`)
        });
    }
});

// Combine static & dynamic pages and sections, deduplicating by URL
const pageMap = new Map<string, SearchEntry>();
[
    ...staticPages,
    ...dynamicPages,
    ...dynamicSections,
    ...facilityEntries,
    ...labEntries,
    ...tourEntries,
    ...societySectionEntries
].forEach(page => {
    if (!pageMap.has(page.url)) {
        pageMap.set(page.url, page);
    } else {
        const existing = pageMap.get(page.url);
        if (!existing) {
            pageMap.set(page.url, page);
            return;
        }
        pageMap.set(page.url, {
            ...existing,
            keywords: `${existing.keywords || ''}, ${page.keywords || ''}`,
            body: existing.body || page.body || ''
        });
    }
});

const generatedPages = Array.from(pageMap.values());

/**
 * Dynamically generated faculty index from facultyData.js
 * REMOVED f.bio from keywords to prevent spurious substring matches (e.g., "background")
 */
const generatedFaculty = facultyMembers.map(f => ({
    id: f.id,
    name: f.name,
    role: f.role,
    dept: f.dept || "Faculty",
    img: f.img,
    email: f.email,
    qual: f.qual,
    url: `/faculty?id=${f.id}`,
    keywords: [
        f.name,
        f.role,
        f.dept,
        f.email,
        f.qual,
        ...(f.goodAt || [])
    ].filter(Boolean).join(" ").toLowerCase()
}));

/**
 * Curated Q&A entries
 */
export const qaData = [
    {
        q: "Where is MSIT located?",
        a: "Maharaja Surajmal Institute of Technology is at C-4 Janakpuri, New Delhi. The campus is 2.5km from Janakpuri West Metro Station.",
        keywords: "address, location, place, office, route, map, janakpuri, metro, new delhi"
    },
    {
        q: "How to contact the college?",
        a: "For immediate assistance, please contact the Administration Office at MSIT Janakpuri. Phone: 011-45037193 or Email: director@msit.in",
        keywords: "phone, inquiry, help, call, contact, mobile, mail, email, address"
    },
    {
        q: "What are the B.Tech programs offered?",
        a: "MSIT offers B.Tech in Computer Science & Engineering (CSE), Information Technology Engineering (IT), Electronics & Communication Engineering (ECE), and Electrical & Electronics Engineering (EEE).",
        keywords: "courses, branches, majors, btech, stream, degree, cse, it, ece, eee, admissions"
    },
    {
        q: "What is the highest placement package?",
        a: "MSIT has a stellar placement record, with the highest package reaching over 50 LPA at top recruiters like Google, Microsoft, and Amazon. The average package is around 8-9 LPA.",
        keywords: "placements, jobs, salary, package, highest, average, careers, lpa, recruiters, amazon, google, microsoft"
    },
    {
        q: "How to pay college fees online?",
        a: "Fees can be paid online through the Online Fee Payment portal at /online-fee using net banking, UPI, or debit/credit cards.",
        keywords: "fee, online, payment, pay, banking, cost, tuition, upi, portal"
    },
    {
        q: "Where can I find the exam syllabus?",
        a: "The syllabus for all engineering courses is available at /syllabus. You can select your branch (CSE, IT, ECE, EEE) to download it.",
        keywords: "syllabus, exam, curriculum, study, download, courses, subjects, ipu, ggsipu"
    },
    {
        q: "What societies and clubs are active at MSIT?",
        a: "MSIT has vibrant student societies including TechSoc, IOSD (Software), IEEE Student Branch, and cultural clubs for dance, music, and drama. Explore them at /society.",
        keywords: "societies, clubs, technical, dance, music, extracurricular, active, techsoc, iosd, ieee"
    }
];

/**
 * Curated news, events, notices and categorized updates for site-wide discovery
 */
export const searchEvents = [
    {
        id: 12,
        title: "MSIT Academic Calendar & Examination Schedule Released for 2026 Sessions",
        label: "ACADEMICS",
        category: "Academics",
        date: "APR 05, 2026",
        url: "/academic-calendar",
        summary: "Official academic calendar, mid-term datesheets, semester break timings, and university end-term examination guidelines published for B.Tech students.",
        keywords: "academics, academic calendar, datesheet, exams, evaluation, schedule, syllabus, classes"
    },
    {
        id: 13,
        title: "GGSIPU Curriculum Upgrade: Advanced AI, Cloud Architecture & Autonomous Electives Adopted",
        label: "ACADEMICS",
        category: "Academics",
        date: "MAR 18, 2026",
        url: "/syllabus",
        summary: "Curriculum overhaul across CSE, IT, ECE, and EEE departments introduces industry-aligned electives, quantum computing fundamentals, and autonomous project credits.",
        keywords: "academics, curriculum, syllabus, electives, ai, cloud, btech, cse, it, ece, eee"
    },
    {
        id: 14,
        title: "Comprehensive Student Attendance Mandate under GGSIPU Ordinance 11 Released",
        label: "NOTICES",
        category: "Notices",
        date: "MAR 10, 2026",
        url: "/attendance",
        summary: "Statutory 75% attendance threshold notification issued. Strict advisory regarding university examination debarment, medical leave verification, and detention procedures.",
        keywords: "attendance, 75%, detention, notices, ordinance 11, rules, eligibility, admit card"
    },
    {
        id: 15,
        title: "Annual Mega Placement Drive: 850+ Offers Recorded, Top CTC Reaches 52 LPA",
        label: "CAREERS",
        category: "Placements",
        date: "FEB 28, 2026",
        url: "/placements",
        summary: "Major recruiters including Google, Amazon, Atlassian, Adobe, and Infosys visit MSIT campus for 2026 batch recruitment with record packages.",
        keywords: "placements, jobs, offers, ctc, recruit, companies, amazon, google, highest package"
    },
    {
        id: 16,
        title: "Avensis 2026: North India's Premier Technical & Robotics Symposium Kicks Off",
        label: "EVENT",
        category: "Events",
        date: "APR 15, 2026",
        url: "/events",
        summary: "Over 5,000 engineering students from across the country compete in 30+ cutting-edge technical events, hackathons, and robo-wars at MSIT campus.",
        keywords: "events, avensis, fest, technical, hackathon, competition, robo-wars, festival"
    },
    {
        id: 17,
        title: "Genesis 2026: Annual Cultural & Arts Extravaganza Scheduled for April 22-23",
        label: "EVENT",
        category: "Events",
        date: "APR 22, 2026",
        url: "/events",
        summary: "MSIT's celebrated cultural extravaganza returns featuring star celebrity night, battle of the bands, classical dances, street theatre, and creative exhibitions.",
        keywords: "events, genesis, cultural, fest, dance, music, celebrity, festival, battle of bands"
    },
    {
        id: 18,
        title: "Urgent Examination Notice: End-Term Theory & Practical Datesheet Published",
        label: "NOTICES",
        category: "Notices",
        date: "APR 08, 2026",
        url: "/news-event/18",
        summary: "All regular and reappear candidates are instructed to review the official university datesheet, verify admit cards, and note hall ticket release dates.",
        keywords: "notices, examination, datesheet, hall ticket, circular, exams, practical, theory"
    },
    {
        id: 19,
        title: "Mandatory Notice regarding 75% Attendance Compliance for Examination Eligibility",
        label: "NOTICES",
        category: "Notices",
        date: "MAR 15, 2026",
        url: "/attendance",
        summary: "In accordance with GGSIPU Ordinance 11, students falling below statutory attendance thresholds must submit medical documentation to HOD offices immediately.",
        keywords: "notices, attendance, 75%, detention, medical, ordinance 11, rules, eligibility"
    },
    {
        id: 20,
        title: "MSIT Faculty & Scholars Publish 45+ Research Papers in IEEE, Springer & Scopus Q1 Journals",
        label: "RESEARCH",
        category: "Research",
        date: "MAR 10, 2026",
        url: "/research",
        summary: "Significant academic milestone in generative AI, VLSI chip architecture, biomedical robotics, and clean renewable energy systems by MSIT research teams.",
        keywords: "research, papers, publications, scopus, ieee, journals, patents, citations"
    },
    {
        id: 1,
        title: "Department of CSE receives CSR Research Grant from Petronet LNG Ltd. for AI Center of Excellence",
        label: "NEWS",
        category: "Research",
        date: "MAR 02, 2026",
        url: "/news-event/1",
        summary: "The new research grant will drive interdisciplinary AI research, high-performance computing, and industry collaboration at MSIT.",
        keywords: "news, research, grant, petronet, cse, ai center of excellence"
    },
    {
        id: 10,
        title: "MSC MSIT Organizes HackMSIT 1.0 Hackathon",
        label: "EVENT",
        category: "Events",
        date: "APR 10, 2026",
        url: "/news-event/10",
        summary: "36-hour non-stop student hackathon with 500+ participants building open-source projects, AI prototypes, and developer tools.",
        keywords: "event, hackathon, hackmsit, coding, projects, competition"
    }
];

/**
 * Exported searchIndex object automatically kept up to date
 */
export const searchIndex = {
    faculty: generatedFaculty,
    pages: generatedPages,
    qa: qaData,
    events: searchEvents
};
