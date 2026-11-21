import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Users, Trophy, CheckCircle, Globe, Award } from 'lucide-react';

const EventsPortal = ({
    activeTab,
    setActiveTab,
}: {
    activeTab?: string;
    setActiveTab: (tab: string) => void;
}) => {
    const currentTab = activeTab || 'avensis';

    // Sports registration states
    const [sportsForm, setSportsForm] = useState({ name: '', email: '', enrollmentNo: '', sport: 'athletics' });
    const [sportsRegistered, setSportsRegistered] = useState(false);

    const handleSportsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!/^\d{11}$/.test(sportsForm.enrollmentNo)) {
            alert("Enrollment number must be exactly 11 digits.");
            return;
        }
        setSportsRegistered(true);
    };

    const tabs = [
        { id: 'avensis', name: 'Avensis', suffix: ' (Tech Fest)', Icon: Sparkles, color: '#1e4a9b' },
        { id: 'genesis', name: 'Genesis', suffix: ' (Cultural Fest)', Icon: Users, color: '#7a4d6b' },
        { id: 'sports', name: 'Sports', suffix: ' Meet', Icon: Trophy, color: '#3d6f73' },
    ];
    // Each fest has its own calm colour: site blue, a dusty plum and a muted sea green.
    const festColor = (tabs.find(t => t.id === currentTab) || tabs[0]).color;

    // Shared banner for each fest: solid primary, facts on one line.
    const FestBanner = ({
        title,
        kind,
        date,
        place,
        children,
    }: {
        title: string;
        kind: string;
        date: string;
        place: string;
        children: React.ReactNode;
    }) => (
        <div className="bg-(--fest) p-4 sm:p-8 rounded-2xl sm:rounded-3xl text-white space-y-2 sm:space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold">{title}</h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">{children}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs sm:text-sm text-white/90 pt-1">
                <span>{kind}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" aria-hidden="true" /> {date}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" aria-hidden="true" /> {place}</span>
            </div>
        </div>
    );

    const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-(--fest)/15 focus:border-(--fest) outline-none bg-white text-slate-900 placeholder:text-slate-500 text-sm";

    return (
        <div className="w-full" style={{ '--fest': festColor } as React.CSSProperties}>
            {/* Fest tabs */}
            <div role="tablist" aria-label="Events" className="flex border-b border-slate-200 mb-5 sm:mb-8 select-none print:hidden">
                {tabs.map(({ id, name, suffix, Icon }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={currentTab === id}
                        onClick={() => setActiveTab(id)}
                        className={`flex-1 py-3 sm:py-4 text-center text-sm font-semibold border-b-2 -mb-px transition-colors flex justify-center items-center gap-1.5 sm:gap-2 cursor-pointer ${
                            currentTab === id
                                ? 'border-(--fest) text-(--fest)'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Icon className="w-4 h-4 hidden sm:block" aria-hidden="true" />
                        {name}<span className="hidden sm:inline">{suffix}</span>
                    </button>
                ))}
            </div>

            {/* TAB 1: AVENSIS TECH FEST */}
            {currentTab === 'avensis' && (
                <div className="space-y-5 sm:space-y-8 animate-fade-in print:hidden">
                    <FestBanner title="Avensis 2026" kind="Annual technical festival" date="Oct 24–26, 2026" place="MSIT campus labs & seminar halls">
                        MSIT's premier national tech symposium bringing together top engineering minds, competitive programmers, and tech innovators across India.
                    </FestBanner>

                    <div className="space-y-3 sm:space-y-5">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900">Flagship technical events</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                            {[
                                { Icon: Globe, title: 'National Coding Contest', text: 'Test your algorithmic problem-solving and speed programming skills under tight clock constraints. Compete in C++, Java, or Python.' },
                                { Icon: Users, title: 'HackMSIT 1.0 Hackathon', text: 'Organized by the Microsoft Student Chapter. A 24-hour hackathon bringing developer teams to build software prototypes on open-source frameworks.' },
                            ].map(({ Icon, title, text }) => (
                                <div key={title} className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-3 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-(--fest)/40 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                                    <div className="flex gap-3 sm:block">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-(--fest)/5 border border-(--fest)/20 text-(--fest) rounded-xl flex items-center justify-center shrink-0 sm:mb-4">
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-sm sm:text-base text-slate-900 mb-1 sm:mb-2">{title}</h5>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{text}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">Registration opens Oct 1st</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                            <div>
                                <h5 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                                    <Award className="w-4 h-4 text-(--fest)" aria-hidden="true" /> ICAIA 2026 IEEE Conference
                                </h5>
                                <p className="text-xs sm:text-sm text-slate-600 mt-1">MSIT hosts the 4th International Conference on Artificial Intelligence and Applications on 19–20 November 2026.</p>
                            </div>
                            <a
                                href="https://icaia-msit.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-white hover:border-(--fest)/40 border border-slate-200 text-(--fest) font-bold rounded-xl text-xs transition-colors shrink-0"
                            >
                                Conference site
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: GENESIS CULTURAL FEST */}
            {currentTab === 'genesis' && (
                <div className="space-y-5 sm:space-y-8 animate-fade-in print:hidden">
                    <FestBanner title="Genesis 2026" kind="Annual cultural festival" date="November 12–14, 2026" place="Campus main grounds">
                        Celebrate color, expression, and performance at MSIT's grand cultural festival. Featuring musical fusions, theatrical showcases, and celebrity star nights.
                    </FestBanner>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                        {[
                            { tag: 'Music', title: 'Battle of Bands', text: 'Rock bands from campuses across the country clash on the main stage for the top honors.' },
                            { tag: 'Fashion', title: 'Glamour Walk', text: 'The flagship fashion event exhibiting curated themes, styling, and design choreographies.' },
                            { tag: 'Theatre', title: 'Nukkad Natak', text: 'High-energy street plays conveying crucial social messages and cultural commentaries.' },
                        ].map(({ tag, title, text }) => (
                            <div key={title} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-(--fest)/40 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)]">
                                <span className="inline-block text-[11px] font-bold text-(--fest) bg-(--fest)/5 border border-(--fest)/20 px-2 py-0.5 rounded-md">{tag}</span>
                                <h5 className="font-bold text-sm sm:text-base text-slate-900 mt-2 mb-1">{title}</h5>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 3: SPORTS MEET */}
            {currentTab === 'sports' && (
                <div className="space-y-5 sm:space-y-8 animate-fade-in print:hidden">
                    <FestBanner title="Annual Sports Meet" kind="Annual athletic meet" date="Oct 08–10, 2026" place="Sports complex & courts">
                        Compete, represent your department, and run for the shield. Annual track, field, and team sports league.
                    </FestBanner>

                    {!sportsRegistered ? (
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-sm">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Sports registration</h4>
                            <form onSubmit={handleSportsSubmit} className="space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <label className="block">
                                        <span className="sr-only">Full name</span>
                                        <input type="text" required value={sportsForm.name} onChange={e => setSportsForm({ ...sportsForm, name: e.target.value })} placeholder="Full name" autoComplete="name" className={inputClass} />
                                    </label>
                                    <label className="block">
                                        <span className="sr-only">Enrollment number</span>
                                        <input type="text" inputMode="numeric" required value={sportsForm.enrollmentNo} onChange={e => setSportsForm({ ...sportsForm, enrollmentNo: e.target.value })} placeholder="Enrollment number (11 digits)" className={inputClass} />
                                    </label>
                                    <label className="block">
                                        <span className="sr-only">Email address</span>
                                        <input type="email" required value={sportsForm.email} onChange={e => setSportsForm({ ...sportsForm, email: e.target.value })} placeholder="Email address" autoComplete="email" className={inputClass} />
                                    </label>
                                    <label className="block">
                                        <span className="sr-only">Sport</span>
                                        <select value={sportsForm.sport} onChange={e => setSportsForm({ ...sportsForm, sport: e.target.value })} className={inputClass}>
                                            <option value="athletics">Track & Field (100m/200m/400m)</option>
                                            <option value="basketball">Basketball</option>
                                            <option value="volleyball">Volleyball</option>
                                            <option value="football">Football</option>
                                            <option value="badminton">Badminton</option>
                                        </select>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-(--fest) hover:bg-(--fest)/90 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
                                >
                                    Register for Sports Meet
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div role="status" className="bg-(--fest)/5 border border-(--fest)/20 p-4 sm:p-6 rounded-2xl flex items-start gap-3 sm:gap-4">
                            <CheckCircle className="w-6 h-6 text-(--fest) shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <h5 className="font-bold text-slate-900 text-sm">Sports registration received</h5>
                                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                                    Hey {sportsForm.name}, your application for {sportsForm.sport.toUpperCase()} has been submitted. Check-ins begin at 8:30 AM at the sports arena.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventsPortal;
