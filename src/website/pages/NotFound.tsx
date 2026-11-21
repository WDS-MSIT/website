import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    ArrowLeft,
    Search,
    Terminal,
    CornerDownLeft,
    HelpCircle,
    Sparkles,
    Code,
    Cpu,
    BookOpen,
    GraduationCap,
    Briefcase,
    AlertCircle,
    ChevronRight,
    RefreshCw
} from 'lucide-react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Canvas and Ref pointers
    const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const terminalLogsRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [terminalInput, setTerminalInput] = useState('');
    const [isMatrixActive, setIsMatrixActive] = useState(false);
    type TerminalLog = {
        type: 'error' | 'info' | 'input' | 'success' | 'system';
        text: string;
    };
    const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
        { type: 'system', text: 'MSIT Guidance System [Version 4.2.1-LTS]' },
        { type: 'system', text: '(c) Maharaja Surajmal Institute of Technology. All rights reserved.' },
        { type: 'system', text: '------------------------------------------------------------' },
        { type: 'system', text: `[WARN] Route resolution failure at: ${location.pathname}` },
        { type: 'error', text: 'HTTP Error 404: RESOURCE_NOT_FOUND' },
        { type: 'info', text: "Type 'help' to see available directives or click the shortcut buttons below." }
    ]);

    // GSAP animations
    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.anim-fade-in',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
        )
            .fromTo('.anim-scale-up',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.6 },
                '-=0.4'
            )
            .fromTo('.anim-stagger-item',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
                '-=0.3'
            );
    }, { scope: containerRef });

    // Interactive canvas particle net background
    useEffect(() => {
        const canvas = bgCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationFrameId: number | undefined;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles: Array<{ radius: number; vx: number; vy: number; x: number; y: number }> = [];
        const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 28000));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1
            });
        }

        const mouse: { x: number | null; y: number | null } = { x: null, y: null };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set styles based on accessibility settings
            const isHighContrast = typeof window !== 'undefined' && window.matchMedia('(prefers-contrast: more)').matches;

            if (isHighContrast) {
                // Keep background blank in high contrast mode to maximize readability
                return;
            }

            ctx.strokeStyle = 'rgba(30, 74, 155, 0.05)';
            ctx.lineWidth = 1;

            // Draw connections between nodes
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw mouse connection lines
            if (mouse.x !== null && mouse.y !== null) {
                ctx.strokeStyle = 'rgba(240, 80, 35, 0.06)';
                for (let i = 0; i < particles.length; i++) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw and update particle circles
            ctx.fillStyle = 'rgba(30, 74, 155, 0.15)';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw();
        }

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Matrix falling code animation logic
    useEffect(() => {
        if (!isMatrixActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = matrixCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationFrameId: number | undefined;

        const resizeMatrix = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };
        resizeMatrix();
        window.addEventListener('resize', resizeMatrix);

        const columns = Math.floor(canvas.width / 14) + 1;
        const drops = Array(columns).fill(1);
        const chars = '0101010110010101010010101MSIT101ENGINEERING010101';

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // Slate 900 fade overlay
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(16, 185, 129, 0.35)'; // Emerald green low opacity
            ctx.font = '11px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 14, drops[i] * 14);

                if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(drawMatrix);
        };

        drawMatrix();

        return () => {
            window.removeEventListener('resize', resizeMatrix);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isMatrixActive]);

    // Scroll terminal to bottom
    useEffect(() => {
        const container = terminalLogsRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [terminalLogs, isMatrixActive]);

    // Search bar handler
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Quick command triggers
    const triggerCommand = (cmdText: string) => {
        setTerminalInput(cmdText);
        executeCommand(cmdText);
    };

    // Terminal command executor
    const executeCommand = (cmdStr: string) => {
        const cleanedCmd = cmdStr.trim().toLowerCase();
        const baseCmd = cleanedCmd.split(' ')[0];
        const arg = cleanedCmd.split(' ').slice(1).join(' ');

        // Add user command to logs
        const newLogs: TerminalLog[] = [...terminalLogs, { type: 'input', text: `guest@msit:~$ ${cmdStr}` }];

        switch (baseCmd) {
            case 'help':
                newLogs.push(
                    { type: 'info', text: 'Available commands:' },
                    { type: 'info', text: '  about        - Learn more about MSIT Delhi.' },
                    { type: 'info', text: '  departments  - List engineering departments.' },
                    { type: 'info', text: '  search <q>   - Query the campus database.' },
                    { type: 'info', text: '  matrix       - Initiate digital matrix rain overlay.' },
                    { type: 'info', text: '  hack         - Perform system safety diagnostic.' },
                    { type: 'info', text: '  home         - Direct navigation back home.' },
                    { type: 'info', text: '  back         - Jump to previous page state.' },
                    { type: 'info', text: '  clear        - Flush terminal log buffers.' }
                );
                break;
            case 'about':
                newLogs.push(
                    { type: 'success', text: 'Institution: Maharaja Surajmal Institute of Technology' },
                    { type: 'success', text: 'Affiliation: Guru Gobind Singh Indraprastha University (GGSIPU)' },
                    { type: 'success', text: 'Rating: NBA Accredited, Top Tier Engineering Institute in Delhi.' },
                    { type: 'success', text: 'Location: C-4, Janakpuri, New Delhi, India.' }
                );
                break;
            case 'departments':
                newLogs.push(
                    { type: 'success', text: 'Available B.Tech branches:' },
                    { type: 'success', text: '  • Computer Science & Engineering (CSE)' },
                    { type: 'success', text: '  • Information Technology Engineering (IT)' },
                    { type: 'success', text: '  • Electronics & Communication Engineering (ECE)' },
                    { type: 'success', text: '  • Electrical & Electronics Engineering (EEE)' }
                );
                break;
            case 'search':
                if (!arg) {
                    newLogs.push({ type: 'error', text: 'Syntax Error: search command requires a query. Example: search placements' });
                } else {
                    newLogs.push({ type: 'success', text: `Initiating search for "${arg}" in campus records...` });
                    setTimeout(() => {
                        navigate(`/search?q=${encodeURIComponent(arg)}`);
                    }, 800);
                }
                break;
            case 'matrix':
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    newLogs.push({ type: 'error', text: 'Command Blocked: Reduced motion is enabled. Turn it off in settings to view.' });
                } else {
                    setIsMatrixActive(prev => !prev);
                    newLogs.push({
                        type: 'success',
                        text: isMatrixActive ? 'Digital rain deactivated.' : 'Digital rain stream active. Enjoy the view!'
                    });
                }
                break;
            case 'hack':
                newLogs.push(
                    { type: 'info', text: 'Initializing port analysis...' },
                    { type: 'info', text: 'Bypassing main campus firewall... [OK]' },
                    { type: 'error', text: 'Accessing secure exams directory... [BLOCKED BY ADMIN]' },
                    { type: 'success', text: 'Downloading canteen recipes... [SUCCESS] (Found: Infinite Butter Chicken)' },
                    { type: 'success', text: 'Safety audit completed.' }
                );
                break;
            case 'home':
                newLogs.push({ type: 'success', text: 'Establishing secure link to homepage...' });
                setTimeout(() => {
                    navigate('/');
                }, 600);
                break;
            case 'back':
                newLogs.push({ type: 'success', text: 'Reverting navigation trace...' });
                setTimeout(() => {
                    window.history.back();
                }, 500);
                break;
            case 'clear':
                setTerminalLogs([]);
                setTerminalInput('');
                return;
            case 'secret':
                newLogs.push({ type: 'success', text: 'Easter Egg Activated: You solved it! Answer = 42. Keep building amazing software!' });
                break;
            default:
                newLogs.push({
                    type: 'error',
                    text: `Command not found: "${baseCmd}". Type 'help' for instructions.`
                });
        }
        setTerminalLogs(newLogs);
        setTerminalInput('');
    };

    return (
        <div ref={containerRef} className="min-h-screen relative flex flex-col items-center justify-center px-4 py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 transition-colors duration-300 overflow-hidden select-none">
            <SEO
                title="404 Page Not Found"
                description="The page you are looking for at Maharaja Surajmal Institute of Technology could not be found. Utilize our active search or interactive terminal to return to campus."
            />

            {/* Interactive Background Canvas */}
            <canvas
                ref={bgCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
            />

            {/* Glowing Mesh Gradients (Aesthetics) */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none -z-10 animate-pulse duration-[6000ms]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-400/5 blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />

            {/* Header branding */}
            <div className="anim-fade-in relative z-10 flex flex-col items-center mb-8 text-center">
                <Link to="/" className="flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-slate-200/40 hover:border-slate-300 transition-all shadow-sm">
                    <img
                        src="/msit-logo.webp"
                        alt="MSIT Logo"
                        className="w-7 h-7 object-contain rounded-md"
                    />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 font-inter">
                        Maharaja Surajmal Institute of Technology
                    </span>
                </Link>
            </div>

            {/* Main Interactive Grid Layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl w-full mx-auto px-2 md:px-4">

                {/* Left side: Interactive CLI Console */}
                <div className="anim-scale-up lg:col-span-6 flex flex-col rounded-[2.5rem] bg-slate-955 border border-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden h-[420px] md:h-[480px] relative">

                    {/* Matrix Canvas Rain */}
                    {isMatrixActive && (
                        <canvas
                            ref={matrixCanvasRef}
                            className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-[2.5rem]"
                        />
                    )}

                    {/* Console Header Bar */}
                    <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-950/50">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-slate-400" />
                            <span className="font-mono text-xs font-bold text-slate-300 tracking-wide">
                                guest@msit-terminal:~
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors cursor-pointer" onClick={() => triggerCommand('home')} title="Force Close & Go Home" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600 transition-colors cursor-pointer" onClick={() => triggerCommand('clear')} title="Clear logs" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-600 transition-colors cursor-pointer" onClick={() => triggerCommand('matrix')} title="Toggle Matrix Effect" />
                        </div>
                    </div>

                    {/* Console Scrollable logs */}
                    <div ref={terminalLogsRef} className="relative z-10 flex-grow p-6 overflow-y-auto font-mono text-xs md:text-sm scrollbar-hide flex flex-col gap-2">
                        {terminalLogs.map((log, idx) => (
                            <div
                                key={idx}
                                className={`leading-relaxed whitespace-pre-wrap ${log.type === 'error' ? 'text-red-400' :
                                        log.type === 'success' ? 'text-emerald-400' :
                                            log.type === 'input' ? 'text-white font-bold' :
                                                log.type === 'system' ? 'text-slate-500' :
                                                    'text-blue-400'
                                    }`}
                            >
                                {log.text}
                            </div>
                        ))}
                    </div>

                    {/* Terminal Shortcut Actions Panel */}
                    <div className="relative z-10 px-6 py-2.5 bg-slate-900/60 border-t border-slate-955/40 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider mr-1">Quick:</span>
                        <button
                            onClick={() => triggerCommand('help')}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-955/20 text-blue-400 font-mono text-[10px] transition-all cursor-pointer"
                        >
                            help
                        </button>
                        <button
                            onClick={() => triggerCommand('matrix')}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-955/20 text-emerald-400 font-mono text-[10px] transition-all cursor-pointer"
                        >
                            matrix
                        </button>
                        <button
                            onClick={() => triggerCommand('hack')}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-orange-500/50 hover:bg-orange-955/20 text-orange-400 font-mono text-[10px] transition-all cursor-pointer"
                        >
                            hack
                        </button>
                        <button
                            onClick={() => triggerCommand('about')}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-955/20 text-purple-400 font-mono text-[10px] transition-all cursor-pointer"
                        >
                            about
                        </button>
                    </div>

                    {/* Terminal Input Bar */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (terminalInput.trim()) executeCommand(terminalInput);
                        }}
                        className="relative z-10 flex items-center px-6 py-3.5 bg-slate-900 border-t border-slate-955/50"
                    >
                        <span className="font-mono text-xs md:text-sm text-emerald-400 font-bold select-none mr-2">
                            guest@msit:~$
                        </span>
                        <input
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            placeholder="type command..."
                            className="flex-grow bg-transparent border-none outline-none font-mono text-xs md:text-sm text-white caret-emerald-400 placeholder:text-slate-600 focus:ring-0 focus:border-none p-0"
                            aria-label="Terminal command input"
                        />
                        <button
                            type="submit"
                            className="p-1 text-slate-500 hover:text-emerald-400 transition-colors"
                            aria-label="Submit command"
                        >
                            <CornerDownLeft className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Right side: Sleek Glassmorphic Page Content Info */}
                <div className="anim-scale-up lg:col-span-6 flex flex-col justify-between p-6 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-card hover:shadow-card-hover hover:border-slate-300/40 transition-all">

                    {/* Error Sign & Title */}
                    <div>
                        <div className="anim-fade-in flex items-center gap-3.5 mb-6">
                            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 font-mono">
                                Error Code: 404_PAGE_NOT_FOUND
                            </span>
                        </div>

                        <h1 className="anim-fade-in text-4xl md:text-5xl lg:text-6xl font-black text-slate-955 tracking-tight leading-tight">
                            Lost in <span className="text-primary italic font-medium">space?</span>
                        </h1>

                        <p className="anim-fade-in mt-5 text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                            The academic asset, page, or document you are trying to reach seems to have relocated. Don't worry—let's navigate you back onto campus paths.
                        </p>

                        {/* Functional Search Bar */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="anim-fade-in mt-8 group relative flex items-center bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"
                        >
                            <div className="pl-3 text-slate-400 group-focus-within:text-primary transition-colors">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses, departments, placements..."
                                className="w-full bg-transparent border-none outline-none pl-3 pr-20 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 font-medium font-inter"
                                aria-label="Search site resources"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 px-4 py-2 bg-slate-950 hover:bg-primary text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-slate-900/10 cursor-pointer"
                            >
                                Search
                            </button>
                        </form>

                        {/* Suggested quick searches */}
                        <div className="anim-fade-in mt-3.5 flex flex-wrap gap-1.5 items-center">
                            <span className="text-2xs uppercase tracking-wider font-extrabold text-slate-400 font-inter mr-1">Suggestions:</span>
                            {['Placements', 'CSE Branch', 'Syllabus', 'Admissions'].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery(tag);
                                        navigate(`/search?q=${encodeURIComponent(tag)}`);
                                    }}
                                    className="px-2.5 py-1 text-2xs font-semibold text-slate-500 bg-slate-100 hover:bg-primary/10 hover:text-primary border border-slate-200/50 hover:border-primary/20 rounded-lg transition-all cursor-pointer"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Options Section */}
                    <div className="mt-8 border-t border-slate-150 pt-8">
                        <h3 className="anim-fade-in text-2xs uppercase tracking-widest font-extrabold text-slate-400 mb-4 font-inter">
                            Quick Directories
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                            {/* Option 1: Back to Safety Home */}
                            <Link
                                to="/"
                                className="anim-stagger-item flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-150 hover:border-blue-200/60 rounded-2xl group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Home className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-extrabold text-slate-800 font-inter">Home Page</h4>
                                        <p className="text-[10px] text-slate-400 mt-0.5">MSIT main gateway</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Option 2: Go Back in History */}
                            <button
                                onClick={() => window.history.back()}
                                className="anim-stagger-item flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 border border-slate-150 hover:border-slate-200 rounded-2xl group transition-all text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-200/70 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-extrabold text-slate-800 font-inter">Return Back</h4>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Go back one step</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Option 3: Admissions Directory */}
                            <Link
                                to="/faculty"
                                className="anim-stagger-item flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-150 hover:border-emerald-200/60 rounded-2xl group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-extrabold text-slate-800 font-inter">Faculty Directory</h4>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Explore staff records</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Option 4: Career & Placement Cell */}
                            <Link
                                to="/placements"
                                className="anim-stagger-item flex items-center justify-between p-4 bg-slate-50 hover:bg-purple-50/50 border border-slate-150 hover:border-purple-200/60 rounded-2xl group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-extrabold text-slate-800 font-inter">Placements Hub</h4>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Career opportunities</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </Link>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default NotFound;
