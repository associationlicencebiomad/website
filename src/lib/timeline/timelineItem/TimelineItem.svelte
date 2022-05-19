<script lang="ts">
	import { AcademicCapIcon, BriefcaseIcon, IdentificationIcon } from "@krowten/svelte-heroicons";

	import { Position, Type } from "./Type";

	export let name: string;
	export let date: string;
	export let place: string;
	export let description: string = '';
	export let type: Type;
	export let position: Position = Position.left;

	// export let 
</script>


<li class="item {position} {type}">
	
	{#if type === Type.education}
	<AcademicCapIcon />
	{:else if type === Type.work}
	<BriefcaseIcon />
	{:else}
	<IdentificationIcon />
	{/if}
	
	<div class="content">
		<h2 class="title">{name}</h2>
		<h3 class="place">{place}</h3>
		{#if description}
		<p class="description">{description}</p>
		{/if}
		<span class="date">{date}</span>
	</div>
</li>

<style lang="scss">
	@import './TimelineItem';
</style>
