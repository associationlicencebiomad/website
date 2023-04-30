<script lang="ts">
	export let value = '';
	export let id = '';
	export let type = 'text';

	const setType = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<div class="input-field {type}">
    <input {...$$restProps} bind:value id={id} on:change use:setType/>
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
  @import 'Input';
</style>