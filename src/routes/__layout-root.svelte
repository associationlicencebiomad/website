<script lang="ts" context="module">
	import { user, profile } from '$lib/store';
	import { supabase } from '$lib/supabase-client';
	import type { User } from '@supabase/supabase-js';
	import type { Load } from '@sveltejs/kit';
	import type { Profile } from 'src/types/database/Profile.type';
	import { get } from 'svelte/store';

	export const load: Load = async () => {
		const updateUserProfile = async (user: User | null) => {
			if (user) {
				let { data } = await supabase
					.from<Profile>('profiles')
					.select('*, promos(*)')
					.match({ id: user.id })
					.single();

				profile.set(data);
			} else {
				profile.set(null);
			}
		};

		user.set(supabase.auth.user());
		await updateUserProfile(get(user));

		supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'PASSWORD_RECOVERY') {
				user.set(null);
			} else {
				user.set(supabase.auth.user());
				await updateUserProfile(get(user));
			}
		});
		return {};
	};
</script>

<!-- {@debug $userProfile} -->

<slot />

<style global lang="scss">
	@use '../app.scss';
</style>
