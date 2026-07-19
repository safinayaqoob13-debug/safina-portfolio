import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Whether you have a question about our menu, need to organize a private event, or just want to say hello.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Details */}
          <div className="w-full lg:w-1/3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">Karachi Brew Café<br/>Clifton Block 4<br/>Karachi, Pakistan</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg mb-1">Contact</h3>
                  <p className="text-muted-foreground mb-1">+92 300 123 4567</p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" /> hello@karachibrewcafe.pk
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg mb-1">Hours</h3>
                  <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Mon–Fri:</span> 7:00 AM – 11:00 PM</p>
                  <p className="text-muted-foreground"><span className="font-medium text-foreground">Sat–Sun:</span> 8:00 AM – 12:00 AM</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <h3 className="font-serif font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <FaTiktok className="w-5 h-5" />
                </a>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all">
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-2/3 h-[500px] lg:h-auto rounded-2xl overflow-hidden border border-border shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.4!2d67.0!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKarachi%2C+Pakistan!5e0!3m2!1sen!2s!4v1" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="dark:invert dark:hue-rotate-180" // Simple trick to make maps dark mode compatible if needed, though real API styling is better
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}
