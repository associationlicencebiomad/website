<script lang="ts">
	import { XIcon } from '@krowten/svelte-heroicons';

	export let dismissable = true;
	export let color = '';
	let closed = false;

	let onDismiss = () => {
		closed = true;
	};
</script>

<div class="toast {color}" class:closed class:dismissable>
	<slot />
	{#if dismissable}
		<span class="dismiss" on:click={onDismiss}>
			<XIcon slot="icon" />
		</span>
	{/if}
</div>

<style lang="scss">
	@import 'Toast';
</style>
