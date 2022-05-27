<script lang="ts" context="module">
	import { user, profil } from '$lib/store';
	import { supabase } from '$lib/supabase-client';
	import type { User } from '@supabase/supabase-js';
	import type { Load } from '@sveltejs/kit';
	import type { profil } from 'src/types/database/profil.type';
	import { get } from 'svelte/store';

	export const load: Load = async () => {
		const updateUserprofil = async (user: User | null) => {
			if (user) {
				let { data } = await supabase
					.from<profil>('profils')
					.select('*, promos(*)')
					.match({ id: user.id })
					.single();

				profil.set(data);
			} else {
				profil.set(null);
			}
		};

		user.set(supabase.auth.user());
		await updateUserprofil(get(user));

		supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'PASSWORD_RECOVERY') {
				user.set(null);
			} else {
				user.set(supabase.auth.user());
				await updateUserprofil(get(user));
			}
		});
		return {};
	};
</script>

<!-- {@debug $userprofil} -->

<slot />

<style global lang="scss">
	@use '../app.scss';
</style>
