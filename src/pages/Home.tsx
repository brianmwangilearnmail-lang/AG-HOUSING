import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ShieldCheck, Map, CreditCard, Users, Star } from 'lucide-react';
import Dropdown from '../components/Dropdown';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { data } = useContent();
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
          src={data.home.hero.image} 
          alt="Aerial view of beautiful land" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="font-hero text-5xl md:text-7xl lg:text-8xl text-white font-semibold leading-tight mb-6 max-w-4xl drop-shadow-lg tracking-tight whitespace-pre-line">
          {data.home.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl font-light drop-shadow-md">
          {data.home.hero.subtitle}
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
  const { data } = useContent();
  const stats = data.home.trustBar;

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
  const { data } = useContent();
  const listings = data.listings.filter(l => l.isFeatured);
  const featured = (data.home as any).featuredSection ?? { title: 'Featured Properties', subtitle: '' };

  return (
    <section className="py-24 relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-4">{featured.title}</h2>
            <p className="text-brand-grey text-lg">{featured.subtitle}</p>
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
  const { data } = useContent();
  const { title, subtitle, cards } = data.home.whyInvest;

  return (
    <section className="py-24 relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">{title}</h2>
          <p className="text-brand-grey text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          <div className="md:col-span-2 bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative group">
            <div className="flex-1 z-10">
              <div className="w-12 h-12 bg-brand-burgundy/10 rounded-xl flex items-center justify-center mb-6 text-brand-burgundy">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-2xl text-brand-charcoal mb-3">{cards[0]?.title}</h3>
              <p className="text-brand-grey">{cards[0]?.text}</p>
            </div>
            <div className="flex-1 h-full w-full min-h-[200px] rounded-2xl overflow-hidden relative shadow-inner">
              <img src={cards[0]?.image} alt="Signing documents" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-8 flex flex-col justify-center">
            <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center mb-6 text-brand-gold">
              <Map size={24} />
            </div>
            <h3 className="font-serif text-2xl text-brand-charcoal mb-3">{cards[1]?.title}</h3>
            <p className="text-brand-grey">{cards[1]?.text}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-8 flex flex-col justify-center">
            <div className="w-12 h-12 bg-brand-charcoal/10 rounded-xl flex items-center justify-center mb-6 text-brand-charcoal">
              <CreditCard size={24} />
            </div>
            <h3 className="font-serif text-2xl text-brand-charcoal mb-3">{cards[2]?.title}</h3>
            <p className="text-brand-grey">{cards[2]?.text}</p>
          </div>

          <div className="md:col-span-2 rounded-3xl overflow-hidden relative group shadow-lg border border-white/20">
            <img src={cards[3]?.image} alt="Happy family on land" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 to-brand-charcoal/20 p-8 flex flex-col justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 text-white border border-white/30">
                <Users size={24} />
              </div>
              <h3 className="font-serif text-3xl text-white mb-3 max-w-md">{cards[3]?.title}</h3>
              <p className="text-white/80 max-w-md">{cards[3]?.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';
import { motion } from 'motion/react';

const Testimonials = () => {
  const { data } = useContent();
  const firstColumn = data.testimonials.slice(0, 3);
  const secondColumn = data.testimonials.slice(3, 6);
  const thirdColumn = data.testimonials.slice(6, 9);

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

const HowToJoin = () => {
  const { data } = useContent();
  const howToJoin = (data.home as any).howToJoin ?? { groupRequirements: [], individualRequirements: [] };

  return (
    <section className="py-24 relative overflow-hidden bg-brand-cream/40">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C9922A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#a3792e] text-white font-serif text-3xl md:text-5xl px-10 py-4 rounded-full shadow-lg border-b-8 border-[#825e1f]">
            How to Join
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto relative bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2rem] shadow-xl">
          {/* Desktop Divider */}
          <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[10%] w-[2px] bg-brand-charcoal/20 -translate-x-1/2"></div>
          
          {/* Group and Church */}
          <div>
            <h3 className="font-serif text-[28px] text-[#a3792e] uppercase tracking-wide mb-8 font-bold md:text-left">Group and Church</h3>
            <ul className="space-y-5 text-brand-charcoal">
              {howToJoin.groupRequirements.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-brand-charcoal mt-2 shrink-0 shadow-sm"></div>
                  <span className="text-lg font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Individuals */}
          <div>
            <h3 className="font-serif text-[28px] text-[#a3792e] uppercase tracking-wide mb-8 font-bold md:text-left">Individuals</h3>
            <ul className="space-y-5 text-brand-charcoal">
              {howToJoin.individualRequirements.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-brand-charcoal mt-2 shrink-0 shadow-sm"></div>
                  <span className="text-lg font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12 relative z-10">
          <Link to="/join" className="inline-flex items-center gap-2 bg-brand-charcoal text-brand-gold hover:bg-brand-charcoal/90 px-10 py-4 rounded-full font-serif text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-brand-gold/30">
            Learn More
            <ArrowRight size={20} />
          </Link>
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
      <HowToJoin />
      <Testimonials />
    </>
  );
}

