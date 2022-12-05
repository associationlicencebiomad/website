<script lang="ts">
	import type {Ranking} from "../../../types/database/Ranking.type";
	import {theme} from "$lib/stores.js";

	export let ranking: Ranking;
	export let index: number;
</script>

<div class={`ranking_card ${$theme}`}>
	{#if index}
		<div class="ranking_card__index">{index}</div>
	{/if}
	<img alt={ranking.full_name} src={ranking.image_url}/>
	<h2>{ranking.full_name}</h2>
	<div class="courses">
		{#each ranking.courses as course}
			<div class="course">{course}</div>
		{/each}
	</div>
</div>

<style lang="scss">
  @use "./RankingCard";
</style>