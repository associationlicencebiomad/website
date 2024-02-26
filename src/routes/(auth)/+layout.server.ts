import type {LayoutServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({url, locals}) => {
	const session = await locals.getSession();

	if (session && (url.pathname === '/login' || url.pathname === '/register')) {
		redirect(303, '/');
	}
}
