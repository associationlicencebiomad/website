<script lang="ts">
	export let name: string;
	export let content: string;

	if (!content) {
		content = "Cette personne n'a pas bien rempli son profile...";
	}
</script>

<div class="anecdote">
	<h1>{name}</h1>
	<p>{content}</p>
</div>

<style lang="scss">
	@import 'AnecdoteCard';
</style>
