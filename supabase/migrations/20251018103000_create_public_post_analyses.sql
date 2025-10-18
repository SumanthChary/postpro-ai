create table if not exists public.public_post_analyses (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    created_at timestamptz not null default now(),
    post_url text,
    platform text,
    post_text text,
    author_name text,
    author_handle text,
    author_avatar_url text,
    author_followers integer,
    posted_at timestamptz,
    metrics jsonb not null default '{}'::jsonb,
    virality_score integer not null,
    why_it_worked jsonb not null,
    replicate_tips jsonb not null,
    source text default 'ai',
    email text
);

alter table public.public_post_analyses enable row level security;

create policy "Public analyses are readable" on public.public_post_analyses
for select using (true);

create index if not exists public_post_analyses_slug_idx on public.public_post_analyses (slug);
create index if not exists public_post_analyses_created_at_idx on public.public_post_analyses (created_at desc);
