<script lang="ts">
	// import {ArrowNarrowLeftIcon, LoginIcon} from '@krowten/svelte-heroicons';
	import {page} from '$app/stores';
	import {supabaseClient} from '$lib/db'
	import Input from "$lib/primitives/Input/Input.svelte";
	import Toast from "$lib/primitives/Toast/Toast.svelte";
	import Button from "$lib/primitives/Button/Button.svelte";
	import type {ToastTypes} from "$lib/primitives/Toast/Toast.types";
	import {Icon} from "@steeze-ui/svelte-icon";
	import {ArrowRightOnRectangle, ArrowSmallLeft} from "@steeze-ui/heroicons";

	let toasts: Array<ToastTypes> = [];
	let email = '';
	let password = '';

	let loading = false;

	if ($page.url.searchParams.has('success')) {
		toasts = [
			...toasts,
			{
				color: 'success',
				message: 'Votre compte a été créé avec succès !'
			},
			{
				color: 'warning',
				message: "Votre compte n'est pas encore activé ! Vérifier votre boîte mail pour l'activer."
			}
		];
	}

	if ($page.url.searchParams.has('reset')) {
		toasts = [
			...toasts,
			{
				color: 'success',
				message: 'Votre mot de passe a été réinitialisé avec succès !'
			}
		];
	}

	if ($page.url.searchParams.has('active')) {
		toasts = [
			...toasts,
			{
				color: 'success',
				message: 'Votre compte est maintenant activé !'
			}
		];
	}

	const login = async () => {
		loading = true;
		let {error} = await supabaseClient.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			password = '';
			toasts = [
				...toasts,
				{
					color: 'error',
					message: error.message
				}
			];
		}
		loading = false;
	};
</script>

<h1 class="title">Connectez-vous à votre compte</h1>

{#each toasts as toast}
	<Toast color={toast.color}>
		{toast.message}
	</Toast>
{/each}

<form on:submit|preventDefault={login}>
	<Input bind:value={email} id="email" required type="email">Email</Input>
	<Input bind:value={password} id="password" required type="password">
		Password
		<span slot="helper">
			<a href="/forgotpassword">Mot de passe oublié ?</a> ou
			<a href="/register">Créez un compte ?</a>
		</span>
	</Input>
	<div class="flex-container">
		<Button color="accent-3" disabled={loading} hover={false}>
			<Icon slot="icon" src={ArrowRightOnRectangle}/>
			{loading ? 'Chargement' : 'Login'}
		</Button>
		<Button color="accent-3" on:click={() => history.back()}>
			<Icon slot="icon" src={ArrowSmallLeft}/>
			Retour
		</Button>
	</div>
</form>

<style lang="scss">
  form {
	margin-top: 12px;
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
