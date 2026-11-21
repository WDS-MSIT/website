import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Check, Award, ArrowRight, Play, X, Mail, Globe, ChevronDown, ChevronLeft, ChevronRight, Search, Clock,
    Users, BookOpen, GraduationCap, TrendingUp, Lightbulb, Target, ExternalLink, Building2, Camera,
    Code2, Network, Cpu, Zap, CheckCircle2, Linkedin, Github, MapPin, Briefcase, MessageSquare
} from 'lucide-react';
import SEO from '../components/SEO';
import Announcements from '../components/Announcements';
import { useCmsAnnouncements, useCmsNewsResource } from '../cms/news';
import { useCmsHomepage } from '../cms/homepage';
import { useCmsDepartments } from '../cms/departments';
import { useCmsProgrammes } from '../cms/programmes';
import { linkUrl, mediaUrl, safeUrl } from '../cms/client';
import type { NewsItem } from '../types';


type GalleryItem = {
    id: string;
    title: string;
    category: string;
    image: string;
    desc: string;
};

type Alumnus = {
    id: number;
    name: string;
    year: string;
    batch: string;
    major: string;
    role: string;
    company: string;
    location: string;
    image: string;
    quote: string;
    adviceForJuniors: string;
    skills: string[];
    socials: { email?: string; github?: string; linkedin?: string };
};

type Highlight = {
    id: number;
    image: string;
    quote: string;
    source: string;
    tag: string;
    link: string;
};

type DepartmentCard = {
    name: string;
    shortName: string;
    code: string;
    degree: string;
    intake: number;
    shifts: string;
    est: string;
    icon: React.ElementType;
    theme: {
        iconBg: string;
        accentBorder: string;
        hoverText: string;
        pill: string;
    };
    desc: string;
    specializations: string[];
    accredited: boolean;
    tagline?: string;
};

type HomeEvent = {
    id: number | string;
    label: string;
    category: string;
    title: string;
    summary: string;
    date: string;
    readTime: string;
    image: string;
    link: string;
    color?: string;
    bgImage?: string;
};

type LightboxItem = {
    type: 'image' | 'video';
    title: string;
    image?: string;
    desc?: string;
    url?: string;
};

const CAMPUS_GALLERY: GalleryItem[] = [
    {
        id: 'main-block',
        title: '8-Storey Main Academic Building',
        category: 'Academics',
        image: '/campus-hero.webp',
        desc: 'The iconic 8-storey red brick academic centerpiece of MSIT and its expansive green lawns.'
    },
    {
        id: 'main-gate',
        title: 'Institute Main Entrance Gate & Boulevard',
        category: 'Campus Life',
        image: '/photos/01_campus-exterior/main-gate-01.jpg',
        desc: 'Security-guarded grand entrance on C-4 Janakpuri with palm-lined boulevard.'
    },
    {
        id: 'central-library',
        title: 'Central Library Reading Hall & Reference Stacks',
        category: 'Academics',
        image: '/photos/11_central-library/library-interior-01.jpg',
        desc: 'Spacious reading hall with over 50,000+ volumes, IEEE digital access, and quiet study carrels.'
    },
    {
        id: 'ongc-lab',
        title: 'ONGC Advanced Computing & CoE Lab',
        category: 'Academics',
        image: '/photos/12_labs-computing-ml-research/research-coe-lab-ongc-01.jpg',
        desc: 'High-performance computing cluster and research workstations supported by ONGC.'
    },
    {
        id: 'electrical-lab',
        title: 'Electrical Machines & Motor-Generator Lab',
        category: 'Academics',
        image: '/photos/13_labs-electrical/electrical-machines-lab-01.jpg',
        desc: 'Hands-on practical workstations for DC machines, induction motors, and transformers.'
    },
    {
        id: 'seminar-hall',
        title: 'ECE Department Tiered Seminar Hall',
        category: 'Academics',
        image: '/photos/14_classrooms-seminar-hall/seminar-hall-ece-01.jpg',
        desc: 'Acoustic seminar auditorium equipped with multimedia projection for colloquiums and symposiums.'
    },
    {
        id: 'law-block',
        title: 'Law Block & Modern Academic Wing',
        category: 'Academics',
        image: '/photos/15_law-block/law-block-exterior.jpg',
        desc: 'Contemporary multi-storey campus complex housing modern lecture theatres and moot courts.'
    },
    {
        id: 'basketball-arena',
        title: 'Championship Basketball Arena',
        category: 'Sports',
        image: '/photos/03_sports-basketball/basketball-court-01.jpg',
        desc: 'Outdoor basketball courts hosting university tournaments and annual sports meet (SPHURTI).'
    },
    {
        id: 'football-ground',
        title: 'Football & Athletics Stadium Field',
        category: 'Sports',
        image: '/photos/04_sports-football/football-team-photo-hires-01.jpg',
        desc: 'Lush grass football ground framed by the 8-storey academic block and athletic track.'
    },
    {
        id: 'table-tennis',
        title: 'Indoor Sports & Table Tennis Room',
        category: 'Sports',
        image: '/photos/05_indoor-games-common-room/table-tennis-room-hires-01.jpg',
        desc: 'Dedicated indoor recreation arena with tournament-grade table tennis tables and chess.'
    },
    {
        id: 'boys-hostel',
        title: 'Raja Mahendra Pratap Boys Hostel',
        category: 'Campus Life',
        image: '/photos/06_hostels/boys-hostel-exterior.jpg',
        desc: 'Four-storey on-campus residence with 24/7 security, Wi-Fi, dining mess, and recreation rooms.'
    },
    {
        id: 'canteen',
        title: 'Rivanto Campus Canteen & Cafeteria',
        category: 'Campus Life',
        image: '/photos/07_canteen/canteen-01.jpg',
        desc: 'Lively student food court serving wholesome meals, snacks, and espresso under shaded pergolas.'
    },
    {
        id: 'ncc-unit',
        title: '7 DGBN NCC Battalion Cadets Parade',
        category: 'Campus Life',
        image: '/photos/02_ncc/ncc-cadets-parade-01.jpg',
        desc: 'National Cadet Corps (NCC) 7 Delhi Girls Battalion ceremonial parade drill and defense training.'
    },
    {
        id: 'surajmal-statue',
        title: 'Maharaja Surajmal Memorial Statue',
        category: 'Heritage',
        image: '/photos/01_campus-exterior/founder-bust-maharaja-surajmal-01.jpg',
        desc: 'Commemorative bronze bust of Bharatpur ruler Maharaja Surajmal (1707–1763) in central garden.'
    },
    {
        id: 'foundation-stone',
        title: 'Historic Foundation Stone (1978)',
        category: 'Heritage',
        image: '/photos/10_plaques-notice-boards-achievements/foundation-stone-plaque-01.jpg',
        desc: 'Plaque commemorating stone laid on 12 Dec 1978 by President of India Neelam Sanjiva Reddy.'
    },
    {
        id: 'gold-medalists',
        title: 'GGSIPU Gold Medalists Honor Roll',
        category: 'Heritage',
        image: '/photos/10_plaques-notice-boards-achievements/gold-medal-winners-board.jpg',
        desc: 'Roll of honor recognizing MSIT academic achievers awarded University Gold Medals.'
    },
    {
        id: 'conference-hall',
        title: 'Executive Conference Hall & Board Room',
        category: 'Heritage',
        image: '/photos/08_admin-offices-conference/conference-room-portraits-01.jpg',
        desc: 'Executive board room lined with historical portraits of founding educational leaders.'
    }
];

