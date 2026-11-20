import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PageTransitionLoader = ({ 
    message = 'Loading Experience...', 
    isExiting = false, 
    onExitComplete = null 
}) => {
    const containerRef = useRef(null);
    const glowRef = useRef(null);
    const logoRef = useRef(null);
    const sweepRef = useRef(null);
    const beamRef = useRef(null);

    const isReducedMotion = typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        : false;

    // Ambient loop while active
    useGSAP(() => {
        if (!containerRef.current) return;

        if (isReducedMotion) {
            gsap.set(containerRef.current, { opacity: 1 });
            return;
        }

        // Fade in container smoothly
        gsap.fromTo(containerRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.2, ease: 'power2.out' }
        );

        // Gentle breathing on glow
        if (glowRef.current) {
            gsap.fromTo(glowRef.current,
                { scale: 0.9, opacity: 0.7 },
                { scale: 1.15, opacity: 0.95, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' }
            );
        }

        // Gentle breathing on logo
        if (logoRef.current) {
            gsap.fromTo(logoRef.current,
                { scale: 0.985 },
                { scale: 1.015, duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }
            );
        }

        // Masked light sweep
        if (sweepRef.current) {
            gsap.fromTo(sweepRef.current,
                { xPercent: -120, yPercent: -120 },
                { xPercent: 120, yPercent: 120, duration: 1.1, repeat: -1, repeatDelay: 0.7, ease: 'power2.inOut' }
            );
        }

        // Indeterminate progress beam
        if (beamRef.current) {
            gsap.fromTo(beamRef.current,
                { xPercent: -100 },
                { xPercent: 200, duration: 1.2, repeat: -1, ease: 'power1.inOut' }
            );
        }
    }, { scope: containerRef });

    // Handle smooth exit
    useEffect(() => {
        if (isExiting && containerRef.current) {
            if (isReducedMotion) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.15,
                    ease: 'none',
                    onComplete: () => {
                        if (onExitComplete) onExitComplete();
                    }
                });
            } else {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    scale: 1.015,
                    duration: 0.35,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        if (onExitComplete) onExitComplete();
                    }
                });
            }
        }
    }, [isExiting, onExitComplete, isReducedMotion]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 w-screen h-screen z-[9995] flex flex-col items-center justify-center select-none overflow-hidden bg-[#FAF9F6] pointer-events-auto"
            aria-live="polite"
            aria-busy="true"
        >
            {/* Sunrise Ambient Glow */}
            <div 
                ref={glowRef}
                className="absolute w-[360px] sm:w-[460px] h-[280px] sm:h-[340px] rounded-full blur-[45px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(251, 191, 36, 0.55) 35%, rgba(240, 80, 35, 0.25) 60%, rgba(240, 80, 35, 0) 80%)',
                    willChange: 'transform, opacity'
                }}
            />

            {/* Central Brand Wrapper */}
            <div className="relative flex flex-col items-center justify-center z-10 px-6">
                {/* Logo wrapper */}
                <div 
                    ref={logoRef}
                    className="relative w-[130px] sm:w-[170px] lg:w-[195px] aspect-[120/112] flex items-center justify-center"
                    style={{ willChange: 'transform' }}
                >
                    <img 
                        src="/msit-logo.webp" 
                        alt="MSIT Logo" 
                        className="w-full h-full object-contain drop-shadow-[0_2px_12px_rgba(30,74,155,0.08)]"
                        loading="eager"
                        fetchpriority="high"
                    />

                    {/* Masked Light Sweep */}
                    <div 
                        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                        style={{
                            maskImage: 'url(/msit-logo.webp)',
                            WebkitMaskImage: 'url(/msit-logo.webp)',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center'
                        }}
                    >
                        <div 
                            ref={sweepRef}
                            className="absolute top-0 left-0 w-[200%] h-[200%]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 75%)',
                                transform: 'translate3d(-120%, -120%, 0) rotate(45deg)',
                                transformOrigin: 'top left',
                                willChange: 'transform'
                            }}
                        />
                    </div>
                </div>

                {/* Institution Name */}
                <h2 className="font-['Libre_Baskerville',serif] font-bold text-slate-850 text-sm sm:text-base lg:text-lg tracking-tight text-center mt-5 mb-1.5 drop-shadow-xs">
                    Maharaja Surajmal Institute of Technology
                </h2>

                {/* Status Message */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500">
                        {message}
                    </span>
                </div>

                {/* Sleek Progress Track */}
                <div className="w-36 sm:w-48 h-1 rounded-full bg-slate-200/90 overflow-hidden relative shadow-inner">
                    <div 
                        ref={beamRef}
                        className="w-1/2 h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                        style={{ willChange: 'transform' }}
                    />
                </div>
            </div>

            {/* Institutional Credentials Badge at bottom */}
            <div className="absolute bottom-7 sm:bottom-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400/90 text-center px-4">
                <span>Affiliated to GGSIPU</span>
                <span className="text-slate-300">•</span>
                <span>NAAC 'A' Grade</span>
                <span className="text-slate-300">•</span>
                <span>NBA Accredited</span>
            </div>
        </div>
    );
};

export default PageTransitionLoader;
