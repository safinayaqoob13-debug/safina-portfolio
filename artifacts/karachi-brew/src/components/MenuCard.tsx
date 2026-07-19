import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCart, CartItem } from '@/context/cart';
import { useToast } from '@/hooks/use-toast';
import { trackAddToCart } from '@/lib/analytics';

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
  };
}

export function MenuCard({ item }: MenuCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category
    });

    trackAddToCart(item.id, item.name, item.price, item.category);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your order.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-semibold line-clamp-1">{item.name}</h3>
          <span className="font-semibold text-primary">Rs. {item.price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm flex-grow line-clamp-2 mb-4">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <span>★</span>
            <span className="text-foreground">{item.rating}</span>
          </div>
          
          <button
            onClick={handleAdd}
            className={`relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              isAdded ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
            aria-label={`Add ${item.name} to cart`}
          >
            {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
