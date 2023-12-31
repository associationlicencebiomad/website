import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import type {PageLoad} from './$types';
import type {Profile} from "src/types/user.types";
import {error} from "@sveltejs/kit";

export const load = (async (event) => {
	const {supabaseClient} = await getSupabase(event)

	const {data, error: supabaseErr} = await supabaseClient
		.from('profiles')
		.select(`
				*,
				promos!inner(*),
				godparents!godparents_user_id_fkey(
				    profile:profiles!godparents_godparent_id_fkey(first_name, last_name, avatar),
					is_adopted
				)
		`)
		.eq('promos.year', event.params.year)
		.ilike('first_name', event.params.first_name)
		.ilike('last_name', event.params.last_name)
		.single();

	if (supabaseErr) {
		error(503, {message: supabaseErr.message});
	}

	if (!data) {
		error(404, {message: 'Profile not found'});
	}

	return {
		currentProfile: data as NonNullable<Profile>
	};
}) satisfies PageLoad;

