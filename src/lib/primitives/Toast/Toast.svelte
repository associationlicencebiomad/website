<script lang="ts">
	import {Icon} from "@steeze-ui/svelte-icon";
	import {XMark} from "@steeze-ui/heroicons";

	export let dismissible = true;
	export let color = '';
	let closed = false;

	let onDismiss = () => {
		closed = true;
	};
</script>

<div class="toast {color}" class:closed class:dismissible>
	<slot />
	{#if dismissible}
		<span class="dismiss" on:click={onDismiss}>
			<Icon src={XMark} slot="icon" />
		</span>
	{/if}
</div>

<style lang="scss">
  @import 'Toast';
</style>