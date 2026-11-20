import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

const PageTransitionCurtain = forwardRef(({ message = 'Loading Experience...' }, ref) => {
    const containerRef = useRef(null);
    const curtainRef = useRef(null);
    const emblemRef = useRef(null);
    const glowRef = useRef(null);
    const logoRef = useRef(null);
    const sweepRef = useRef(null);
    const beamRef = useRef(null);
    const topStripeRef = useRef(null);
    const bottomStripeRef = useRef(null);

    useImperativeHandle(ref, () => ({
        // Stage 1: Wipe In (Cover viewport)
        wipeIn: (onComplete) => {
            const isReducedMotion = typeof window !== 'undefined'
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false;

            if (isReducedMotion) {
                gsap.set(containerRef.current, { pointerEvents: 'auto' });
                gsap.set(curtainRef.current, { yPercent: 0 });
                gsap.fromTo(containerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.15, onComplete }
                );
                return;
            }

            // Enable click blocking while transitioning
            gsap.set(containerRef.current, { pointerEvents: 'auto', opacity: 1 });
            gsap.set(curtainRef.current, { yPercent: 100 });
            gsap.set(emblemRef.current, { opacity: 0, scale: 0.94, y: 15 });

            // Ambient breathing on glow & sweep loop
            if (glowRef.current) {
                gsap.fromTo(glowRef.current,
                    { scale: 0.9, opacity: 0.7 },
                    { scale: 1.15, opacity: 0.95, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }
                );
            }
            if (sweepRef.current) {
                gsap.fromTo(sweepRef.current,
                    { xPercent: -120, yPercent: -120 },
                    { xPercent: 120, yPercent: 120, duration: 1.0, repeat: -1, repeatDelay: 0.4, ease: 'power2.inOut' }
                );
            }
            if (beamRef.current) {
                gsap.fromTo(beamRef.current,
                    { xPercent: -100 },
                    { xPercent: 200, duration: 1.0, repeat: -1, ease: 'power1.inOut' }
                );
            }

            const tl = gsap.timeline({ onComplete });

            // Smooth luxury curtain wipe from bottom to center
            tl.to(curtainRef.current, {
                yPercent: 0,
                duration: 0.45,
                ease: 'power3.inOut'
            });

            // Reveal brand emblem smoothly as curtain closes
            tl.to(emblemRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out'
            }, '-=0.25');
        },

        // Stage 2: Wipe Out (Reveal target page)
        wipeOut: (onComplete) => {
            const isReducedMotion = typeof window !== 'undefined'
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false;

            if (isReducedMotion) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        gsap.set(containerRef.current, { pointerEvents: 'none' });
                        if (onComplete) onComplete();
                    }
                });
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { pointerEvents: 'none' });
                    gsap.set(curtainRef.current, { yPercent: 100 });
                    if (onComplete) onComplete();
                }
            });

            // Fade out the center emblem first
            tl.to(emblemRef.current, {
                opacity: 0,
                scale: 1.04,
                y: -10,
                duration: 0.22,
                ease: 'power2.in'
            });

            // Curtain slides smoothly upward off-screen
            tl.to(curtainRef.current, {
                yPercent: -100,
                duration: 0.45,
                ease: 'power3.inOut'
            }, '-=0.1');
        }
    }));

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 w-screen h-screen z-[9990] pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
        >
            {/* The Shutter / Curtain Sheet */}
            <div 
                ref={curtainRef}
                className="absolute inset-0 w-full h-full bg-[#FAF9F6] flex flex-col items-center justify-center translate-y-full shadow-[0_0_60px_rgba(0,0,0,0.15)]"
                style={{ willChange: 'transform' }}
            >
                {/* Top Leading Edge Gradient Stripe */}
                <div 
                    ref={topStripeRef}
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-accent to-blue-700 shadow-[0_2px_12px_rgba(240,80,35,0.4)]"
                />

                {/* Bottom Leading Edge Gradient Stripe */}
                <div 
                    ref={bottomStripeRef}
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-accent to-blue-700 shadow-[0_-2px_12px_rgba(240,80,35,0.4)]"
                />

                {/* Sunrise Radial Glow */}
                <div 
                    ref={glowRef}
                    className="absolute w-[360px] sm:w-[480px] h-[280px] sm:h-[350px] rounded-full blur-[45px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(251, 191, 36, 0.55) 35%, rgba(240, 80, 35, 0.25) 60%, rgba(240, 80, 35, 0) 80%)',
                        willChange: 'transform, opacity'
                    }}
                />

                {/* Center Brand Emblem */}
                <div 
                    ref={emblemRef}
                    className="relative flex flex-col items-center justify-center z-10 px-6 opacity-0"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {/* Logo wrapper with mask sweep */}
                    <div 
                        ref={logoRef}
                        className="relative w-[130px] sm:w-[170px] lg:w-[195px] aspect-[120/112] flex items-center justify-center"
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
        </div>
    );
});

PageTransitionCurtain.displayName = 'PageTransitionCurtain';

export default PageTransitionCurtain;
