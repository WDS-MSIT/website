import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Megaphone, Pause, Play } from 'lucide-react';

// Official notices from msit.in (Latest News and Notices panels), linked to their PDFs.
const ANNOUNCEMENTS = [
    { title: "Notice Regarding Late Fee Submission Academic Session 2026-27", url: "https://msit.in/media/news/notice-regarding-late-fee-submission-academic-session-2026-27.pdf" },
    { title: "Notice regarding Extension of Fee Submission Date up to 30.09.2026", url: "https://msit.in/media/news/notice-regarding-extension-of-fee-submission-date-up-to-30092026.pdf" },
    { title: "Notice regarding Withholding of Admission Process for Vacant Seats in B.Tech, 2026-27", url: "https://msit.in/media/news/notice-regarding-withholding-of-admission-process-for-vacant-seats-in-btech-2026-27.pdf" },
    { title: "Admission Notice for 2026-27 batch", url: "https://msit.in/media/news/admission-notice-for-2026-27-batch.pdf" },
    { title: "Centrally Sponsored Scholarship Schemes for SC & OBC students of Delhi State", url: "https://msit.in/media/notices/centrally-sponsored-scholarship-schemes-for-sc-obc-students-of-delhi-state_HR2TP4m.pdf" },
    { title: "Notice for Financial Assistance to the Students under Economically Weaker Section (EWS) Scheme for the A.Y. 2026-27", url: "https://msit.in/media/notices/notice-for-financial-assistance-to-the-students-under-economically-weaker-sectio_9LrJcOg.pdf" },
    { title: "Grant of Financial Assistance under EWS Scheme for the year 2025-26", url: "https://msit.in/media/notices/grant-of-financial-assistance-under-ews-scheme-for-the-year-2025-26.pdf" },
    { title: "Reporting Time for Second Counseling under Management Quota 2026-27", url: "https://msit.in/media/notices/reporting-time-for-second-counseling-under-management-quota-2026-27.pdf" },
    { title: "Admission Notice for Management Quota Seats 2026-27", url: "https://msit.in/media/notices/admission-notice-for-management-quota-seats-2026-27_yf9UqA9.pdf" }
];

// Scroll speed of the ticker, in seconds per full pass of the notices list.
const SECONDS_PER_PASS = 40;

/** Slowly auto-scrolling list of official notices; pauses on hover or with the button. */
const Announcements = () => {
    const [paused, setPaused] = useState(false);
    // How many times the list repeats in each half of the track; grows when the box is taller than one list.
    const [repeats, setRepeats] = useState(1);
    const windowRef = useRef(null);

    // On desktop the box stretches to the height of the news column, so each half of the track
    // must be at least that tall or a blank gap shows before the loop restarts.
    useEffect(() => {
        const box = windowRef.current;
        if (!box) return;
        const update = () => {
            const items = box.querySelectorAll('li[data-first]');
            const listHeight = Array.from(items).reduce((sum, li) => sum + li.offsetHeight, 0);
            if (listHeight > 0) setRepeats(Math.max(1, Math.ceil(box.clientHeight / listHeight)));
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(box);
        return () => observer.disconnect();
    }, []);

    // Each half of the track holds the list `repeats` times; the track scrolls by exactly one half.
    const copies = repeats * 2;

    return (
        <aside className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <Megaphone className="w-5 h-5 text-primary" />
                    Announcements
                </h3>
                <button
                    type="button"
                    onClick={() => setPaused(p => !p)}
                    className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/40 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={paused ? 'Resume scrolling announcements' : 'Pause scrolling announcements'}
                >
                    {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
            </div>

            <div
                ref={windowRef}
                className="group/ticker relative h-[22rem] lg:h-auto lg:flex-1 lg:min-h-[22rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)] motion-reduce:overflow-y-auto"
            >
                {/* Absolutely positioned so the long track doesn't stretch the card */}
                <ul
                    className={`absolute inset-x-0 top-0 motion-reduce:static motion-safe:animate-ticker-up group-hover/ticker:[animation-play-state:paused] group-focus-within/ticker:[animation-play-state:paused] ${paused ? '[animation-play-state:paused]' : ''}`}
                    style={{ animationDuration: `${SECONDS_PER_PASS * repeats}s` }}
                >
                    {Array.from({ length: copies }, (_, copy) =>
                        ANNOUNCEMENTS.map(item => {
                            const isFirst = copy === 0;
                            return (
                                <li
                                    key={`${copy}-${item.url}`}
                                    data-first={isFirst || undefined}
                                    aria-hidden={!isFirst || undefined}
                                    className={isFirst ? undefined : 'motion-reduce:hidden'}
                                >
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        tabIndex={isFirst ? undefined : -1}
                                        className="group flex gap-3 py-3.5 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg transition-colors"
                                    >
                                        <FileText className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                                        <span className="text-sm leading-snug text-slate-700 group-hover:text-primary transition-colors">{item.title}</span>
                                    </a>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>

            <Link to="/notices" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4">
                All notices <ArrowRight className="w-4 h-4" />
            </Link>
        </aside>
    );
};

export default Announcements;
