import React, { createContext, useContext, useEffect, useState } from 'react';
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

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ContentData>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // ── Load data on mount: Supabase first, localStorage as fallback ──
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const { data: rows, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('id', 1)
          .single();

        if (!error && rows?.content && Object.keys(rows.content).length > 0) {
          // Supabase has data — deep merge with default to fill in any new keys
          const merged = deepMerge(defaultContent, rows.content as ContentData);
          setData(merged);
          // Cache locally too for offline resilience
          localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
        } else {
          // Supabase empty or unreachable — try localStorage
          const cached = localStorage.getItem(LOCAL_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            setData(deepMerge(defaultContent, parsed));
          }
          // If both empty just use defaultContent (already set)
        }
      } catch (err) {
        // Network error — fallback to localStorage
        console.warn('Supabase load failed, using localStorage cache', err);
        const cached = localStorage.getItem(LOCAL_KEY);
        if (cached) {
          try {
            setData(deepMerge(defaultContent, JSON.parse(cached)));
          } catch {}
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  // ── Save data: write to Supabase + update localStorage cache ──
  const updateData = async (newPartialData: Partial<ContentData>) => {
    const updated = { ...data, ...newPartialData };
    setData(updated);
    setIsSaving(true);

    // Optimistic local cache
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));

    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: updated, updated_at: new Date().toISOString() });

      if (error) {
        console.error('Supabase save error:', error.message);
      } else {
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error('Supabase save failed (stored locally):', err);
    } finally {
      setIsSaving(false);
    }
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
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// ── Deep merge helper (keeps new default keys, overrides with saved values) ──
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
