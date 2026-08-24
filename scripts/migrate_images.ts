import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Use Service Role Key if you have one for faster/bypass RLS, otherwise Anon is fine if RLS allows

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadBase64(base64: string): Promise<string> {
  if (!base64.startsWith('data:image')) return base64;

  try {
    const mimeType = base64.match(/data:([^;]+);/)?.[1] || 'image/webp';
    const ext = mimeType.split('/')[1] || 'webp';
    const base64Data = base64.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `migrated/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`public/${filename}`, buffer, {
        contentType: mimeType,
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(`public/${filename}`);

    return publicUrl;
  } catch (err) {
    console.error('Failed to upload image:', err);
    return base64;
  }
}

async function walkAndMigrate(obj: any): Promise<any> {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => walkAndMigrate(item)));
  }

  const newObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.startsWith('data:image')) {
      console.log(`Migrating image in key: ${key}...`);
      newObj[key] = await uploadBase64(value);
    } else if (typeof value === 'object') {
      newObj[key] = await walkAndMigrate(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

async function startMigration() {
  console.log('Starting data migration from Base64 to Supabase Storage...');

  // 1. Fetch current content
  const { data: rows, error: fetchError } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', 1)
    .single();

  if (fetchError || !rows) {
    console.error('Error fetching content:', fetchError);
    return;
  }

  const content = rows.content;

  // 2. Recursively find and upload images
  const migratedContent = await walkAndMigrate(content);

  // 3. Save back to Supabase
  const { error: saveError } = await supabase
    .from('site_content')
    .update({ content: migratedContent })
    .eq('id', 1);

  if (saveError) {
    console.error('Error saving migrated content:', saveError);
  } else {
    console.log('Migration successful! Your database is now lightweight and fast.');
  }
}

startMigration();
