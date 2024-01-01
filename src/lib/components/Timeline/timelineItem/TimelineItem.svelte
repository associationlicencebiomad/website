<script lang="ts">
	import {AcademicCap, Briefcase, Identification} from "@steeze-ui/heroicons";
	import {Icon} from "@steeze-ui/svelte-icon";
	import { Position, ItemType } from 'src/types/timeline.type';
	import {theme} from "$lib/stores.js";

	export let name: string;
	export let date: string;
	export let place: string;
	export let description = '';
	export let type: ItemType;
	export let position: Position = Position.left;

	// export let
</script>

<li class="item {position} {type} {$theme}">
	{#if type === ItemType.education}
		<Icon src={AcademicCap} class="icon"/>
	{:else if type === ItemType.work}
		<Icon src={Briefcase} class="icon" size="24px"/>
	{:else}
		<Icon src={Identification} class="icon"/>
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
	@import 'TimelineItem';
</style>
