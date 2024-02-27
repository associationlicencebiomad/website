import type {Professor} from "src/types/ranking.types";
import type {PageLoad} from './$types';
import {error} from "@sveltejs/kit";

export const load = (async ({parent}) => {
	const {supabase, session} = await parent()

	if (!session) {
		error(503, 'Something went wrong. Please try again later.');
	}

	const {data: user_ranking} = await supabase.rpc('get_professors_ranking', {
		param_user_id: session?.user?.id
	})

	const {data: available_professor} = await supabase
		.from('professors')
		.select('*')
		.not('id', 'in', `(${user_ranking?.map((professor: Professor) => professor.id).join(',')})`)
		.order('full_name', {ascending: true})

	return {user_ranking, available_professor}
}) satisfies PageLoad;
