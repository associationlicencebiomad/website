<script lang="ts">
	import { CheckIcon, ArrowNarrowLeftIcon } from '@krowten/svelte-heroicons';
	import type { ToastType } from '$lib/toast/toast.type';
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';

	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/input/Input.svelte';
	import Toast from '$lib/toast/Toast.svelte';
	import { supabase } from '$lib/supabase-client';
	import { page } from '$app/stores';

	let loading: boolean = false;
	let toasts: Array<ToastType> = [];
	let first_name: string = '';
	let last_name: string = '';
	let email: string = '';
	let password: string = '';
	let passwordConfirm: string = '';
	let birthday: string = '';
	let key: string = '';

	const register = async () => {
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

		let { error } = await supabase.auth.signUp(
			{
				email,
				password
			},
			{
				data: {
					first_name,
					last_name,
					birthday,
					key
				}
			}
		);
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
			goto('/auth/login?success');
		}
	};

	if ($user) {
		goto('/');
	}
</script>

<h1 class="title">Créez votre compte</h1>

{#each toasts as toast}
	<Toast color={toast.color}>
		{toast.message}
	</Toast>
{/each}

<form on:submit|preventDefault={register}>
	<Input name="fistName" type="text" bind:value={first_name} required>Prénom</Input>
	<Input name="lastName" type="text" bind:value={last_name} required>Nom</Input>
	<Input name="birthDate" type="date" bind:value={birthday} required>Date de naissance</Input>
	<Input name="email" type="email" bind:value={email} required>Email</Input>
	<Input name="password" type="password" bind:value={password} required minlength="8" >Mot de passe</Input>
	<Input name="confirm" type="password" bind:value={passwordConfirm} required>
		Mot de passe (×2)
	</Input>
	<Input name="signupKey" type="text" bind:value={key} required>Clée d'inscription</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false}><CheckIcon slot="icon" />{loading ? 'Chargement' : 'Register'}</Button>
		<Button color="accent-3" on:click={() => history.back()}>
			<ArrowNarrowLeftIcon slot="icon" />Retour
		</Button>
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
