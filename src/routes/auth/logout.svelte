<script lang="ts">
import { goto } from '$app/navigation';

	import { user } from '$lib/store';
	import { supabase } from '$lib/supabase-client';
	import { onMount } from 'svelte';

	const logout = async () => {
		if ($user) {
			await supabase.auth.signOut();
		}
		goto('/')
	};

	onMount(async () => {
		await logout()
	});
</script>

<h1>
	Déconnexion en cours...
</h1>
