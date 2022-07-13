<script lang="ts">
	import type { ToastType } from '$lib/components/Toast/toast.type';
	import { ArrowNarrowLeftIcon, LoginIcon } from '@krowten/svelte-heroicons';
	import { page } from '$app/stores';
	import { route } from '../../lib/route';
	import { supabaseClient } from '$lib/supabase-client';
	import Button from '$lib/components/Button/Button.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';

	let toasts: Array<ToastType> = [];
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
		let { error } = await supabaseClient.auth.signIn({
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
		} else {
			await route('/');
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
	<Input id="email" type="email" bind:value={email} required>Email</Input>
	<Input id="password" type="password" bind:value={password} required>
		Password
		<span slot="helper"
			><a href="/auth/forgotpassword">Mot de passe oublié ?</a> ou
			<a href="/auth/register">Créez un compte ?</a></span
		>
	</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false} disabled={loading}>
			<LoginIcon slot="icon" />{loading ? 'Chargement' : 'Login'}
		</Button>
		<Button color="accent-3" on:click={() => history.back()}
			><ArrowNarrowLeftIcon slot="icon" />Retour</Button
		>
	</div>
</form>

<style lang="scss">
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
