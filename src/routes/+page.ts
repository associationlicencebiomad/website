import {supabaseClient} from '$lib/supabase-client';
import type {PageLoad} from './$types'
import type {Buro} from 'src/types/database/Profile.type';

export const load: PageLoad = async () => {
	const {data, error: supabaseErr} = await supabaseClient.from<Buro>('buro')
		.select(`
				*,
				profiles (first_name, last_name, avatar)
			`)
		.eq('display', true);

	if (supabaseErr || !data) {
		return {error: supabaseErr};
	}

	return {
		buro: data
	};
};
