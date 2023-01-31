<script>
	import {supabaseClient} from '$lib/db';
	import {invalidate} from '$app/navigation';
	import {onMount} from 'svelte';

	import '../app.scss';

	onMount(() => {
		const {
			data: {subscription}
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>ALBM</title>
</svelte:head>

<slot/>

<!--<style global lang="scss">-->
<!--  @use '../app.scss';-->
<!--</style>-->