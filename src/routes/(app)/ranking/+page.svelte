<script lang="ts">
	import RankingCard from "$lib/components/RankingCard/RankingCard.svelte";
	import type {Ranking} from "src/types/ranking.types";
	import {page} from "$app/stores";

	let ranking: Ranking[] = $page.data.ranking;
</script>

<div class="ranking">
	{#each ranking as place, index}
		<RankingCard professor={place} index={index+1}/>
	{/each}
</div>

<style lang="scss">
  @import 'src/scss/mixins';

  .ranking {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin: 0 24px;
  }
</style>