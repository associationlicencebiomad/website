<!-- src/routes/+page.svelte -->
<script>
	import Button from "$lib/primitives/Button/Button.svelte";
	import {supabaseClient} from "$lib/db";
	import {invalidate} from "$app/navigation";

	export let data

	async function login() {
		await supabaseClient.auth.signInWithPassword({
			email: "",
			password: ""
		});
		await invalidate('auth:session_info')
	}

	async function logout() {
		await supabaseClient.auth.signOut()
		await invalidate('auth:session_info')
	}
</script>

{#if !data.session}
	<h1>I am not logged in</h1>
	<Button color="accent-1" on:click={login}>
		Login
	</Button>
{:else}
	<h1>Welcome {data?.user?.first_name}</h1>
	<p>I am logged in!</p>

	<Button color="accent-1" on:click={logout}>
		logout
	</Button>
{/if}