import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import type {PageLoad} from './$types';
import type {Profile} from "src/types/user.types";

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
		console.error(supabaseErr);
		return {errors: [supabaseErr.message]};
	}

	if (supabaseErr || !data) {
		return {error: supabaseErr};
	}

	return {
		currentProfile: data as Profile
	};
}) satisfies PageLoad;

