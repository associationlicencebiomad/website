import {supabaseServerClient} from '@supabase/auth-helpers-sveltekit';
import type {Profile} from '../types/database/Profile.type';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function handleProfile({event, resolve}) {
	const {user, accessToken} = event.locals;

	if (user) {
		const {data} = await supabaseServerClient(accessToken)
			.from<Profile>('profiles')
			.select(`
				*, 
				promos(*),
				godparents!godparents_user_id_fkey(
				    profile:profiles!godparents_godparent_id_fkey(id, first_name, last_name, avatar),
					is_adopted
				)
			`)
			.eq('id', user.id)
			.single();

		event.locals.user.profile = data;
	}

	return await resolve(event);
}
