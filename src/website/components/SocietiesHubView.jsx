import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { allSocietiesList } from '../data/societiesData';

// Counts from 0 to `to` once when the page opens, at a steady pace so every counter lands at the same moment. Shows the final number straight away for reduced motion.
const CountUp = ({ to, duration = 1400 }) => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const [n, setN] = useState(reduce ? to : 0);
    useEffect(() => {
        if (reduce) return;
        let frame;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            setN(Math.floor(to * p));
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [to, duration, reduce]);
    return <span aria-label={to.toLocaleString('en-IN')}>{n.toLocaleString('en-IN')}</span>;
};

const SocietiesHubView = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        'All',
        'Technical',
        'Academic & Research',
        'Innovation & Incubation',
        'Cultural & Arts',
        'Social Responsibility'
    ];

    // One directory: flagship societies first, then the rest in their listed order.
    const filteredSocieties = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return allSocietiesList
            .filter(society => {
                const matchesCat = selectedCategory === 'All' || society.category === selectedCategory;
                const matchesSearch =
                    society.name.toLowerCase().includes(q) ||
                    society.tagline.toLowerCase().includes(q) ||
                    society.description.toLowerCase().includes(q);
                return matchesCat && matchesSearch;
            })
            .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }, [selectedCategory, searchQuery]);

    return (
        <div className="space-y-12 sm:space-y-16">

            {/* Key figures: one thin strip, numbers count up on arrival */}
            <dl className="bg-white rounded-2xl px-4 py-4 sm:px-10 sm:py-5 grid grid-cols-3 gap-3 sm:gap-8 ring-1 ring-slate-200/70">
                {[[22, '+', 'Active societies'], [50000, '+', 'Community reach'], [100, '+', 'Events a year']].map(([value, suffix, label]) => (
                    <div key={label} className="flex flex-col-reverse md:flex-row-reverse items-center md:items-baseline justify-center gap-0.5 md:gap-2.5 text-center">
                        <dt className="text-[11px] sm:text-sm text-slate-600 whitespace-nowrap">{label}</dt>
                        <dd className="font-[Libre_Baskerville,serif] text-lg sm:text-3xl font-bold text-primary tabular-nums leading-none whitespace-nowrap">
                            <CountUp to={value} duration={2000} />{suffix}
                        </dd>
                    </div>
                ))}
            </dl>

            {/* Directory */}
            <section className="space-y-5 sm:space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4">
                    <div>
                        <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900">All societies</h3>
                        <p className="mt-1 text-sm text-slate-600">{filteredSocieties.length} {filteredSocieties.length === 1 ? 'society' : 'societies'}{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}</p>
                    </div>
                    <label className="relative w-full lg:w-80">
                        <span className="sr-only">Search societies</span>
                        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
                        <input
                            type="search"
                            placeholder="Search by name or skill"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white text-slate-900 placeholder:text-slate-500 rounded-xl text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary transition-shadow"
                        />
                    </label>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            aria-pressed={selectedCategory === cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold whitespace-nowrap ring-1 transition-colors cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-primary text-white ring-primary'
                                    : 'bg-white text-slate-700 ring-slate-200 hover:text-primary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-x-2.5 gap-y-3 sm:gap-5">
                    {filteredSocieties.map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col ring-1 ring-slate-200/70 hover:ring-primary/40 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] focus-visible:ring-2 focus-visible:ring-primary outline-none transition duration-200 ease-out"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className={`w-7 h-7 sm:w-12 sm:h-12 rounded-md sm:rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${item.logo ? 'bg-white ring-1 ring-slate-200 p-0.5 sm:p-1' : 'bg-slate-100 text-primary font-[Libre_Baskerville,serif] font-bold text-[10px] sm:text-base'}`}>
                                    {item.logo ? (
                                        <img src={item.logo} alt="" className="w-full h-full object-contain" />
                                    ) : (
                                        monogram(item.name)
                                    )}
                                </div>
                                {item.featured && (
                                    <span className="text-[9px] sm:text-xs font-semibold text-primary leading-none mt-0.5 sm:mt-0">Flagship</span>
                                )}
                            </div>

                            <h4 className="mt-3 sm:mt-5 text-[12.5px] sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 sm:line-clamp-none group-hover:text-primary transition-colors">
                                {item.name}
                            </h4>
                            <p className="hidden sm:block mt-0.5 text-sm font-medium text-primary line-clamp-2">{item.tagline}</p>
                            <p className="hidden sm:block mt-3 text-sm text-slate-700 leading-relaxed line-clamp-3">{item.description}</p>

                            <div className="mt-auto pt-3 sm:pt-5 flex items-center justify-between gap-1 text-[10px] sm:text-xs text-slate-600">
                                <span className="truncate">
                                    <span className="hidden sm:inline">{item.category} · </span>Est. {item.established}
                                </span>
                                <ArrowRight className="hidden sm:block w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredSocieties.length === 0 && (
                    <div className="text-center py-10 sm:py-16 bg-white rounded-2xl px-4">
                        <p className="text-sm text-slate-700">
                            No societies match "{searchQuery}" in {selectedCategory}.
                        </p>
                        <button
                            type="button"
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-primary/90 transition-colors"
                        >
                            Clear search and filters
                        </button>
                    </div>
                )}
            </section>

            {/* Start a society */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                    <h4 className="text-base sm:text-xl font-bold text-slate-900">Want to start a new student club or initiative?</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        Students with unique technical ideas or community initiatives can submit proposals to the MSIT Student Welfare Committee and Faculty Board.
                    </p>
                </div>
                <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-colors shrink-0 self-start md:self-auto"
                >
                    Contact coordinator
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            </div>

        </div>
    );
};

// Two-letter mark from the society's name, used where there is no real logo (e.g. "IEEE MSIT" -> "IE", "NSS & Prakriti" -> "NP").
function monogram(name) {
    const words = name.replace(/[()&,]/g, ' ').split(/\s+/).filter(w => w && !['MSIT', 'of', 'the', 'and', 'for'].includes(w));
    if (words.length === 0) return name.slice(0, 2).toUpperCase();
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

export default SocietiesHubView;
