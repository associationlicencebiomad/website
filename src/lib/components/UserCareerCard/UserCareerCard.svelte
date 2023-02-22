<script lang="ts">
	import {Icon} from "@steeze-ui/svelte-icon";
	import {MapPin} from "@steeze-ui/heroicons";
	import Avatar from '$lib/components/Avatar.svelte';
	import {theme} from "$lib/stores";
	import type {TimelineType} from '$lib/Timeline/timeline.type';

	export let timeline: TimelineType;
	export let first_name: string;
	export let last_name: string;
	export let avatar: string;
	export let promoName: string;
	export let promoYear: number;
</script>

<a
		class={`UserCareerCard ${$theme}`}
		href="/profile/{promoYear}/{first_name.replaceAll(' ', '_').toLowerCase()}.{last_name
		.replaceAll(' ', '_')
		.toLowerCase()}"
>
	<Avatar {avatar} {first_name} {last_name}/>
	<h1>{first_name} {last_name}</h1>
	<div class="current">
		{#if timeline}
			<Icon src={MapPin} class="icon"/>
			<p>{timeline[0]?.name} — {timeline[0]?.place}</p>
		{/if}
	</div>
	<p class="lbmName">LBM {promoYear} — {promoName}</p>
</a>

<style lang="scss">
  @import 'UserCareerCard';
</style>