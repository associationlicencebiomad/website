<script lang="ts">
	import { LoginIcon, ArrowNarrowLeftIcon } from '@krowten/svelte-heroicons';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase-client';
	import { user } from '$lib/store';

	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/input/Input.svelte';
	import Toast from '$lib/toast/Toast.svelte';
	import type { ToastType } from '$lib/toast/toast.type';
	import { goto } from '$app/navigation';

	let toasts: Array<ToastType> = [];
	let email: string = '';
	let password: string = '';

	let loading: boolean = false;

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
		let { user: userDetails, error } = await supabase.auth.signIn({
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
			user.set(userDetails);
			goto('/');
		}
		loading = false;
	};

	if ($user) {
		goto('/');
	}
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
			flex-direction: column-reverse;
			align-items: center;
			justify-content: center;
		}
	}
</style>
