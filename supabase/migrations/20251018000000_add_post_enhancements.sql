create extension if not exists pgcrypto with schema public;

create table if not exists post_enhancements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  original_post text not null,
  enhanced_platforms jsonb not null default '{}'::jsonb,
  category text not null,
  style_tone text not null,
  virality_score numeric,
  insights jsonb not null default '[]'::jsonb,
  view_reasons jsonb not null default '[]'::jsonb,
  quick_wins jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  engagement_metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table post_enhancements enable row level security;

create index if not exists post_enhancements_user_created_idx on post_enhancements(user_id, created_at desc);

create policy "Users can insert their enhancements" on post_enhancements
  for insert with check (auth.uid() = user_id);

create policy "Users can view their enhancements" on post_enhancements
  for select using (auth.uid() = user_id);
