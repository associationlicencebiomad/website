import type {PageLoad} from './$types';
import type {Profile as ProfileType} from '../../types/database/Profile.type';
import {supabaseClient} from '$lib/supabase-client';

export const load: PageLoad = async () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {data: profiles} = await supabaseClient
		.from<ProfileType>('profiles')
		.select(
			`
				id,
				first_name,
				last_name,
				avatar,
				timeline,
				promos (name, year)
			`
		)
		.order('promo_id', {ascending: true})
		.range(0, 29);

	return {
		profiles,
		hasMore: profiles?.length === 30
	};
};
