<script lang="ts">
	import {theme} from "$lib/stores.js";
	import Button from "$lib/primitives/Button/Button.svelte";

	export let onSave: () => void;
	export let onReset: () => void;
	export let saving = false;
</script>


<div class={`popup ${$theme}`}>
	<div class="content">
		Il y a des modifications non enregistrées.
		<div class="container">
			<Button on:click={onReset}>
				Réinitialiser
			</Button>
			<Button color="accent-3" disabled={saving} on:click={onSave}>
				{saving ? 'Enregistrement ...' : 'Enregistrer'}
			</Button>
		</div>
	</div>
</div>

<style lang="scss">
  @use "./SavePopup";
</style>