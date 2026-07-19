import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80', category: 'Coffee', title: 'Latte Art' },
  { id: 2, src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', category: 'Interior', title: 'Cozy Seating' },
  { id: 3, src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80', category: 'Food', title: 'Fresh Pastries' },
  { id: 4, src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80', category: 'Interior', title: 'Evening Ambiance' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80', category: 'Coffee', title: 'Espresso Pour' },
  { id: 6, src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80', category: 'Food', title: 'Artisan Desserts' },
  { id: 7, src: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&q=80', category: 'Coffee', title: 'Cold Brew' },
  { id: 8, src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80', category: 'Interior', title: 'Outdoor Patio' },
  { id: 9, src: 'https://images.unsplash.com/photo-1495474472201-49b068be6041?w=800&q=80', category: 'Coffee', title: 'Coffee Beans' },
];

const CATEGORIES = ['All', 'Coffee', 'Food', 'Interior'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = GALLERY_IMAGES.filter(
    img => activeCategory === 'All' || img.category === activeCategory
  );

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[newIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[newIndex].id);
  };

  const currentImgData = selectedImage ? filteredImages.find(img => img.id === selectedImage) : null;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A visual journey through the Karachi Brew experience.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-transparent text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid (CSS Columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className="relative group rounded-xl overflow-hidden cursor-pointer break-inside-avoid border border-border"
                onClick={() => setSelectedImage(img.id)}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <Maximize className="w-8 h-8 mb-2" />
                  <span className="font-serif text-lg tracking-wide">{img.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && currentImgData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-background/50 text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-background/50 text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-background/50 text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div 
              key={currentImgData.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={currentImgData.src} 
                alt={currentImgData.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/70 text-white rounded-full text-sm font-medium backdrop-blur-md">
                {currentImgData.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
