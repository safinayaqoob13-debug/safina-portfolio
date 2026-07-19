import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

const DEPTHS: Array<25 | 50 | 75 | 90> = [25, 50, 75, 90];

/**
 * Fires a GA4 scroll_depth event each time the user reaches
 * 25 %, 50 %, 75 %, or 90 % of the current page.
 * Resets on every route change (component unmount / remount).
 */
export function useScrollDepth(): void {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    fired.current.clear();

    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop + el.clientHeight;
      const total = el.scrollHeight;
      const pct = (scrolled / total) * 100;

      for (const depth of DEPTHS) {
        if (pct >= depth && !fired.current.has(depth)) {
          fired.current.add(depth);
          trackScrollDepth(depth);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
