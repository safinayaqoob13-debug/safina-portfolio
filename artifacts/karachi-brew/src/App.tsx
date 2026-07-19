import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from 'next-themes';

import { CartProvider } from '@/context/cart';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { WhatsAppButton } from '@/components/WhatsAppButton';

import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import About from '@/pages/about';
import MenuPage from '@/pages/menu';
import Gallery from '@/pages/gallery';
import Reservations from '@/pages/reservations';
import OrderOnline from '@/pages/order';
import Reviews from '@/pages/reviews';
import Contact from '@/pages/contact';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/reservations" component={Reservations} />
          <Route path="/order" component={OrderOnline} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <LoadingScreen />
            <ScrollProgress />
            <AnimatedBackground />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
            <BackToTop />
            <WhatsAppButton />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
