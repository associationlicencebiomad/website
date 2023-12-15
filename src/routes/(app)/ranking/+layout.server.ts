import type {LayoutServerLoad} from './$types'
import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import {error} from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
	const {session} = await getSupabase(event)
	if (!session) {
		error(404, 'Not found');
	}
}
