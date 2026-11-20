import React from 'react';

const PageHero = ({ title, accentTitle, description, breadcrumbs, subtitle, heroImage, heroImageAlt }) => {
    return (
        <div className="bg-slate-950 text-white pt-16 sm:pt-28 lg:pt-28 pb-8 sm:pb-14 px-4 sm:px-6 relative overflow-hidden group/hero">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {heroImage ? (
                    <img 
                        src={heroImage} 
                        alt={heroImageAlt || "MSIT Campus Hero Section"} 
                        className="w-full h-full object-cover contrast-110 saturate-110 select-none"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-title to-slate-950"></div>
                )}

                {/* Shade only behind the text so the rest of the photo stays clear */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-slate-950/25"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto relative z-20">
                {/* Main Heading */}
                <div className="mb-4 sm:mb-8 drop-shadow-xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4">
                        {title}{' '}
                        {/* Accent word in the site's primary blue, lifted slightly so it stays readable on the dark photo. */}
                        <span className="text-[#5585e0]">{accentTitle}</span>
                    </h1>
                    {subtitle && (
                        <div className="text-xl md:text-2xl font-black text-primary tracking-[0.3em] uppercase opacity-90 transition-colors">
                            {subtitle}
                        </div>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-slate-200 text-sm sm:text-lg md:text-xl line-clamp-3 sm:line-clamp-none max-w-3xl leading-relaxed font-medium opacity-90 drop-shadow-md">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHero;
