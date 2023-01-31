import {createClient} from '@supabase/auth-helpers-sveltekit';
import {env} from '$env/dynamic/public';

export const supabaseClient = createClient(
	env.PUBLIC_SUPABASE_URL as string,
	env.PUBLIC_SUPABASE_ANON_KEY as string
);