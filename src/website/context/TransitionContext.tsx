import React, { createContext, useContext, useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import PageTransitionCurtain from '../components/PageTransitionCurtain';
import PageTransitionLoader from '../components/PageTransitionLoader';

type TransitionContextValue = {
    hideLoader: () => void;
    isLoading: boolean;
    showLoader: (message?: string) => void;
    transitionTo: (toPath: string) => void;
    withLoader: <T>(asyncFn: () => Promise<T>, customMessage?: string) => Promise<T>;
};

const TransitionContext = createContext<TransitionContextValue>({
    isLoading: false,
    transitionTo: () => {},
    showLoader: () => {},
    hideLoader: () => {},
    withLoader: async <T,>(fn: () => Promise<T>) => fn(),
});

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isMobileViewport = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 767px), (max-aspect-ratio: 3/4)').matches;

    // Curtain & Loader state
    const curtainRef = useRef<any>(null);
    const isTransitioningRef = useRef(false);
    const targetPathRef = useRef<string | null>(null);

    // Fallback loader state for cold / direct loads
    const [isLoaderRendered, setIsLoaderRendered] = useState(false);
    const [isLoaderExiting, setIsLoaderExiting] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState('Loading Experience...');
    const activeCountRef = useRef(0);
    const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 1. Manual / Cold Suspense Fallback Loader
    const showLoader = useCallback((customMessage = 'Loading Experience...') => {
        if (isMobileViewport()) return;

        // If the curtain transition is currently running, it already covers the screen
        if (isTransitioningRef.current) return;

        // If the full startup opening animation is running on the homepage, avoid redundant transition overlay
        if (typeof window !== 'undefined') {
            const isFirstHomeVisit = (window.location.pathname === '/' || window.location.pathname === '') && !sessionStorage.getItem('msit-intro-played');
            if (isFirstHomeVisit) return;
        }

        activeCountRef.current += 1;
        if (customMessage) setLoaderMessage(customMessage);

        if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
        }

        setIsLoaderExiting(false);
        setIsLoaderRendered(true);
    }, []);

    const hideLoader = useCallback(() => {
        activeCountRef.current = Math.max(0, activeCountRef.current - 1);

        if (activeCountRef.current === 0) {
            setIsLoaderExiting(true);
        }
    }, []);

    const handleLoaderExitComplete = useCallback(() => {
        if (activeCountRef.current === 0) {
            setIsLoaderRendered(false);
            setIsLoaderExiting(false);
        }
    }, []);

    const withLoader = useCallback(async <T,>(asyncFn: () => Promise<T>, customMessage = 'Loading...'): Promise<T> => {
        showLoader(customMessage);
        try {
            return await asyncFn();
        } finally {
            hideLoader();
        }
    }, [showLoader, hideLoader]);

    // 2. Smooth Intercepted Route Transitions (The Awwwards Shutter Wipe)
    const transitionTo = useCallback((toPath: string) => {
        if (isTransitioningRef.current) return;

        if (isMobileViewport()) {
            navigate(toPath);
            if (!toPath.includes('#')) {
                window.scrollTo(0, 0);
            }
            return;
        }

        // If the full startup opening animation is running on homepage, navigate directly
        if (typeof window !== 'undefined') {
            const isFirstHomeVisit = (window.location.pathname === '/' || window.location.pathname === '') && !sessionStorage.getItem('msit-intro-played');
            if (isFirstHomeVisit) {
                navigate(toPath);
                return;
            }
        }

        isTransitioningRef.current = true;
        targetPathRef.current = toPath;

        if (curtainRef.current) {
            // Stage 1: Wipe In to cover current page
            curtainRef.current.wipeIn(() => {
                // Stage 2: Perform the navigation behind the curtain
                navigate(toPath);

                const hasHash = toPath.includes('#');
                if (!hasHash) {
                    window.scrollTo(0, 0);
                }

                // Stage 3: Wait for lazy chunk to be ready if suspended
                const checkReadyAndWipeOut = () => {
                    if (activeCountRef.current > 0) {
                        setTimeout(checkReadyAndWipeOut, 40);
                        return;
                    }

                    // Micro-delay ensuring React commit and paint happen behind curtain
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            if (curtainRef.current) {
                                curtainRef.current.wipeOut(() => {
                                    isTransitioningRef.current = false;
                                    targetPathRef.current = null;
                                });

                                // Smooth entrance for newly mounted page content
                                gsap.fromTo('#main-content',
                                    { opacity: 0.85, y: 14 },
                                    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
                                );
                            } else {
                                isTransitioningRef.current = false;
                                targetPathRef.current = null;
                            }
                        }, 80);
                    });
                };

                checkReadyAndWipeOut();
            });
        } else {
            navigate(toPath);
            isTransitioningRef.current = false;
        }
    }, [navigate]);

    // 3. Global Link Click Interceptor
    // Intercepts all internal link clicks across the entire website automatically!
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (e.defaultPrevented) return;

            const anchor = (e.target as Element | null)?.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            const target = anchor.getAttribute('target');
            const download = anchor.getAttribute('download');

            // Pass-through external, special protocol, download, new-tab, or modifier key clicks
            if (
                target === '_blank' ||
                download ||
                e.ctrlKey ||
                e.metaKey ||
                e.shiftKey ||
                e.altKey ||
                !href ||
                href.startsWith('http://') ||
                href.startsWith('https://') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                href.startsWith('javascript:')
            ) {
                return;
            }

            try {
                const url = new URL(href, window.location.origin);
                const isSamePath = url.pathname === window.location.pathname;
                const hasHash = Boolean(url.hash);

                // Allow in-page anchor scrolling on the same path
                if (isSamePath && hasHash) {
                    return;
                }

                // Ignore clicks to the exact current page without hash
                if (isSamePath && !hasHash && url.search === window.location.search) {
                    e.preventDefault();
                    return;
                }

                // Intercept and launch smooth page transition
                e.preventDefault();
                e.stopPropagation();

                const fullDestination = url.pathname + url.search + url.hash;
                transitionTo(fullDestination);
            } catch {
                // If URL parsing fails, let standard navigation happen
            }
        };

        document.addEventListener('click', handleDocumentClick, { capture: true });
        return () => document.removeEventListener('click', handleDocumentClick, { capture: true });
    }, [transitionTo]);

    // Smooth entrance on back/forward browser button navigation
    useEffect(() => {
        // If navigation happened via browser back/forward buttons (not intercepted)
        if (!isTransitioningRef.current && !isMobileViewport()) {
            gsap.fromTo('#main-content',
                { opacity: 0.88, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
            );
        }
    }, [location.pathname]);

    // Safety timeout to avoid permanent lock
    useEffect(() => {
        if (isLoaderRendered && !isLoaderExiting) {
            const safetyTimer = setTimeout(() => {
                if (activeCountRef.current > 0) {
                    activeCountRef.current = 0;
                    setIsLoaderExiting(true);
                }
            }, 10000);
            return () => clearTimeout(safetyTimer);
        }
    }, [isLoaderRendered, isLoaderExiting]);

    return (
        <TransitionContext.Provider value={{
            isLoading: (isLoaderRendered && !isLoaderExiting) || isTransitioningRef.current,
            transitionTo,
            showLoader,
            hideLoader,
            withLoader
        }}>
            {children}
            {/* The Cinematic Route Transition Curtain */}
            <PageTransitionCurtain ref={curtainRef} message="Transitioning..." />

            {/* Cold Load / Async Operation Fallback */}
            {isLoaderRendered && (
                <PageTransitionLoader 
                    message={loaderMessage} 
                    isExiting={isLoaderExiting} 
                    onExitComplete={handleLoaderExitComplete} 
                />
            )}
        </TransitionContext.Provider>
    );
};

export const SuspenseFallbackHandler = ({ message = 'Loading Experience...' }: { message?: string }) => {
    const { showLoader, hideLoader } = usePageTransition();

    useLayoutEffect(() => {
        showLoader(message);
        return () => {
            hideLoader();
        };
    }, [showLoader, hideLoader, message]);

    return null;
};
