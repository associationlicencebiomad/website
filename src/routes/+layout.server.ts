import type {LayoutServerLoad} from './$types';
import {getServerSession} from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	event.depends('supabase:auth')
	const {loggedInUser} = event.locals
	return {
		session: await getServerSession(event),
		user: loggedInUser
	};
};