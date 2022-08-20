import {supabaseClient} from '$lib/supabase-client';
import type {PageLoad} from './$types';
import type {Profile} from '../../../../types/database/Profile.type';

export const load: PageLoad = async ({params}) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {data, error: supabaseErr} = await supabaseClient
		.from('profiles')
		.select(
			`
				*,
				promos!inner(*)
				`
		)
		.eq('promos.year', params.year)
		.ilike('first_name', params.first_name)
		.ilike('last_name', params.last_name);

	if (supabaseErr) {
		console.error(supabaseErr);
		return {errors: [supabaseErr.message]};
	}

	if (supabaseErr || !data) {
		return {error: supabaseErr};
	}

	return {
		currentProfile: data[0] as Profile
	};
};
