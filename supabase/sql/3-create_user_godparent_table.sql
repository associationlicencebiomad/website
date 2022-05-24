-- 1. Create table
create table user_godparent (
  user_id uuid not null references auth.users(id) on delete cascade,
  godparent_id uuid not null references auth.users(id) on delete cascade
);

-- 2. Enable RLS
alter table public.user_godparent
  enable row level security;

-- 3. Create Policy
create policy "Godparent are viewable by everyone."
  on user_godparent for select using (
    true
  );

create policy "Users can update their own godparents."
  on user_godparent for update using (
    auth.uid() = user_id
  );
