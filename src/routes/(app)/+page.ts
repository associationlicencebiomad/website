import type {PageLoad} from './$types';

export const load = (async ({parent}) => {
	const { supabase, session } = await parent()

	const {data: buro} = await supabase
		.from('buro')
		.select('*, profiles(first_name, last_name, avatar)')
		.eq('display', true);

	return {buro}

}) satisfies PageLoad;