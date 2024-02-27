import type {PageLoad} from './$types';
import type {Profile} from "src/types/user.types";
import {error} from "@sveltejs/kit";

export const load = (async ({parent, params}) => {
	const {supabase} = await parent();

	const {data, error: supabaseErr} = await supabase
		.from('profiles')
		.select(`
				*,
				promos!inner(*),
				godparents!godparents_user_id_fkey(
				    profile:profiles!godparents_godparent_id_fkey(first_name, last_name, avatar),
					is_adopted
				)
		`)
		.eq('promos.year', params.year)
		.ilike('first_name', params.first_name)
		.ilike('last_name', params.last_name)
		.single();

	if (supabaseErr) {
		error(503, {message: supabaseErr.message});
	}

	if (!data) {
		error(404, {message: 'Profile not found'});
	}

	return {
		currentProfile: data as unknown as NonNullable<Profile>
	};
}) satisfies PageLoad;

