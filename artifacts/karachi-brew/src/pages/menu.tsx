import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuCard } from '@/components/MenuCard';
import { Search } from 'lucide-react';

const MENU_CATEGORIES = [
  'All', 'Espresso', 'Cappuccino', 'Latte', 'Mocha', 'Cold Coffee', 'Tea', 'Pastries', 'Savory'
];

const MENU_DATA = [
  { id: '1', name: 'Classic Espresso', description: 'Rich, full-bodied single shot of our house dark roast.', price: 250, category: 'Espresso', rating: 4.8, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80' },
  { id: '2', name: 'Double Espresso', description: 'Two shots of intense espresso for that extra kick.', price: 350, category: 'Espresso', rating: 4.9, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80' },
  { id: '3', name: 'Classic Cappuccino', description: 'Equal parts espresso, steamed milk, and velvety foam.', price: 450, category: 'Cappuccino', rating: 4.7, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80' },
  { id: '4', name: 'Caramel Macchiato', description: 'Vanilla syrup, steamed milk, espresso, and caramel drizzle.', price: 550, category: 'Latte', rating: 4.9, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&q=80' },
  { id: '5', name: 'Dark Chocolate Mocha', description: 'Espresso with premium dark chocolate and steamed milk.', price: 600, category: 'Mocha', rating: 4.8, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80' },
  { id: '6', name: 'Iced Vanilla Latte', description: 'Chilled espresso and milk poured over ice with vanilla syrup.', price: 500, category: 'Cold Coffee', rating: 4.6, image: 'https://images.unsplash.com/photo-1461023058943-0708e5264641?w=400&q=80' },
  { id: '7', name: 'Mocha Frappé', description: 'Blended iced coffee with chocolate, topped with whipped cream.', price: 650, category: 'Cold Coffee', rating: 4.9, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80' },
  { id: '8', name: 'Masala Chai', description: 'Traditional spiced Pakistani tea brewed with aromatic spices.', price: 300, category: 'Tea', rating: 4.9, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80' },
  { id: '9', name: 'Almond Croissant', description: 'Flaky buttery pastry filled with almond frangipane.', price: 450, category: 'Pastries', rating: 4.7, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80' },
  { id: '10', name: 'Chocolate Fudge Cake', description: 'Decadent dark chocolate layered cake. Served warm.', price: 700, category: 'Pastries', rating: 4.8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
  { id: '11', name: 'Smoked Chicken Sandwich', description: 'Artisan sourdough, smoked chicken, gouda, and pesto.', price: 850, category: 'Savory', rating: 4.6, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80' },
  { id: '12', name: 'Truffle Fries', description: 'Crispy fries tossed in truffle oil and parmesan cheese.', price: 550, category: 'Savory', rating: 4.8, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenu = MENU_DATA.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Crafted with passion, served with excellence. Explore our curated selection of beverages and culinary delights.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Categories Overflow Container */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'bg-card text-muted-foreground hover:bg-secondary/10 hover:text-foreground border border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center text-muted-foreground"
              >
                No items found matching your criteria.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
