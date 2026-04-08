-- ============================================================
-- AG Housing CMS — Site Content Table
-- Run this ONCE in Supabase Dashboard > SQL Editor
-- ============================================================

-- Create the table
create table if not exists public.site_content (
  id          integer primary key default 1,        -- single row CMS
  content     jsonb   not null,                     -- all site data as JSON
  updated_at  timestamptz default now()
);

-- Only one row ever (id = 1)
alter table public.site_content
  add constraint site_content_single_row check (id = 1);

-- Enable Row Level Security
alter table public.site_content enable row level security;

-- Allow anyone to READ the content (public website)
create policy "Public can read site content"
  on public.site_content for select
  using (true);

-- Allow anyone to UPDATE (admin dashboard uses anon key for now)
-- In production, replace this with a proper admin role check
create policy "Admin can update site content"
  on public.site_content for update
  using (true)
  with check (true);

-- Allow insert (for initial seed)
create policy "Admin can insert site content"
  on public.site_content for insert
  with check (true);

-- Insert empty placeholder row so upsert always works
insert into public.site_content (id, content)
values (1, '{}'::jsonb)
on conflict (id) do nothing;
