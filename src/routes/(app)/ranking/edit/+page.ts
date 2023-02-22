import type {Professor} from "src/types/ranking.types";
import type {PageLoad} from './$types';
import {getSupabase} from "@supabase/auth-helpers-sveltekit";

export const load = (async (event) => {
	const {supabaseClient, session} = await getSupabase(event)

	const {data: user_ranking} = await supabaseClient.rpc('get_professors_ranking', {
		param_user_id: session?.user?.id
	})

	const {data: available_professor} = await supabaseClient
		.from('professors')
		.select('*')
		.not('id', 'in', `(${user_ranking?.map((professor: Professor) => professor.id).join(',')})`)
		.order('full_name', {ascending: true})

	return {user_ranking, available_professor}
}) satisfies PageLoad;
