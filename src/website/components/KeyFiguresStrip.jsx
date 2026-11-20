import React from 'react';
import { Link } from 'react-router-dom';

// Slim white strip of key figures that sits over the bottom edge of the page hero.
// Four across on every screen size; each figure can link somewhere.
const KeyFiguresStrip = ({ items, className = 'max-w-7xl' }) => {
    if (!items || items.length === 0) return null;
    const cols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[items.length] || 'grid-cols-2 sm:grid-cols-4';

    return (
        <div className="relative z-10 -mt-6 sm:-mt-8 px-4 sm:px-6">
            <dl className={`${className} mx-auto bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] grid ${cols} divide-x divide-slate-100 p-1 sm:p-2`}>
                {items.map((item, i) => {
                    const target = item.url || item.link;
                    const body = (
                        <>
                            <dd className="font-[Libre_Baskerville,serif] text-[13px] min-[400px]:text-base sm:text-2xl md:text-3xl font-bold text-primary tabular-nums leading-none whitespace-nowrap">{item.value}</dd>
                            <dt className="mt-1 sm:mt-2 text-[8.5px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-wider text-slate-600 leading-tight">{item.label}</dt>
                            {item.note && <span className="hidden md:block mt-1 text-xs text-slate-500">{item.note}</span>}
                        </>
                    );
                    const cell = 'flex flex-col items-center justify-start sm:items-start text-center sm:text-left px-1 py-3 sm:px-6 sm:py-5';
                    if (!target) return <div key={i} className={cell}>{body}</div>;
                    // dt/dd must stay direct children of the cell, so the link covers the cell instead of wrapping it.
                    const cover = 'absolute inset-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/40';
                    const label = `${item.value} ${item.label}`;
                    return (
                        <div key={i} className={`${cell} relative rounded-xl hover:bg-surface transition-colors`}>
                            {body}
                            {target.startsWith('http')
                                ? <a href={target} target="_blank" rel="noopener noreferrer" className={cover} aria-label={label}></a>
                                : <Link to={target} className={cover} aria-label={label}></Link>}
                        </div>
                    );
                })}
            </dl>
        </div>
    );
};

export default KeyFiguresStrip;
