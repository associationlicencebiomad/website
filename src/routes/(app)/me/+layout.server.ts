import type {LayoutServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({url, locals}) => {
	const session = await locals.getSession();

	if (!session) {
		redirect(303, url.origin);
	}
}
