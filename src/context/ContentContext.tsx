import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { defaultContent } from '../data/defaultContent';
import { supabase } from '../lib/supabase';

export type ContentData = typeof defaultContent;

interface ContentContextType {
  data: ContentData;
  updateData: (newData: Partial<ContentData>) => void;
  resetToDefault: () => void;
  isSaving: boolean;
  isLoading: boolean;
  lastSaved: Date | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const LOCAL_KEY = 'ag_housing_content';
const DEBOUNCE_MS = 800; // save 800ms after last change

// ── Canvas-based image compressor — reduces base64 size by ~70-80% ──
export async function compressImage(base64: string, maxWidth = 1200, quality = 0.75): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(base64); // fallback to original on error
    img.src = base64;
  });
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ContentData>(() => {
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      try {
        return deepMerge(defaultContent, JSON.parse(cached));
      } catch {}
    }
    return defaultContent;
  });
  
  // Start loading ONLY if we don't have a cache yet
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(() => !localStorage.getItem(LOCAL_KEY));
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounce ref — holds the latest pending data to save
  const pendingRef = useRef<ContentData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load data on mount ──
  useEffect(() => {
    const load = async () => {
      // Don't show the full page loader if we already hit the local cache
      if (!localStorage.getItem(LOCAL_KEY)) {
        setIsLoading(true);
      }
      try {
        const { data: rows, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('id', 1)
          .single();

        if (!error && rows?.content && Object.keys(rows.content).length > 0) {
          const merged = deepMerge(defaultContent, rows.content as ContentData);
          setData(merged);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
        } else {
          const cached = localStorage.getItem(LOCAL_KEY);
          if (cached) {
            setData(deepMerge(defaultContent, JSON.parse(cached)));
          }
        }
      } catch {
        const cached = localStorage.getItem(LOCAL_KEY);
        if (cached) {
          try { setData(deepMerge(defaultContent, JSON.parse(cached))); } catch {}
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // ── Flush to Supabase immediately ──
  const flushSave = async (updated: ContentData) => {
    setIsSaving(true);
    
    try {
      // Safely try local storage first (it can throw QuotaExceededError for huge images)
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      } catch (localErr) {
        console.warn('Local storage quota exceeded. Proceeding to save to cloud only.');
      }

      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: updated, updated_at: new Date().toISOString() });
        
      if (error) throw error;
      
      setLastSaved(new Date());
    } catch (err: any) {
      console.error('Save failed:', err);
      alert('Save failed. The image you uploaded might be too large. Try uploading a smaller image or clearing some data.');
    } finally {
      setIsSaving(false);
    }
  };

  // ── updateData: optimistic UI + debounced remote save ──
  const updateData = (newPartialData: Partial<ContentData>) => {
    setData(prev => {
      const updated = { ...prev, ...newPartialData };
      pendingRef.current = updated;

      // Debounce: clear old timer, set new one
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (pendingRef.current) {
          flushSave(pendingRef.current);
          pendingRef.current = null;
        }
      }, DEBOUNCE_MS);

      return updated;
    });
  };

  const resetToDefault = async () => {
    setData(defaultContent);
    localStorage.removeItem(LOCAL_KEY);
    try {
      await supabase
        .from('site_content')
        .upsert({ id: 1, content: defaultContent, updated_at: new Date().toISOString() });
    } catch {}
  };

  return (
    <ContentContext.Provider value={{ data, updateData, resetToDefault, isSaving, isLoading, lastSaved }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) throw new Error('useContent must be used within a ContentProvider');
  return context;
};

// ── Deep merge helper ──
function deepMerge<T extends object>(defaults: T, saved: Partial<T>): T {
  const result: any = { ...defaults };
  for (const key in saved) {
    if (
      saved[key] !== null &&
      typeof saved[key] === 'object' &&
      !Array.isArray(saved[key]) &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      result[key] = deepMerge(defaults[key] as any, saved[key] as any);
    } else if (saved[key] !== undefined) {
      result[key] = saved[key];
    }
  }
  return result;
}