const Home = () => {
    const [activeNewsTab, setActiveNewsTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllNews, setShowAllNews] = useState(false);
    // ... rest of state
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [selectedAlumnus, setSelectedAlumnus] = useState<Alumnus | null>(null);
    const [isAlumniPaused, setIsAlumniPaused] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<LightboxItem | null>(null);
    const [galleryFilter, setGalleryFilter] = useState('All');

    const [testimonials] = useState<Alumnus[]>(() => {
        const defaults: Alumnus[] = [
            {
                id: 1,
                name: "Priya Sharma",
                year: "22",
                batch: "2018–2022",
                major: "Computer Science & Engineering",
                role: "Software Engineer II",
                company: "Google",
                location: "Bengaluru, India",
                image: "/priya-sharma.webp",
                quote: "MSIT has shaped me into the professional I am today. The faculty mentorship, hands-on projects, and industry exposure prepared me exceptionally well for my career at Google. The connections I made here will last a lifetime.",
                adviceForJuniors: "Build strong problem-solving fundamentals in Data Structures & Algorithms early on. Work on at least one production-grade full stack or systems project with your peers, and never hesitate to reach out to MSIT seniors for guidance.",
                skills: ["Distributed Systems", "C++", "Go", "System Design", "Kubernetes", "Algorithms"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    github: "https://github.com",
                    email: "mailto:alumni@msit.in"
                }
            },
            {
                id: 2,
                name: "Rahul Verma",
                year: "23",
                batch: "2019–2023",
                major: "Information Technology",
                role: "Cloud Solutions Architect",
                company: "Microsoft",
                location: "Hyderabad, India",
                image: "/rahul-verma.webp",
                quote: "The rigorous academic environment at MSIT pushes you to be your absolute best. I was able to participate in cutting-edge research and hackathons that gave me the edge I needed for my role at Microsoft.",
                adviceForJuniors: "Hands-on cloud certifications (Azure/AWS) and participating in MSIT technical societies like IEEE MSIT or GeekRoom will give you practical exposure far ahead of textbook curriculum.",
                skills: ["Cloud Architecture", "Azure", "Python", "Microservices", "Docker & Kubernetes"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    github: "https://github.com",
                    email: "mailto:alumni@msit.in"
                }
            },
            {
                id: 3,
                name: "Ananya Iyer",
                year: "21",
                batch: "2017–2021",
                major: "Electronics & Communication Engineering",
                role: "Silicon Design Engineer",
                company: "Apple",
                location: "Bengaluru, India / Cupertino, CA",
                image: "/ananya-iyer.webp",
                quote: "I never realized how much potential I had until I stepped foot on the MSIT campus. The professors saw something in me and nurtured my skills in chip design and embedded systems. I'm infinitely grateful.",
                adviceForJuniors: "Hardware engineering is having a golden era. Focus on Verilog, FPGA prototyping, and semiconductor fundamentals in MSIT's IDEA Lab. Core engineering roles value deep fundamentals above all else.",
                skills: ["VLSI Design", "SystemVerilog", "FPGA Prototyping", "Embedded Systems", "Semiconductor Architecture"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    github: "https://github.com",
                    email: "mailto:alumni@msit.in"
                }
            },
            {
                id: 4,
                name: "Prasanjeet Parasar",
                year: "23",
                batch: "2019–2023",
                major: "Computer Science & Engineering",
                role: "Financial Systems Engineer",
                company: "ION Group",
                location: "Noida, India",
                image: "/prasanjeet-parasar.webp",
                quote: "In the Stakeholder Round, candidates are assessed not just on technical skills but also on how well they understand the company and their own profiles. Resumes need to be polished and error-free, tailored to highlight experiences and skills most relevant to the role.",
                adviceForJuniors: "For FinTech & high-throughput systems, master low-latency Java/C++, multithreading, and SQL query performance. During interviews, articulate your thought process clearly and speak with honesty.",
                skills: ["High-Throughput Systems", "Core Java", "Multithreading", "SQL Optimization", "Data Structures"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    github: "https://github.com",
                    email: "mailto:alumni@msit.in"
                }
            },
            {
                id: 5,
                name: "Kartikay Arya",
                year: "23",
                batch: "2019–2023",
                major: "Computer Science & Engineering (2nd Shift)",
                role: "Sub-Lieutenant (AIR-1)",
                company: "Indian Navy",
                location: "New Delhi / Kochi, India",
                image: "/kartikay-arya.webp",
                quote: "Secured All India Rank 1 (AIR-1) in the SSC Navy examination upon graduating from MSIT. The discipline and support of the faculty helped me prepare for my career in the armed forces.",
                adviceForJuniors: "A technical degree from MSIT opens doors not just in corporate tech but in national defence, research laboratories (DRDO/ISRO), and public service. Build consistency, discipline, and stamina alongside your coursework.",
                skills: ["Naval Technology", "Defence Systems", "Leadership & Operations", "Cyber Defense", "Physical Fitness"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    email: "mailto:alumni@msit.in"
                }
            },
            {
                id: 6,
                name: "Varun Bansal",
                year: "19",
                batch: "2015–2019",
                major: "Electronics & Communication Engineering",
                role: "Founder & Managing Director",
                company: "Elegance Spark Innovation",
                location: "New Delhi, India",
                image: "/varun-bansal.webp",
                quote: "MSIT is more than a college; it is a community that shapes your future. Sponsoring NCI-TIDE 2025 is my way of giving back and maintaining the enduring bond between mentors and alumni.",
                adviceForJuniors: "Don't be afraid to take the entrepreneurial path. Start by solving genuine problems around you. MSIT faculty and our alumni network will always stand behind you to provide initial mentorship and guidance.",
                skills: ["Hardware Product Dev", "Startup Leadership", "IoT Solutions", "Venture Strategy", "Product Engineering"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    email: "mailto:alumni@msit.in"
                }
            },
            {
                id: 7,
                name: "Saransh Kapoor",
                year: "25",
                batch: "2021–2025",
                major: "Computer Science & Engineering",
                role: "Associate Software Engineer",
                company: "ION Group",
                location: "Gurugram, India",
                image: "/saransh-kapoor.webp",
                quote: "Keep your answers short, crisp, and polite during interview rounds. A combination of humility, confidence, and clear communication can make a lasting impression on interviewers.",
                adviceForJuniors: "Practice mock interviews with your friends in the library. When an interviewer asks a question, clarify the requirements first, discuss your time complexity before writing code, and show genuine enthusiasm.",
                skills: ["Competitive Programming", "Java", "Spring Boot", "RESTful APIs", "System Architecture"],
                socials: {
                    linkedin: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/",
                    github: "https://github.com",
                    email: "mailto:alumni@msit.in"
                }
            }
        ];

        const stored = localStorage.getItem('msit_testimonials_v3') || localStorage.getItem('msit_testimonials_v2');
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Alumnus[];
                return defaults.map(def => {
                    const match: Partial<Alumnus> = parsed.find(p => p.id === def.id) || {};
                    return {
                        ...def,
                        ...match,
                        socials: { ...def.socials, ...(match.socials || {}) },
                        skills: def.skills,
                        adviceForJuniors: match.adviceForJuniors || def.adviceForJuniors
                    };
                });
            } catch (err) {
                // fallback
            }
        }
        localStorage.setItem('msit_testimonials_v3', JSON.stringify(defaults));
        return defaults;
    });

    // Campus Highlights state 
    const [currentHighlight, setCurrentHighlight] = useState(0);
    const [fileHighlights] = useState<Highlight[]>(() => {
        const stored = localStorage.getItem('msit_highlights_v3') || localStorage.getItem('msit_highlights_v2') || localStorage.getItem('msit_highlights');
        if (stored) {
            const parsed = JSON.parse(stored) as Highlight[];
            if (parsed.length >= 3) return parsed;
        }
        const defaults: Highlight[] = [
            { 
                id: 1, 
                image: "/campus-hero.webp", 
                quote: "A breeding ground for the next generation of global technology leaders.", 
                source: "Times Engineering Survey",
                tag: "01 / 05",
                link: "/about"
            },
            { 
                id: 2, 
                image: "/campus/central-library-hall.webp", 
                quote: "State-of-the-art digital learning centers and research labs rivaling top tech institutes.", 
                source: "NAAC 'A' Grade Accreditation",
                tag: "02 / 05",
                link: "/facilities"
            },
            { 
                id: 3, 
                image: "/campus/student-gathering-courtyard.webp", 
                quote: "Vibrant innovation ecosystem supporting 20+ active technical and cultural chapters.", 
                source: "NBA Accredited Programs",
                tag: "03 / 05",
                link: "/society"
            },
            { 
                id: 4, 
                image: "/campus/auditorium-cultural-fest.webp", 
                quote: "Centenary Auditorium & event hubs hosting annual hackathons and cultural festivals.", 
                source: "Avensis Tech Summit",
                tag: "04 / 05",
                link: "/events"
            },
            { 
                id: 5, 
                image: "/campus/sports-ground-aerial.webp", 
                quote: "Fostering entrepreneurial mindsets through NISP startup grants and incubation support.", 
                source: "MSIT Innovation Cell",
                tag: "05 / 05",
                link: "/research"
            }
        ];
        localStorage.setItem('msit_highlights_v3', JSON.stringify(defaults));
        return defaults;
    });

    const { data: homepage, status: homepageStatus } = useCmsHomepage();
    const cmsHighlights: Highlight[] = (homepage?.heroSlides || []).map((slide, index) => ({
        id: index + 1,
        image: mediaUrl(slide.image) || safeUrl(slide.legacyImageUrl) || '/campus-hero.webp',
        quote: slide.caption,
        source: '',
        tag: `0${index + 1} / 0${Math.max((homepage?.heroSlides || []).length, 1)}`,
        link: linkUrl(slide) || '/about',
    }));
    const highlights = homepageStatus === 'ready' ? cmsHighlights : fileHighlights;

    const cmsGallery: GalleryItem[] = (homepage?.campusTour?.gallery || []).map((item, index) => ({
        id: item.id || `cms-gallery-${index}`,
        title: item.caption || `Campus photo ${index + 1}`,
        category: 'Campus',
        image: mediaUrl(item.image) || safeUrl(item.legacyImageUrl) || '/campus-hero.webp',
        desc: item.caption || '',
    }));
    const gallery = homepageStatus === 'ready' ? cmsGallery : CAMPUS_GALLERY;

    useEffect(() => {
        if (highlights.length === 0) return;
        const timer = setInterval(() => {
            setCurrentHighlight((prev) => (prev + 1) % highlights.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [highlights]);


    const [touchStartX, setTouchStartX] = useState<number | null>(null);


    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }
        if (isRightSwipe) {
            setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };


    useEffect(() => {
        if (isAlumniPaused || selectedAlumnus) return;
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [testimonials.length, isAlumniPaused, selectedAlumnus]);

    useEffect(() => {
        if (selectedAlumnus) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setSelectedAlumnus(null);
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [selectedAlumnus]);

    useEffect(() => {
        setShowAllNews(false);
    }, [activeNewsTab, searchQuery]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 150; // Account for fixed header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const openLightbox = (target: string | LightboxItem) => {
        if (typeof target === 'string') {
            if (target === 'Virtual Tour Launch') {
                setLightboxImage({
                    type: 'video',
                    title: 'MSIT Virtual Tour Video Walkthrough',
                    url:
                        safeUrl(homepage?.campusTour?.videoUrl) ||
                        'https://www.youtube.com/embed/WY6dTTsE4cY?autoplay=1&mute=0',
                });
            } else {
                const found = gallery.find(g => 
                    g.title.toLowerCase().includes(target.toLowerCase()) || 
                    g.id.toLowerCase().includes(target.toLowerCase()) ||
                    target.toLowerCase().includes(g.id.replace('-', ' '))
                );
                if (found) {
                    setLightboxImage({ type: 'image', title: found.title, image: found.image, desc: found.desc });
                } else {
                    setLightboxImage({ type: 'image', title: target, image: '/campus-hero.webp', desc: 'MSIT Campus Facility' });
                }
            }
        } else {
            setLightboxImage(target);
        }
        setLightboxOpen(true);
    };


    const fileDepartments: DepartmentCard[] = [
        {
            name: "Computer Science & Engineering",
            shortName: "CSE",
            code: "CSE",
            degree: "4-Year B.Tech",
            intake: 240,
            shifts: "180 Morning + 60 Evening",
            est: "2001",
            icon: Code2,
            theme: {
                iconBg: "bg-blue-50 text-blue-700 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white",
                accentBorder: "group-hover:border-blue-500/40",
                hoverText: "group-hover:text-blue-600",
                pill: "bg-blue-50/80 text-blue-700 border-blue-200/60"
            },
            desc: "Advanced engineering in AI/ML, cloud computing, distributed systems, high-performance computing, and scalable software architecture.",
            specializations: ["AI & Machine Learning", "Cloud Systems", "Full-Stack Software"],
            accredited: true
        },
        {
            name: "Information Technology",
            shortName: "IT",
            code: "IT",
            degree: "4-Year B.Tech",
            intake: 180,
            shifts: "120 Morning + 60 Evening",
            est: "2001",
            icon: Network,
            theme: {
                iconBg: "bg-teal-50 text-teal-700 border-teal-200/80 group-hover:bg-teal-600 group-hover:text-white",
                accentBorder: "group-hover:border-teal-500/40",
                hoverText: "group-hover:text-teal-600",
                pill: "bg-teal-50/80 text-teal-700 border-teal-200/60"
            },
            desc: "Specialized in enterprise networking, cloud architecture, cybersecurity, applied data science, and modern web application frameworks.",
            specializations: ["Cloud Infrastructure", "Cybersecurity", "Data Analytics"],
            accredited: true
        },
        {
            name: "Electronics & Communication",
            shortName: "ECE",
            code: "ECE",
            degree: "4-Year B.Tech",
            intake: 180,
            shifts: "120 Morning + 60 Evening",
            est: "2001",
            icon: Cpu,
            theme: {
                iconBg: "bg-indigo-50 text-indigo-700 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white",
                accentBorder: "group-hover:border-indigo-500/40",
                hoverText: "group-hover:text-indigo-600",
                pill: "bg-indigo-50/80 text-indigo-700 border-indigo-200/60"
            },
            desc: "Pioneering semiconductor microelectronics, VLSI circuit design, embedded IoT architectures, wireless communications, and signal processing.",
            specializations: ["VLSI & Chip Design", "Embedded IoT Systems", "Wireless Communications"],
            accredited: true
        },
        {
            name: "Electrical & Electronics",
            shortName: "EEE",
            code: "EEE",
            degree: "4-Year B.Tech",
            intake: 60,
            shifts: "60 Morning Shift",
            est: "2003",
            icon: Zap,
            theme: {
                iconBg: "bg-amber-50 text-amber-700 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white",
                accentBorder: "group-hover:border-amber-500/40",
                hoverText: "group-hover:text-amber-600",
                pill: "bg-amber-50/80 text-amber-700 border-amber-200/60"
            },
            desc: "Rigorous training across renewable energy systems, smart power grids, industrial power electronics, electric vehicle drives, and robotics.",
            specializations: ["Smart Grids & Renewables", "Industrial Automation", "EV Drives & Control"],
            accredited: true
        }
    ];

    const { data: cmsDepartments, status: departmentsStatus } = useCmsDepartments();
    const { data: cmsProgrammes, status: programmesStatus } = useCmsProgrammes();

    const iconForCode = (code: string): React.ElementType => {
        switch (code.toUpperCase()) {
            case 'CSE':
                return Code2;
            case 'IT':
                return Network;
            case 'ECE':
                return Cpu;
            case 'EEE':
                return Zap;
            default:
                return BookOpen;
        }
    };

    const cmsDepartmentCards: DepartmentCard[] = cmsDepartments.map((dept, index) => {
        const programmes = cmsProgrammes.filter((programme) => {
            const department = programme.department;
            return typeof department === 'object' && department
                ? department.id === dept.id
                : department === dept.id;
        });
        const intakes = programmes.flatMap((programme) => programme.intakes || []);
        const intake = intakes.reduce((sum, row) => sum + (row.seats || 0), 0);
        const shifts = intakes
            .map((row) => {
                const shift = row.shift === 'second' ? 'Evening' : row.shift === 'first' ? 'Morning' : '';
                return `${row.seats}${shift ? ` ${shift}` : ''}`.trim();
            })
            .filter(Boolean)
            .join(' + ');
        const accredited = programmes.some((programme) =>
            (programme.accreditations || []).some(
                (accreditation) =>
                    accreditation.accreditationStatus === 'accredited' ||
                    accreditation.accreditationStatus === 'claimed',
            ),
        );

        return {
            name: dept.name,
            shortName: dept.code || dept.name,
            code: dept.code || '',
            degree: programmes[0]?.degree || '',
            intake,
            shifts,
            est: '',
            icon: iconForCode(dept.code || ''),
            theme: fileDepartments[index % fileDepartments.length].theme,
            desc: dept.overview,
            specializations: [],
            accredited,
            tagline: '',
        };
    });

    const departments =
        departmentsStatus === 'ready' && programmesStatus === 'ready'
            ? cmsDepartmentCards
            : fileDepartments;

    const parseEventDate = (dateStr?: string) => {
        if (!dateStr) return 0;
        const time = Date.parse(dateStr);
        return isNaN(time) ? 0 : time;
    };

    const CATEGORY_TABS = [
        { id: 'all', label: 'All' },
        { id: 'news', label: 'News' },
        { id: 'events', label: 'Events' },
        { id: 'stories', label: 'Stories' },
        { id: 'academics', label: 'Academics' },
        { id: 'admissions', label: 'Admissions' },
        { id: 'placements', label: 'Placements' },
        { id: 'notices', label: 'Notices' },
        { id: 'research', label: 'Research' }
    ];

    const getCategoryRank = (label?: string) => {
        const l = (label || '').toUpperCase();
        if (l === 'NEWS') return 1;
        if (l === 'EVENT') return 2;
        if (l === 'STORY') return 3;
        if (l === 'ACADEMICS' || l === 'ACADEMIC') return 4;
        if (l === 'ADMISSIONS' || l === 'ADMISSION') return 5;
        if (l === 'PLACEMENTS' || l === 'PLACEMENT') return 6;
        if (l === 'NOTICES' || l === 'NOTICE') return 7;
        if (l === 'RESEARCH') return 8;
        return 9;
    };

    const [fileEvents] = useState<HomeEvent[]>(() => {
        const defaultEvents: HomeEvent[] = [
            { 
                id: 10, 
                label: "EVENT", 
                category: "Events",
                title: "MSC MSIT Organizes HackMSIT 1.0 Hackathon", 
                summary: "36-hour non-stop student hackathon with 500+ participants building open-source projects, AI prototypes, and developer tools.",
                date: "APR 10, 2026", 
                readTime: "5 MIN READ",
                image: "/campus/student-gathering-courtyard.webp",
                link: "/news-event/10", 
                color: "border-emerald-500" 
            },
            { 
                id: 18, 
                label: "NOTICES", 
                category: "Notices",
                title: "Urgent Examination Notice: End-Term Theory & Practical Datesheet Published", 
                summary: "All regular and reappear candidates are instructed to review the official university datesheet, verify admit cards, and note hall ticket release dates.",
                date: "APR 08, 2026", 
                readTime: "3 MIN READ",
                image: "/campus/campus-pathway-block.webp",
                link: "/news-event/18", 
                color: "border-sky-600" 
            },
            { 
                id: 12, 
                label: "ACADEMICS", 
                category: "Academics",
                title: "MSIT Academic Calendar & Examination Schedule Released for 2026 Sessions", 
                summary: "Official academic calendar, mid-term datesheets, semester break timings, and university end-term examination guidelines published for B.Tech students.",
                date: "APR 05, 2026", 
                readTime: "4 MIN READ",
                image: "/campus/central-library-hall.webp",
                link: "/academic-calendar", 
                color: "border-indigo-600" 
            },
            { 
                id: 14, 
                label: "ADMISSIONS", 
                category: "Admissions",
                title: "Admissions Open for B.Tech Batch 2026–30: Information Brochure & Counseling Schedule", 
                summary: "Complete admission guidelines, seat matrix for 1st & 2nd shift programs, GGSIPU CET / JEE Main cutoff trends, and online application portal are now active.",
                date: "APR 02, 2026", 
                readTime: "6 MIN READ",
                image: "/campus/msit-main-gate.webp",
                link: "/brochure", 
                color: "border-amber-600" 
            },
            { 
                id: 16, 
                label: "PLACEMENTS", 
                category: "Placements",
                title: "MSIT 2026 Placement Season Reaches ₹1.2 Cr International Offer & 95%+ Placement Rate", 
                summary: "Over 250+ top global recruiters including Google, Amazon, Microsoft, Apple, and ION Trading extend 850+ job offers to graduating engineers.",
                date: "MAR 28, 2026", 
                readTime: "5 MIN READ",
                image: "/campus-excellence.webp",
                link: "/placements", 
                color: "border-rose-600" 
            },
            { 
                id: 9, 
                label: "EVENT", 
                category: "Events",
                title: "E-Cell MSIT Organizes Flagship E-Summit 2026", 
                summary: "Annual entrepreneurship summit featuring startup pitch competitions, VC investor panels, and tech founder keynotes.",
                date: "MAR 26, 2026", 
                readTime: "4 MIN READ",
                image: "/campus/ecell-noticeboard-entrance.webp",
                link: "/news-event/9", 
                color: "border-emerald-500" 
            },
            { 
                id: 13, 
                label: "ACADEMICS", 
                category: "Academics",
                title: "GGSIPU Curriculum Upgrade: Advanced AI, Cloud Architecture & Autonomous Electives Adopted", 
                summary: "Curriculum overhaul across CSE, IT, ECE, and EEE departments introduces industry-aligned electives, quantum computing fundamentals, and autonomous project credits.",
                date: "MAR 18, 2026", 
                readTime: "5 MIN READ",
                image: "/campus/main-academic-building.webp",
                link: "/syllabus", 
                color: "border-indigo-600" 
            },
            { 
                id: 19, 
                label: "NOTICES", 
                category: "Notices",
                title: "Mandatory Notice regarding 75% Attendance Compliance for Examination Eligibility", 
                summary: "In accordance with GGSIPU Ordinance 11, students falling below statutory attendance thresholds must submit medical documentation to HOD offices immediately.",
                date: "MAR 15, 2026", 
                readTime: "3 MIN READ",
                image: "/campus/main-academic-building.webp",
                link: "/attendance", 
                color: "border-sky-600" 
            },
            { 
                id: 15, 
                label: "ADMISSIONS", 
                category: "Admissions",
                title: "MSIT Merit-cum-Means Scholarships & Financial Assistance Schemes Announced for 2026-27", 
                summary: "Institutional scholarships, EWS fee waivers, and Delhi Government financial assistance portals open with awards up to 100% tuition coverage for deserving scholars.",
                date: "MAR 12, 2026", 
                readTime: "4 MIN READ",
                image: "/campus/foundation-stone-plaque.webp",
                link: "/scholarships", 
                color: "border-amber-600" 
            },
            { 
                id: 20, 
                label: "RESEARCH", 
                category: "Research",
                title: "MSIT Faculty & Scholars Publish 45+ Research Papers in IEEE, Springer & Scopus Q1 Journals", 
                summary: "Significant academic milestone in generative AI, VLSI chip architecture, biomedical robotics, and clean renewable energy systems by MSIT research teams.",
                date: "MAR 10, 2026", 
                readTime: "5 MIN READ",
                image: "/campus-lab.webp",
                link: "/research", 
                color: "border-teal-600" 
            },
            { 
                id: 1, 
                label: "NEWS", 
                category: "Research",
                title: "Department of CSE receives CSR Research Grant from Petronet LNG Ltd. for AI Center of Excellence", 
                summary: "The new research grant will drive interdisciplinary AI research, high-performance computing, and industry collaboration at MSIT.",
                date: "MAR 02, 2026", 
                readTime: "5 MIN READ",
                image: "/campus/main-academic-building.webp",
                link: "/news-event/1", 
                color: "border-blue-600" 
            },
            { 
                id: 2, 
                label: "EVENT", 
                category: "Events",
                title: "Global Web3 & Blockchain Summit to be hosted at MSIT Campus", 
                summary: "Industry pioneers, Web3 developers, and blockchain innovators gather at MSIT for keynotes and hands-on developer workshops.",
                date: "FEB 28, 2026", 
                readTime: "3 MIN READ",
                image: "/campus/auditorium-cultural-fest.webp",
                link: "/news-event/2", 
                color: "border-emerald-500" 
            },
            { 
                id: 17, 
                label: "PLACEMENTS", 
                category: "Placements",
                title: "Summer Internship Drive 2026: 180+ Pre-Placement Offers (PPOs) Bagged by 3rd-Year Engineers", 
                summary: "MSIT Training & Placement Cell concludes high-stipend corporate internship hiring with premier software, semiconductor, and fintech firms.",
                date: "FEB 20, 2026", 
                readTime: "4 MIN READ",
                image: "/campus/student-gathering-courtyard.webp",
                link: "/internship-cell", 
                color: "border-rose-600" 
            },
            { 
                id: 3, 
                label: "STORY", 
                category: "Placements",
                title: "From Campus to Cupertino: How 5 MSIT grads secured roles at Apple", 
                summary: "Inside the journey of five MSIT computer science graduates who landed software engineering roles at Apple's global headquarters.",
                date: "FEB 15, 2026", 
                readTime: "7 MIN READ",
                image: "/campus-excellence.webp",
                link: "/news-event/3", 
                color: "border-purple-600" 
            },
            { 
                id: 7, 
                label: "EVENT", 
                category: "Research",
                title: "MSIT Conducts National Conference NCI-TIDE 2025", 
                summary: "National conference bringing together academia and industry leaders on technological innovations in digital engineering.",
                date: "DEC 15, 2025", 
                readTime: "4 MIN READ",
                image: "/campus/campus-pathway-block.webp",
                link: "/news-event/7", 
                color: "border-emerald-500" 
            },
            { 
                id: 4, 
                label: "STORY", 
                category: "Stories",
                title: "Grand Finale of SIH 2025 Concludes: MSIT Declared Winner in Ministry of AYUSH Category", 
                summary: "MSIT student developers bag the top prize of ₹1 Lakh at the Smart India Hackathon for their AI-driven healthcare solution.",
                date: "DEC 12, 2025", 
                readTime: "4 MIN READ",
                image: "/campus/foundation-stone-plaque.webp",
                link: "/news-event/4", 
                color: "border-purple-600" 
            },
            { 
                id: 5, 
                label: "EVENT", 
                category: "Research",
                title: "MSIT to Host 4th International Conference on Artificial Intelligence and Applications (ICAIA 2026)", 
                summary: "Global researchers submit papers on deep learning, NLP, and intelligent robotics ahead of the flagship conference.",
                date: "NOV 19, 2026", 
                readTime: "5 MIN READ",
                image: "/campus/central-library-hall.webp",
                link: "/news-event/5", 
                color: "border-emerald-500" 
            },
            { 
                id: 6, 
                label: "NEWS", 
                category: "Research",
                title: "MSIT establishes state-of-the-art AICTE IDEA Lab & Advanced Multidisciplinary Research Facilities", 
                summary: "A national milestone for MSIT with new 3D printing, rapid prototyping, and high-performance GPU computing clusters.",
                date: "AUG 15, 2025", 
                readTime: "6 MIN READ",
                image: "/campus-lab.webp",
                link: "/news-event/6", 
                color: "border-blue-600" 
            },
            { 
                id: 8, 
                label: "EVENT", 
                category: "Placements",
                title: "Placement Cell Conducts Placement Preparation Session with ION Alumni and Seniors", 
                summary: "Interactive placement guidance and mock technical interviews organized for 3rd and 4th year B.Tech students.",
                date: "AUG 30, 2024", 
                readTime: "3 MIN READ",
                image: "/campus/campus-side-avenue.webp",
                link: "/news-event/8", 
                color: "border-emerald-500" 
            },
            { 
                id: 11, 
                label: "STORY", 
                category: "Stories",
                title: "Team 'Courtroom Cartel' Secures First Prize in Smart India Hackathon 2023", 
                summary: "A look back at MSIT's victorious SIH team building legal-tech automation for government departments.",
                date: "DEC 20, 2023", 
                readTime: "6 MIN READ",
                image: "/campus/maharaja-surajmal-statue.webp",
                link: "/news-event/11", 
                color: "border-purple-600" 
            }
        ];

        const STORAGE_KEY = 'msit_events_v4';
        const storedEvents = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) || localStorage.getItem('msit_events_v3') || localStorage.getItem('msit_events_v2')) : null;
        if (storedEvents) {
            try {
                const parsed = JSON.parse(storedEvents) as HomeEvent[];
                const existingIds = new Set(parsed.map(item => item.id));
                const merged: HomeEvent[] = [
                    ...parsed.map((item): HomeEvent => {
                        const def: Partial<HomeEvent> = defaultEvents.find(d => d.id === item.id) || {};
                        const label = def.label || item.label || 'EVENT';
                        const category = def.category || item.category || 'Events';
                        return {
                            ...def,
                            ...item,
                            label,
                            category,
                            date: item.id === 5 && (!item.date || item.date.includes('2025')) ? 'NOV 19, 2026' : (item.date || def.date || ''),
                            image: item.image || def.image || '/campus/main-academic-building.webp',
                            summary: item.summary || def.summary || item.title,
                            readTime: item.readTime || def.readTime || '4 MIN READ'
                        } as HomeEvent;
                    }),
                    ...defaultEvents.filter(d => !existingIds.has(d.id))
                ];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                return merged;
            } catch (err) {
                // fallback to defaultEvents if parsing fails
            }
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
        }
        return defaultEvents;
    });

    // Once the CMS answers, its updates and events are the list. The built-in items remain only
    // while the request is loading or if it fails.
    const { data: cmsNews, status: newsStatus } = useCmsNewsResource();
    const events: Array<HomeEvent | NewsItem> =
        newsStatus === 'ready' ? cmsNews : [...cmsNews, ...fileEvents];
    // The alert strip shows the first Site Settings announcement once the CMS has one.
    const [alertItem] = useCmsAnnouncements([{ title: 'Admissions Open for Batch 2026-30. Last date to apply for B.Tech programs is April 30th.', url: null }]);

    const normalizeCategory = (label?: string, category?: string) => {
        const text = `${label || ''} ${category || ''}`.toLowerCase().trim();
        if (text.includes('event')) return 'events';
        if (text.includes('news')) return 'news';
        if (text.includes('stor')) return 'stories';
        if (text.includes('academic')) return 'academics';
        if (text.includes('admission')) return 'admissions';
        if (text.includes('placement')) return 'placements';
        if (text.includes('notice')) return 'notices';
        if (text.includes('research')) return 'research';
        return (category || label || 'news').toLowerCase().trim();
    };

    const sortedEvents = [...events].sort((a, b) => {
        const timeA = parseEventDate(a.date);
        const timeB = parseEventDate(b.date);
        
        if (timeA !== timeB) {
            return timeB - timeA;
        }
        
        return getCategoryRank(a.label) - getCategoryRank(b.label);
    });

    const searchedEvents = sortedEvents.filter(item => {
        const itemCat = normalizeCategory(item.label, item.category);
        const matchesTab = activeNewsTab === 'all' || itemCat === activeNewsTab;
        
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || (
            (item.title && item.title.toLowerCase().includes(q)) ||
            (item.summary && item.summary.toLowerCase().includes(q)) ||
            (item.label && item.label.toLowerCase().includes(q)) ||
            (item.category && item.category.toLowerCase().includes(q)) ||
            (item.date && item.date.toLowerCase().includes(q))
        );

        return matchesTab && matchesSearch;
    });

    const nowTime = Date.now();
    const pastStories = searchedEvents.filter(item => parseEventDate(item.date) <= nowTime);
    const upcomingStories = searchedEvents
        .filter(item => parseEventDate(item.date) > nowTime)
        .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));
    const heroStory = pastStories[0] || upcomingStories[0] || null;
    const gridStories = [...upcomingStories, ...pastStories].filter(item => item !== heroStory);
    const displayedGridStories = showAllNews ? gridStories : gridStories.slice(0, 4);
    const storyLink = (item: HomeEvent | NewsItem) =>
        item.link && item.link !== '#' ? item.link : `/news-event/${item.id}`;
    const isUpcoming = (item: HomeEvent | NewsItem) => parseEventDate(item.date) > nowTime;

    const homeSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Maharaja Surajmal Institute of Technology",
        "alternateName": "MSIT",
        "url": "https://msit-website.netlify.app",
        "logo": "https://msit-website.netlify.app/msit-logo.webp",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "C-4, Janakpuri",
            "addressLocality": "New Delhi",
            "addressRegion": "Delhi",
            "postalCode": "110058",
            "addressCountry": "IN"
        },
        "sameAs": [
            "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/"
        ]
    };

    return (
        <main>
            <SEO 
                title="Home" 
                description="Maharaja Surajmal Institute of Technology (MSIT) is a premier engineering college in Delhi offering top-tier B.Tech programs, placements, and innovation." 
                schema={homeSchema}
            />
            {/* HERO SECTION */}
            <section className="relative w-full h-[100vh] min-h-[clamp(500px,80vh,700px)] flex items-center justify-center bg-slate-900 overflow-hidden">
                {/* High Priority Campus Hero Image - iOS Safari & cross-platform compatible */}
                <div className="absolute inset-0 z-0 group overflow-hidden">
                    <img 
                        src="/campus-hero.webp" 
                        alt="MSIT Main 8-Storey Academic Building" 
                        fetchPriority="high" 
                        loading="eager" 
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-[20s] ease-out group-hover:scale-105 select-none"
                    />
                    {/* Dark gradient overlays */}
                    <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-slate-900/60 pointer-events-none"></div>
                </div>

                {/* Giant Centered Text */}
                <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center -mt-[6vh] pointer-events-none">
                    <h1 
                        id="hero-title"
                        className="font-serif font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/100 to-white/20 leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-1000 ease-out select-none uppercase"
                        style={{ fontSize: 'clamp(4.25rem, 20vw, 26vh)' }}
                    >
                        MSIT
                    </h1>
                    <div id="hero-divider" className="h-1.5 w-24 sm:w-32 bg-white/40 mt-8 rounded-full blur-[0.5px]"></div>
                </div>


                {/* Explore Banner at Bottom */}
                <div 
                    id="hero-banner"
                    className="absolute bottom-0 left-0 w-full bg-primary py-6 cursor-pointer hover:bg-primary/90 transition-all duration-500 z-20 flex justify-center items-center group/banner border-t border-white/5"
                    onClick={() => scrollToSection('news')}
                >
                    <span className="text-white font-bold text-sm tracking-[0.2em] uppercase flex items-center gap-4 group-hover/banner:translate-y-[-2px] transition-transform">
                        Explore <ChevronDown className="w-5 h-5 animate-bounce text-blue-300" />
                    </span>
                </div>
            </section>

            {/* ANNOUNCEMENT TICKER */}
            <div className="bg-surface border-b border-slate-200 py-4 relative z-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex items-center">
                    <div className="bg-alert text-white text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-sm mr-6 shrink-0 shadow-card">Alert</div>
                    <div className="text-sm font-semibold text-title truncate flex-grow tracking-tight">
                        {alertItem ? (
                            alertItem.url ? (
                                <a href={alertItem.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{alertItem.title}</a>
                            ) : (
                                alertItem.title
                            )
                        ) : null}
                    </div>
                </div>
            </div>

            {/* NEWS, EVENTS & STORIES */}
            <section id="news" className="py-24 bg-slate-50 border-t border-slate-200/60 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2 min-w-0">
                    {/* Header with Title, Subtitle, and Interactive Search Bar */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 tracking-tight leading-tight">
                                News, Events <span className="italic font-normal text-slate-700">and Stories</span>
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base mt-2 font-medium">
                                Updates, achievements, notices and experiences from the MSIT community.
                            </p>
                        </div>

                        {/* Search Input Bar with functional Search Button */}
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                            }} 
                            className="relative shrink-0 w-full sm:w-80"
                        >
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search stories, academics, notices..."
                                className="w-full pl-9 pr-24 py-2.5 bg-white rounded-full text-xs font-semibold text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                                aria-label="Search stories and notices"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-16 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    aria-label="Clear query"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-full text-[11px] font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                                aria-label="Submit search"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Category Filter Pills (Full horizontal scrollable bar) */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs mb-8 overflow-x-auto scrollbar-none">
                        {CATEGORY_TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveNewsTab(tab.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer ${
                                    activeNewsTab === tab.id
                                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Active search filter feedback badge */}
                    {searchQuery && (
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-blue-50 rounded-xl border border-blue-100 text-xs">
                            <div className="flex items-center gap-2 text-slate-700 font-medium">
                                <Search className="w-3.5 h-3.5 text-blue-600" />
                                <span>Showing results for <strong className="text-slate-900">"{searchQuery}"</strong> ({searchedEvents.length} found)</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link 
                                    to={`/search?q=${encodeURIComponent(searchQuery)}`}
                                    className="text-blue-600 hover:underline font-bold flex items-center gap-1"
                                >
                                    <span>Search all 37+ MSIT pages for "{searchQuery}"</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}

                    {searchedEvents.length === 0 ? (
                        <div className="text-center py-16 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-slate-800 font-bold text-lg mb-1">
                                No stories match your filter or search query{searchQuery ? ` for "${searchQuery}"` : ''}
                            </h3>
                            <p className="text-slate-500 text-xs max-w-md mx-auto mb-6">
                                We couldn't find matching articles under this category. You can search the entire MSIT website across all departments, courses, faculty, and notices.
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                {searchQuery && (
                                    <Link 
                                        to={`/search?q=${encodeURIComponent(searchQuery)}`}
                                        className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                                    >
                                        <span>Search Entire Website for "{searchQuery}"</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                )}
                                <button 
                                    onClick={() => { setActiveNewsTab('all'); setSearchQuery(''); }}
                                    className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Or browse:</span>
                                {['Academics', 'Admissions', 'Placements', 'Notices', 'Research'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setActiveNewsTab(c.toLowerCase()); setSearchQuery(''); }}
                                        className="px-3 py-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-full text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* FEATURED STORY */}
                            {heroStory && (
                                <Link
                                    to={storyLink(heroStory)}
                                    className="group grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg overflow-hidden transition-shadow"
                                >
                                    <div className="relative h-56 md:h-full md:min-h-[17rem] bg-slate-100 overflow-hidden">
                                        <img
                                            src={heroStory.image}
                                            alt={heroStory.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/campus/main-academic-building.webp'; }}
                                        />
                                    </div>
                                    <div className="p-6 sm:p-7 flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/20">{heroStory.label}</span>
                                            {isUpcoming(heroStory) && <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Upcoming</span>}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight group-hover:text-primary transition-colors">{heroStory.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{heroStory.summary}</p>
                                        <div className="mt-auto pt-3 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            <span>{heroStory.date} · {heroStory.readTime}</span>
                                            <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-500 flex items-center justify-center transition-colors">
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* DATED LIST */}
                            {displayedGridStories.length > 0 && (
                                <ul className="mt-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 px-4 sm:px-5">
                                    {displayedGridStories.map(item => {
                                        const [month, day] = (item.date || '').replace(',', '').split(' ');
                                        const upcoming = isUpcoming(item);
                                        return (
                                            <li key={item.id}>
                                                <Link to={storyLink(item)} className="group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4">
                                                    <span className={`rounded-xl border text-center py-1.5 leading-tight ${upcoming ? 'border-primary bg-primary text-white' : 'border-slate-200 text-slate-900'}`}>
                                                        <span className="block text-lg font-bold">{day}</span>
                                                        <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">{month}</span>
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="flex items-center gap-2 mb-1">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border bg-primary/5 text-primary border-primary/20">{item.label}</span>
                                                            {upcoming && <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Upcoming</span>}
                                                        </span>
                                                        <span className="block text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">{item.title}</span>
                                                        <span className="block mt-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{(item.date || '').split(', ')[1]} · {item.readTime}</span>
                                                    </span>
                                                    <ArrowRight className="hidden sm:block w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            {/* SHOW MORE / SHOW LESS */}
                            {gridStories.length > 4 && (
                                <div className="mt-5 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowAllNews(v => !v)}
                                        aria-expanded={showAllNews}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors cursor-pointer"
                                    >
                                        {showAllNews ? 'Show less' : `Show ${gridStories.length - 4} more`}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showAllNews ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Announcements />
                </div>
            </section>

{/* THE MSIT ADVANTAGE - ELEGANT CARD STACK SECTION */}
            <section className="py-24 bg-[#FBF9F5] text-slate-900 border-y border-stone-200/80 relative overflow-hidden">
                {/* Decorative diagonal accent matching inspiration background */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F3EEE5]/60 -skew-x-12 transform translate-x-24 pointer-events-none -z-0"></div>

                {/* Upper right tracked cap watermark */}
                <div className="absolute top-12 right-12 text-[11px] font-black uppercase tracking-[0.3em] text-stone-400 hidden xl:block pointer-events-none select-none">
                    PEOPLE &bull; IDEAS &bull; IMPACT
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        {/* Left Column: Heading & Key Feature List */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <span className="text-[#8C6B45] font-black tracking-[0.25em] text-xs uppercase mb-3 block">
                                    THE MSIT ADVANTAGE
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                                    Education that <br />
                                    <span className="font-serif italic font-normal text-[#9E7B56]">Transcends</span> <br />
                                    Boundaries.
                                </h2>
                            </div>

                            <p className="text-slate-600 text-base leading-relaxed font-medium">
                                MSIT stands at the intersection of rigorous academic theory and practical, industry-driven application. We don't just teach engineering; we cultivate the mindset required to solve the complex challenges of tomorrow.
                            </p>

                            <div className="space-y-6 pt-2">
                                {[
                                    {
                                        icon: <Target className="w-5 h-5 text-[#8C6B45]" />,
                                        title: "Industry-Aligned Curriculum",
                                        desc: "Syllabus constantly updated in collaboration with tech giants."
                                    },
                                    {
                                        icon: <Lightbulb className="w-5 h-5 text-[#8C6B45]" />,
                                        title: "Innovation Ecosystem",
                                        desc: "Access to incubation centers, maker spaces, and heavy research funding."
                                    },
                                    {
                                        icon: <Globe className="w-5 h-5 text-[#8C6B45]" />,
                                        title: "Global Perspective",
                                        desc: "Exchange programs and international hackathon participation."
                                    }
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 w-11 h-11 rounded-2xl bg-[#F2ECE1] border border-[#E4D9C8] flex items-center justify-center shrink-0 shadow-sm">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">{feature.title}</h3>
                                            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed mt-0.5">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: 3D Stacked Overlapping Cards Carousel */}
                        <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
                            {/* Card Stack Container */}
                            <div className="relative w-full max-w-[520px] h-[480px] sm:h-[520px] flex items-center justify-start">
                                {highlights.map((highlight, idx) => {
                                    const total = highlights.length;
                                    const offset = (idx - currentHighlight + total) % total;
                                    const isFront = offset === 0;

                                    let transformStyle = '';
                                    let zIndex = 0;
                                    let opacity = 0;

                                    if (offset === 0) {
                                        transformStyle = 'translateX(0px) scale(1)';
                                        zIndex = 30;
                                        opacity = 1;
                                    } else if (offset === 1) {
                                        transformStyle = 'translateX(40px) scale(0.92)';
                                        zIndex = 20;
                                        opacity = 0.9;
                                    } else if (offset === 2) {
                                        transformStyle = 'translateX(80px) scale(0.84)';
                                        zIndex = 10;
                                        opacity = 0.75;
                                    } else if (offset === 3) {
                                        transformStyle = 'translateX(120px) scale(0.76)';
                                        zIndex = 5;
                                        opacity = 0.5;
                                    } else {
                                        transformStyle = 'translateX(160px) scale(0.68)';
                                        zIndex = 0;
                                        opacity = 0;
                                    }

                                    return (
                                        <div
                                            key={highlight.id || idx}
                                            onClick={() => !isFront && setCurrentHighlight(idx)}
                                            style={{
                                                transform: transformStyle,
                                                zIndex,
                                                opacity
                                            }}
                                            className={`absolute left-0 top-0 w-[280px] sm:w-[340px] md:w-[370px] h-[440px] sm:h-[480px] rounded-[2.2rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-stone-200/60 bg-stone-950 ${
                                                !isFront ? 'cursor-pointer hover:brightness-110' : ''
                                            }`}
                                        >
                                            {/* Card Image */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                                                style={{ backgroundImage: `url('${highlight.image}')` }}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-between z-10 text-white">
                                                {/* Counter / Tag */}
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-mono font-bold tracking-widest text-stone-200 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                                                        {highlight.tag || `0${idx + 1} / 0${total}`}
                                                    </span>
                                                    <div className="h-px bg-white/30 flex-1"></div>
                                                </div>

                                                {/* Quote & CTA */}
                                                <div>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-white mb-6 drop-shadow-md">
                                                        "{highlight.quote}"
                                                    </p>

                                                    <Link
                                                        to={highlight.link || "/about"}
                                                        className="inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/30 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all group/btn shadow-lg"
                                                    >
                                                        <span className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform">
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </span>
                                                        <span>Explore Our Campus</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Stack Navigation & Annotations Below */}
                            <div className="w-full max-w-[520px] flex items-center justify-between mt-6 px-2">
                                {/* Prev / Next Arrows & Pagination Dots */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setCurrentHighlight((prev) => (prev - 1 + highlights.length) % highlights.length)}
                                        className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                        aria-label="Previous card"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {/* Pagination Dots */}
                                    <div className="flex items-center gap-2">
                                        {highlights.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentHighlight(i)}
                                                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                                                    i === currentHighlight ? 'bg-slate-900 w-6' : 'bg-stone-300 hover:bg-stone-400 w-2'
                                                }`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentHighlight((prev) => (prev + 1) % highlights.length)}
                                        className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                        aria-label="Next card"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Handwritten Style Annotation */}
                                <div className="hidden sm:flex items-center gap-2 text-stone-500 font-serif italic text-sm">
                                    <span>More Than Engineering</span>
                                    <svg className="w-8 h-4 text-stone-400 transform rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACADEMIC PROGRAMS */}
            <section id="programs" className="py-20 bg-slate-50/80 border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-blue-700 font-extrabold tracking-[0.25em] text-xs uppercase mb-3 block">
                            Academic Disciplines
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                            Undergraduate Engineering Programs
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            Four-year B.Tech degree programs affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), approved by AICTE, and accredited by the National Board of Accreditation (NBA).
                        </p>
                    </div>

                    {/* 2x2 Programs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {departments.map((dept, i) => {
                            const IconComponent = dept.icon;
                            return (
                                <Link 
                                    to={`/${dept.code.toLowerCase()}`} 
                                    key={i} 
                                    className={`bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between relative overflow-hidden`}
                                >
                                    {/* Top Metadata Row */}
                                    <div>
                                        <div className="flex items-center justify-between gap-4 mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-2xs border bg-primary/5 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white`}>
                                                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-mono font-black text-slate-400 tracking-wider block">
                                                        {dept.code}
                                                    </span>
                                                    <span className="text-[11px] font-semibold text-slate-500">
                                                        Est. {dept.est}
                                                    </span>
                                                </div>
                                            </div>

                                            {dept.accredited && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-primary bg-primary/5 border border-primary/20 shadow-2xs">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    NBA Accredited
                                                </span>
                                            )}
                                        </div>

                                        {/* Program Name & Tagline */}
                                        <div className="mb-3">
                                            <h3 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors`}>
                                                {dept.name}
                                            </h3>
                                            <p className="text-xs font-semibold text-slate-500 mt-1">
                                                {dept.degree}{dept.tagline ? ` • ${dept.tagline}` : ''}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                                            {dept.desc}
                                        </p>

                                        {/* Specializations / Domains */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {dept.specializations.map((spec, sIdx) => (
                                                <span 
                                                    key={sIdx} 
                                                    className="px-2.5 py-1 bg-slate-100/90 text-slate-700 rounded-md text-[11px] font-medium border border-slate-200/70"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Card Footer with Official Intake & Action */}
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-slate-400" />
                                            <div>
                                                <span className="text-xs font-bold text-slate-800 tracking-wide block leading-tight">
                                                    {dept.intake} Sanctioned Seats
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-medium block leading-tight">
                                                    {dept.shifts}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors uppercase tracking-wider gap-1.5">
                                            <span>Full Details</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Institution Summary & Foundation Department Banner */}
                    <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1 sm:mt-0 animate-pulse"></div>
                            <span>
                                <strong className="text-slate-900 font-bold">Total Approved B.Tech Intake: 660 Seats</strong> across 1st & 2nd Shifts. Admissions governed by GGSIPU via JEE Main.
                            </span>
                        </div>
                        <Link 
                            to="/applied-sciences" 
                            className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors inline-flex items-center gap-1.5 shrink-0 uppercase tracking-wider hover:underline"
                        >
                            <span>Applied Sciences Foundation (1st Year)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS CAROUSEL */}
            <section className="py-24 sm:py-32 bg-white border-b border-slate-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-blue-700 font-extrabold tracking-[0.25em] text-xs uppercase mb-3 block">
                        Success Stories &bull; Alumni Mentorship
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4 leading-tight">
                        Alumni Shaping the World
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto mb-16 font-medium">
                        Hear from MSIT graduates working at premier tech companies, defence, and high-growth ventures. Click any profile to view their journey, career advice, and connect.
                    </p>

                    <div
                        className="relative max-w-5xl mx-auto px-2 sm:px-4"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseEnter={() => setIsAlumniPaused(true)}
                        onMouseLeave={() => setIsAlumniPaused(false)}
                    >
                        {/* Carousel Slides Container */}
                        <div className="grid relative z-10 min-h-[420px] sm:min-h-[380px]">
                            {testimonials.map((t, i) => {
                                const isActive = i === currentTestimonial;
                                return (
                                    <div
                                        key={t.id || i}
                                        onClick={() => setSelectedAlumnus(t)}
                                        className={`col-start-1 row-start-1 transition-all duration-500 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 px-2 sm:px-6 py-6 cursor-pointer group select-none ${
                                            isActive 
                                                ? 'opacity-100 translate-x-0 z-10 visible pointer-events-auto' 
                                                : 'opacity-0 translate-x-10 pointer-events-none -z-10 invisible'
                                        }`}
                                    >
                                        {/* Alumnus Photo Card */}
                                        <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white shrink-0 relative group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 bg-slate-100">
                                            <img 
                                                src={t.image} 
                                                alt={`Portrait of MSIT Alumnus ${t.name}, Class of '${t.year}`} 
                                                className="w-full h-full object-cover grayscale opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                                                loading="lazy"
                                                decoding="async"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = '/faculty/default-avatar.svg';
                                                }}
                                            />
                                            {/* Hover Prompt Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow-md">
                                                    <ExternalLink className="w-3.5 h-3.5" /> View Profile &amp; Socials
                                                </span>
                                            </div>
                                        </div>

                                        {/* Testimonial Quote and Credentials */}
                                        <div className="text-center md:text-left flex-grow max-w-xl relative">
                                            <div className="text-hero leading-none text-blue-600/10 absolute -top-10 -left-6 md:-left-10 font-serif z-0 select-none italic pointer-events-none">
                                                &ldquo;
                                            </div>
                                            <p className="text-lg sm:text-xl md:text-2xl font-serif text-slate-800 leading-relaxed mb-6 md:mb-8 italic opacity-95 relative z-10">
                                                &ldquo;{t.quote}&rdquo;
                                            </p>
                                            
                                            <div className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                                                {t.name}
                                                <span className="font-semibold text-slate-500 text-sm sm:text-base ml-2">
                                                    Class of '{t.year}
                                                </span>
                                            </div>
                                            
                                            <div className="text-blue-700 font-semibold text-sm sm:text-base tracking-tight mb-4">
                                                {t.role ? `${t.role} &bull; ` : ''}{t.major}
                                            </div>

                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                                <span className="inline-block px-4 py-1.5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-lg shadow-sm">
                                                    {t.company}
                                                </span>

                                                <button 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        setSelectedAlumnus(t); 
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" /> Full Profile
                                                </button>

                                                {t.socials?.linkedin && (
                                                    <a 
                                                        href={t.socials.linkedin} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 shadow-2xs transition-transform active:scale-95"
                                                        title="Connect on LinkedIn"
                                                    >
                                                        <Linkedin className="w-3.5 h-3.5" />
                                                    </a>
                                                )}

                                                {t.socials?.github && (
                                                    <a 
                                                        href={t.socials.github} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-black shadow-2xs transition-transform active:scale-95"
                                                        title="GitHub Profile"
                                                    >
                                                        <Github className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Carousel Navigation (Arrows + Dots) */}
                        <div className="flex items-center justify-center gap-6 mt-12">
                            <button
                                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                className="w-9 h-9 rounded-full bg-white hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Previous alumnus"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentTestimonial(i)}
                                        className="group relative py-2 px-1 rounded-full transition-all duration-300"
                                        aria-label={`Go to testimonial ${i + 1}`}
                                    >
                                        <div className={`h-2 rounded-full transition-all duration-500 ${
                                            i === currentTestimonial 
                                                ? 'bg-blue-600 w-10 shadow-xs' 
                                                : 'bg-slate-200 group-hover:bg-slate-300 w-2.5'
                                        }`}></div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                                className="w-9 h-9 rounded-full bg-white hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Next alumnus"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* CAMPUS PHOTOGRAPHIC SHOWCASE */}
            <section className="py-28 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                                <Camera className="w-4 h-4" />
                                <span>Authentic Campus Photography</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-title tracking-tight">
                                MSIT Through The Lens
                            </h2>
                            <p className="text-muted text-base max-w-2xl mt-3">
                                Explore genuine snapshots of our 8-acre Janakpuri campus — from our 8-storey academic block and central library to student festivals, historic memorials, and sports arenas.
                            </p>
                        </div>

                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-2">
                            {['All', ...Array.from(new Set(gallery.map((item) => item.category)))].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setGalleryFilter(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                                        galleryFilter === cat
                                            ? 'bg-primary text-white shadow-md shadow-blue-500/20'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {gallery
                            .filter(item => galleryFilter === 'All' || item.category === galleryFilter)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => openLightbox({ type: 'image', title: item.title, image: item.image, desc: item.desc })}
                                    className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-slate-100 cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
                                >
                                    <div className="aspect-[4/3] overflow-hidden bg-slate-800">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/campus-hero.webp';
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                                    <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                                        <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                            {item.category}
                                        </span>
                                        <h3 className="text-sm font-bold leading-tight group-hover:text-blue-300 transition-colors line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-300 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                                        </div>
                    
                    {/* Integrated Campus Tour CTA */}
                    <div className="mt-16 flex flex-col items-center justify-center text-center p-8 md:p-12 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 relative z-10">250+ Verified Campus Photographs</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 relative z-10">Want to explore every corner?</h3>
                        <p className="text-slate-600 mb-8 max-w-lg relative z-10">Take a structured virtual tour or browse the complete directory of 250+ verified photographs across all 17 campus zones.</p>
                        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/virtual-tour" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95">
                                <Play className="w-4 h-4" />
                                Start Virtual Tour
                            </Link>
                            <Link to="/virtual-tour?tab=archive" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95">
                                <Camera className="w-4 h-4" />
                                Browse 250+ Photo Archive
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ALUMNI PROFILE MODAL */}
            {selectedAlumnus && (
                <div 
                    className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
                    onClick={() => setSelectedAlumnus(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="alumni-modal-title"
                >
                    <div 
                        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200/90 relative my-8 animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Gradient Banner */}
                        <div className="h-28 bg-gradient-to-r from-primary to-primary-dark relative">
                            <button 
                                onClick={() => setSelectedAlumnus(null)}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/20 cursor-pointer"
                                aria-label="Close profile modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Profile Info Container */}
                        <div className="px-6 sm:px-8 pb-8 -mt-14 relative">
                            {/* Avatar and Badges */}
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 shrink-0">
                                    <img 
                                        src={selectedAlumnus.image} 
                                        alt={selectedAlumnus.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = '/faculty/default-avatar.svg';
                                        }}
                                    />
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                                        {selectedAlumnus.company}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200/70">
                                        Class of '{selectedAlumnus.year}
                                    </span>
                                </div>
                            </div>

                            {/* Name & Academic Credentials */}
                            <div className="mb-5">
                                <h3 id="alumni-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                                    {selectedAlumnus.name}
                                </h3>
                                <p className="text-sm font-semibold text-blue-700 mt-0.5">
                                    {selectedAlumnus.role ? `${selectedAlumnus.role} at ` : ''}{selectedAlumnus.company}
                                </p>
                                <p className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-2 mt-1.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{selectedAlumnus.major}</span>
                                    <span>&bull;</span>
                                    <span>Batch {selectedAlumnus.batch || `Class of '20${selectedAlumnus.year}`}</span>
                                </p>
                                {selectedAlumnus.location && (
                                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{selectedAlumnus.location}</span>
                                    </p>
                                )}
                            </div>

                            {/* Social Connect Buttons (Prominent) */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 flex flex-wrap items-center justify-between gap-3">
                                <div className="text-xs font-bold text-slate-700">
                                    Connect with {selectedAlumnus.name.split(' ')[0]}:
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    {selectedAlumnus.socials?.linkedin && (
                                        <a 
                                            href={selectedAlumnus.socials.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span>LinkedIn Profile</span>
                                            <ExternalLink className="w-3 h-3 opacity-80" />
                                        </a>
                                    )}
                                    {selectedAlumnus.socials?.github && (
                                        <a 
                                            href={selectedAlumnus.socials.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>GitHub</span>
                                            <ExternalLink className="w-3 h-3 opacity-80" />
                                        </a>
                                    )}
                                    {selectedAlumnus.socials?.email && (
                                        <a 
                                            href={selectedAlumnus.socials.email} 
                                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 shadow-xs transition-all active:scale-95"
                                        >
                                            <Mail className="w-4 h-4 text-slate-500" />
                                            <span>Email</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Advice for Juniors (Highlighted Callout) */}
                            <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 mb-5">
                                <div className="flex items-center gap-2 text-blue-800 font-extrabold text-xs uppercase tracking-wider mb-2">
                                    <MessageSquare className="w-4 h-4 text-blue-600" />
                                    <span>Career Advice for MSIT Juniors</span>
                                </div>
                                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
                                    &ldquo;{selectedAlumnus.adviceForJuniors || selectedAlumnus.quote}&rdquo;
                                </p>
                            </div>

                            {/* Testimonial / Story */}
                            <div className="mb-5">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                    MSIT Journey &amp; Reflection
                                </h4>
                                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
                                    &ldquo;{selectedAlumnus.quote}&rdquo;
                                </p>
                            </div>

                            {/* Technical Domains & Skills */}
                            {selectedAlumnus.skills && selectedAlumnus.skills.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                                        Core Competencies &amp; Domains
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedAlumnus.skills.map((skill, sIdx) => (
                                            <span 
                                                key={sIdx}
                                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200/60"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mentorship Note */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                <span>MSIT Alumni Mentorship Network</span>
                                <button 
                                    onClick={() => setSelectedAlumnus(null)}
                                    className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors cursor-pointer"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox Modal (for Tour/Images) */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-slate-900/95 z-[100] flex flex-col items-center justify-center p-4 lg:p-12 animate-fade-in" onClick={() => setLightboxOpen(false)}>
                    <button className="absolute top-6 right-6 p-2.5 text-white/60 hover:text-white rounded-full transition-colors z-50 bg-black/60 border border-white/10 shadow-lg" onClick={() => setLightboxOpen(false)}>
                        <X className="w-7 h-7" />
                    </button>
                    <div className="w-full max-w-5xl flex items-center justify-center bg-black/85 rounded-3xl border border-slate-700 shadow-2xl flex-col overflow-hidden relative animate-slide-up p-3 md:p-6" onClick={(e) => e.stopPropagation()}>
                        {lightboxImage?.type === 'video' ? (
                            <div className="w-full aspect-video">
                                <iframe
                                    className="w-full h-full rounded-2xl"
                                    src={lightboxImage.url}
                                    title={lightboxImage.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center w-full">
                                <img
                                    src={lightboxImage?.image || '/campus-hero.webp'}
                                    alt={lightboxImage?.title || 'MSIT Campus Photograph'}
                                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl mb-4"
                                />
                                <div className="text-center px-4 pb-2">
                                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest rounded-md mb-2 border border-blue-400/20">
                                        Authentic MSIT Campus
                                    </div>
                                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-1">{lightboxImage?.title}</h3>
                                    <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">{lightboxImage?.desc}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;


