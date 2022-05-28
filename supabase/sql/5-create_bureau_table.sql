-- 1. Create table
create table public.buro (
  id uuid references public.profils(id) on delete cascade unique not null primary key,
  role text not null,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.buro
  enable row level security;

-- 3. Create Policy
create policy "buro members are viewable by everyone."
  on buro for select using (
    true
  );

create policy "Users can update their own buro."
  on buro for update using (
    auth.uid() = id
  );
