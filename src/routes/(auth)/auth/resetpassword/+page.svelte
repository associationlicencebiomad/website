<script lang="ts">
	import {ArrowNarrowLeftIcon, CheckIcon} from '@krowten/svelte-heroicons';
	import type {ToastType} from '../../../../lib/components/Toast/toast.type';

	import Button from '../../../../lib/components/Button/Button.svelte';
	import Input from '../../../../lib/components/Input/Input.svelte';
	import Toast from '../../../../lib/components/Toast/Toast.svelte';
	import {supabaseClient} from '../../../../lib/supabase-client';
	import {goto} from '$app/navigation';

	let loading = false;
	let toasts: Array<ToastType> = [];
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

		let { error } = await supabaseClient.auth.update({
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
			goto('/auth/login?reset');
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
	<Input id="password" type="password" bind:value={password} required>Mot de passe</Input>
	<Input id="confirm" type="password" bind:value={passwordConfirm} required>
		Mot de passe (×2)
	</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false}
			><CheckIcon slot="icon" disabled={loading} />
			{loading ? 'Chargement' : 'Réinitialiser'}
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
