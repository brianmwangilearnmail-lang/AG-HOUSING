import React from 'react';
import { Hammer, Home, HardHat } from 'lucide-react';

export default function ConstructionLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-brand-cream flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* House under construction visual */}
        <div className="relative w-40 h-40 mb-8 flex items-end justify-center">
          {/* Ground */}
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-charcoal/20 rounded-full"></div>
          
          {/* Main House icon - sliding up slowly */}
          <div className="animate-[slideUp_3s_ease-out_infinite] z-10 origin-bottom">
            <Home 
              size={80} 
              className="text-brand-burgundy" 
              strokeWidth={1.5}
            />
          </div>
          
          {/* Swinging Hammer */}
          <div className="absolute right-0 bottom-12 z-20 origin-bottom-right animate-[strike_1s_ease-in-out_infinite]">
            <Hammer 
              size={36} 
              className="text-brand-gold" 
            />
          </div>
          
          {/* Static HardHat */}
          <div className="absolute left-2 bottom-0 z-20 opacity-80">
            <HardHat 
              size={28} 
              className="text-brand-charcoal" 
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-serif text-brand-charcoal font-medium mb-3">
          Assembling the Foundation...
        </h2>
        <p className="text-brand-grey text-sm animate-pulse tracking-wider uppercase">
          Loading LIVE Database
        </p>

        {/* Loading bar */}
        <div className="w-64 h-1.5 bg-brand-gold/20 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-brand-burgundy rounded-full w-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes strike {
            0% { transform: rotate(0deg); }
            30% { transform: rotate(-45deg); }
            50% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes slideUp {
            0% { clip-path: inset(100% 0 0 0); transform: translateY(10px); }
            50% { clip-path: inset(0 0 0 0); transform: translateY(0); }
            100% { clip-path: inset(0 0 0 0); transform: translateY(0); }
          }
          @keyframes progress {
            0% { transform: scaleX(0); transform-origin: left; }
            49% { transform: scaleX(1); transform-origin: left; }
            51% { transform: scaleX(1); transform-origin: right; }
            100% { transform: scaleX(0); transform-origin: right; }
          }
        `}} />
      </div>
    </div>
  );
}
