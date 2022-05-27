<script lang="ts">
	import TimelineItem from './timelineItem/TimelineItem.svelte';
	import { Position } from './timeline.type';
	import type { TimelineType } from './timeline.type';

	export let timeline: TimelineType;
</script>

{#if timeline}
	<ul class="timeline">
		{#each timeline.reverse() as timelineItem, index (timelineItem.name)}
			
			<TimelineItem
				date={timelineItem.date}
				name={timelineItem.name}
				place={timelineItem.place}
				type={timelineItem.type}
				description={timelineItem.description}
				position={index % 2 === 0 ? Position.right : Position.left}
			/>
		{/each}
		<!-- <TimelineItem
			date="2023 — 2024"
			name="LBM2"
			place="Station biologique de Roscoff"
			type={ItemType.education}
			description="Tchoupi"
			position={Position.left}
		/>
		<TimelineItem
			date="été 2022"
			name="Developeur fullstack"
			place="Stef Transport"
			type={ItemType.work}
			description="Mise en place d'une librairie de dématérialisation"
			position={Position.right}
		/>
		<TimelineItem
			date="2021 — 2022"
			name="LBM1"
			place="Station biologique de Roscoff"
			type={ItemType.education}
			position={Position.left}
		/>
		<TimelineItem
			date="Juin 2020"
			name="Stage en tant que dev backend"
			place="Stef Transport"
			type={ItemType.internship}
			description="Mise en place d'une librairie de dématérialisation"
			position={Position.right}
		/> -->
	</ul>
{/if}

<style lang="scss">
	@import './Timeline';
</style>
