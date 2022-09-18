exports.up = async client => {
	await client`
        DROP TRIGGER on_auth_user_created on auth.users;
    `;

	// drop function
	await client`
        DROP FUNCTION handle_new_user();
    `;

	await client`
        create function public.handle_new_user()
        returns trigger as $$
        declare
            promo_id_exists INTEGER;
        begin
            SELECT id INTO promo_id_exists FROM public.promo_key WHERE public.promo_key.key = new.raw_user_meta_data->>'key';
        IF NOT FOUND THEN
            -- we can't found the promo, so key isn't valid so we reject user creation...
        raise exception 'Invalid key';
        ELSE
                insert into public.profiles (id, first_name, last_name, birthday, promo_id)
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

exports.down = async client => {
	await client`
        DROP TRIGGER on_auth_user_created on auth.users;
    `;

	// drop function
	await client`
        DROP FUNCTION handle_new_user();
    `;

	await client`
        create function public.handle_new_user()
        returns trigger as $$
        declare
            promo_id_exists INTEGER;
        begin
            SELECT id INTO promo_id_exists FROM public.promo_key WHERE public.promo_key.key = new.raw_user_meta_data->>'key';
        IF NOT FOUND THEN
            -- we can't found the promo, so key isn't valid so we reject user creation...
        raise exception 'Invalid key';
        ELSE
                insert into public.profils (id, first_name, last_name, birthday, promo_id)
                values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', (new.raw_user_meta_data->>'birthday')::date, promo_id_exists);
        RETURN NEW;
        END IF;
        end;
        $$ language plpgsql security definer;
    `;
};
