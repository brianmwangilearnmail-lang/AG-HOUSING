-- ============================================================
-- AG Housing CMS — Storage Bucket Setup
-- Run this ONCE in Supabase Dashboard > SQL Editor
-- ============================================================

-- Create a public bucket for images
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Allow public read access to images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Allow authenticated users to upload images
-- (Or anon if you don't have auth configured yet, but auth is highly recommended)
create policy "Admin Upload Access"
  on storage.objects for insert
  with check ( bucket_id = 'images' );

-- Allow admin to delete/update images
create policy "Admin Delete Access"
  on storage.objects for delete
  using ( bucket_id = 'images' );

create policy "Admin Update Access"
  on storage.objects for update
  using ( bucket_id = 'images' );
