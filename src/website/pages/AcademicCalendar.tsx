import { Calendar, Download, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const AcademicCalendar = () => {
    // Calendar events data
    const events = [
        { period: "August 2026 – December 2026", link: "https://www.msit.in/media/uploads/2026/08/academic-calendar-aug-dec-2026.pdf", isNew: true },
        { period: "January 2026 – June 2026", link: "https://www.msit.in/media/uploads/2026/01/23/academic-calendar-jan-june-2026.pdf" },
        { period: "August 2025 – December 2025", link: "https://www.msit.in/media/uploads/2026/01/23/acd-cal-aug-dec-2025.pdf" },
        { period: "January 2025 – June 2025", link: "https://www.msit.in/media/2025/02/23/academic-calendar-msit-jan-june-2025.pdf" },
        { period: "August 2024 – December 2024", link: "https://www.msit.in/media/2024/09/13/academic-calender-aug-dec-2024.pdf" },
        { period: "January 2024 – June 2024", link: "https://www.msit.in/media/2024/02/26/academic-calender-2024.pdf" },
        { period: "August 2023 – December 2023", link: "https://www.msit.in/media/2024/09/13/academic-calender-aug-dec-2023.pdf" },
        { period: "September 2022 – July 2023", link: "https://www.msit.in/media/2024/02/26/academic-calendar-september-2022-july-2023.pdf" }
    ];
    const latest = events.find(e => e.isNew) || events[0];
    const previous = events.filter(e => e !== latest);

    return (
        <main className="min-h-screen bg-white transition-colors duration-300">
            <SEO 
                title="Academic Calendar" 
                description="Stay updated with the MSIT academic calendar. Find critical dates for semester starts, examinations, and holidays." 
                canonicalPath="/academic-calendar"
            />
            <PageHero 
                title="Academic" 
                accentTitle="Schedules & Calendar" 
                description="Stay up to date with the semester schedules, examination dates, and important academic events at Maharaja Surajmal Institute of Technology."
                breadcrumbs={[{ label: 'Academics' }, { label: 'Calendar' }]}
            />
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* Latest calendar */}
                {latest && (
                    <a
                        href={latest.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl bg-primary text-white shadow-sm"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">Current semester</div>
                                <h2 className="text-2xl font-extrabold">{latest.period}</h2>
                            </div>
                        </div>
                        <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary font-bold rounded-xl text-sm group-hover:bg-slate-100 transition-colors">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </span>
                    </a>
                )}

                {/* Previous calendars */}
                <h2 className="text-2xl font-extrabold text-slate-900 mt-14 mb-6">Previous calendars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previous.map((cal, index) => (
                        <a
                            key={index}
                            href={cal.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-primary/40 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">{cal.period}</h3>
                                    <p className="text-sm text-slate-500">Official schedule (PDF)</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                        </a>
                    ))}
                </div>

                <div className="mt-12 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <p className="text-slate-600 text-sm m-0">
                        <strong className="text-slate-900">Note:</strong> The academic calendar is subject to change based on guidelines from Guru Gobind Singh Indraprastha University (GGSIPU). Please check back regularly for updates.
                    </p>
                </div>

            </div>
        </main>
    );
};

export default AcademicCalendar;
