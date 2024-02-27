import type {LayoutServerLoad} from './$types'
import {error} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({locals}) => {
	const session = await locals.getSession();

	if (!session) {
		error(404, 'Not found');
	}
}
