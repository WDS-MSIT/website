import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { linkUrl, mediaUrl, safeUrl } from '../cms/client';
import { useSiteSettings } from '../cms/site-settings';

const FALLBACK_QUICK_LINKS = [
    { label: 'About MSIT', url: '/about', external: false },
    { label: 'Admissions 2026', url: '/online-fee', external: false },
    { label: 'Academic Programs', url: '/cse', external: false },
    { label: 'Campus Life', url: '/society', external: false },
    { label: 'Download Brochure', url: '/brochure', external: false },
];

const Footer = () => {
    const { setIsModalOpen } = useAccessibility();
    const { data: site, status } = useSiteSettings();
    const cmsReady = status === 'ready' && site;

    const instituteName =
        cmsReady && site.instituteName
            ? site.instituteName
            : 'Maharaja Surajmal Institute of Technology';
    const logoSrc = cmsReady
        ? mediaUrl(site.logo) || safeUrl(site.legacyLogoUrl) || '/msit-logo.webp'
        : '/msit-logo.webp';
    const address = cmsReady ? site.address : 'C-4, Janakpuri, New Delhi\nPIN 110058, India';
    const contactLines = cmsReady ? site.contactLines || [] : [];
    const phoneLine = contactLines.find((line) => /phone|reception/i.test(line.label));
    const emailLine = contactLines.find((line) => /email|mail/i.test(line.label));
    const cmsFooterLinks = cmsReady
        ? (site.footerLinks || [])
              .map((link) => {
                  const url = linkUrl(link);
                  return url
                      ? {
                            label: link.label,
                            url,
                            external: /^https?:\/\//i.test(url) || Boolean(link.openInNewTab),
                        }
                      : null;
              })
              .filter(
                  (link): link is { external: boolean; label: string; url: string } =>
                      Boolean(link),
              )
        : [];
    const footerLinks = cmsReady ? cmsFooterLinks : FALLBACK_QUICK_LINKS;
    const copyright =
        (cmsReady && site.footerText) || `© ${new Date().getFullYear()} ${instituteName}`;
    const [expandedSections, setExpandedSections] = useState({
        quickLinks: false,
        resources: false,
        followUs: false,
    });

    const toggleSection = (section: 'followUs' | 'quickLinks' | 'resources') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <footer className="bg-slate-950 pt-12 lg:pt-16 pb-12 border-t border-slate-900 text-slate-300">


            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-10 lg:mb-20">

                    {/* Col 1 */}
                    <div className="lg:col-span-2 pr-4">
                        <Link to="/" className="flex items-center gap-4 mb-10 group" aria-label="MSIT New Delhi Home">
                            <img 
                                src={logoSrc} 
                                alt={`${instituteName} logo`} 
                                className="h-12 md:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105 brightness-[1.1]" 
                                width="120"
                                height="112"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="flex flex-col justify-center">
                                <span className="font-['Libre_Baskerville',serif] font-black text-base md:text-xl tracking-tight leading-tight text-white group-hover:text-primary transition-colors">
                                    {instituteName}
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-300 font-medium leading-relaxed mb-6 lg:mb-10 max-w-sm">
                            Shaping tomorrow's engineers and innovators through exceptional academic rigor and profound industry immersion.
                        </p>
                        <div className="space-y-4 lg:space-y-6 text-sm font-bold text-slate-400">
                            {address ? (
                                <div className="flex items-start group">
                                    <MapPin className="w-5 h-5 mr-4 text-slate-700 shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:text-white transition-colors leading-relaxed"
                                    >
                                        {address.split('\n').map((line, index) => (
                                            <span key={`${line}-${index}`}>
                                                {index > 0 ? <br /> : null}
                                                <span className={index > 0 ? 'text-xs font-medium opacity-80 uppercase tracking-widest' : undefined}>
                                                    {line}
                                                </span>
                                            </span>
                                        ))}
                                    </a>
                                </div>
                            ) : null}
                            {phoneLine ? (
                                <div className="flex items-center group">
                                    <Phone className="w-5 h-5 mr-4 text-slate-700 group-hover:text-primary transition-colors" />
                                    <a href={phoneLine.href || `tel:${phoneLine.value.replace(/\s+/g, '')}`} className="hover:text-white transition-colors tracking-wide">{phoneLine.value}</a>
                                </div>
                            ) : null}
                            {emailLine ? (
                                <div className="flex items-center group">
                                    <Mail className="w-5 h-5 mr-4 text-slate-700 group-hover:text-primary transition-colors" />
                                    <a href={emailLine.href || `mailto:${emailLine.value}`} className="hover:text-white transition-colors tracking-wide">{emailLine.value}</a>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div>
                        <h3 
                            onClick={() => toggleSection('quickLinks')}
                            className="text-white text-xs font-black uppercase tracking-[0.25em] mb-4 lg:mb-10 opacity-80 cursor-pointer lg:cursor-default flex items-center justify-between lg:block"
                        >
                            <span>Quick Links</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 lg:hidden ${expandedSections.quickLinks ? 'rotate-180' : ''}`} />
                        </h3>
                        <ul className={`space-y-3 lg:space-y-5 font-bold text-sm transition-all duration-300 overflow-hidden ${expandedSections.quickLinks ? 'max-h-60 opacity-100 mb-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-0 pointer-events-none lg:pointer-events-auto'}`}>
                            {footerLinks.map((link) => (
                                <li key={link.url}>
                                    {link.external ? (
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> {link.label}
                                        </a>
                                    ) : (
                                        <Link to={link.url} className="hover:text-primary transition-all flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div>
                        <h3 
                            onClick={() => toggleSection('resources')}
                            className="text-white text-xs font-black uppercase tracking-[0.25em] mb-4 lg:mb-10 opacity-80 cursor-pointer lg:cursor-default flex items-center justify-between lg:block"
                        >
                            <span>Resources</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 lg:hidden ${expandedSections.resources ? 'rotate-180' : ''}`} />
                        </h3>
                        <ul className={`space-y-3 lg:space-y-5 font-bold text-sm transition-all duration-300 overflow-hidden ${expandedSections.resources ? 'max-h-60 opacity-100 mb-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-0 pointer-events-none lg:pointer-events-auto'}`}>
                            <li><Link to="/brochure" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> Information Bulletin</Link></li>
                            <li><Link to="/academic-calendar" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> Academic Calendar</Link></li>
                            <li><Link to="/timetable" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> Time Table</Link></li>
                            <li><Link to="/virtual-tour" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> Campus Tour & Photos</Link></li>
                            <li><Link to="/sitemap" className="hover:text-primary transition-all flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-primary transition-all"></span> Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Col 4 */}
                    <div>
                        <h3 
                            onClick={() => toggleSection('followUs')}
                            className="text-white text-xs font-black uppercase tracking-[0.25em] mb-4 lg:mb-10 opacity-80 cursor-pointer lg:cursor-default flex items-center justify-between lg:block"
                        >
                            <span>Follow Us</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 lg:hidden ${expandedSections.followUs ? 'rotate-180' : ''}`} />
                        </h3>
                        <div className={`transition-all duration-300 overflow-hidden lg:overflow-visible ${expandedSections.followUs ? 'max-h-[300px] opacity-100 mb-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-0 pointer-events-none lg:pointer-events-auto'}`}>
                            <div className="flex gap-4 mb-6 lg:mb-10">
                            {[
                                { Icon: Facebook, href: "https://www.facebook.com/msitnewdelhi/", label: "Follow MSIT on Facebook", hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
                                { Icon: Twitter, href: "https://x.com/msitnewdelhi?lang=en", label: "Follow MSIT on Twitter", hoverClass: "hover:bg-[#15181C] hover:text-white hover:border-[#333]" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/school/maharaja-surajmal-institute-of-technology-msitnewdelhi/posts/?feedView=all", label: "Follow MSIT on LinkedIn", hoverClass: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]" },
                                { Icon: Instagram, href: "https://www.instagram.com/msitnewdelhi/?hl=en", label: "Follow MSIT on Instagram", hoverClass: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent" }
                            ].map(({ Icon, href, label, hoverClass }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center transition-all hover:-translate-y-1 border border-slate-800 ${hoverClass}`} aria-label={label}>
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-900">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#8fb0ee] mb-3">Newsletter</h4>
                            <Link 
                                to="/newsletters-magazines" 
                                className="flex items-center justify-between w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-300 hover:text-white rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all group"
                            >
                                <span>Publications</span>
                                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Disambiguation Disclaimer */}
                <div className="text-[11px] text-slate-500 font-light leading-relaxed border-t border-slate-900/50 pt-8 pb-4 text-center md:text-left select-none">
                    <strong>Disclaimer:</strong> Maharaja Surajmal Institute of Technology (MSIT), Janakpuri, New Delhi is a B.Tech engineering institution affiliated with GGSIPU. It operates independently from its sister entity, Maharaja Surajmal Institute (MSI, offering BBA/BCA/B.Com), and Meghnad Saha Institute of Technology (MSIT), Kolkata.
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 pb-20 md:pb-0 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold tracking-widest uppercase text-slate-400">
                    <div className="flex items-center gap-2">
                        <span>{copyright}</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="hover:text-white transition-colors cursor-pointer uppercase font-bold"
                            aria-label="Open accessibility settings"
                        >
                            Accessibility
                        </button>
                        <Link to="/team" className="hover:text-white transition-colors">Meet the Team</Link>
                        <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
