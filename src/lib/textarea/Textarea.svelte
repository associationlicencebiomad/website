<script lang="ts">
	import autosize from 'svelte-autosize';
	export let value: string;
	export let id: string = "";

</script>

<div class="input-field">
	<textarea id={id} bind:value use:autosize/>
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
	@import "./Textarea";
</style>
