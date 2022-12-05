import type {LayoutServerLoad} from './$types'
import {error} from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({parent}) => {
	const data = await parent()
	if (!data.session.user) { // guard route against unauthenticated users
		throw error(404, 'Not found');
	}
}
