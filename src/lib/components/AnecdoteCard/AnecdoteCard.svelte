<script lang="ts">
	export let name: string;
	export let content: string;
</script>

<div class="anecdote">
	<h1>{name}</h1>
	<p>{content ?? "Cette personne n'a pas bien rempli son profile..."}</p>
</div>

<style lang="scss">
  @import 'AnecdoteCard';
</style>