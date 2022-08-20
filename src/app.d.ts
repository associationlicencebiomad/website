/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface UserSession {
		user: import('@supabase/supabase-js').User & {
			profil: import('src/types/database/Profile.type').Profile;
		};
		accessToken?: string;
	}

	interface Locals extends UserSession {
		error: import('@supabase/supabase-js').ApiError;
	}

	// interface Platform {}
	// interface Stuff {}
}

declare module 'svelte-autosize' {
	const autosize: never;
	export default autosize;
}
