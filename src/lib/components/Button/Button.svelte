<script lang="ts">
	export let className = '';
	export let color = '';
	export let hover = false;

	if ($$slots.icon) {
		className += ' btn-grid ';
	}

	if (color) {
		className += ` btn-${color}`;
	}

	if (hover) {
		className += ` btn-hover`;
	}
</script>

<button on:click class={className.trim()} {...$$restProps}>
	{#if $$slots.icon}
		<span class="icon"><slot name="icon" /></span>
	{/if}
	<span><slot /></span>
</button>

<style lang="scss">
	@import 'Button';
</style>
