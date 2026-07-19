import { useEffect } from 'react';
import { trackOutboundLink } from '@/lib/analytics';

/**
 * Attaches a document-level click listener that fires a GA4 outbound link
 * event whenever the user clicks a link pointing to a different host.
 * Mount once at the app root.
 */
export function useOutboundLinks(): void {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.hostname !== window.location.hostname) {
          trackOutboundLink(url.href, target.textContent?.trim() || url.hostname);
        }
      } catch {
        // relative or malformed href — not outbound
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);
}
