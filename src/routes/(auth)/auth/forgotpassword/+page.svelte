<script lang="ts">
	import {ArrowNarrowLeftIcon, CheckIcon} from '@krowten/svelte-heroicons';
	import type {ToastType} from '../../../../lib/components/Toast/toast.type';

	import Button from '../../../../lib/components/Button/Button.svelte';
	import Input from '../../../../lib/components/Input/Input.svelte';
	import Toast from '../../../../lib/components/Toast/Toast.svelte';
	import {supabaseClient} from '../../../../lib/supabase-client';
	import {page} from '$app/stores';

	let loading = false;
	let toasts: Array<ToastType> = [];
	let email = '';

	const requestReset = async () => {
		loading = true;
		const {error} = await supabaseClient.auth.api.resetPasswordForEmail(email, {
			redirectTo: `${$page.url.origin}/auth/resetpassword`
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
	<Input id="email" type="email" bind:value={email} required>Email</Input>
	<div class="flex-container">
		<Button color="accent-3" hover={false} disabled={loading}>
			<CheckIcon slot="icon" />{loading ? 'Chargement' : 'Réinitialiser'}
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
