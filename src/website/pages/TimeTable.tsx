import { Clock, BookOpen, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const timetables = [
    { title: "First Year (All Branches)", detail: "Foundational academic schedule for freshers.", link: "https://www.msit.in/media/timetable/1st-yr-all-branches_7qgwxMa.pdf", Icon: BookOpen },
    { title: "2nd, 3rd & 4th Year (All Branches)", detail: "Core departmental schedules (CSE, IT, ECE, EEE).", link: "https://www.msit.in/media/timetable/2nd3rd4th-yr-all-branches_nZtdWCc.pdf", Icon: Layers },
];

const TimeTable = () => {
    return (
        <main className="min-h-screen bg-white transition-colors duration-300">
            <SEO 
                title="Time Table" 
                description="View and download current semester class schedules and lab timetables for all departments at Maharaja Surajmal Institute of Technology. Stay organized." 
                canonicalPath="/timetable"
            />
            <PageHero 
                title="Academic" 
                accentTitle="Time Table" 
                description="View and download the latest department-wise class and laboratory schedules for the current academic semester at MSIT."
                breadcrumbs={[{ label: 'Academics' }, { label: 'Time Table' }]}
                heroImage="/campus/students-coding-lab.jpg"
                heroImageAlt="MSIT students working on laptops in a campus lab"
            />

            <div className="max-w-5xl mx-auto px-6 py-16">

                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Current semester time tables</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {timetables.map(({ title, detail, link, Icon }) => (
                        <a
                            key={title}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col justify-between gap-6 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-primary/40 transition-colors"
                        >
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{detail}</p>
                                </div>
                            </div>
                            <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm self-start">
                                View PDF
                            </span>
                        </a>
                    ))}
                </div>

                <div className="mt-12 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <p className="text-slate-600 text-sm m-0">
                        <strong className="text-slate-900">Note:</strong> Department-wise timetables are updated at the start of every semester.
                    </p>
                </div>

            </div>
        </main>
    );
};

export default TimeTable;
