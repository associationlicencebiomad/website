<script lang="ts">
	export let value: string = "";
	export let id: string = "";
	export let type: string = "text"

	const setType = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>


<div class="input-field {type}" >
	<input id={id} bind:value={value} {...$$restProps} use:setType/>
	<label for={id} class:active={value}><slot /></label>
	{#if $$slots.helper}
		<span
			class="helper-text"
			data-error="wrong"
			data-success="right"
		>
			<slot name="helper"/>
		</span>
	{/if}
</div>

<style lang="scss">
	@import "./Input";
</style>
