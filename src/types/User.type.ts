import type {Profile} from "./database/Profile.type";

export type UserSession = import('@supabase/supabase-js').User & {
	profile: Profile;
};