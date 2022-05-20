<script lang="ts">
	import { CheckIcon, ArrowNarrowLeftIcon } from '@krowten/svelte-heroicons';

	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/input/Input.svelte';
	import Toast from '$lib/toast/Toast.svelte';

	let firstName: string = '';
	let lastName: string = '';
	let email: string = '';
	let password: string = '';
	let passwordConfirm: string = '';
	let birthDate: string = '';
	let signupKey: string = '';

</script>


<h1 class="title">Créez votre compte</h1>

<form method="post">
	<Input id="fistName" type="text" bind:value={firstName}>Prénom</Input>
	<Input id="lastName" type="text" bind:value={lastName}>Nom</Input>
	<Input id="birthDate" type="date" bind:value={birthDate}>Date de naissance</Input>
	<Input id="email" type="email" bind:value={email}>Email</Input>
	<Input id="password" type="password" bind:value={password}>
		Mot de passe
	</Input>
	<Input id="confirm" type="password" bind:value={passwordConfirm}>
		Mot de passe (×2)
	</Input>
	<Input id="signupKey" type="text" bind:value={signupKey}>
		Clée d'inscription
	</Input>
	<div class="flex-container">
		<Button color="accent-3" on:click={() => history.back()}><ArrowNarrowLeftIcon slot="icon"/>Retour</Button>
		<Button color="accent-3" hover={false}><CheckIcon slot="icon" />Valider</Button>
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
