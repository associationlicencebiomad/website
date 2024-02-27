import {dev} from '$app/environment';
import {inject} from '@vercel/analytics';
import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from '$env/static/public';
import {createSupabaseLoadClient} from '@supabase/auth-helpers-sveltekit';
import type {LayoutLoad} from './$types';
import type {Database} from "src/types/database.types";

inject({mode: dev ? 'development' : 'production'});

export const load: LayoutLoad = async ({fetch, data, depends}) => {
    depends('supabase:auth');

    const supabase = createSupabaseLoadClient<Database>({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: {fetch},
        serverSession: data.session
    });

    const {
        data: {session}
    } = await supabase.auth.getSession();

    const getUser = async () => {
        if (session) {
            const { user } = session;
            if (user) {
                const { data: profile } = await supabase
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

    const user = await getUser();

    return {supabase, session, user };
};