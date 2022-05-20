<script lang="ts">
	import { CheckIcon, ArrowNarrowLeftIcon } from '@krowten/svelte-heroicons';

	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/input/Input.svelte';
	import Toast from '$lib/toast/Toast.svelte';

	let password: string = '';
	let passwordConfirm: string = '';
	let resetToken: string = 'tchoupi';
</script>


<h1 class="title">Réinitialiser votre mot de passe</h1>

<form method="post">
	<Input id="resetToken" type="hidden" value={resetToken} />
	<Input id="password" type="password" bind:value={password}>
		Mot de passe
	</Input>
	<Input id="confirm" type="password" bind:value={passwordConfirm}>
		Mot de passe (×2)
	</Input>
	<div class="flex-container">
		<Button color="accent-3" on:click={() => history.back()}><ArrowNarrowLeftIcon slot="icon"/>Retour</Button>
		<Button color="accent-3" hover={false}><CheckIcon slot="icon" />
			Réinitialiser
		</Button>
	</div>
</form>

<style lang="scss">
	.flex-container {
		display: flex;
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
