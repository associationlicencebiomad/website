<script lang="ts">
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/supabase-client';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
</script>

<SupaAuthHelper {supabaseClient} {session}>
	<head>
		<title>ALBM</title>
	</head>
	<slot />
</SupaAuthHelper>

<style global lang="scss">
	@use '../app.scss';
</style>
