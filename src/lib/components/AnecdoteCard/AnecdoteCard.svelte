<script lang="ts">
	export let name: string;
	export let content: string | null;
</script>

{#if content}
	<div class="anecdote">
		<h1>{name}</h1>
		<p>{content}</p>
	</div>
{/if}

<style lang="scss">
  @import 'AnecdoteCard';
</style>