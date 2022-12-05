import {handleAuth} from '@supabase/auth-helpers-sveltekit';
import type {Handle} from '@sveltejs/kit';
import {sequence} from '@sveltejs/kit/hooks';
import {handleProfile} from './lib/handleProfile';
import './lib/supabase-client';

export const handle: Handle = sequence(...handleAuth(), handleProfile);

// export const getSession: GetSession = async (event) => {
// 	const { user, accessToken } = event.locals;
//
// 	return {
// 		user,
// 		accessToken
// 	};
// };
