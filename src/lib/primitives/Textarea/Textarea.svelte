<script lang="ts">
	import autosize from 'svelte-autosize';

	export let value: string;
	export let id = '';
</script>

<div class="input-field">
	<textarea {...$$restProps} bind:value id={id} use:autosize/>
	<label class:active={value} for={id}>
		<slot/>
	</label>
	{#if $$slots.helper}
		<span class="helper-text" data-error="wrong" data-success="right">
			<slot name="helper"/>
		</span>
	{/if}
</div>

<style lang="scss">
  @import 'Textarea';
</style>