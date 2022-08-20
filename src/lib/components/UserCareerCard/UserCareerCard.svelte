<script lang="ts">
	import Avatar from '../Avatar/Avatar.svelte';
	import type {TimelineType} from '../Timeline/timeline.type';
	import {LocationMarkerIcon} from '@krowten/svelte-heroicons';

	export let timeline: TimelineType;
	export let first_name: string;
	export let last_name: string;
	export let avatar: string;
	export let promoName: string;
	export let promoYear: number;
</script>

<a
		class="UserCareerCard"
		href="/profile/{promoYear}/{first_name.replaceAll(' ', '_').toLowerCase()}.{last_name
		.replaceAll(' ', '_')
		.toLowerCase()}"
>
	<Avatar {first_name} {last_name} {avatar}/>
	<h1>{first_name} {last_name}</h1>
	<div class="current">
		{#if timeline}
			<LocationMarkerIcon/>
			<p>{timeline[0]?.name} — {timeline[0]?.place}</p>
		{/if}
	</div>
	<p class="lbmName">LBM {promoYear} — {promoName}</p>
</a>

<style lang="scss">
	@import 'UserCareerCard';
</style>
