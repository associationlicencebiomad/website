import type {LayoutServerLoad} from './$types'
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({parent}) => {
	const data = await parent()
	if (data.session.user) {
		throw redirect(300, '/');
	}
}
