import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { trackReservationSubmit } from '@/lib/analytics';

export default function Reservations() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackReservationSubmit(formData.guests, formData.date, formData.time);
    setIsSubmitted(true);
    // Real implementation would post to an API here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 flex justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Reserve a Table</h1>
            <p className="text-muted-foreground">
              Ensure your spot at Karachi Brew. Perfect for dates, meetings, or quiet evenings.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border p-8 md:p-10 rounded-2xl shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="text" name="name" required
                          value={formData.name} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="tel" name="phone" required
                          value={formData.phone} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="+92 300 123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="email" name="email" required
                          value={formData.email} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="date" name="date" required min={new Date().toISOString().split('T')[0]}
                          value={formData.date} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="time" name="time" required min="07:00" max="23:00"
                          value={formData.time} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-foreground">Number of Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <select 
                          name="guests" 
                          value={formData.guests} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 mt-4 bg-primary text-primary-foreground rounded-md font-medium text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                  >
                    Confirm Reservation
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border p-10 rounded-2xl shadow-xl text-center"
              >
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Table Reserved!</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Thank you, {formData.name}. Your table for {formData.guests} is booked on {formData.date} at {formData.time}. We've sent a confirmation to your email.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 border border-border rounded-md hover:bg-secondary/10 transition-colors"
                >
                  Make Another Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
