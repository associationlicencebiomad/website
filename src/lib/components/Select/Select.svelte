<script lang="ts">
	export let name: string;
	export let value;
</script>

<select bind:value on:change>
	<option value="" disabled selected>{name}</option>
	<slot/>
</select>

<style lang="scss">
	@import 'Select';
</style>
