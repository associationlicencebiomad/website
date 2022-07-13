import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Profil } from '../types/database/Profil.type';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function handleProfile({ event, resolve }) {
	const { user, accessToken } = event.locals;
	if (user) {
		const { data } = await supabaseServerClient(accessToken)
			.from<Profil>('profils')
			.select('*, promos(*)')
			.eq('id', user.id)
			.single();

		event.locals.user.profil = data;
	}

	return await resolve(event);
}
