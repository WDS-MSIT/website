import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const OpeningAnimation = ({ onComplete }) => {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const glowRef = useRef(null);
    const logoRef = useRef(null);
    const sweepRef = useRef(null);

    const isReducedMotion = typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        : false;

    useGSAP(() => {
        if (isReducedMotion) {
            // Accessibility: Skip animation, fade overlay quickly
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'none',
                onComplete: onComplete
            });
            return;
        }

        const tl = gsap.timeline({
            onComplete: onComplete
        });

        // 1. Initial States
        gsap.set(logoRef.current, { 
            opacity: 0, 
            scale: 0.88, 
            y: 8, 
            filter: 'blur(8px)' 
        });
        gsap.set(glowRef.current, { 
            opacity: 0, 
            scaleX: 0.3, 
            scaleY: 0.1 
        });
        gsap.set(sweepRef.current, { 
            xPercent: -100, 
            yPercent: -100 
        });

        // Phase 1: First Light (0.0s – 0.4s)
        tl.to(glowRef.current, {
            opacity: 0.85,
            scaleX: 1.6,
            scaleY: 1.0,
            duration: 0.4,
            ease: 'power2.out'
        });

        // Phase 2: MSIT Logo Reveal (0.4s – 1.2s)
        tl.to(logoRef.current, {
            opacity: 1,
            scale: 1.015,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }, '-=0.1');

        tl.to(glowRef.current, {
            opacity: 1.0,
            scaleX: 2.1,
            scaleY: 1.4,
            duration: 0.8,
            ease: 'power2.out'
        }, '<');

        // Phase 3: Logo Settle & Sweep (1.2s – 1.7s)
        tl.to(logoRef.current, {
            scale: 1.0,
            duration: 0.5,
            ease: 'power2.inOut'
        });

        tl.to(sweepRef.current, {
            xPercent: 100,
            yPercent: 100,
            duration: 0.5,
            ease: 'power1.inOut'
        }, '<');

        // Phase 4: Transition into Website (1.7s – 2.5s)
        tl.add(() => {
            const headerLogo = document.getElementById('header-logo');
            const introLogo = logoRef.current;

            if (headerLogo && introLogo) {
                const headerRect = headerLogo.getBoundingClientRect();
                const introRect = introLogo.getBoundingClientRect();

                // Compute exact centers for dynamic shared-element translation
                const introCenterX = introRect.left + introRect.width / 2;
                const introCenterY = introRect.top + introRect.height / 2;
                const headerCenterX = headerRect.left + headerRect.width / 2;
                const headerCenterY = headerRect.top + headerRect.height / 2;

                const deltaX = headerCenterX - introCenterX;
                const deltaY = headerCenterY - introCenterY;
                const scale = headerRect.width / introRect.width;

                gsap.to(introLogo, {
                    x: deltaX,
                    y: deltaY,
                    scale: scale,
                    transformOrigin: 'center center',
                    duration: 0.75,
                    ease: 'power4.inOut'
                });
            } else {
                // Fallback: fade out intro logo in place
                gsap.to(introLogo, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.75,
                    ease: 'power2.inOut'
                });
            }

            // Fade out the overlay background
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.75,
                ease: 'power2.inOut'
            });

            // Expand and fade out the sunrise glow
            gsap.to(glowRef.current, {
                opacity: 0,
                scaleX: 2.8,
                scaleY: 2.2,
                duration: 0.65,
                ease: 'power2.inOut'
            });

            // Fade in the header layout
            gsap.fromTo('header', 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.75, ease: 'power2.out' }
            );

            // Fade in home hero text and explore button with staggered reveal
            const heroTitle = document.getElementById('hero-title');
            const heroDivider = document.getElementById('hero-divider');
            const heroBanner = document.getElementById('hero-banner');
            if (heroTitle || heroDivider || heroBanner) {
                const elements = [heroTitle, heroDivider, heroBanner].filter(Boolean);
                gsap.fromTo(elements,
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }
                );
            }
        });

        // Delay completion until transition is fully complete
        tl.to({}, { duration: 0.8 });
    }, { scope: containerRef });

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none select-none overflow-hidden"
        >
            {/* Main overlay backdrop with warm ivory background */}
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-[#FAF9F6] flex items-center justify-center pointer-events-auto"
                style={{ willChange: 'opacity' }}
            >
                {/* Sunrise glow backdrop element behind logo */}
                <div 
                    ref={glowRef}
                    className="absolute w-[400px] h-[300px] rounded-full blur-[45px] pointer-events-none opacity-0"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(251, 191, 36, 0.55) 35%, rgba(240, 80, 35, 0.25) 60%, rgba(240, 80, 35, 0) 80%)',
                        willChange: 'transform, opacity'
                    }}
                />

                {/* Logo wrapper */}
                <div 
                    ref={logoRef}
                    className="relative w-[58vw] sm:w-[260px] lg:w-[320px] aspect-[120/112] flex items-center justify-center opacity-0"
                    style={{ willChange: 'transform, opacity, filter' }}
                >
                    {/* The official MSIT logo */}
                    <img 
                        src="/msit-logo.webp" 
                        alt="MSIT Logo" 
                        className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                        loading="eager"
                        fetchpriority="high"
                    />

                    {/* Masked Light Sweep Effect */}
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
                        {/* Diagonal light sweep gradient block */}
                        <div 
                            ref={sweepRef}
                            className="absolute top-0 left-0 w-[200%] h-[200%]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 70%)',
                                transform: 'translate3d(-100%, -100%, 0) rotate(45deg)',
                                transformOrigin: 'top left',
                                willChange: 'transform'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningAnimation;
