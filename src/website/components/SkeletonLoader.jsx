import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col w-full">
            {/* Self-contained CSS injection for keyframe shimmer animation */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                .animate-shimmer {
                    background: linear-gradient(
                        90deg,
                        #1e293b 25%,
                        #334155 37%,
                        #1e293b 63%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-shimmer {
                        animation: none;
                        background: #1e293b;
                    }
                }
            `}</style>

            {/* Dashboard Header Skeleton */}
            <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
                    <div className="flex items-center gap-3">
                        {/* Brand Icon placeholder */}
                        <div className="w-8 h-8 rounded-lg bg-slate-800 animate-shimmer" />
                        <div>
                            {/* Brand Title and subtitle placeholders */}
                            <div className="w-28 h-4 bg-slate-800 rounded animate-shimmer mb-1" />
                            <div className="w-16 h-2 bg-slate-800 rounded animate-shimmer" />
                        </div>
                    </div>
                    {/* Logout Button placeholder */}
                    <div className="w-20 h-8 bg-slate-800 rounded-xl animate-shimmer" />
                </div>
            </header>

            {/* Dashboard Main Layout Skeleton */}
            <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Panel: Profile & Highlights */}
                <div className="space-y-6">
                    {/* Profile Card Skeleton */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            {/* Avatar placeholder */}
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 animate-shimmer shrink-0" />
                            <div className="space-y-2 w-full">
                                {/* Name and ID placeholders */}
                                <div className="w-3/4 h-5 bg-slate-800 rounded animate-shimmer" />
                                <div className="w-1/2 h-3.5 bg-slate-800 rounded animate-shimmer" />
                            </div>
                        </div>
                        {/* Profile Info fields */}
                        <div className="border-t border-slate-800/80 pt-4 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="w-16 h-3 bg-slate-800 rounded animate-shimmer" />
                                    <div className="w-24 h-4 bg-slate-800 rounded animate-shimmer" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attendance Ring Overview Skeleton */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6">
                        {/* Section Header */}
                        <div className="w-36 h-4 bg-slate-800 rounded animate-shimmer mb-6" />
                        
                        <div className="flex items-center justify-between">
                            {/* Circular attendance wheel placeholder */}
                            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                                <div className="w-full h-full rounded-full border-4 border-slate-800 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-800 animate-shimmer" />
                                </div>
                            </div>
                            {/* Text details */}
                            <div className="space-y-2.5 w-full pl-6">
                                <div className="w-full h-3 bg-slate-800 rounded animate-shimmer" />
                                <div className="w-5/6 h-3 bg-slate-800 rounded animate-shimmer" />
                                <div className="w-2/3 h-2.5 bg-slate-800 rounded animate-shimmer mt-3" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle/Right Panel: Subject-wise Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Subject-wise Attendance Table Skeleton */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6">
                        {/* Section Header */}
                        <div className="w-44 h-4 bg-slate-800 rounded animate-shimmer mb-6" />
                        
                        <div className="overflow-x-auto space-y-4">
                            {/* Table Headers */}
                            <div className="flex justify-between border-b border-slate-800 pb-3">
                                <div className="w-20 h-3 bg-slate-800 rounded animate-shimmer" />
                                <div className="w-32 h-3 bg-slate-800 rounded animate-shimmer" />
                                <div className="w-24 h-3 bg-slate-800 rounded animate-shimmer" />
                                <div className="w-16 h-3 bg-slate-800 rounded animate-shimmer" />
                            </div>
                            
                            {/* Table Rows (5 subjects) */}
                            {[1, 2, 3, 4, 5].map((row) => (
                                <div key={row} className="flex justify-between py-3 items-center border-b border-slate-800/40">
                                    <div className="w-16 h-4 bg-slate-800 rounded animate-shimmer" />
                                    <div className="w-40 h-4 bg-slate-800 rounded animate-shimmer" />
                                    <div className="w-12 h-4 bg-slate-800 rounded animate-shimmer" />
                                    <div className="w-12 h-4 bg-slate-800 rounded animate-shimmer" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Announcements Skeleton */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6">
                        {/* Section Header */}
                        <div className="w-48 h-4 bg-slate-800 rounded animate-shimmer mb-6" />
                        
                        <div className="space-y-4">
                            {[1, 2, 3].map((notice) => (
                                <div key={notice} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                                    {/* Date indicator */}
                                    <div className="w-20 h-3.5 bg-slate-800 rounded animate-shimmer shrink-0 mt-0.5" />
                                    {/* Content block */}
                                    <div className="space-y-2 w-full">
                                        <div className="w-full h-4 bg-slate-800 rounded animate-shimmer" />
                                        <div className="w-4/5 h-3 bg-slate-800 rounded animate-shimmer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SkeletonLoader;
