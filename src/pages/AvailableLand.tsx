import React, { useState } from 'react';
import { MapPin, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { useContent } from '../context/ContentContext';

const LOCATION_LABELS: Record<string, string> = {
  nairobi: 'Nairobi Environs',
  kiambu: 'Kiambu County',
  machakos: 'Machakos County',
  nakuru: 'Nakuru County',
  kisumu: 'Kisumu County',
  kajiado: 'Kajiado County',
  mombasa: 'Mombasa County',
  eldoret: 'Uasin Gishu County',
};

export default function AvailableLand() {
  const { data } = useContent();
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");

  const allListings = data.listings;
  const { hero } = data.availableLand;

  // Build location options dynamically from existing listings
  const locationOptions = Array.from(new Set(allListings.map(l => l.locationId)))
    .map(id => ({ value: id, label: LOCATION_LABELS[id] ?? id }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const filteredListings = allListings.filter(listing => {
    if (locationFilter && listing.locationId !== locationFilter) return false;
    if (typeFilter && listing.typeId !== typeFilter) return false;
    if (sizeFilter && listing.sizeId !== sizeFilter) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="bg-brand-charcoal/90 backdrop-blur-md text-white py-16 mb-12 border-y border-white/10 shadow-lg">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{hero.title}</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            {hero.subtitle}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="relative z-20 bg-white/60 backdrop-blur-xl rounded-2xl p-4 shadow-lg mb-12 flex flex-col md:flex-row gap-4 items-center border border-white/50">
          <div className="flex items-center gap-2 text-brand-charcoal font-medium px-4 border-r border-brand-charcoal/10 hidden md:flex">
            <Filter size={20} /> Filters
          </div>
          
          <Dropdown
            placeholder="All Locations"
            value={locationFilter}
            onChange={setLocationFilter}
            options={locationOptions}
          />

          <Dropdown
            placeholder="Any Land Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: "residential", label: "Residential" },
              { value: "commercial", label: "Commercial" },
              { value: "agricultural", label: "Agricultural" }
            ]}
          />

          <Dropdown
            placeholder="Any Size"
            value={sizeFilter}
            onChange={setSizeFilter}
            options={[
              { value: "1/8", label: "1/8 Acre" },
              { value: "1/4", label: "1/4 Acre" },
              { value: "1/2", label: "1/2 Acre" },
              { value: "1+", label: "1+ Acres" }
            ]}
          />

          <button className="w-full md:w-auto bg-brand-burgundy hover:bg-brand-burgundy-hover text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Search size={18} /> Search
          </button>
        </div>

        {/* Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="group cursor-pointer relative rounded-2xl overflow-hidden h-[450px] shadow-lg hover:shadow-2xl transition-all border border-white/20">
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
        ) : (
          <div className="text-center py-20 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg">
            <div className="w-16 h-16 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 text-brand-charcoal/40 border border-white/60 shadow-sm">
              <Search size={32} />
            </div>
            <h3 className="font-serif text-2xl text-brand-charcoal mb-2">No listings found</h3>
            <p className="text-brand-grey">Try adjusting your filters to see more available land.</p>
            <button 
              onClick={() => {
                setLocationFilter("");
                setTypeFilter("");
                setSizeFilter("");
              }}
              className="mt-6 text-brand-burgundy font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
