import type {PageLoad} from './$types';
import {getSupabase} from "@supabase/auth-helpers-sveltekit";

export const load = (async (event) => {
	const {supabaseClient} = await getSupabase(event)

	const {data: ranking} = await supabaseClient.rpc('get_professors_ranking')

	return {ranking}
}) satisfies PageLoad;