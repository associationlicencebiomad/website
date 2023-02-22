// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {LoggedInUser} from "./types/user.types";

declare global {
	namespace App {
		interface Supabase {
			Database: import('types/database.types').Database
			SchemaName: 'public'
		}

		// interface Error {}
		interface Locals {
			loggedInUser: LoggedInUser | null;
		}

		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
			user?: LoggedInUser | null;
		}

		// interface Platform {}
	}
}

export {};
