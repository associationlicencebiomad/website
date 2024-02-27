import type {PageLoad} from './$types';

export const load = (async ({parent}) => {
	const {supabase} = await parent();

	const {data: ranking} = await supabase.rpc('get_professors_ranking')

	return {ranking}
}) satisfies PageLoad;