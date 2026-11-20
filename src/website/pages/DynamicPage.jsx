import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, LayoutDashboard, X, Mail, Linkedin, Globe, Phone, FileText, Star, ChevronDown, ExternalLink } from 'lucide-react';
import { pagesData } from '../data/pagesData';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import KeyFiguresStrip from '../components/KeyFiguresStrip';
import NotFound from './NotFound';
import { facultyMembers } from '../data/facultyData';
import FeePaymentPortal from '../components/FeePaymentPortal';
import EventsPortal from '../components/EventsPortal';
import NewslettersMagazines from '../components/NewslettersMagazines';
import SocietyDetailView from '../components/SocietyDetailView';
import SocietiesHubView from '../components/SocietiesHubView';
import { societiesData } from '../data/societiesData';
import { toSocietyDetail, useCmsSocieties } from '../cms/societies';
import { createSlugifier } from '../utils/slugify';

import DepartmentLabsSection from '../components/DepartmentLabsSection';

const DynamicPage = () => {
    const { slug } = useParams();
    const pageData = pagesData[slug];
    const navigate = useNavigate();
    const cmsSocieties = useCmsSocieties();
    const [selectedMember, setSelectedMember] = useState(null);
    const [activeFeeTab, setActiveFeeTab] = useState('pay');
    const [activeEventTab, setActiveEventTab] = useState('avensis');
    const [activeHighlightIndex, setActiveHighlightIndex] = useState(null);
    const [prevSlug, setPrevSlug] = useState(slug);

    const processedContent = useMemo(() => {
        if (!pageData?.content) return '';
        const getSlug = createSlugifier();
        return pageData.content.replace(/<(h[34])(\s+[^>]*)?>([\s\S]*?)<\/\1>/gi, (match, tag, attrs = '', inner) => {
            // Strip tags from inner content to get clean heading text
            const plainText = inner.replace(/<[^>]*>/g, '').trim();
            const id = getSlug(plainText);
            // If already has an id, keep it, otherwise add id
            if (/\bid=["'][^"']+["']/i.test(attrs)) {
                return match;
            }
            return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
        });
    }, [pageData]);

    const isDeptPage = ['cse', 'it', 'ece', 'eee', 'applied-sciences'].includes(slug);

    // "On this page" links: the h3 headings in the page content, plus the labs section on department pages.
    const tocItems = useMemo(() => {
        const items = [...processedContent.matchAll(/<h3[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h3>/gi)]
            .map((m, i) => ({ id: m[1], label: i === 0 && isDeptPage ? 'Overview' : m[2].replace(/<[^>]*>/g, '').trim() }));
        if (isDeptPage) items.push({ id: 'department-labs', label: 'Labs & Facilities' });
        return items;
    }, [processedContent, isDeptPage]);
    const [activeTocId, setActiveTocId] = useState(null);

    // Sidebar scrolls with the page. A sidebar that fits stays pinned under the header with some breathing room.
    // One that is taller than the screen would have its top hidden under the header, so instead its cards scroll
    // away and only the "On this page" box stays pinned (moved to the bottom of the column). With no such box,
    // a tall sidebar keeps moving until its last card is in view, so the right column never sits empty.
    const sidebarRef = useRef(null);
    const [sidebarTop, setSidebarTop] = useState(160);
    const [sidebarMode, setSidebarMode] = useState('pin'); // 'pin' | 'toc' | 'bottom'
    useEffect(() => {
        const el = sidebarRef.current;
        if (!el) return;
        let frame = 0;
        // Pin just below the fixed header, whose height changes as it collapses on scroll.
        const update = () => {
            frame = 0;
            const header = document.querySelector('header');
            const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 128;
            const pinned = Math.round(headerBottom + 32);
            // Measure the cards themselves (the box can be stretched to the column height in 'toc' mode).
            const cards = [...el.children].filter(c => c.offsetHeight > 0);
            const contentH = cards.reduce((sum, c) => sum + c.offsetHeight, 0) + 24 * Math.max(0, cards.length - 1);
            const room = window.innerHeight - pinned - 24;
            const hasToc = Boolean(el.querySelector('nav[aria-label="On this page"]'));
            if (contentH <= room) {
                setSidebarMode('pin');
                setSidebarTop(pinned);
            } else if (hasToc) {
                setSidebarMode('toc');
                setSidebarTop(pinned);
            } else {
                setSidebarMode('bottom');
                setSidebarTop(Math.min(pinned, window.innerHeight - contentH - 24));
            }
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        const ro = new ResizeObserver(schedule);
        ro.observe(el);
        window.addEventListener('resize', schedule);
        window.addEventListener('scroll', schedule, { passive: true });
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', schedule);
            window.removeEventListener('scroll', schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [slug]);

    // Highlight the section being read: the last heading that has scrolled up past the fixed header.
    useEffect(() => {
        if (tocItems.length < 3) return;
        const update = () => {
            let current = tocItems[0].id;
            for (const item of tocItems) {
                const el = document.getElementById(item.id);
                if (el && el.getBoundingClientRect().top <= 180) current = item.id;
            }
            // At the very bottom of the page the last section is the one being read.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
                current = tocItems[tocItems.length - 1].id;
            }
            setActiveTocId(current);
        };
        // Only a handful of headings are checked, so running on every scroll event is cheap.
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [tocItems]);

    const scrollToSection = (e, id) => {
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' });
        setActiveTocId(id);
    };

    if (prevSlug !== slug) {
        setPrevSlug(slug);
        setActiveHighlightIndex(null);
        if (slug === 'online-fee') {
            setActiveFeeTab('pay');
        } else if (slug === 'events') {
            setActiveEventTab('avensis');
        }
    }

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    const handleContentClick = (e) => {
        const anchor = e.target.closest('a');
        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href) {
                if (href.startsWith('/faculty?id=')) {
                    e.preventDefault();
                    const urlParams = new URLSearchParams(href.split('?')[1]);
                    const id = urlParams.get('id');
                    const member = facultyMembers.find(f => f.id === id);
                    if (member) {
                        setSelectedMember({
                            ...member,
                            phone: member.phone || "+91 11 6521 5944" // default office phone
                        });
                    }
                    return;
                }
                if (href.startsWith('/') && !href.startsWith('//')) {
                    e.preventDefault();
                    navigate(href);
                }
            }
        }
    };

    // Dedicated Full-Featured View for Individual Society Pages (e.g. GeekRoom, IEEE, NDLI)
    // The CMS society with this page id (if any) is laid over the website's page; CMS-only
    // societies get a page too.
    const cmsSociety = cmsSocieties ? cmsSocieties[slug] : undefined;
    if (societiesData[slug] || cmsSociety) {
        return <SocietyDetailView society={toSocietyDetail(cmsSociety, societiesData[slug])} />;
    }
    if (slug?.startsWith('society-') && cmsSocieties === undefined) {
        return <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6"><p className="text-slate-500">Loading…</p></main>;
    }

    // Dedicated Redesigned View for the Student Societies Hub Directory (/society)
    useEffect(() => {
        if (slug === 'smes') {
            window.location.replace('https://surajmalmemorialeducationsociety.org/');
        }
    }, [slug]);

    if (slug === 'smes') {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                <SEO 
                    title="Surajmal Memorial Education Society" 
                    description="Redirecting to the official Surajmal Memorial Education Society (SMES) website." 
                    canonicalPath="/smes" 
                />
                <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-fade-in">
                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto">
                        <ExternalLink className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">Surajmal Memorial Education Society</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Redirecting you to the official SMES society portal (<code className="text-primary font-mono text-xs">surajmalmemorialeducationsociety.org</code>)...
                        </p>
                    </div>
                    <div className="pt-2">
                        <a
                            href="https://surajmalmemorialeducationsociety.org/"
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
                        >
                            <span>Open SMES Portal Now</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div>
                        <Link to="/" className="text-xs text-slate-500 hover:text-slate-700 font-semibold underline">
                            &larr; Return to MSIT Homepage
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (slug === 'society') {
        return (
            <main className="min-h-screen bg-slate-50 transition-colors duration-300">
                <SEO 
                    title="Student Societies & Chapters" 
                    description="Explore 20+ vibrant technical, cultural, and academic student societies at Maharaja Surajmal Institute of Technology." 
                    canonicalPath="/society" 
                />
                <PageHero 
                    title="Student"
                    accentTitle="Societies & Chapters"
                    description="Technical innovation, performing arts, research groups, and community impact. Find your room and collaborate with 50,000+ peers."
                    breadcrumbs={[
                        { label: 'Campus Life' },
                        { label: 'Student Societies' }
                    ]}
                    heroImage="/campus-hero.webp"
                    heroImageAlt="Vibrant MSIT student societies and tech community"
                />
                <section className="py-8 sm:py-16 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <SocietiesHubView />
                    </div>
                </section>
            </main>
        );
    }

    if (slug === 'newsletters-magazines') {
        if (!pageData) return <NotFound />;
        return (
            <main className="min-h-screen bg-white transition-colors duration-300">
                <SEO 
                    title={pageData.title} 
                    description={pageData.seo_description || pageData.subtitle} 
                    canonicalPath={`/${slug}`} 
                />
                <PageHero 
                    title={pageData.title.split(' ').slice(0, -1).join(' ')}
                    accentTitle={pageData.title.split(' ').pop()}
                    description={pageData.subtitle}
                    breadcrumbs={[
                        { label: pageData.title }
                    ]}
                    heroImage={pageData.heroImage}
                    heroImageAlt={pageData.heroImageAlt}
                />
                <section className="bg-slate-50 border-b border-slate-100 transition-colors">
                    <NewslettersMagazines />
                </section>
            </main>
        );
    }

    if (!pageData) {
        return <NotFound />;
    }

    const isDepartment = ['cse', 'it', 'ece', 'eee', 'applied-sciences'].includes(slug);
    // On phones the sidebar (Key Highlights, Questions) always follows the content. The fee page's tabs now live in its content.
    const sidebarFirstOnMobile = false;
    // Pages whose content stands on its own (events, policy pages) drop the sidebar and use the full width.
    const fullWidth = pageData.layout === 'full';
    // Pages that show their key figures as the slim strip over the hero (like Placements) instead of sidebar cards.
    const heroStrip = Boolean(pageData.statsStrip && pageData.stats && pageData.stats.length > 0);
    const courseSchema = isDepartment ? {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": pageData.title,
        "description": pageData.seo_description || pageData.subtitle,
        "provider": {
            "@type": "EducationalOrganization",
            "name": "Maharaja Surajmal Institute of Technology",
            "url": "https://msit-website.netlify.app"
        }
    } : null;

    return (
        <main className="min-h-screen bg-white transition-colors duration-300">
            <SEO 
                title={pageData.title} 
                description={pageData.seo_description || pageData.subtitle} 
                canonicalPath={`/${slug}`} 
                schema={courseSchema}
            />
            <PageHero 
                title={pageData.title.split(' ').slice(0, -1).join(' ')}
                accentTitle={pageData.title.split(' ').pop()}
                description={pageData.subtitle}
                breadcrumbs={[
                    { 
                        label: pageData.title === 'Applied Sciences' ? (
                            <span>
                                Applied Sciences
                                <span className="ml-1 text-primary font-medium">(1st Year)</span>
                            </span>
                        ) : pageData.title 
                    }
                ]}
                subtitle={pageData.title === 'Applied Sciences' ? "1st Year" : null}
                heroImage={pageData.heroImage}
                heroImageAlt={pageData.heroImageAlt}
            />

            {heroStrip && <KeyFiguresStrip items={pageData.stats} className="max-w-[92rem]" />}

            {/* KEY FIGURES (department pages, and full-width pages whose sidebar is hidden) */}
            {(isDepartment || fullWidth) && pageData.stats && pageData.stats.length > 0 && (
                <section aria-label="Key figures" className="bg-white border-b border-slate-200">
                    <div className="max-w-[92rem] mx-auto px-4 sm:px-6">
                        <div className={`grid grid-cols-2 ${pageData.stats.length >= 4 ? 'lg:grid-cols-4' : ''}`}>
                            {pageData.stats.map((stat, i) => {
                                // First column lines up with the content edge; dividers between cells.
                                const pad = i === 0 ? 'pl-0' : i === 2 ? 'pl-0 lg:pl-8' : 'pl-5 lg:pl-8';
                                const lines = `${i % 2 === 1 ? 'border-l' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`;
                                const targetUrl = stat.url || stat.link;
                                const hasLink = Boolean(targetUrl);

                                const content = (
                                    <div className={`py-3 lg:py-5 pr-4 ${pad} ${lines} border-slate-200 h-full flex flex-col justify-between transition-colors ${
                                        hasLink ? 'hover:bg-primary/5 cursor-pointer group' : ''
                                    }`}>
                                        <div className="flex items-center justify-between gap-2">
                                            <div className={`text-xl sm:text-2xl font-bold tabular-nums leading-tight transition-colors ${
                                                hasLink ? 'text-title group-hover:text-primary' : 'text-title'
                                            }`}>
                                                {stat.value}
                                            </div>
                                            {hasLink && (
                                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                            )}
                                        </div>
                                        <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted flex items-center gap-1">
                                            <span className={hasLink ? 'group-hover:text-slate-900 transition-colors' : ''}>{stat.label}</span>
                                            {hasLink && <span className="text-primary text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>}
                                        </div>
                                    </div>
                                );

                                return hasLink ? (
                                    <Link key={i} to={targetUrl} className="block h-full focus:outline-hidden focus:ring-2 focus:ring-primary/20">
                                        {content}
                                    </Link>
                                ) : (
                                    <div key={i} className="h-full">
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* MAIN CONTENT LAYOUT */}
            <section className={`${isDepartment || fullWidth ? 'py-8 sm:py-16' : 'py-12 sm:py-24'} bg-white relative transition-colors`}>
                <div className="max-w-[92rem] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* Main Typography Area */}
                        {/* On phones the content comes first, except on the fee page (see sidebarFirstOnMobile). */}
                        <div className={`w-full ${fullWidth ? '' : 'lg:w-2/3'} ${sidebarFirstOnMobile ? 'order-2' : 'order-1'} lg:order-1`}>
                            {/* Phones and tablets: the sidebar's key figures as a small strip at the top, not big cards at the bottom. */}
                            {!isDepartment && !fullWidth && !heroStrip && pageData.stats && pageData.stats.length > 0 && (
                                <div className="lg:hidden grid grid-cols-2 gap-2 mb-6">
                                    {pageData.stats.map((stat, i) => {
                                        const target = stat.link || stat.url;
                                        const body = (
                                            <>
                                                <span className="block text-base font-bold text-title tabular-nums leading-tight">{stat.value}</span>
                                                <span className="block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-muted leading-snug">{stat.label}</span>
                                            </>
                                        );
                                        const box = 'block px-3 py-2.5 rounded-xl bg-surface ring-1 ring-slate-200/80';
                                        if (!target) return <div key={i} className={box}>{body}</div>;
                                        return target.startsWith('http')
                                            ? <a key={i} href={target} target="_blank" rel="noopener noreferrer" className={`${box} no-underline`}>{body}</a>
                                            : <Link key={i} to={target} className={`${box} no-underline`}>{body}</Link>;
                                    })}
                                </div>
                            )}
                            {isDepartment ? (
                                <div>
                                    <div 
                                        className="prose prose-sm sm:prose-lg prose-slate max-w-none font-light leading-loose text-body" 
                                        dangerouslySetInnerHTML={{ __html: processedContent }}
                                        onClick={handleContentClick}
                                    ></div>
                                </div>
                            ) : slug === 'online-fee' ? (
                                <FeePaymentPortal activeTab={activeFeeTab} setActiveTab={setActiveFeeTab} />
                            ) : slug === 'events' ? (
                                <EventsPortal activeTab={activeEventTab} setActiveTab={setActiveEventTab} />
                            ) : pageData.component ? (
                                <pageData.component />
                            ) : (
                                <div 
                                    className={`prose prose-sm sm:prose-lg prose-slate max-w-none font-normal leading-loose text-body ${fullWidth ? 'policy-page' : ''}`} 
                                    dangerouslySetInnerHTML={{ __html: processedContent }}
                                    onClick={handleContentClick}
                                ></div>
                            )}
                        </div>

                        {/* Interactive Sidebar */}
                        <div className={`${fullWidth ? 'hidden' : 'w-full lg:w-1/3'} ${sidebarFirstOnMobile ? 'order-1' : 'order-2'} lg:order-2`}>
                            <div
                                ref={sidebarRef}
                                className={sidebarMode === 'toc' ? 'lg:h-full flex flex-col gap-6' : 'lg:sticky space-y-6'}
                                style={sidebarMode === 'toc' ? undefined : { top: sidebarTop }}
                            >

                                {/* Stats Cards */}
                                {!isDepartment && !heroStrip && pageData.stats && pageData.stats.length > 0 && (
                                    <div className="hidden lg:grid grid-cols-2 gap-4">
                                        {pageData.stats.map((stat, i) => {
                                            const hasLink = Boolean(stat.link || stat.url);
                                            const targetUrl = stat.link || stat.url;
                                            const isExternal = targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'));

                                            const cardInner = (
                                                <div className={`p-6 rounded-2xl border transition-all h-full flex flex-col justify-between ${
                                                    hasLink 
                                                        ? 'bg-surface hover:bg-white border-slate-200/90 hover:border-primary/40 hover:shadow-md cursor-pointer group' 
                                                        : 'bg-surface border-slate-100 shadow-card'
                                                }`}>
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className={`text-2xl font-bold transition-colors ${hasLink ? 'text-title group-hover:text-primary' : 'text-title'}`}>
                                                                {stat.value}
                                                            </div>
                                                            {hasLink && (
                                                                <div className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-xs font-bold uppercase tracking-widest text-muted">{stat.label}</div>
                                                    </div>
                                                    {stat.desc && (
                                                        <p className="text-[11px] text-slate-500 mt-2 leading-snug font-normal">{stat.desc}</p>
                                                    )}
                                                </div>
                                            );

                                            if (!hasLink) {
                                                return <div key={i}>{cardInner}</div>;
                                            }

                                            if (isExternal) {
                                                return (
                                                    <a key={i} href={targetUrl} target="_blank" rel="noopener noreferrer" className="block text-inherit no-underline">
                                                        {cardInner}
                                                    </a>
                                                );
                                            }

                                            return (
                                                <Link key={i} to={targetUrl} className="block text-inherit no-underline">
                                                    {cardInner}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* On this page */}
                                {tocItems.length >= 3 && (
                                    <nav
                                        aria-label="On this page"
                                        className={`hidden lg:block bg-white p-5 rounded-2xl border border-slate-200 shadow-card ${sidebarMode === 'toc' ? 'lg:order-last lg:sticky' : ''}`}
                                        style={sidebarMode === 'toc' ? { top: sidebarTop } : undefined}
                                    >
                                        <h4 className="px-3 mb-2 text-xs font-bold uppercase tracking-widest text-muted">On this page</h4>
                                        <ul className="space-y-0.5">
                                            {tocItems.map(item => {
                                                const active = activeTocId === item.id;
                                                return (
                                                    <li key={item.id}>
                                                        <a
                                                            href={`/${slug}#${item.id}`}
                                                            onClick={(e) => scrollToSection(e, item.id)}
                                                            aria-current={active ? 'location' : undefined}
                                                            className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:text-primary hover:bg-slate-50'}`}
                                                        >
                                                            {item.label}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                )}

                                {/* FAQs */}
                                {pageData.faqs && pageData.faqs.length > 0 && (
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
                                        <h4 className="text-lg font-bold text-title mb-4">Frequently asked questions</h4>
                                        <div className="divide-y divide-slate-200">
                                            {pageData.faqs.map((faq, i) => (
                                                <details key={i} className="group py-3 first:pt-0 last:pb-0">
                                                    <summary className="flex items-start justify-between gap-3 cursor-pointer list-none text-sm font-semibold text-slate-900 hover:text-primary transition-colors [&::-webkit-details-marker]:hidden">
                                                        <span>{faq.q}</span>
                                                        <ChevronDown className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 group-open:rotate-180 group-open:text-primary transition-transform" />
                                                    </summary>
                                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Key Highlights */}
                                {pageData.bulletPoints && pageData.bulletPoints.length > 0 && (
                                    <div className="bg-white p-6 sm:p-8 rounded-2xl text-slate-900 shadow-card border border-slate-200">
                                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                                            <h4 className="text-base sm:text-lg font-bold flex items-center gap-2.5">
                                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                                Key Highlights
                                            </h4>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                                                Interactive
                                            </span>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {pageData.bulletPoints.map((point, i) => {
                                                const isObject = typeof point === 'object' && point !== null;
                                                const labelText = isObject ? point.label : point;
                                                const pointUrl = isObject ? point.url : null;
                                                const detailText = isObject ? point.detail : `Key institutional guidelines and resource highlights for ${labelText}.`;
                                                const actionText = isObject && point.actionText ? point.actionText : (pointUrl ? (pointUrl.startsWith('http') ? 'Visit Official Portal' : 'Learn More') : null);

                                                const isActiveFeeTab = slug === 'online-fee' && (
                                                    (labelText.includes('Payment') && activeFeeTab === 'pay') ||
                                                    (labelText.includes('Receipt') && activeFeeTab === 'receipt') ||
                                                    (labelText.includes('Refund') && activeFeeTab === 'refund')
                                                );

                                                const isActiveEventTab = slug === 'events' && (
                                                    (labelText.includes('Avensis') && activeEventTab === 'avensis') ||
                                                    (labelText.includes('Genesis') && activeEventTab === 'genesis') ||
                                                    (labelText.includes('Sports') && activeEventTab === 'sports')
                                                );

                                                const isExpanded = activeHighlightIndex === i;
                                                const isActive = isActiveFeeTab || isActiveEventTab || isExpanded;
                                                const isDirectLink = Boolean(pointUrl && !detailText && !isActiveFeeTab && !isActiveEventTab);

                                                const handleClick = () => {
                                                    if (slug === 'online-fee') {
                                                        if (labelText.includes('Payment')) setActiveFeeTab('pay');
                                                        else if (labelText.includes('Receipt')) setActiveFeeTab('receipt');
                                                        else if (labelText.includes('Refund')) setActiveFeeTab('refund');
                                                    } else if (slug === 'events') {
                                                        if (labelText.includes('Avensis')) setActiveEventTab('avensis');
                                                        else if (labelText.includes('Genesis')) setActiveEventTab('genesis');
                                                        else if (labelText.includes('Sports')) setActiveEventTab('sports');
                                                    }
                                                    
                                                    setActiveHighlightIndex(isExpanded ? null : i);
                                                };

                                                if (isDirectLink) {
                                                    const linkProps = pointUrl.startsWith('http') 
                                                        ? { href: pointUrl, target: '_blank', rel: 'noopener noreferrer' }
                                                        : { to: pointUrl };
                                                    const Component = pointUrl.startsWith('http') ? 'a' : Link;

                                                    return (
                                                        <li key={i}>
                                                            <Component
                                                                {...linkProps}
                                                                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-primary/5 border border-slate-200/70 hover:border-primary/30 text-slate-700 hover:text-primary transition-all group cursor-pointer"
                                                            >
                                                                <div className="flex items-center gap-3 min-w-0 pr-2">
                                                                    <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                                                    <span className="text-sm font-semibold truncate" dangerouslySetInnerHTML={{ __html: labelText }}></span>
                                                                </div>
                                                                {pointUrl.startsWith('http') ? (
                                                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary shrink-0 transition-colors" />
                                                                ) : (
                                                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary shrink-0 transition-colors" />
                                                                )}
                                                            </Component>
                                                        </li>
                                                    );
                                                }

                                                return (
                                                    <li key={i} className={`rounded-xl border transition-all ${isExpanded ? 'bg-primary/5 border-primary/30' : 'bg-slate-50 hover:bg-slate-100 border-slate-200/70'}`}>
                                                        <div
                                                            role="button"
                                                            tabIndex={0}
                                                            onClick={handleClick}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' || e.key === ' ') {
                                                                    e.preventDefault();
                                                                    handleClick();
                                                                }
                                                            }}
                                                            aria-expanded={isExpanded}
                                                            className="w-full flex items-center justify-between p-3.5 text-left transition-colors cursor-pointer group focus:outline-none"
                                                        >
                                                            <div className="flex items-center gap-3 min-w-0 pr-2">
                                                                <span className={`w-2 h-2 rounded-full shrink-0 transition-all ${isActive ? 'bg-primary scale-125' : 'bg-slate-300 group-hover:bg-slate-400'}`}></span>
                                                                <span 
                                                                    className={`text-sm font-semibold transition-colors ${isActive ? 'text-primary font-bold' : 'text-slate-700 group-hover:text-slate-900'}`}
                                                                    dangerouslySetInnerHTML={{ __html: labelText }}
                                                                ></span>
                                                            </div>
                                                            <div className="flex items-center gap-2 shrink-0">
                                                                {pointUrl && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            if (pointUrl.startsWith('http')) {
                                                                                window.open(pointUrl, '_blank', 'noopener,noreferrer');
                                                                            } else {
                                                                                navigate(pointUrl);
                                                                            }
                                                                        }}
                                                                        title="Direct link"
                                                                        className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                                                                    >
                                                                        {pointUrl.startsWith('http') ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
                                                                    </button>
                                                                )}
                                                                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                                                            </div>
                                                        </div>

                                                        {isExpanded && detailText && (
                                                            <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-200/70 space-y-3 animate-fade-in">
                                                                <p className="leading-relaxed font-normal text-slate-600">{detailText}</p>
                                                                {pointUrl && (
                                                                    <div className="pt-1">
                                                                        {pointUrl.startsWith('http') ? (
                                                                            <a 
                                                                                href={pointUrl}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-sm hover:shadow transition-all group/btn"
                                                                            >
                                                                                <span>{actionText || 'Visit Official Portal'}</span>
                                                                                <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                                                            </a>
                                                                        ) : (
                                                                            <Link 
                                                                                to={pointUrl}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-sm hover:shadow transition-all group/btn"
                                                                            >
                                                                                <span>{actionText || 'Explore Page'}</span>
                                                                                <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                {/* Custom Sidebar Content */}
                                {pageData.sidebarHtml && (
                                    <div dangerouslySetInnerHTML={{ __html: pageData.sidebarHtml }}></div>
                                )}

                                {/* Quick CTA */}
                                {slug !== 'contact' && (
                                    <Link to="/contact" className="block p-6 rounded-2xl border-2 border-slate-100 hover:border-primary/20 bg-white transition-colors cursor-pointer group">
                                        <h4 className="text-lg font-semibold text-title mb-2 group-hover:text-primary transition-colors">Questions?</h4>
                                        <p className="text-sm text-muted font-light mb-4">Contact the MSIT administrative desk directly.</p>
                                        <div className="text-primary font-medium text-sm flex items-center group-hover:translate-x-2 transition-transform">
                                            Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>

                    </div>
                    {isDepartment && (
                        <div id="department-labs" className="mt-10 sm:mt-16">
                            <DepartmentLabsSection deptKey={slug === 'applied-sciences' ? 'as' : slug} />
                        </div>
                    )}
                </div>
            </section>

            {/* Interactive Modal Popup */}
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-fade-in">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-backdrop-fade"
                        onClick={() => setSelectedMember(null)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-3xl sm:rounded-[2rem] shadow-2xl border border-slate-200 animate-scale-in">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Top banner / image */}
                        <div className="bg-white border-b border-slate-200 p-5 sm:p-8 pt-10 sm:pt-12 relative">
                                                        <div className="flex gap-4 sm:gap-6 items-center relative z-10">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 bg-slate-50">
                                    <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider rounded mb-1.5 sm:mb-2">{selectedMember.dept}</span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug pr-10">{selectedMember.name}</h3>
                                    <p className="text-primary text-xs sm:text-sm font-medium line-clamp-2 mt-1">{selectedMember.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details body */}
                        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 bg-slate-50">
                            {selectedMember.bio && (
                                <div>
                                    <h4 className="font-sans! text-xs font-semibold text-slate-500 uppercase tracking-wider! mb-3 flex items-center gap-1.5">
                                        <FileText className="w-4 h-4 text-primary" /> Professional Bio
                                    </h4>
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        {selectedMember.bio}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200">
                                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Qualification</div>
                                    <div className="text-sm font-medium text-slate-900 leading-snug">{selectedMember.qual || selectedMember.qualifications || "N/A"}</div>
                                </div>
                                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200">
                                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Experience / Status</div>
                                    <div className="text-sm font-medium text-slate-900 leading-snug">{selectedMember.experience} Years</div>
                                </div>
                            </div>

                            {selectedMember.goodAt && selectedMember.goodAt.length > 0 && (
                                <div>
                                    <h4 className="font-sans! text-xs font-semibold text-slate-500 uppercase tracking-wider! mb-3 flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-primary fill-primary" /> Key Focus Areas
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMember.goodAt.map((item, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-primary/5 border border-primary/20 rounded-md text-xs font-medium text-primary">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                                <div className="flex flex-col gap-2 shrink-0">
                                    <a 
                                        href={`mailto:${selectedMember.email}`}
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors truncate"
                                    >
                                        <Mail className="w-4 h-4 shrink-0" />
                                        <span className="truncate text-left">{selectedMember.email}</span>
                                    </a>

                                    <a 
                                        href={`tel:${selectedMember.phone.replace(/\s+/g, '')}`}
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors truncate"
                                    >
                                        <Phone className="w-4 h-4 shrink-0" />
                                        <span className="truncate text-left">{selectedMember.phone}</span>
                                    </a>
                                </div>

                                <div className="flex gap-3 justify-end items-end">
                                    {selectedMember.pdfLink && (
                                        <a 
                                            href={selectedMember.pdfLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center transition-colors"
                                            title="View Official Profile PDF"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </a>
                                    )}
                                    {selectedMember.linkedin && (
                                        <a 
                                            href={selectedMember.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-10 h-10 bg-[#0077B5] hover:bg-[#005a8a] text-white rounded-xl flex items-center justify-center transition-colors"
                                            title="LinkedIn Profile"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main >
    );
};

export default DynamicPage;
