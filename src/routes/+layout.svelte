<script lang="ts">
	// import { session } from '$app/stores';
	import {supabaseClient} from '$lib/supabase-client';
	import {SupaAuthHelper} from '@supabase/auth-helpers-svelte';
	import {page} from "$app/stores";
	import {session} from "../lib/stores"

	$: $session = $page.data.session;
</script>


<SupaAuthHelper {session} {supabaseClient}>
	<head>
		<title>ALBM</title>
	</head>
	<slot/>
</SupaAuthHelper>

<style global lang="scss">
  @use '../app.scss';
</style>
