import React from 'react';
import { useContent } from '../context/ContentContext';

export default function Gallery() {
  const { data } = useContent();
  const { hero, images } = data.gallery;

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
        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group relative cursor-pointer border border-white/20">
              <img 
                src={img.url} 
                alt={`Gallery image ${img.id}`} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
