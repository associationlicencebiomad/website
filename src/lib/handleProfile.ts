import {getSupabase} from '@supabase/auth-helpers-sveltekit'
import type {Handle} from '@sveltejs/kit'

export const handleProfile: Handle = async ({event, resolve}) => {
	const {session, supabaseClient} = await getSupabase(event)

	if (session) {
		const {user} = session
		if (user) {
			const {data: profile} = await supabaseClient
				.from('profiles')
				.select(`
					*,
					promos(*),
					godparents!godparents_user_id_fkey(
						profile:profiles!godparents_godparent_id_fkey(id, first_name, last_name, avatar),
						is_adopted
					)
				`)
				.eq('id', user?.id)
				.single()

			event.locals.loggedInUser = profile
		}
	}

	return resolve(event);
}