<script lang="ts">
	import { user, userProfile } from '$lib/store';
	import { supabase } from '$lib/supabase-client';
	import type { User } from '@supabase/supabase-js';
	import type { Profile } from 'src/types/database/Profile.type';
	
	
	const updateUserProfile = async (user: User | null) => {
		if (user) {
			let { data } = await supabase
				.from<Profile>('profiles')
				.select('*')
				.match({ id: user.id })
				.single();

			$userProfile = data;
		} else {
			$userProfile = null;
		}
	};

	$user = supabase.auth.user();
	updateUserProfile($user)

	supabase.auth.onAuthStateChange((event) => {
		if (event === "PASSWORD_RECOVERY") {
			$user = null;
		} else {
			$user = supabase.auth.user();
			updateUserProfile($user)
		}
	});
</script>

<!-- {@debug $userProfile} -->

<slot />

<style global lang="scss">
	@use '../app.scss';
</style>
