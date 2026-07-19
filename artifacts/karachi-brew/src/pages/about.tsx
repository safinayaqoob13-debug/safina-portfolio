import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A legacy of taste, crafted in the heart of Karachi.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80" alt="Roasting Beans" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-primary">The Origin</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Karachi Brew was born in 2014 out of a simple desire: to bring world-class specialty coffee to our vibrant city. We started as a small roastery in a quiet alley of Clifton, experimenting with single-origin beans and perfecting our profiles.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our philosophy is rooted in respect—for the farmers who grow our beans, the artisans who roast them, and the community that drinks them. We believe coffee is not just a beverage; it is an experience, a ritual, a moment of pause in a fast-paced world.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To craft an unhurried, deeply sensory environment where every cup tells a story. We strive to elevate the coffee culture in Pakistan by maintaining uncompromising standards of quality, sustainability, and hospitality.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When you step into Karachi Brew, you aren't just a customer. You are a guest in our home. From the golden glow of our lighting to the rich aroma of espresso, every detail is intentional.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80" alt="Cafe Ambiance" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Meet the Masters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind every perfect pour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Zainab Ali", role: "Head Roaster", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
            { name: "Omar Tariq", role: "Lead Barista", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
            { name: "Aisha Khan", role: "Pastry Chef", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80" }
          ].map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden group"
            >
              <div className="h-64 overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
