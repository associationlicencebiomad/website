<script lang="ts">
	export let className = '';
	export let color = '';
	export let hover = false;

	let colorClass: string;

	if ($$slots.icon) {
		className += ' btn-grid';
	}

	if (hover) {
		className += ` btn-hover`;
	}

	$: colorClass = color ? ` btn-${color}` : '';
</script>

<button {...$$restProps} class={className.trim() + colorClass} on:click>
	{#if $$slots.icon}
		<span class="icon"><slot name="icon"/></span>
	{/if}
	<span><slot/></span>
</button>

<style lang="scss">
  @import 'Button';
</style>
