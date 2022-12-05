<script lang="ts">
	import type {PageData} from './$types';
	import type {Ranking} from "../../../types/database/Ranking.type";
	import RankingCard from "$lib/components/RankingCard/RankingCard.svelte";

	export let data: PageData;

	let ranking: Ranking[] = data.ranking;


</script>

<div class="ranking">
	{#each ranking as place, index}
		<RankingCard ranking={place} index={index+1}/>
	{/each}
</div>

<style lang="scss">
  @import 'src/scss/mixins';

  .ranking {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    //@include grid_auto_columns(4, 20px, 500px);
    margin: 0 24px;
    //align-items: center;
    //justify-content: center;

  }
</style>