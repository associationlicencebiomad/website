<script lang="ts">
	export let value: boolean;
	export let filled;
</script>

<div class="checkbox-field">
	<label>
		<input bind:checked={value} class={filled ? "filled-in" : ""} type="checkbox"/>
		<span>
			<slot/>
		</span>
	</label>
</div>

<style lang="scss">
  @import "Checkbox";
</style>

