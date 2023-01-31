<script lang="ts">
	import {goto} from '$app/navigation';
	import type {ToastTypes} from "$lib/primitives/Toast/Toast.types";
	import {supabaseClient} from "$lib/db";
	import Toast from "$lib/primitives/Toast/Toast.svelte";
	import Input from "$lib/primitives/Input/Input.svelte";
	import Button from "$lib/primitives/Button/Button.svelte";
	import {ArrowSmallLeft, Check} from "@steeze-ui/heroicons";
	import {Icon} from "@steeze-ui/svelte-icon";

	let loading = false;
	let toasts: Array<ToastTypes> = [];
	let password = '';
	let passwordConfirm = '';

	const resetPassword = async () => {
		loading = true;
		if (password !== passwordConfirm) {
			toasts = [
				...toasts,
				{
					color: 'error',
					message: 'Les mots de passe ne correspondent pas.'
				}
			];
			return;
		}

		let {error} = await supabaseClient.auth.updateUser({
			password
		});

		loading = false;

		if (error) {
			toasts = [
				...toasts,
				{
					color: 'error',
					message: error.message
				}
			];
		} else {
			await supabaseClient.auth.signOut();
			await goto('/login?reset');
		}
	};
</script>

<h1 class="title">Réinitialiser votre mot de passe</h1>

{#each toasts as toast}
	<Toast color={toast.color}>
		{toast.message}
	</Toast>
{/each}

<form on:submit|preventDefault={resetPassword}>
	<Input bind:value={password} id="password" required type="password">Mot de passe</Input>
	<Input bind:value={passwordConfirm} id="confirm" required type="password">
		Mot de passe (×2)
	</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false}>
			<Icon slot="icon" src={Check}/>
			{loading ? 'Chargement' : 'Réinitialiser'}
		</Button>
		<Button color="accent-3" on:click={() => history.back()}>
			<Icon slot="icon" src={ArrowSmallLeft}/>
			Retour
		</Button>
	</div>
</form>

<style lang="scss">
  form {
    padding-top: 12px;
  }

  .flex-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    grid-gap: 10px;
    @media screen and (max-width: 400px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
