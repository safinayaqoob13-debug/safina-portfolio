import React, { useState } from 'react';
import { Link } from 'wouter';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Coffee, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackNewsletterSignup, trackSocialClick } from '@/lib/analytics';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Track newsletter signup — pass domain only, never the full address
    const domain = email.split('@')[1];
    trackNewsletterSignup(domain);

    toast({
      title: "Subscribed Successfully!",
      description: "You'll now receive our latest updates and offers.",
    });
    setEmail('');
  };

  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Coffee className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-xl font-bold tracking-wider uppercase text-glow">
                Karachi Brew
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 leading-relaxed max-w-xs">
              Where specialty coffee meets warmth and craftsmanship. The perfect escape in the heart of Karachi.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" onClick={() => trackSocialClick('instagram', 'footer')} className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" onClick={() => trackSocialClick('facebook', 'footer')} className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <FaFacebookF className="w-4 h-5" />
              </a>
              <a href="#" onClick={() => trackSocialClick('tiktok', 'footer')} className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Menu', 'Gallery', 'Reservations', 'Reviews'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Visit Us</h4>
            <address className="not-italic space-y-3 text-muted-foreground">
              <p>Clifton Block 4</p>
              <p>Karachi, Pakistan</p>
              <p className="pt-2">Mon–Fri: 7:00 AM – 11:00 PM</p>
              <p>Sat–Sun: 8:00 AM – 12:00 AM</p>
              <p className="pt-2">
                <a href="tel:+923001234567" className="hover:text-primary transition-colors">
                  +92 300 123 4567
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                required
              />
              <button 
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Karachi Brew Café. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
