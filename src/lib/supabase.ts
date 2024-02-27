import {createSupabaseServerClient} from "@supabase/auth-helpers-sveltekit";
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
import type {Handle} from "@sveltejs/kit";

export const handleSupabase: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event
    });

    event.locals.getSession = async () => {
        const {
            data: { session }
        } = await event.locals.supabase.auth.getSession();
        return session;
    };

    event.locals.getUser = async () => {
        const session = await event.locals.getSession();
        if (session) {
            const { user } = session;
            if (user) {
                const { data: profile } = await event.locals.supabase
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
                    .single();
                return profile;
            }
        }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        }
    });
};