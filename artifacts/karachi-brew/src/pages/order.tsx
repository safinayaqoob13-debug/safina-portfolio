import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ShoppingBag, Minus, Plus, Trash2, MapPin, Truck } from 'lucide-react';
import { useCart } from '@/context/cart';
import { useToast } from '@/hooks/use-toast';
import { trackCheckoutStarted, trackOrderPlaced } from '@/lib/analytics';

export default function OrderOnline() {
  const { items, updateQty, removeItem, total, clearCart, itemCount } = useCart();
  const [orderMode, setOrderMode] = useState<'delivery' | 'pickup'>('delivery');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { toast } = useToast();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    trackOrderPlaced(finalTotal, itemCount, orderMode);
    setOrderComplete(true);
    toast({
      title: "Order Placed Successfully!",
      description: "We'll start preparing your order right away.",
    });
    // simulate delay before clearing so user sees success state
    setTimeout(() => {
      clearCart();
    }, 5000);
  };

  const deliveryFee = orderMode === 'delivery' ? 150 : 0;
  const finalTotal = total + deliveryFee;

  if (orderComplete) {
    return (
      <div className="pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md p-8 bg-card border border-border rounded-2xl shadow-xl"
        >
          <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Order Received!</h2>
          <p className="text-muted-foreground mb-8">
            {orderMode === 'delivery' 
              ? "Your delicious coffee is on its way. Expect delivery in 30-40 minutes." 
              : "We're preparing your order. It will be ready for pickup in 15 minutes."}
          </p>
          <Link href="/menu" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
            Back to Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-serif font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-xl">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-serif mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/menu" className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items List */}
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl shadow-sm"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="font-medium text-primary mt-1">Rs. {item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-background border border-border rounded-full p-1">
                      <button 
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-secondary/20 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-secondary/20 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors ml-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Sidebar */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-28 shadow-lg">
                <h3 className="text-xl font-serif font-bold mb-6 border-b border-border pb-4">Order Summary</h3>
                
                <div className="flex bg-background rounded-lg p-1 mb-6 border border-border">
                  <button 
                    onClick={() => setOrderMode('delivery')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${orderMode === 'delivery' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Truck className="w-4 h-4" /> Delivery
                  </button>
                  <button 
                    onClick={() => setOrderMode('pickup')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${orderMode === 'pickup' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <MapPin className="w-4 h-4" /> Pickup
                  </button>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>Rs. {total}</span>
                  </div>
                  {orderMode === 'delivery' && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>Rs. {deliveryFee}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg text-foreground mt-2">
                    <span>Total</span>
                    <span className="text-primary">Rs. {finalTotal}</span>
                  </div>
                </div>

                {!isCheckingOut ? (
                  <button
                    onClick={() => {
                      trackCheckoutStarted(finalTotal, itemCount, orderMode);
                      setIsCheckingOut(true);
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium text-lg hover:bg-primary/90 transition-all shadow-md"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 border-t border-border pt-6"
                    onSubmit={handleCheckout}
                  >
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
                      <input type="text" required className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone Number</label>
                      <input type="tel" required className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    {orderMode === 'delivery' && (
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Delivery Address</label>
                        <textarea required rows={2} className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-1 focus:ring-primary outline-none resize-none"></textarea>
                      </div>
                    )}
                    <button 
                      type="submit"
                      className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all shadow-md"
                    >
                      Place Order (Rs. {finalTotal})
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Back
                    </button>
                  </motion.form>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
