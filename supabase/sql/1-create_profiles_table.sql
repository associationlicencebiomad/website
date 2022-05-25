-- 1. Create table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade unique not null primary key,
  first_name text not null,
  last_name text not null,
  birthday date not null,
  avatar text,
  links json,
  -- godparent uuid[],
  promo_id int references public.promos(id) on delete cascade not null,
  timeline json,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.profiles
  enable row level security;

-- 3. Create Policy
create policy "Public profiles are viewable by everyone."
  on profiles for select using (
    true
  );

create policy "Users can update their own profiles."
  on profiles for update using (
    auth.uid() = id
  );
