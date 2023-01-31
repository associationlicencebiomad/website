import {createClient} from '@supabase/auth-helpers-sveltekit';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from '$env/static/public';

export const supabaseClient = createClient(
	PUBLIC_SUPABASE_URL as string,
	PUBLIC_SUPABASE_ANON_KEY as string
);