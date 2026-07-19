import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <Coffee className="w-16 h-16 text-primary relative z-10" />
              <motion.div
                animate={{
                  y: [-10, -20, -30],
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.2, 1.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/30 rounded-full blur-md"
              />
            </div>
            <h1 className="text-3xl font-serif text-foreground tracking-widest text-glow uppercase">
              Karachi Brew
            </h1>
            <p className="text-muted-foreground mt-2 tracking-widest text-sm uppercase">
              Crafted with Passion
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
