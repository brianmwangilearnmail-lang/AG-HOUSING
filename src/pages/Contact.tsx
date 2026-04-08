import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Dropdown from '../components/Dropdown';

export default function Contact() {
  const [interestedIn, setInterestedIn] = useState("");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="bg-brand-charcoal/90 backdrop-blur-md text-white py-20 mb-16 border-y border-white/10 shadow-lg">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Get in Touch</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl">
            Ready to secure your piece of land? Have questions? Our team is here to help you every step of the way.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-8 bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50">
            <div>
              <h2 className="font-serif text-3xl text-brand-charcoal mb-6">Contact Details</h2>
              <p className="text-brand-grey mb-8">Reach out to us directly or visit our office for a cup of coffee and a chat about your investment goals.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-brand-charcoal mb-1">Office Location</h4>
                  <p className="text-brand-grey">Nairobi Business Park,<br/>Ngong Road, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-burgundy/10 text-brand-burgundy rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-brand-charcoal mb-1">Phone & WhatsApp</h4>
                  <p className="text-brand-grey">+254 700 000 000<br/>+254 711 111 111</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-charcoal/10 text-brand-charcoal rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-brand-charcoal mb-1">Email</h4>
                  <p className="text-brand-grey">sales@aghousing.co.ke<br/>info@aghousing.co.ke</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/60">
                  <Clock size={24} className="text-brand-grey" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-brand-charcoal mb-1">Working Hours</h4>
                  <p className="text-brand-grey">Mon - Fri: 8:00 AM - 5:00 PM<br/>Sat: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg border border-white/50">
              <h2 className="font-serif text-3xl text-brand-charcoal mb-8">Send an Enquiry</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Full Name</label>
                    <input type="text" className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-burgundy/50 transition-colors shadow-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Phone Number</label>
                    <input type="tel" className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-burgundy/50 transition-colors shadow-sm" placeholder="+254 700 000 000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Email Address</label>
                    <input type="email" className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-burgundy/50 transition-colors shadow-sm" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Interested In</label>
                    <div className="relative z-20">
                      <Dropdown
                        placeholder="Select Land Type"
                        value={interestedIn}
                        onChange={setInterestedIn}
                        options={[
                          { value: "residential", label: "Residential Plots" },
                          { value: "commercial", label: "Commercial Land" },
                          { value: "agricultural", label: "Agricultural Land" },
                          { value: "general", label: "General Enquiry" }
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Message</label>
                  <textarea rows={5} className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-burgundy/50 transition-colors resize-none shadow-sm" placeholder="I would like to know more about..."></textarea>
                </div>

                <button type="submit" className="w-full bg-brand-burgundy hover:bg-brand-burgundy-hover text-white px-8 py-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all text-lg">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
