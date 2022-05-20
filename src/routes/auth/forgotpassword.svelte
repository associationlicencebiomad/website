<script lang="ts">
	import { CheckIcon, ArrowNarrowLeftIcon } from '@krowten/svelte-heroicons';

	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/input/Input.svelte';
	import Toast from '$lib/toast/Toast.svelte';

	let email: string = '';
</script>


<h1 class="title">Vous avez oublié votre mot de passe ?</h1>

<form method="post">
	<Input id="email" type="email" bind:value={email}>Email</Input>
	
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
