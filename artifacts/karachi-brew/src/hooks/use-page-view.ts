import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home — Karachi Brew Café',
  '/about': 'About Us — Karachi Brew Café',
  '/menu': 'Menu — Karachi Brew Café',
  '/gallery': 'Gallery — Karachi Brew Café',
  '/reservations': 'Reserve a Table — Karachi Brew Café',
  '/order': 'Order Online — Karachi Brew Café',
  '/reviews': 'Customer Reviews — Karachi Brew Café',
  '/contact': 'Contact — Karachi Brew Café',
};

/**
 * Fires a GA4 page_view event on every SPA route change.
 * Mount this once inside the WouterRouter context.
 */
export function usePageView(): void {
  const [location] = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location] ?? document.title;
    // Small delay so document.title updates before we read it
    const id = setTimeout(() => trackPageView(location, title), 50);
    return () => clearTimeout(id);
  }, [location]);
}
