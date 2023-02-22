import type {LayoutServerLoad} from './$types'
import {redirect} from "@sveltejs/kit";
import {getSupabase} from "@supabase/auth-helpers-sveltekit";

export const load: LayoutServerLoad = async (event) => {
	const {session} = await getSupabase(event)
	if (session) {
		throw redirect(303, '/')
	}
}
