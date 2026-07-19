/**
 * Google Analytics 4 — Karachi Brew Café
 * Measurement ID: G-NY8WL30MB0
 *
 * Centralised analytics helpers. Import these instead of calling
 * window.gtag directly so every event name is consistent and typed.
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = 'G-NY8WL30MB0';

/** True once the gtag script has loaded and is callable. */
function isReady(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

// ─── Core ────────────────────────────────────────────────────────────────────

/** Send a virtual page view (call on every SPA route change). */
export function trackPageView(path: string, title?: string): void {
  if (!isReady()) return;
  window.gtag('config', GA_ID, {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

/** Low-level event helper — prefer the named helpers below. */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (!isReady()) return;
  window.gtag('event', eventName, params ?? {});
}

// ─── Button & CTA clicks ─────────────────────────────────────────────────────

export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent('button_click', { button_name: buttonName, page_location: location });
}

// ─── Add to Cart ─────────────────────────────────────────────────────────────

export function trackAddToCart(
  itemId: string,
  itemName: string,
  price: number,
  category: string,
): void {
  trackEvent('add_to_cart', {
    currency: 'PKR',
    value: price,
    items: [
      {
        item_id: itemId,
        item_name: itemName,
        item_category: category,
        price,
        quantity: 1,
      },
    ],
  });
}

// ─── Reservation ─────────────────────────────────────────────────────────────

export function trackReservationSubmit(
  guests: string,
  date: string,
  time: string,
): void {
  trackEvent('reservation_submitted', {
    guests_count: guests,
    reservation_date: date,
    reservation_time: time,
  });
}

// ─── Online Order ─────────────────────────────────────────────────────────────

export function trackCheckoutStarted(total: number, itemCount: number, mode: string): void {
  trackEvent('begin_checkout', {
    currency: 'PKR',
    value: total,
    num_items: itemCount,
    order_mode: mode,
  });
}

export function trackOrderPlaced(total: number, itemCount: number, mode: string): void {
  trackEvent('purchase', {
    currency: 'PKR',
    value: total,
    num_items: itemCount,
    order_mode: mode,
    // transaction_id can be a timestamp since we have no real backend
    transaction_id: `KB-${Date.now()}`,
  });
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

export function trackWhatsAppClick(source: string): void {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
  });
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export function trackNewsletterSignup(emailDomain?: string): void {
  trackEvent('newsletter_signup', {
    event_category: 'engagement',
    email_domain: emailDomain,
  });
}

// ─── Outbound links ───────────────────────────────────────────────────────────

export function trackOutboundLink(url: string, label?: string): void {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label ?? url,
    link_url: url,
    transport_type: 'beacon',
  });
}

// ─── Scroll depth ─────────────────────────────────────────────────────────────

export function trackScrollDepth(percent: 25 | 50 | 75 | 90): void {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    percent_scrolled: percent,
  });
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit', {
    event_category: 'lead',
  });
}

// ─── Social clicks ────────────────────────────────────────────────────────────

export function trackSocialClick(platform: string, source: string): void {
  trackEvent('social_link_click', {
    event_category: 'engagement',
    social_platform: platform,
    source,
  });
}
