import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar, Footer, WhatsAppButton, CTABanner } from './components';
import Home from './pages/Home';
import AvailableLand from './pages/AvailableLand';
import AboutUs from './pages/AboutUs';
import WhyInvest from './pages/WhyInvest';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import JoinUs from './pages/JoinUs';

// Context Providers
import { ContentProvider, useContent } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

import ConstructionLoader from './components/ConstructionLoader';

const FrontEndLayout = () => (
  <div className="min-h-screen font-sans selection:bg-brand-gold/30 flex flex-col relative">
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
      <Outlet />
    </main>
    <CTABanner />
    <Footer />
    <WhatsAppButton />
  </div>
);

const AppContent = () => {
  const { isLoading } = useContent();

  if (isLoading) {
    return <ConstructionLoader />;
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Frontend Routes */}
        <Route element={<FrontEndLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/available-land" element={<AvailableLand />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/why-invest" element={<WhyInvest />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<JoinUs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </AuthProvider>
  );
}
