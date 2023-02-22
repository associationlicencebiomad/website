<script lang="ts">
	import {page} from '$app/stores';
	import type {ToastTypes} from "$lib/primitives/Toast/Toast.types";
	import {supabaseClient} from "$lib/db";
	import Toast from "$lib/primitives/Toast/Toast.svelte";
	import Input from "$lib/primitives/Input/Input.svelte";
	import Button from "$lib/primitives/Button/Button.svelte";
	import {Icon} from "@steeze-ui/svelte-icon";
	import {ArrowSmallLeft, Check} from "@steeze-ui/heroicons";

	let loading = false;
	let toasts: Array<ToastTypes> = [];
	let email = '';

	const requestReset = async () => {
		loading = true;
		const {error} = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo: `${$page.url.origin}/resetpassword`
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
			toasts = [
				...toasts,
				{
					color: 'success',
					message:
						'Un email vous a été envoyé avec les instructions pour réinitialiser votre mot de passe.'
				}
			];
		}
	};
</script>

<h1 class="title">Vous avez oublié votre mot de passe ?</h1>

{#each toasts as toast}
	<Toast color={toast.color}>
		{toast.message}
	</Toast>
{/each}

<form on:submit|preventDefault={requestReset}>
	<Input bind:value={email} id="email" required type="email">Email</Input>
	<div class="flex-container">
		<Button color="accent-3" disabled={loading} hover={false}>
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
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
    }
  }
</style>
