<script lang="ts">
	import TimelineItem from './timelineItem/TimelineItem.svelte';
	import { Position } from './timeline.type';
	import type { TimelineType } from './timeline.type';

	export let timeline: TimelineType;
</script>

{#if timeline}
	<ul class="timeline">
		{#each [...timeline] as timelineItem, index (timelineItem.name)}
			<TimelineItem
				date={timelineItem.date}
				name={timelineItem.name}
				place={timelineItem.place}
				type={timelineItem.type}
				description={timelineItem.description}
				position={index % 2 === 0 ? Position.right : Position.left}
			/>
		{/each}
	</ul>
{/if}

<style lang="scss">
	@import './Timeline';
</style>
