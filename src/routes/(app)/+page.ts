import type {PageLoad} from './$types';
import {getSupabase} from "@supabase/auth-helpers-sveltekit";

export const load = (async (event) => {
	const {supabaseClient} = await getSupabase(event)

	const {data: buro} = await supabaseClient
		.from('buro')
		.select('*, profiles(first_name, last_name, avatar)')
		.eq('display', true);

	return {buro}

}) satisfies PageLoad;