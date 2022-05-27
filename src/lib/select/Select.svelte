<script lang="ts">
	export let name: string;
	export let value: any;
</script>

<select bind:value>
	<option value="" disabled selected>{name}</option>
	<slot />
</select>

<style lang="scss">
	@import './Select';
</style>
