import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to scroll to target element when URL contains a hash (#anchor) or search params.
 * Polls with requestAnimationFrame up to ~2s to handle lazy loading & animations.
 * Compensates for sticky header offset and moves focus to target (tabIndex = -1).
 * Respects prefers-reduced-motion.
 */
export function useScrollToHash() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';
        if (!hash) return;

        let animationFrameId;
        const startTime = performance.now();
        const timeout = 2500; // 2.5 seconds timeout

        const tryScroll = (now) => {
            // Find element by id or name attribute
            const element = document.getElementById(hash) || document.querySelector(`[name="${hash}"]`);

            if (element) {
                // Header offset calculation
                const header = document.querySelector('header');
                const headerHeight = header ? header.getBoundingClientRect().height : 100;
                const buffer = 16;
                const totalOffset = headerHeight + buffer;

                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const targetPosition = Math.max(0, absoluteElementTop - totalOffset);

                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                // Move focus for accessibility
                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '-1');
                }
                element.focus({ preventScroll: true });

                return;
            }

            if (now - startTime < timeout) {
                animationFrameId = requestAnimationFrame(tryScroll);
            }
        };

        // Initial delay to let React commit DOM updates
        animationFrameId = requestAnimationFrame(tryScroll);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [location.pathname, location.search, location.hash, location.key]);
}
