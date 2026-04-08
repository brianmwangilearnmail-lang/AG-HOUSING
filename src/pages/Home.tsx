import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ShieldCheck, Map, CreditCard, Users, Star } from 'lucide-react';
import Dropdown from '../components/Dropdown';

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');

  const handleSearch = () => {
    // In a real app, we would pass these as query params
    navigate('/available-land');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
          alt="Aerial view of beautiful land" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="font-hero text-5xl md:text-7xl lg:text-8xl text-white font-semibold leading-tight mb-6 max-w-4xl drop-shadow-lg tracking-tight">
          Own the Land.<br/>Build the Future.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl font-light drop-shadow-md">
          Premium land opportunities across Kenya. Transparent guidance, verified titles, and strategic investment value.
        </p>

        <div className="relative z-20 w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 md:p-4 shadow-2xl flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <Dropdown
            label="Location"
            placeholder="All Locations"
            value={location}
            onChange={setLocation}
            variant="hero"
            options={[
              { value: "nairobi", label: "Nairobi Environs" },
              { value: "kiambu", label: "Kiambu County" },
              { value: "kajiado", label: "Kajiado County" }
            ]}
          />

          <Dropdown
            label="Land Type"
            placeholder="Any Type"
            value={type}
            onChange={setType}
            variant="hero"
            options={[
              { value: "residential", label: "Residential" },
              { value: "commercial", label: "Commercial" },
              { value: "agricultural", label: "Agricultural" }
            ]}
          />

          <Dropdown
            label="Size"
            placeholder="Any Size"
            value={size}
            onChange={setSize}
            variant="hero"
            options={[
              { value: "1/8", label: "1/8 Acre (50x100)" },
              { value: "1/4", label: "1/4 Acre" },
              { value: "1+", label: "1+ Acres" }
            ]}
          />

          <button onClick={handleSearch} className="w-full md:w-auto bg-brand-burgundy hover:bg-brand-burgundy-hover text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 h-[68px]">
            <Search size={20} />
            <span>Find Land</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const TrustBar = () => {
  const stats = [
    { value: "50+", label: "Premium Plots" },
    { value: "5+ Years", label: "Market Experience" },
    { value: "100%", label: "Verified Titles" },
    { value: "24/7", label: "Expert Support" }
  ];

  return (
    <div className="bg-brand-charcoal text-white py-12">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className={idx === 0 ? "" : "pl-8"}>
              <div className="font-serif text-3xl md:text-4xl text-brand-gold mb-2">{stat.value}</div>
              <div className="text-sm text-white/70 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturedLand = () => {
  const listings = [
    {
      id: 1,
      title: "Prime Residential Plots in Ruiru",
      location: "Ruiru, Kiambu County",
      size: "1/8 Acre (50x100)",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
      tags: ["Ready Title", "Water & Electricity"],
      status: "Selling Fast"
    },
    {
      id: 2,
      title: "Scenic Agricultural Land",
      location: "Naivasha, Nakuru County",
      size: "5 Acres",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop",
      tags: ["Fertile Soil", "Road Access"],
      status: "Available"
    },
    {
      id: 3,
      title: "Exclusive Gated Community Lots",
      location: "Karen, Nairobi",
      size: "1/2 Acre",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
      tags: ["Highly Secure", "Premium Area"],
      status: "Few Remaining"
    },
    {
      id: 4,
      title: "Commercial Highway Frontage",
      location: "Mombasa Road, Machakos",
      size: "1 Acre",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      tags: ["High Traffic", "Commercial Zoning"],
      status: "New Listing"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-4">Featured Properties</h2>
            <p className="text-brand-grey text-lg">Discover our handpicked selection of premium land opportunities, fully verified and ready for investment or development.</p>
          </div>
          <Link to="/available-land" className="mt-6 md:mt-0 flex items-center gap-2 text-brand-burgundy font-medium hover:text-brand-burgundy-hover transition-colors">
            View All Land <ArrowRight size={20} />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 snap-x snap-mandatory hide-scrollbar">
          {listings.map((listing) => (
            <div key={listing.id} className="min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-start group cursor-pointer relative rounded-2xl overflow-hidden h-[500px] shadow-lg hover:shadow-2xl transition-all border border-white/20">
              <img src={listing.image} alt={listing.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
                  {listing.status}
                </span>
                <span className="bg-brand-charcoal/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-white/10">
                  <MapPin size={12} /> {listing.size}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {listing.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-brand-gold bg-brand-charcoal/40 backdrop-blur-md border border-brand-gold/30 px-2 py-1 rounded shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl text-white mb-1 leading-tight drop-shadow-md">{listing.title}</h3>
                <p className="text-white/90 text-sm mb-6 flex items-center gap-1 drop-shadow-sm">
                  <MapPin size={14} /> {listing.location}
                </p>
                
                <div className="flex justify-between items-center border-t border-white/20 pt-4">
                  <span className="text-white/80 text-sm font-medium">Contact for pricing</span>
                  <Link to="/contact" className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-medium hover:bg-white hover:text-brand-charcoal transition-all shadow-sm">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyInvestPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">Why Choose AG Housing</h2>
          <p className="text-brand-grey text-lg">Experience a seamless, transparent, and secure land buying process tailored for serious investors and future homeowners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          <div className="md:col-span-2 bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative group">
            <div className="flex-1 z-10">
              <div className="w-12 h-12 bg-brand-burgundy/10 rounded-xl flex items-center justify-center mb-6 text-brand-burgundy">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-2xl text-brand-charcoal mb-3">Verified Title Deeds</h3>
              <p className="text-brand-grey">Every plot we sell undergoes rigorous legal due diligence. We guarantee clean, ready-to-transfer title deeds for your absolute peace of mind.</p>
            </div>
            <div className="flex-1 h-full w-full min-h-[200px] rounded-2xl overflow-hidden relative shadow-inner">
              <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop" alt="Signing documents" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-8 flex flex-col justify-center">
            <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-6 text-brand-gold">
              <Map size={24} />
            </div>
            <h3 className="font-serif text-2xl text-brand-charcoal mb-3">Prime Locations</h3>
            <p className="text-brand-grey">Strategically selected areas with high potential for appreciation, infrastructure development, and accessibility.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-8 flex flex-col justify-center">
            <div className="w-12 h-12 bg-brand-charcoal/10 rounded-xl flex items-center justify-center mb-6 text-brand-charcoal">
              <CreditCard size={24} />
            </div>
            <h3 className="font-serif text-2xl text-brand-charcoal mb-3">Flexible Payments</h3>
            <p className="text-brand-grey">We offer tailored payment plans to make your land ownership journey smooth and financially manageable.</p>
          </div>

          <div className="md:col-span-2 rounded-3xl overflow-hidden relative group shadow-lg border border-white/20">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop" alt="Happy family on land" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 to-brand-charcoal/20 p-8 flex flex-col justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 text-white border border-white/30">
                <Users size={24} />
              </div>
              <h3 className="font-serif text-3xl text-white mb-3 max-w-md">Expert Guidance Throughout</h3>
              <p className="text-white/80 max-w-md">From site visits to the final transfer, our dedicated team is with you every step of the way.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';
import { motion } from 'motion/react';

const testimonials = [
  {
    text: "The process of buying land in Ruiru was incredibly smooth. AG Housing handled all the legal checks, and I received my title deed exactly when promised.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    name: "Sarah M.",
    role: "Investor, UK",
  },
  {
    text: "I was skeptical about buying land while in the diaspora, but AG Housing provided video tours and verified documents that gave me complete peace of mind.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    name: "David K.",
    role: "Diaspora Investor",
  },
  {
    text: "Excellent customer service! They guided me through the entire process of acquiring my first commercial plot along Mombasa Road.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    name: "Grace W.",
    role: "Business Owner",
  },
  {
    text: "Their flexible payment plans made it possible for me to secure a quarter acre in Kajiado without straining my finances.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "John N.",
    role: "First-time Buyer",
  },
  {
    text: "AG Housing's transparency is unmatched. They showed me the exact beacons and the neighborhood development plans before I committed.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    name: "Mercy A.",
    role: "Home Builder",
  },
  {
    text: "I've bought three properties through them over the last five years. The value appreciation has been exactly as they projected.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    name: "Peter O.",
    role: "Real Estate Investor",
  },
  {
    text: "The team is very professional. They handled the land transfer process efficiently, saving me a lot of time and hassle.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    name: "Linda C.",
    role: "Corporate Executive",
  },
  {
    text: "Finding a trustworthy land selling company is hard, but AG Housing exceeded my expectations with their honesty and clear communication.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    name: "Samuel T.",
    role: "Retiree",
  },
  {
    text: "Their properties are strategically located. The plot I bought in Naivasha is already seeing massive infrastructure development nearby.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    name: "Faith M.",
    role: "Agricultural Investor",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      <div className="w-full px-4 sm:px-6 lg:px-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-brand-burgundy/30 text-brand-burgundy py-1.5 px-5 rounded-full text-sm font-medium tracking-wide uppercase">
              Client Stories
            </div>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">
            What Our Investors Say
          </h2>
          <p className="text-brand-grey text-lg">
            Hear from our community of homeowners and investors who have successfully secured their future with AG Housing.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden w-full  mx-auto">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          <TestimonialsColumn testimonials={firstColumn} className="hidden xl:block" duration={22} />
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedLand />
      <WhyInvestPreview />
      <Testimonials />
    </>
  );
}
