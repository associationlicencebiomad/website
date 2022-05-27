-- 1. Create table
create table public.profils (
  id uuid references auth.users(id) on delete cascade unique not null primary key,
  first_name text not null,
  last_name text not null,
  birthday date not null,
  about text,

  best_memory text,
  strong_points text,
  better_promo text,
  
  avatar text,
  links json default '{"website": "", "twitter": "", "github": "", "facebook": "", "instagram": "", "linkedin": ""}',
  -- godparent uuid[],
  promo_id int references public.promos(id) on delete cascade not null,
  timeline json default '[{"type": "education", "name": "LBM", "date": "", "place": "Station biologique de Roscoff", "description": ""}]',

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.profils
  enable row level security;

-- 3. Create Policy
create policy "Public profils are viewable by everyone."
  on profils for select using (
    true
  );

create policy "Users can update their own profils."
  on profils for update using (
    auth.uid() = id
  );
