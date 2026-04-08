import React from 'react';
import { Target, Shield, Heart, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function AboutUs() {
  const { data } = useContent();
  const { hero, story, team } = data.about;
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
        
        {/* Our Story */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="flex-1 bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-lg border border-white/50">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-6">{story.title}</h2>
            <p className="text-brand-grey text-lg mb-4 leading-relaxed">
              {story.paragraph1}
            </p>
            <p className="text-brand-grey text-lg leading-relaxed">
              {story.paragraph2}
            </p>
          </div>
          <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border border-white/20">
            <img 
              src={story.image} 
              alt="AG Housing Team" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-12 text-center drop-shadow-sm">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={32} />, title: "Transparency", desc: "Clear communication and no hidden fees. What you see is exactly what you get." },
              { icon: <Award size={32} />, title: "Integrity", desc: "We conduct rigorous due diligence so you can invest with absolute confidence." },
              { icon: <Heart size={32} />, title: "Customer First", desc: "Your goals are our priority. We guide you through every step of the journey." },
              { icon: <Target size={32} />, title: "Long-Term Value", desc: "We select properties in high-growth areas to ensure your investment appreciates." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-brand-burgundy/10 text-brand-burgundy rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="font-serif text-xl text-brand-charcoal mb-3">{value.title}</h3>
                <p className="text-brand-grey">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Team */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-12 text-center drop-shadow-sm">Meet The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg border border-white/50 group">
                <div className="h-80 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl text-brand-charcoal mb-1">{member.name}</h3>
                  <p className="text-brand-gold font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
