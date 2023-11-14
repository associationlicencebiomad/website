-- add rls for godparents
create policy "godparents publicly visible" on "public"."godparents" for all using (true) with check (true);
create policy "user can edit godparents" on "public"."godparents" for update using (auth.uid() = "user_id");
alter table "public"."godparents" enable row level security;

-- add rls for memberships
create policy "memberships is restricted to user" on "public"."memberships" for all using (auth.uid() = "user_id");
alter table "public"."memberships" enable row level security;

-- add rls for migrations
create policy "migrations is private" on "public"."migrations" for all using (false);

-- add rls for professors
create policy "professors is visible to authenticated users" on "public"."professors" for all using (auth.uid() is not null);
create policy "professors isn't editable" on "public"."professors" for update using (false);
alter table "public"."professors" enable row level security;

-- add rls for professors_ranking
create policy "professors_ranking is visible to authenticated users" on "public"."professors_ranking" for all using (auth.uid() is not null);
create policy "professors_ranking is modifiable by owner" on "public"."professors_ranking" for update using (auth.uid() = "user_id");
alter table "public"."professors_ranking" enable row level security;

-- add rls for promos
drop policy if exists "Promos are viewable by everyone." on "public"."promos";
create policy "promos is readable by everyone" on "public"."promos" for all using (true);
create policy "promos isn't editable" on "public"."promos" for update using (false);
alter table "public"."promos" enable row level security;


