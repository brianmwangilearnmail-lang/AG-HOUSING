import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, WhatsAppButton, CTABanner } from './components';
import Home from './pages/Home';
import AvailableLand from './pages/AvailableLand';
import AboutUs from './pages/AboutUs';
import WhyInvest from './pages/WhyInvest';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-brand-gold/30 flex flex-col relative">
        {/* Global Glassmorphism Background */}
        <div className="fixed inset-0 z-[-1]">
          <img 
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2000&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-cream/70 backdrop-blur-2xl"></div>
        </div>

        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/available-land" element={<AvailableLand />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/why-invest" element={<WhyInvest />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <CTABanner />
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

