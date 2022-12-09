<script lang="ts">
	import type {Professor, Ranking} from "../../../types/database/Ranking.type";
	import {theme} from "$lib/stores";

	export let professor: Ranking | Professor;
	export let index: number | null = null;
	export let isActive = false;
</script>

<div {...$$restProps} class={`ranking_card ${$theme}`} class:isActive on:dragenter on:dragover on:dragstart on:drop>
	{#if index}
		<div class="ranking_card__index">{index}</div>
	{/if}
	<img alt={professor.full_name} src={professor.image_url}/>
	<h2>{professor.full_name}</h2>
	<div class="courses">
		{#each professor.courses as course}
			<div class="course">{course}</div>
		{/each}
	</div>
</div>

<style lang="scss">
  @use "./RankingCard";
</style>