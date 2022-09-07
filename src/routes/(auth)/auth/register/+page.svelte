<script lang="ts">
	import {ArrowNarrowLeftIcon, CheckIcon} from '@krowten/svelte-heroicons';
	import type {ToastType} from '../../../../lib/components/Toast/toast.type';
	import {goto} from '$app/navigation';

	import Button from '../../../../lib/components/Button/Button.svelte';
	import Input from '../../../../lib/components/Input/Input.svelte';
	import Toast from '../../../../lib/components/Toast/Toast.svelte';
	import {supabaseClient} from '../../../../lib/supabase-client';

	let loading = false;
	let toasts: Array<ToastType> = [];
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
		let { error } = await supabaseClient.auth.signUp(
			{
				email,
				password
			},
			{
				data: {
					first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase(),
					last_name: last_name.toUpperCase(),
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
	<Input name="password" type="password" bind:value={password} required minlength="8"
		>Mot de passe</Input
	>
	<Input name="confirm" type="password" bind:value={passwordConfirm} required>
		Mot de passe (×2)
	</Input>
	<Input name="signupKey" type="text" bind:value={key} required>Clef d'inscription</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false} disabled={loading}
			><CheckIcon slot="icon" />{loading ? 'Chargement' : 'Register'}</Button
		>
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
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
</style>
