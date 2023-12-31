import type {PageLoad} from './$types';
import {getSupabase} from "@supabase/auth-helpers-sveltekit";

export const load = (async (event) => {
	const {supabaseClient} = await getSupabase(event);

	const {data: profiles} = await supabaseClient
		.from('profiles')
		.select(`id, first_name, last_name, avatar, timeline, promos(name, year)`)
		.order('promo_id', {ascending: true})
		.order('last_name', {ascending: true})
		.order('first_name', {ascending: true})
		.range(0, 13)

	return {
		profiles,
		hasMore: profiles?.length === 14
	}
}) satisfies PageLoad;