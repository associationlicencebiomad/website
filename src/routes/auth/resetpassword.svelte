<script lang="ts">
	import { CheckIcon, ArrowNarrowLeftIcon } from '@krowten/svelte-heroicons';
	import type { ToastType } from '$lib/toast/toast.type';

	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/input/Input.svelte';
	import Toast from '$lib/toast/Toast.svelte';
import { supabase } from '$lib/supabase-client';
import { goto } from '$app/navigation';

	let toasts: Array<ToastType> = [];
	let password: string = '';
	let passwordConfirm: string = '';

	const resetPassword = async () => {
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

		let { error } = await supabase.auth.update({
			password,
		});

		
		if (error) {
			toasts = [
				...toasts,
				{
					color: 'error',
					message: error.message
				}
			];
		} else {
			await supabase.auth.signOut();
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
	<Input id="password" type="password" bind:value={password} required>
		Mot de passe
	</Input>
	<Input id="confirm" type="password" bind:value={passwordConfirm} required>
		Mot de passe (×2)
	</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false}><CheckIcon slot="icon" />
			Réinitialiser
		</Button>
		<Button color="accent-3" on:click={() => history.back()}><ArrowNarrowLeftIcon slot="icon"/>Retour</Button>
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
