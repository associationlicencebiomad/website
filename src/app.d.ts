// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {LoggedInUser} from "./types/user.types";

declare global {
	namespace App {

		// interface Error {}
		interface Locals {
			supabase: import('@supabase/supabase-js').SupabaseClient<import('types/database.types').Database>;
			loggedInUser: LoggedInUser | null;
			getSession: () => Promise<import('@supabase/supabase-js').Session | null>;
			getUser: () => Promise<LoggedInUser | null>;
		}

		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
			user?: LoggedInUser | null;
		}

		// interface Platform {}
	}
}

export {};
