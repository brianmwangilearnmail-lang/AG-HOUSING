import React from 'react';
import { TrendingUp, CheckCircle, FileText, MapPin, Key, Home, Search, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const stepIcons = [<Search />, <Phone />, <MapPin />, <FileText />, <CheckCircle />, <Key />];

export default function WhyInvest() {
  const { data } = useContent();
  const { hero, buyingProcess, faqs } = data.whyInvestPage;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="bg-brand-charcoal/90 backdrop-blur-md text-white py-20 mb-16 border-y border-white/10 shadow-lg">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">{hero.title}</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl">
            {hero.subtitle}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 hover:-translate-y-1 transition-transform">
              <TrendingUp className="text-brand-burgundy mb-4" size={32} />
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">High Appreciation</h3>
              <p className="text-brand-grey text-sm">Land values in strategic Kenyan locations consistently outpace inflation, offering excellent ROI.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 mt-0 sm:mt-8 hover:-translate-y-1 transition-transform">
              <ShieldCheck className="text-brand-burgundy mb-4" size={32} />
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Low Maintenance</h3>
              <p className="text-brand-grey text-sm">Unlike built properties, vacant land requires minimal upkeep while its value grows.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 hover:-translate-y-1 transition-transform">
              <FileText className="text-brand-burgundy mb-4" size={32} />
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Secure Ownership</h3>
              <p className="text-brand-grey text-sm">With our verified title deeds, your investment is legally protected and secure.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50 mt-0 sm:mt-8 hover:-translate-y-1 transition-transform">
              <Home className="text-brand-burgundy mb-4" size={32} />
              <h3 className="font-serif text-xl text-brand-charcoal mb-2">Limitless Potential</h3>
              <p className="text-brand-grey text-sm">Build your dream home, develop commercial units, or hold for future resale.</p>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-lg border border-white/50">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-6">A Foundation for Wealth</h2>
            <p className="text-brand-grey text-lg mb-6 leading-relaxed">
              Real estate has created more wealth than any other asset class. In Kenya, rapid urbanization and infrastructure development are driving unprecedented demand for land in areas surrounding Nairobi and major counties.
            </p>
            <p className="text-brand-grey text-lg mb-8 leading-relaxed">
              At AG Housing, we identify these high-growth corridors early. By investing with us, you are securing an asset that will serve you and your future generations.
            </p>
            <Link to="/available-land" className="bg-brand-burgundy text-white px-8 py-4 rounded-xl font-medium hover:bg-brand-burgundy-hover transition-colors inline-block shadow-md">
              View Investment Opportunities
            </Link>
          </div>
        </div>

        {/* Buying Process */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-lg border border-white/50 mb-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4 drop-shadow-sm">{buyingProcess.title}</h2>
            <p className="text-brand-grey text-lg">{buyingProcess.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buyingProcess.steps.map((step, idx) => (
              <div key={step.id} className="relative p-6 border border-white/60 bg-white/40 backdrop-blur-sm rounded-2xl hover:border-brand-gold transition-colors shadow-sm">
                <div className="text-brand-gold mb-4">{stepIcons[idx] || <CheckCircle />}</div>
                <h3 className="font-serif text-xl text-brand-charcoal mb-2">{step.title}</h3>
                <p className="text-brand-grey">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-10 text-center drop-shadow-sm">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/50">
                <h4 className="font-serif text-xl text-brand-charcoal mb-3">{faq.q}</h4>
                <p className="text-brand-grey">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
