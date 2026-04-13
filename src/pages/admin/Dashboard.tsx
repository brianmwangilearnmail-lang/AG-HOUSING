import React, { useState } from 'react';
import { useContent, ContentData, compressImage } from '../../context/ContentContext';
import ImageCropModal from '../../components/ui/ImageCropModal';
import {
  Save, Image as ImageIcon, Plus, Trash2,
  Home, MapPin, Image, Users, Phone, HelpCircle, Info
} from 'lucide-react';

type Tab = 'home' | 'listings' | 'about' | 'whyinvest' | 'contact' | 'gallery' | 'testimonials';

const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";
const sectionCls = "space-y-4";

const ImageUploadButton = ({ src, onUpload }: { src: string; onUpload: (base64: string) => void }) => {
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const b64 = reader.result as string;
      const compressed = await compressImage(b64, 1600, 0.85);
      setPendingSrc(compressed);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="group relative w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-brand-burgundy cursor-pointer transition-colors bg-gray-50">
        {src ? (
          <img src={src} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ImageIcon size={32} className="mb-2" />
            <span className="text-sm">No image set</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white pointer-events-none">
          <ImageIcon size={24} className="mb-1" />
          <span className="text-sm font-medium">Click to Upload</span>
          <span className="text-xs mt-1 text-white/70">Crop &amp; adjust before saving</span>
        </div>
        <label className="absolute inset-0 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </label>
      </div>

      {pendingSrc && (
        <ImageCropModal
          src={pendingSrc}
          onComplete={(cropped) => { onUpload(cropped); setPendingSrc(null); }}
          onCancel={() => setPendingSrc(null)}
        />
      )}
    </>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-lg font-serif text-brand-charcoal pb-3 border-b border-gray-200 mb-5">{title}</h2>
);

export default function Dashboard() {
  const { data, updateData, isSaving, isLoading, lastSaved } = useContent();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [localData, setLocalData] = useState<ContentData>(JSON.parse(JSON.stringify(data)));

  // Keep localData in sync when context loads from Supabase
  React.useEffect(() => {
    if (!isLoading) {
      setLocalData(JSON.parse(JSON.stringify(data)));
    }
  }, [isLoading]);

  const handleSave = () => {
    updateData(localData);
  };

  const updatePath = (path: string[], value: any) => {
    setLocalData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj: any = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  // Testimonial avatar uploader with crop modal
  const [testimonialCropSrc, setTestimonialCropSrc] = useState<string | null>(null);
  const [testimonialCropIdx, setTestimonialCropIdx] = useState<number>(-1);

  const openTestimonialCrop = (file: File, idx: number) => {
    setTestimonialCropIdx(idx);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const b64 = reader.result as string;
      const compressed = await compressImage(b64, 800, 0.85);
      setTestimonialCropSrc(compressed);
    };
    reader.readAsDataURL(file);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'listings', label: 'Listings', icon: <MapPin size={16} /> },
    { id: 'about', label: 'About Us', icon: <Info size={16} /> },
    { id: 'whyinvest', label: 'Why Invest', icon: <HelpCircle size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={16} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Users size={16} /> },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            {isLoading ? 'Loading…' : lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 'Edit any content that appears on the website'}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className="bg-brand-burgundy hover:bg-brand-burgundy-hover disabled:opacity-60 disabled:cursor-wait text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow"
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
          {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {/* Slim status bar */}
      {(isLoading || isSaving) && (
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          {isLoading ? 'Loading content…' : 'Saving…'}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap relative transition-colors rounded-t-lg ${activeTab === tab.id ? 'text-brand-burgundy bg-white border border-b-white border-gray-200 -mb-px' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* ── HOME TAB ── */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            <div>
              <SectionHeader title="Site Branding" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Main Logo (PNG recommended)</label>
                  <ImageUploadButton
                    src={localData.logo}
                    onUpload={(b64) => updatePath(['logo'], b64)}
                  />
                  <input
                    type="text"
                    placeholder="Or paste image URL here…"
                    value={localData.logo.startsWith('data:') ? '' : localData.logo}
                    onChange={e => updatePath(['logo'], e.target.value)}
                    className={`${inputCls} mt-2`}
                  />
                </div>
                <div className="flex items-center text-sm text-gray-400 italic pt-6">
                  This logo appears at the top of every page. For best results, use a transparent PNG.
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Hero Section" />
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Hero Background Image</label>
                  <ImageUploadButton
                    src={localData.home.hero.image}
                    onUpload={(b64) => updatePath(['home', 'hero', 'image'], b64)}
                  />
                  <input
                    type="text"
                    placeholder="Or paste image URL here…"
                    value={localData.home.hero.image.startsWith('data:') ? '' : localData.home.hero.image}
                    onChange={e => updatePath(['home', 'hero', 'image'], e.target.value)}
                    className={`${inputCls} mt-2`}
                  />
                </div>
                <div>
                  <label className={labelCls}>Main Title</label>
                  <textarea rows={2} className={inputCls} value={localData.home.hero.title}
                    onChange={e => updatePath(['home', 'hero', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Subtitle</label>
                  <textarea rows={3} className={inputCls} value={localData.home.hero.subtitle}
                    onChange={e => updatePath(['home', 'hero', 'subtitle'], e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Trust Bar Stats" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {localData.home.trustBar.map((stat, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-2">
                    <div>
                      <label className={labelCls}>Value</label>
                      <input type="text" className={inputCls} value={stat.value}
                        onChange={e => {
                          const tb = [...localData.home.trustBar];
                          tb[i] = { ...tb[i], value: e.target.value };
                          updatePath(['home', 'trustBar'], tb);
                        }} />
                    </div>
                    <div>
                      <label className={labelCls}>Label</label>
                      <input type="text" className={inputCls} value={stat.label}
                        onChange={e => {
                          const tb = [...localData.home.trustBar];
                          tb[i] = { ...tb[i], label: e.target.value };
                          updatePath(['home', 'trustBar'], tb);
                        }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader title="Why Choose AG Housing (Home Preview)" />
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Section Title</label>
                  <input type="text" className={inputCls} value={localData.home.whyInvest.title}
                    onChange={e => updatePath(['home', 'whyInvest', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Section Subtitle</label>
                  <textarea rows={2} className={inputCls} value={localData.home.whyInvest.subtitle}
                    onChange={e => updatePath(['home', 'whyInvest', 'subtitle'], e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {localData.home.whyInvest.cards.map((card, i) => (
                    <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
                      <div>
                        <label className={labelCls}>Card {i + 1} Title</label>
                        <input type="text" className={inputCls} value={card.title}
                          onChange={e => {
                            const cards = [...localData.home.whyInvest.cards];
                            cards[i] = { ...cards[i], title: e.target.value };
                            updatePath(['home', 'whyInvest', 'cards'], cards);
                          }} />
                      </div>
                      <div>
                        <label className={labelCls}>Card {i + 1} Text</label>
                        <textarea rows={2} className={inputCls} value={card.text}
                          onChange={e => {
                            const cards = [...localData.home.whyInvest.cards];
                            cards[i] = { ...cards[i], text: e.target.value };
                            updatePath(['home', 'whyInvest', 'cards'], cards);
                          }} />
                      </div>
                      {(i === 0 || i === 3) && (
                        <div>
                          <label className={labelCls}>Card {i + 1} Background Image {i === 1 || i === 2 ? '(no image on this card)' : ''}</label>
                          <ImageUploadButton
                            src={(card as any).image || ''}
                            onUpload={b64 => {
                              const cards = [...localData.home.whyInvest.cards];
                              cards[i] = { ...cards[i], image: b64 };
                              updatePath(['home', 'whyInvest', 'cards'], cards);
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Or paste image URL…"
                            className={`${inputCls} mt-2`}
                            value={((card as any).image || '').startsWith('data:') ? '' : ((card as any).image || '')}
                            onChange={e => {
                              const cards = [...localData.home.whyInvest.cards];
                              cards[i] = { ...cards[i], image: e.target.value };
                              updatePath(['home', 'whyInvest', 'cards'], cards);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Featured Properties Section (Home Page)" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Section Title</label>
                  <input type="text" className={inputCls} value={(localData.home as any).featuredSection?.title ?? ''}
                    onChange={e => {
                      const fs = { ...((localData.home as any).featuredSection ?? {}), title: e.target.value };
                      updatePath(['home', 'featuredSection'], fs);
                    }} />
                </div>
                <div>
                  <label className={labelCls}>Section Subtitle</label>
                  <textarea rows={3} className={inputCls} value={(localData.home as any).featuredSection?.subtitle ?? ''}
                    onChange={e => {
                      const fs = { ...((localData.home as any).featuredSection ?? {}), subtitle: e.target.value };
                      updatePath(['home', 'featuredSection'], fs);
                    }} />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="How to Join Section" />
              <p className="text-xs text-gray-400 -mt-3 mb-5">Changes here sync to both the Home page and the /join page automatically.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Group Requirements */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className={labelCls}>Group &amp; Church Requirements</label>
                    <button onClick={() => {
                      const reqs = [...((localData.home as any).howToJoin?.groupRequirements ?? []), 'New requirement'];
                      updatePath(['home', 'howToJoin', 'groupRequirements'], reqs);
                    }} className="flex items-center gap-1 text-xs bg-brand-charcoal text-white px-2.5 py-1.5 rounded-lg hover:bg-black transition-colors">
                      <Plus size={12} /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {((localData.home as any).howToJoin?.groupRequirements ?? []).map((req: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input type="text" className={inputCls} value={req}
                          onChange={e => {
                            const reqs = [...((localData.home as any).howToJoin?.groupRequirements ?? [])];
                            reqs[i] = e.target.value;
                            updatePath(['home', 'howToJoin', 'groupRequirements'], reqs);
                          }} />
                        <button onClick={() => {
                          const reqs = [...((localData.home as any).howToJoin?.groupRequirements ?? [])];
                          reqs.splice(i, 1);
                          updatePath(['home', 'howToJoin', 'groupRequirements'], reqs);
                        }} className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Individual Requirements */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className={labelCls}>Individual Requirements</label>
                    <button onClick={() => {
                      const reqs = [...((localData.home as any).howToJoin?.individualRequirements ?? []), 'New requirement'];
                      updatePath(['home', 'howToJoin', 'individualRequirements'], reqs);
                    }} className="flex items-center gap-1 text-xs bg-brand-charcoal text-white px-2.5 py-1.5 rounded-lg hover:bg-black transition-colors">
                      <Plus size={12} /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {((localData.home as any).howToJoin?.individualRequirements ?? []).map((req: string, i: number) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input type="text" className={inputCls} value={req}
                          onChange={e => {
                            const reqs = [...((localData.home as any).howToJoin?.individualRequirements ?? [])];
                            reqs[i] = e.target.value;
                            updatePath(['home', 'howToJoin', 'individualRequirements'], reqs);
                          }} />
                        <button onClick={() => {
                          const reqs = [...((localData.home as any).howToJoin?.individualRequirements ?? [])];
                          reqs.splice(i, 1);
                          updatePath(['home', 'howToJoin', 'individualRequirements'], reqs);
                        }} className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LISTINGS TAB ── */}
        {activeTab === 'listings' && (
          <div>
            <div className="mb-8 p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
              <SectionHeader title="Available Land Page Header" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Page Title</label>
                  <input type="text" className={inputCls} value={(localData as any).availableLand?.hero?.title ?? ''}
                    onChange={e => updatePath(['availableLand', 'hero', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Page Subtitle</label>
                  <textarea rows={2} className={inputCls} value={(localData as any).availableLand?.hero?.subtitle ?? ''}
                    onChange={e => updatePath(['availableLand', 'hero', 'subtitle'], e.target.value)} />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-5">
              <SectionHeader title="Land Listings" />
              <button onClick={() => {
                const newItem = { id: Date.now(), title: 'New Plot', location: 'Location', locationId: 'nairobi', size: '1/8 Acre', sizeId: '1/8', typeId: 'residential', image: '', tags: ['Tag'], status: 'Available', isFeatured: false };
                updatePath(['listings'], [...localData.listings, newItem]);
              }} className="flex items-center gap-2 bg-brand-charcoal text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition-colors">
                <Plus size={15} /> Add Listing
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localData.listings.map((listing, i) => (
                <div key={listing.id} className="border border-gray-200 rounded-xl p-5 relative group space-y-4">
                  <button onClick={() => {
                    const nl = [...localData.listings]; nl.splice(i, 1);
                    updatePath(['listings'], nl);
                  }} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-lg p-1.5 shadow-sm opacity-0 group-hover:opacity-100">
                    <Trash2 size={15} />
                  </button>
                  <div>
                    <label className={labelCls}>Image</label>
                    <ImageUploadButton src={listing.image} onUpload={(b64) => {
                      const nl = [...localData.listings]; nl[i] = { ...listing, image: b64 };
                      updatePath(['listings'], nl);
                    }} />
                    <input type="text" placeholder="Or paste image URL…" className={`${inputCls} mt-2`}
                      value={listing.image.startsWith('data:') ? '' : listing.image}
                      onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, image: e.target.value }; updatePath(['listings'], nl); }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Title</label>
                      <input type="text" className={inputCls} value={listing.title}
                        onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, title: e.target.value }; updatePath(['listings'], nl); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Status</label>
                      <input type="text" className={inputCls} value={listing.status}
                        onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, status: e.target.value }; updatePath(['listings'], nl); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Location Text</label>
                      <input type="text" className={inputCls} value={listing.location}
                        onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, location: e.target.value }; updatePath(['listings'], nl); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Size</label>
                      <input type="text" className={inputCls} value={listing.size}
                        onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, size: e.target.value }; updatePath(['listings'], nl); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Tags (comma separated)</label>
                      <input type="text" className={inputCls} value={listing.tags.join(', ')}
                        onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, tags: e.target.value.split(',').map(t => t.trim()) }; updatePath(['listings'], nl); }} />
                    </div>
                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" checked={listing.isFeatured}
                          onChange={e => { const nl = [...localData.listings]; nl[i] = { ...listing, isFeatured: e.target.checked }; updatePath(['listings'], nl); }} />
                        Show on Home Page
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABOUT TAB ── */}
        {activeTab === 'about' && (
          <div className="space-y-10">
            <div>
              <SectionHeader title="Page Header" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Page Title</label>
                  <input type="text" className={inputCls} value={localData.about.hero.title}
                    onChange={e => updatePath(['about', 'hero', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Page Subtitle</label>
                  <textarea rows={2} className={inputCls} value={localData.about.hero.subtitle}
                    onChange={e => updatePath(['about', 'hero', 'subtitle'], e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Our Story Section" />
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Story Title</label>
                  <input type="text" className={inputCls} value={localData.about.story.title}
                    onChange={e => updatePath(['about', 'story', 'title'], e.target.value)} />
                </div>
                {([
                  { key: 'paragraph1', label: 'Paragraph 1' },
                  { key: 'paragraph2', label: 'Paragraph 2' },
                  { key: 'paragraph3', label: 'Paragraph 3' },
                  { key: 'paragraph4', label: 'Paragraph 4' },
                  { key: 'paragraph5', label: 'Paragraph 5' },
                  { key: 'paragraph6', label: 'Closing Paragraph (bold)' },
                ] as const).map(({ key, label }) => (
                  <div key={key}>
                    <label className={labelCls}>{label}</label>
                    <textarea rows={4} className={inputCls}
                      value={(localData.about.story as any)[key] ?? ''}
                      onChange={e => updatePath(['about', 'story', key], e.target.value)} />
                  </div>
                ))}
                <div>
                  <label className={labelCls}>Story Image</label>
                  <ImageUploadButton src={localData.about.story.image}
                    onUpload={(b64) => updatePath(['about', 'story', 'image'], b64)} />
                  <input type="text" placeholder="Or paste URL…" className={`${inputCls} mt-2`}
                    value={localData.about.story.image.startsWith('data:') ? '' : localData.about.story.image}
                    onChange={e => updatePath(['about', 'story', 'image'], e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <SectionHeader title="Team Members" />
                <button onClick={() => {
                  const team = [...localData.about.team, { id: Date.now(), name: 'New Member', role: 'Role', img: '' }];
                  updatePath(['about', 'team'], team);
                }} className="flex items-center gap-1.5 bg-brand-charcoal text-white px-3 py-1.5 rounded-lg text-sm hover:bg-black">
                  <Plus size={14} /> Add Member
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {localData.about.team.map((member, i) => (
                  <div key={member.id} className="border border-gray-200 rounded-xl p-4 space-y-3 relative group">
                    <button onClick={() => {
                      const team = [...localData.about.team]; team.splice(i, 1);
                      updatePath(['about', 'team'], team);
                    }} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-lg p-1.5 shadow-sm opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                    <ImageUploadButton src={member.img} onUpload={(b64) => {
                      const team = [...localData.about.team]; team[i] = { ...member, img: b64 };
                      updatePath(['about', 'team'], team);
                    }} />
                    <input type="text" placeholder="Or paste URL…" className={inputCls}
                      value={member.img.startsWith('data:') ? '' : member.img}
                      onChange={e => { const team = [...localData.about.team]; team[i] = { ...member, img: e.target.value }; updatePath(['about', 'team'], team); }} />
                    <div>
                      <label className={labelCls}>Name</label>
                      <input type="text" className={inputCls} value={member.name}
                        onChange={e => { const team = [...localData.about.team]; team[i] = { ...member, name: e.target.value }; updatePath(['about', 'team'], team); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Role</label>
                      <input type="text" className={inputCls} value={member.role}
                        onChange={e => { const team = [...localData.about.team]; team[i] = { ...member, role: e.target.value }; updatePath(['about', 'team'], team); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── WHY INVEST TAB ── */}
        {activeTab === 'whyinvest' && (
          <div className="space-y-10">
            <div>
              <SectionHeader title="Page Header" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Page Title</label>
                  <input type="text" className={inputCls} value={localData.whyInvestPage.hero.title}
                    onChange={e => updatePath(['whyInvestPage', 'hero', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Page Subtitle</label>
                  <textarea rows={2} className={inputCls} value={localData.whyInvestPage.hero.subtitle}
                    onChange={e => updatePath(['whyInvestPage', 'hero', 'subtitle'], e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Buying Process" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelCls}>Section Title</label>
                  <input type="text" className={inputCls} value={localData.whyInvestPage.buyingProcess.title}
                    onChange={e => updatePath(['whyInvestPage', 'buyingProcess', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Section Subtitle</label>
                  <input type="text" className={inputCls} value={localData.whyInvestPage.buyingProcess.subtitle}
                    onChange={e => updatePath(['whyInvestPage', 'buyingProcess', 'subtitle'], e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localData.whyInvestPage.buyingProcess.steps.map((step, i) => (
                  <div key={step.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50 space-y-2">
                    <div>
                      <label className={labelCls}>Step {i + 1} Title</label>
                      <input type="text" className={inputCls} value={step.title}
                        onChange={e => { const steps = [...localData.whyInvestPage.buyingProcess.steps]; steps[i] = { ...step, title: e.target.value }; updatePath(['whyInvestPage', 'buyingProcess', 'steps'], steps); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Step {i + 1} Description</label>
                      <textarea rows={2} className={inputCls} value={step.desc}
                        onChange={e => { const steps = [...localData.whyInvestPage.buyingProcess.steps]; steps[i] = { ...step, desc: e.target.value }; updatePath(['whyInvestPage', 'buyingProcess', 'steps'], steps); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <SectionHeader title="FAQs" />
                <button onClick={() => {
                  const faqs = [...localData.whyInvestPage.faqs, { id: Date.now(), q: 'New Question?', a: 'Answer here.' }];
                  updatePath(['whyInvestPage', 'faqs'], faqs);
                }} className="flex items-center gap-1.5 bg-brand-charcoal text-white px-3 py-1.5 rounded-lg text-sm hover:bg-black">
                  <Plus size={14} /> Add FAQ
                </button>
              </div>
              <div className="space-y-4">
                {localData.whyInvestPage.faqs.map((faq, i) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4 relative group space-y-3">
                    <button onClick={() => {
                      const faqs = [...localData.whyInvestPage.faqs]; faqs.splice(i, 1);
                      updatePath(['whyInvestPage', 'faqs'], faqs);
                    }} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-lg p-1.5 shadow-sm opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                    <div>
                      <label className={labelCls}>Question</label>
                      <input type="text" className={inputCls} value={faq.q}
                        onChange={e => { const faqs = [...localData.whyInvestPage.faqs]; faqs[i] = { ...faq, q: e.target.value }; updatePath(['whyInvestPage', 'faqs'], faqs); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Answer</label>
                      <textarea rows={3} className={inputCls} value={faq.a}
                        onChange={e => { const faqs = [...localData.whyInvestPage.faqs]; faqs[i] = { ...faq, a: e.target.value }; updatePath(['whyInvestPage', 'faqs'], faqs); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT TAB ── */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div>
              <SectionHeader title="Page Header" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Page Title</label>
                  <input type="text" className={inputCls} value={localData.contact.hero.title}
                    onChange={e => updatePath(['contact', 'hero', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Page Subtitle</label>
                  <textarea rows={2} className={inputCls} value={localData.contact.hero.subtitle}
                    onChange={e => updatePath(['contact', 'hero', 'subtitle'], e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Contact Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Office Address</label>
                  <textarea rows={3} className={inputCls} value={localData.contact.info.address}
                    onChange={e => updatePath(['contact', 'info', 'address'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Phone Numbers (one per line)</label>
                  <textarea rows={3} className={inputCls} value={localData.contact.info.phone}
                    onChange={e => updatePath(['contact', 'info', 'phone'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Email Addresses (one per line)</label>
                  <textarea rows={3} className={inputCls} value={localData.contact.info.email}
                    onChange={e => updatePath(['contact', 'info', 'email'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Working Hours</label>
                  <textarea rows={3} className={inputCls} value={localData.contact.info.hours}
                    onChange={e => updatePath(['contact', 'info', 'hours'], e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── GALLERY TAB ── */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div>
              <SectionHeader title="Page Header" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={labelCls}>Page Title</label>
                  <input type="text" className={inputCls} value={localData.gallery.hero.title}
                    onChange={e => updatePath(['gallery', 'hero', 'title'], e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Page Subtitle</label>
                  <textarea rows={2} className={inputCls} value={localData.gallery.hero.subtitle}
                    onChange={e => updatePath(['gallery', 'hero', 'subtitle'], e.target.value)} />
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Gallery Images</h3>
                <button onClick={() => {
                  const imgs = [...localData.gallery.images, { id: Date.now(), url: '' }];
                  updatePath(['gallery', 'images'], imgs);
                }} className="flex items-center gap-1.5 bg-brand-charcoal text-white px-3 py-1.5 rounded-lg text-sm hover:bg-black">
                  <Plus size={14} /> Add Image
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {localData.gallery.images.map((img, i) => (
                  <div key={img.id} className="relative group space-y-2">
                    <button onClick={() => {
                      const imgs = [...localData.gallery.images]; imgs.splice(i, 1);
                      updatePath(['gallery', 'images'], imgs);
                    }} className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={12} />
                    </button>
                    <ImageUploadButton src={img.url} onUpload={(b64) => {
                      const imgs = [...localData.gallery.images]; imgs[i] = { ...img, url: b64 };
                      updatePath(['gallery', 'images'], imgs);
                    }} />
                    <input type="text" placeholder="Or paste URL…" className={inputCls}
                      value={img.url.startsWith('data:') ? '' : img.url}
                      onChange={e => { const imgs = [...localData.gallery.images]; imgs[i] = { ...img, url: e.target.value }; updatePath(['gallery', 'images'], imgs); }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TESTIMONIALS TAB ── */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <SectionHeader title="Client Testimonials" />
              <button onClick={() => {
                const ts = [...localData.testimonials, { id: Date.now(), text: 'Write the testimonial here.', image: '', name: 'Client Name', role: 'Role / Location' }];
                updatePath(['testimonials'], ts);
              }} className="flex items-center gap-1.5 bg-brand-charcoal text-white px-3 py-1.5 rounded-lg text-sm hover:bg-black">
                <Plus size={14} /> Add Testimonial
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {localData.testimonials.map((t, i) => (
                <div key={t.id} className="border border-gray-200 rounded-xl p-5 relative group space-y-3">
                  <button onClick={() => {
                    const ts = [...localData.testimonials]; ts.splice(i, 1);
                    updatePath(['testimonials'], ts);
                  }} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100">
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 shrink-0 relative group/img">
                      {t.image ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400"><Users size={20} /></div>}
                      <label className="absolute inset-0 cursor-pointer bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ImageIcon size={16} />
                        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) openTestimonialCrop(f, i); }} />
                      </label>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelCls}>Name</label>
                        <input type="text" className={inputCls} value={t.name}
                          onChange={e => { const ts = [...localData.testimonials]; ts[i] = { ...t, name: e.target.value }; updatePath(['testimonials'], ts); }} />
                      </div>
                      <div>
                        <label className={labelCls}>Role</label>
                        <input type="text" className={inputCls} value={t.role}
                          onChange={e => { const ts = [...localData.testimonials]; ts[i] = { ...t, role: e.target.value }; updatePath(['testimonials'], ts); }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Testimonial Text</label>
                    <textarea rows={3} className={inputCls} value={t.text}
                      onChange={e => { const ts = [...localData.testimonials]; ts[i] = { ...t, text: e.target.value }; updatePath(['testimonials'], ts); }} />
                  </div>
                  <div>
                    <label className={labelCls}>Profile Photo URL</label>
                    <input type="text" placeholder="Or paste URL instead of uploading…" className={inputCls}
                      value={t.image.startsWith('data:') ? '' : t.image}
                      onChange={e => { const ts = [...localData.testimonials]; ts[i] = { ...t, image: e.target.value }; updatePath(['testimonials'], ts); }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    {/* Testimonial avatar crop modal */}
    {testimonialCropSrc && (
      <ImageCropModal
        src={testimonialCropSrc}
        onComplete={(cropped) => {
          const ts = [...localData.testimonials];
          ts[testimonialCropIdx] = { ...ts[testimonialCropIdx], image: cropped };
          updatePath(['testimonials'], ts);
          setTestimonialCropSrc(null);
          setTestimonialCropIdx(-1);
        }}
        onCancel={() => { setTestimonialCropSrc(null); setTestimonialCropIdx(-1); }}
      />
    )}
    </>
  );
}
