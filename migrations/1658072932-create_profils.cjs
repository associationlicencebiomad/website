exports.up = async (client) => {
	// 1. Create table
	await client`
        create table public.profils
        (
            id            uuid references auth.users (id) on delete cascade unique      not null primary key,
            first_name    text                                                          not null,
            last_name     text                                                          not null,
            birthday      date                                                          not null,
            about         text,

            best_memory   text,
            strong_points text,
            better_promo  text,

            avatar        text,
            links         json                     default
                                                       '{
                                                           "website": "",
                                                           "twitter": "",
                                                           "github": "",
                                                           "facebook": "",
                                                           "instagram": "",
                                                           "linkedin": ""
                                                       }',
            -- godparent uuid[],
            promo_id      int references public.promos (id) on delete cascade           not null,
            timeline      json                     default
                                                       '[
                                                           {
                                                               "type": "education",
                                                               "name": "LBM",
                                                               "date": "",
                                                               "place": "Station biologique de Roscoff",
                                                               "description": ""
                                                           }
                                                       ]',

            created_at    timestamp with time zone default timezone('utc'::text, now()) not null,
            updated_at    timestamp with time zone default timezone('utc'::text, now()) not null
        );
	`;

	// 2. Enable RLS
	await client`
        alter table public.profils
            enable row level security;
	`;

	// 3. Create Policy
	await client`
        create policy "Public profils are viewable by everyone."
        on profils for select using (
            true
        );
    `;

	await client`
        create policy "Users can update their own profils."
        on profils for update using (
            auth.uid() = id
        );
    `;

	// 4. create triggers
	// -- inserts a row into public.users
	await client`
        create function public.handle_new_user()
        returns trigger as $$
        declare
            promo_id_exists INTEGER;
        begin
            SELECT id INTO promo_id_exists FROM public.promo_key WHERE public.promo_key.key = new.raw_user_meta_data->>'key';
        IF NOT FOUND THEN
            -- we can't found the promo, so key isn't valid so we reject user creation...
        raise exception'Invalid key';
        ELSE
                insert into public.profils (id, first_name, last_name, birthday, promo_id)
                values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', (new.raw_user_meta_data->>'birthday')::date, promo_id_exists);
        RETURN NEW;
        END IF;
        end;
        $$ language plpgsql security definer;
    `;

	// trigger the function every time a user is created
	await client`
        create trigger on_auth_user_created
          after insert on auth.users
          for each row execute procedure public.handle_new_user();
    `;
};

exports.down = async (client) => {
	// drop trigger
	await client`
        DROP TRIGGER on_auth_user_created on auth.users;
    `;

	// drop function
	await client`
        DROP FUNCTION handle_new_user();
    `;

	// Disable RLS
	await client`
        alter table public.profils
            disable row level security;
	`;

	// Remove Policy
	await client`
		drop policy "Public profils are viewable by everyone."
		on profils;
	`;
	await client`
		drop policy "Users can update their own profils."
		on profils;
	`;

	// drop table
	await client`
        drop table public.profils;
	`;
};
