import type {PageLoad} from './$types';
import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import {error} from "@sveltejs/kit";
import type {Profile} from "src/types/user.types";

export const load = (async (event) => {
	const {supabaseClient} = await getSupabase(event);

	const {data: profiles} = await supabaseClient
		.from('profiles')
		.select(`id, first_name, last_name, avatar, timeline, promos(name, year)`)
		.order('promo_id', {ascending: true})
		.order('last_name', {ascending: true})
		.order('first_name', {ascending: true})

    if (!profiles) {
        error(503, 'Service Unavailable')
    }

	return {
		profiles: profiles as Profile[],
	}
}) satisfies PageLoad;