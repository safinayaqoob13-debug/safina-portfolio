import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Coffee, Star, MapPin } from 'lucide-react';
import heroImg from '@assets/generated_images/hero.jpg';
import { trackButtonClick } from '@/lib/analytics';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-hidden -mt-[72px]">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImg})`,
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.6)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/20 backdrop-blur-md mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm tracking-widest uppercase text-white">Karachi, Pakistan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl text-glow"
          >
            Freshly Brewed, <br />
            <span className="text-primary italic">Crafted with Passion.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light"
          >
            Step into Karachi's premier artisan café. Experience specialty coffee, warm ambiance, and culinary excellence in every cup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/order"
              onClick={() => trackButtonClick('order_online', 'hero')}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-lg font-medium rounded-md hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              Order Online
            </Link>
            <Link
              href="/reservations"
              onClick={() => trackButtonClick('reserve_table', 'hero')}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white text-white text-lg font-medium rounded-md hover:bg-white hover:text-black transition-all"
            >
              Reserve a Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {[
              { label: 'Artisan Drinks', value: '500+' },
              { label: 'Customer Rating', value: '4.9★' },
              { label: 'Years of Excellence', value: '10+' },
              { label: 'Happy Customers', value: '50k+' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro/Story Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" 
                  alt="Cafe Interior" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0" />
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Our Story</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  A Symphony of Flavor & Culture
                </h3>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Born from a passion for the perfect roast, Karachi Brew Café is more than a coffee shop — it's a sanctuary in the bustling heart of the city. We source the finest beans globally and roast them locally, ensuring every cup tells a story of craftsmanship.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Whether you're here for a morning espresso, a business meeting, or an evening of quiet reflection, our warm golden ambiance and dedicated baristas await you.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Link href="/about" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group">
                  Read our full story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Today's Special */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-primary/5">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Coffee className="w-48 h-48" />
            </div>
            
            <div className="w-full md:w-1/2 relative z-10">
              <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Today's Special
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">Karachi Sunset Mocha</h3>
              <p className="text-muted-foreground mb-6">
                A rich blend of our dark espresso, velvety chocolate, and a hint of local spices, topped with toasted marshmallow cream. Perfect for the golden hour.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">Rs. 650</span>
                <Link
                  href="/order"
                  onClick={() => trackButtonClick('order_now', 'todays_special')}
                  className="px-6 py-2 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors"
                >
                  Order Now
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative z-10 h-64 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" 
                alt="Karachi Sunset Mocha" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Experience the Magic</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join us for a moment of luxury. Whether it's a quick pick-me-up or a lingering evening.
          </p>
          <Link
            href="/reservations"
            onClick={() => trackButtonClick('book_table', 'cta_section')}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-lg font-medium rounded-md hover:bg-primary/90 transition-all"
          >
            Book Your Table
          </Link>
        </div>
      </section>
    </div>
  );
}
