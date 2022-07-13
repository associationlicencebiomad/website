<script lang="ts">
	import autosize from 'svelte-autosize';
	export let value: string;
	export let id = '';
</script>

<div class="input-field">
	<textarea {id} bind:value use:autosize {...$$restProps}></textarea>
	<label for={id} class:active={value}><slot /></label>
	{#if $$slots.helper}
		<span class="helper-text" data-error="wrong" data-success="right">
			{#if $$slots.helper}
				<slot name="helper" />
			{/if}
		</span>
	{/if}
</div>

<style lang="scss">
	@import 'Textarea';
</style>
