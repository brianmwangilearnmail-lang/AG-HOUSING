import React from 'react';
import { Download, Printer } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function JoinUs() {
  const { data } = useContent();
  const { groupRequirements, individualRequirements } = (data.home as any).howToJoin ?? {
    groupRequirements: [],
    individualRequirements: []
  };
  const handlePrint = () => {
    window.open('/ASSEMBLIES_OF_GOD_REGISTRATION_FORM.pdf', '_blank');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="bg-brand-charcoal/90 backdrop-blur-md text-white py-20 mb-16 border-y border-white/10 shadow-lg">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6 text-brand-gold">How to Join</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl">
            Sign up by downloading our registration form and submitting the required documents.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 relative bg-white/60 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2rem] shadow-xl">
          {/* Desktop Divider */}
          <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[10%] w-[2px] bg-brand-charcoal/20 -translate-x-1/2"></div>
          
          {/* Group and Church */}
          <div>
            <h3 className="font-serif text-[28px] text-[#a3792e] uppercase tracking-wide mb-8 font-bold md:text-left">Group and Church</h3>
            <ul className="space-y-5 text-brand-charcoal">
              {groupRequirements.map((item: string, idx: number) => (
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
              {individualRequirements.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-brand-charcoal mt-2 shrink-0 shadow-sm"></div>
                  <span className="text-lg font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-brand-cream/80 border border-brand-gold/30 rounded-3xl p-10 text-center max-w-3xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9922A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="relative z-10">
            <h2 className="font-serif text-3xl text-brand-charcoal mb-4">Official Registration Form</h2>
            <p className="text-brand-charcoal/80 text-lg mb-8 max-w-xl mx-auto">
              Please print and fill out the official Assemblies of God Registration Form to proceed with your membership application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/ASSEMBLIES_OF_GOD_REGISTRATION_FORM.pdf" 
                download
                className="bg-[#a3792e] hover:bg-[#825e1f] text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </a>
              <button 
                onClick={handlePrint}
                className="bg-white border border-[#a3792e] hover:bg-[#a3792e]/5 text-[#a3792e] px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer size={20} />
                <span>Print Form</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
