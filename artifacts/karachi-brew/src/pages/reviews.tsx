import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const REVIEWS = [
  { id: 1, name: "Ali Raza", initials: "AR", rating: 5, text: "Absolutely the best coffee in Karachi. The Karachi Sunset Mocha is a revelation. The ambiance is perfect for evening conversations." },
  { id: 2, name: "Sara Ahmed", initials: "SA", rating: 5, text: "Love the aesthetic! It feels like a high-end luxury lounge but with the warmth of a local cafe. Their almond croissants are always fresh." },
  { id: 3, name: "Fahad Khan", initials: "FK", rating: 4, text: "Great espresso, pulling a proper shot here. The staff is knowledgeable and friendly. Can get a bit crowded on weekends, but worth it." },
  { id: 4, name: "Zoya Malik", initials: "ZM", rating: 5, text: "The perfect spot for remote work during the day and hanging out with friends at night. The cold brew is my absolute favorite." },
  { id: 5, name: "Usman Tariq", initials: "UT", rating: 5, text: "Impeccable service and attention to detail. From the ceramic cups to the jazz music in the background, everything is curated perfectly." },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Customer Voices</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear what the community has to say about their experience at Karachi Brew.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-center gap-12 shadow-sm">
          <div className="text-center">
            <div className="text-6xl font-bold text-foreground mb-2">4.9</div>
            <div className="flex text-primary justify-center mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <div className="text-sm text-muted-foreground">Based on 1,248 reviews</div>
          </div>
          
          <div className="flex-1 w-full space-y-2">
            {[
              { stars: 5, pct: 92 },
              { stars: 4, pct: 6 },
              { stars: 3, pct: 2 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map(row => (
              <div key={row.stars} className="flex items-center gap-3 text-sm">
                <span className="w-12 text-right text-muted-foreground">{row.stars} Stars</span>
                <div className="flex-1 h-2 bg-secondary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <button 
            onClick={handlePrev}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-2 bg-background text-foreground rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="overflow-hidden px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 text-center relative"
              >
                <Quote className="w-12 h-12 text-primary/20 absolute top-8 left-8" />
                
                <div className="flex justify-center text-primary mb-6">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed mb-8 relative z-10">
                  "{REVIEWS[currentIndex].text}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                    {REVIEWS[currentIndex].initials}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{REVIEWS[currentIndex].name}</div>
                    <div className="text-xs text-muted-foreground">Verified Customer</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-2 bg-background text-foreground rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-primary w-6' : 'bg-secondary/30'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
