import {supabaseClient} from '$lib/supabase-client';
import type {PageLoad} from './$types';
import type {Ranking} from "src/types/database/Ranking.type";

export const load: PageLoad = async () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const {data, error: supabaseErr} = await supabaseClient.rpc<Ranking>('get_professors_ranking')

	if (supabaseErr) {
		console.error(supabaseErr);
		return {errors: [supabaseErr.message]};
	}

	if (supabaseErr || !data) {
		return {error: supabaseErr};
	}


	return {
		ranking: [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data]
	};
};
