<script lang="ts">
	export let className: string = '';
	export let color: string = '';
	export let hover: boolean = false;


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
	@import './Button';
</style>
