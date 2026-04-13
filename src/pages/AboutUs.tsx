import React from 'react';
import { Target, Shield, Heart, Award, Users } from 'lucide-react';
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
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-24">
          <div className="flex-1 bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-lg border border-white/50">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-8">{story.title || "Our Story"}</h2>
            <div className="space-y-5">
              <p className="text-brand-grey text-lg leading-relaxed">
                AG Housing Cooperative Society Limited was founded through the visionary leadership of Bishop Njiri with a clear mission to provide an affordable, structured, and accessible pathway to land ownership.
              </p>
              <p className="text-brand-grey text-lg leading-relaxed">
                While inspired by the need to serve members of the Kenya Assemblies of God fraternity, the Society has steadily evolved into a dynamic and inclusive cooperative, welcoming individuals from all walks of life who share the aspiration of owning land and building a secure future.
              </p>
              <p className="text-brand-grey text-lg leading-relaxed">
                Since its official launch following the inaugural meeting and elections held on 24th September 2018, the Society has remained committed to strong governance, transparency, and accountability in line with cooperative principles.
              </p>
              <p className="text-brand-grey text-lg leading-relaxed">
                Our journey has been marked by steady growth and proven success. In 2018, the Society delivered Tala Phase I (99 residential plots) followed by Tala Phase II(16 residential plots), both fully sold, demonstrating strong member confidence. This momentum continued with the acquisition of a 10-acre parcel in Mai-Mahiu in 2023, followed by Kantafu Phase I in 2025 and Kantafu Phase II in 2026, with an upcoming project in Kitengela further reinforcing our commitment to expanding access to affordable land ownership.
              </p>
              <p className="text-brand-grey text-lg leading-relaxed">
                Beyond land ownership, we are committed to building thriving communities. As part of our corporate social responsibility, we dedicated two plots within each project for the development of a place of worship, supporting both social connection and spiritual growth.
              </p>
              <p className="text-brand-charcoal text-lg leading-relaxed font-medium">
                Today, AG Housing Cooperative Society Limited stands as a trusted partner in land investment empowering individuals, families, and communities to achieve stability, dignity, and long-term prosperity through land ownership.
              </p>
            </div>
          </div>
          <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border border-white/20 lg:sticky lg:top-32 w-full h-[600px] lg:h-[800px]">
            <img 
              src={story.image} 
              alt="AG Housing Team" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Eligibility Text */}
        <div className="bg-brand-cream/80 border border-brand-gold/30 rounded-3xl p-8 mb-12 text-center text-brand-charcoal shadow-sm">
           <p className="text-xl md:text-2xl font-medium">
             AG Housing is open to all KAG Sacco members, departments and groups that are registered under the KAG sacco.
           </p>
        </div>

        {/* Vision, Mission & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-brand-charcoal text-white p-8 md:p-10 rounded-3xl shadow-lg border border-brand-charcoal/50 hover:-translate-y-2 transition-transform duration-300">
             <h2 className="font-serif text-3xl mb-6 text-brand-gold drop-shadow-sm">Vision</h2>
             <p className="text-white/90 text-lg leading-relaxed">
               To be the leading Christian housing society providing affordable land and houses to clergy and members of Assemblies of God.
             </p>
          </div>
          <div className="bg-brand-burgundy text-white p-8 md:p-10 rounded-3xl shadow-lg border border-brand-burgundy/50 hover:-translate-y-2 transition-transform duration-300">
             <h2 className="font-serif text-3xl mb-6 text-brand-gold drop-shadow-sm">Mission</h2>
             <p className="text-white/90 text-lg leading-relaxed">
               To upgrade the livelihood of Assemblies of God clergy and members through buying and selling of affordable land and houses.
             </p>
          </div>
          <div className="bg-white/90 text-brand-charcoal p-8 md:p-10 rounded-3xl shadow-lg border border-brand-gold/50 hover:-translate-y-2 transition-transform duration-300">
             <h2 className="font-serif text-3xl mb-6 text-[#9c6f2a] drop-shadow-sm uppercase font-bold tracking-wide">Objectives</h2>
             <ul className="text-brand-charcoal text-lg leading-relaxed space-y-4">
               <li className="flex items-start gap-3">
                 <span className="text-[#9c6f2a] mt-1 text-xl leading-none">•</span> 
                 <span>To sell plots of land and houses.</span>
               </li>
               <li className="flex items-start gap-3">
                 <span className="text-[#9c6f2a] mt-1 text-xl leading-none">•</span> 
                 <span>To grant dividends to AG housing members.</span>
               </li>
             </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-12 text-center drop-shadow-sm">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart size={32} />, title: "Spirit Led", desc: "Guided by faith and spiritual principles in all our dealings and decisions." },
              { icon: <Award size={32} />, title: "Integrity", desc: "Dedicated to complete honesty, transparency, and doing what is right." },
              { icon: <Shield size={32} />, title: "Accountability", desc: "Taking full ownership and being openly responsible for our members' resources." },
              { icon: <Users size={32} />, title: "Team Work", desc: "Working collaboratively to achieve our shared goals and build up our community." }
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
