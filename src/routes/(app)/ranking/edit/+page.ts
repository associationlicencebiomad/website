import {supabaseClient} from '$lib/supabase-client';
import type {PageLoad} from './$types';
import type {Professor, Ranking} from "src/types/database/Ranking.type";

export const load: PageLoad = async ({parent}) => {
	const {session} = await parent()
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {data: user_ranking, error: supabaseErr} = await supabaseClient.rpc<Ranking>('get_professors_ranking', {
		param_user_id: session?.user?.id
	})

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {data: available_professor, error: supabaseErr2} = await supabaseClient
		.from<Professor>('professors')
		.select('*')
		.not('id', 'in', `(${user_ranking?.map((professor: Professor) => professor.id).join(',')})`)


	return {
		user_ranking,
		available_professor
	};
};
