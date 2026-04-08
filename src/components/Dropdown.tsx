import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  variant?: 'hero' | 'filter';
}

export default function Dropdown({ options, value, onChange, placeholder = "Select...", label, variant = 'filter' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  if (variant === 'hero') {
    return (
      <div className="w-full md:flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/10 relative" ref={dropdownRef}>
        {label && <label className="block text-xs text-white/70 uppercase tracking-wider mb-1">{label}</label>}
        <div 
          className="w-full flex items-center justify-between cursor-pointer text-white font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown size={16} className={`transition-transform duration-200 text-white/70 ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-50 left-0 right-0 top-[calc(100%+0.5rem)] rounded-xl overflow-hidden shadow-2xl border bg-brand-charcoal/95 backdrop-blur-xl border-white/20">
            <div className="max-h-60 overflow-y-auto py-2">
              <div 
                className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${value === "" ? 'bg-brand-burgundy/40 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                onClick={() => { onChange(""); setIsOpen(false); }}
              >
                {placeholder}
              </div>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${
                    value === option.value 
                      ? 'bg-brand-burgundy/40 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full md:flex-1 relative" ref={dropdownRef}>
      <div 
        className="w-full bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 text-brand-charcoal border border-white/60 hover:border-brand-burgundy/50 cursor-pointer shadow-sm transition-all flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? "text-brand-charcoal/70" : "text-brand-charcoal font-medium"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-200 text-brand-charcoal/50 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-[calc(100%+0.5rem)] rounded-xl overflow-hidden shadow-xl border bg-white/95 backdrop-blur-xl border-white/60">
          <div className="max-h-60 overflow-y-auto py-2">
            <div 
              className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${value === "" ? 'bg-brand-burgundy/10 text-brand-burgundy font-medium' : 'text-brand-charcoal hover:bg-white/50'}`}
              onClick={() => { onChange(""); setIsOpen(false); }}
            >
              {placeholder}
            </div>
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${
                  value === option.value 
                    ? 'bg-brand-burgundy/10 text-brand-burgundy font-medium'
                    : 'text-brand-charcoal hover:bg-white/50'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
