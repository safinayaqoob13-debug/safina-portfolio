import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { trackWhatsAppClick } from '@/lib/analytics';

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/923001234567"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => trackWhatsAppClick('floating_button')}
      className="fixed bottom-6 right-6 md:right-8 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
      <span className="absolute -top-2 -left-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]"></span>
      </span>
    </motion.a>
  );
}
