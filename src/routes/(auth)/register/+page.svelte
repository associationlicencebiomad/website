<script lang="ts">
	import {page} from '$app/stores';
	import {goto} from '$app/navigation';
	import {Icon} from "@steeze-ui/svelte-icon";
	import {ArrowSmallLeft, Check} from "@steeze-ui/heroicons";
	import type {ToastTypes} from "$lib/primitives/Toast/Toast.types.js";
	import Input from "$lib/primitives/Input/Input.svelte";
	import Toast from "$lib/primitives/Toast/Toast.svelte";
	import Button from "$lib/primitives/Button/Button.svelte";

	let loading = false;
	let toasts: Array<ToastTypes> = [];
	let first_name = '';
	let last_name = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let birthday = '';
	let key = '';

	const register = async () => {
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

		loading = true;
		let {error} = await $page.data.supabase.auth.signUp({
			email, password, options: {
				data:
					{
						first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase(),
						last_name: last_name.toUpperCase(),
						birthday,
						key
					}
			}
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
			goto('/login?success');
		}
	};
</script>

<h1 class="title">Créez votre compte</h1>

{#each toasts as toast}
	<Toast color={toast.color}>
		{toast.message}
	</Toast>
{/each}

<form on:submit|preventDefault={register}>
	<Input bind:value={first_name} name="fistName" required type="text">Prénom</Input>
	<Input bind:value={last_name} name="lastName" required type="text">Nom</Input>
	<Input bind:value={birthday} name="birthDate" required type="date">Date de naissance</Input>
	<Input bind:value={email} name="email" required type="email">Email</Input>
	<Input bind:value={password} minlength="8" name="password" required type="password">Mot de passe</Input>
	<Input bind:value={passwordConfirm} name="confirm" required type="password">Mot de passe (×2)</Input>
	<Input bind:value={key} name="signupKey" required type="text">Clef d'inscription</Input>

	<div class="flex-container">
		<Button color="accent-3" disabled={loading} hover={false}>
			<Icon slot="icon" src={Check}/>
			{loading ? 'Chargement' : 'S\'inscrire'}
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
