import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { useContent } from './context/ContentContext';

export const Navbar = () => {
  const { data } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we are on the home page
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If not on home page, we might want a solid navbar immediately, 
  // but for consistency with the design, we can keep it transparent if there's a hero, 
  // or make it solid. Let's make it solid if not on home, or keep the scroll effect.
  const navBgClass = isScrolled || !isHome 
    ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm py-4' 
    : 'bg-transparent py-6';
    
  const textClass = isScrolled || !isHome ? 'text-brand-charcoal' : 'text-white';
  const linkClass = isScrolled || !isHome 
    ? 'text-brand-charcoal hover:text-brand-burgundy' 
    : 'text-white/90 hover:text-white';
  const btnClass = isScrolled || !isHome 
    ? 'bg-brand-burgundy text-white hover:bg-brand-burgundy-hover' 
    : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Available Land', path: '/available-land' },
    { name: 'About Us', path: '/about' },
    { name: 'Why Invest', path: '/why-invest' },
    { name: 'Gallery', path: '/gallery' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={data.logo} 
                alt="AG Housing Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-sm font-medium transition-colors ${linkClass} ${location.pathname === item.path ? 'opacity-100 font-bold' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact" className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${btnClass}`}>
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={textClass}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-cream shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-brand-charcoal font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-brand-burgundy text-white rounded-lg font-medium text-center">
            Enquire Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export const CTABanner = () => {
  return (
    <section className="bg-brand-burgundy py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9922A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ready to Own Your Piece of Land?</h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
          Whether you're looking to build your dream home or make a strategic investment, our team is ready to guide you to the perfect plot.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="bg-brand-gold hover:bg-brand-gold-light text-brand-charcoal px-8 py-4 rounded-xl font-medium transition-colors text-lg inline-block">
            Enquire Now
          </Link>
          <Link to="/available-land" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg inline-block">
            View Available Land
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white/70 py-16 border-t border-white/10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-bold text-white mb-6 block">AG HOUSING</span>
            <p className="mb-6">Own the Land. Build the Future. Premium land sales and investment guidance across Kenya.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-charcoal cursor-pointer transition-colors">FB</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-charcoal cursor-pointer transition-colors">IG</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-charcoal cursor-pointer transition-colors">IN</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link to="/available-land" className="hover:text-brand-gold transition-colors">Available Land</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/why-invest" className="hover:text-brand-gold transition-colors">Why Invest</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Purchase Process</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white">
                <Phone size={20} className="shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-medium">Phone & WhatsApp</span>
                  <span className="text-white/90">+254 701 308058</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Mail size={20} className="shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-medium">Email</span>
                  <span className="text-white/90">assemblieshousing@gmail.com</span>
                  <span className="text-white/90">info@aghousing.co.ke</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white">
                <Clock size={20} className="shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-medium">Working Hours</span>
                  <span className="text-white/90">Mon - Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} AG Housing. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Premium Land Investment</p>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/254701308058?text=Hi%20AG%20Housing,%20I'd%20like%20to%20enquire%20about%20available%20land." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};
