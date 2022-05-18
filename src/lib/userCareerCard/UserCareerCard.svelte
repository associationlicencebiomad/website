<script lang="ts">
	import { LocationMarkerIcon } from '@krowten/svelte-heroicons';

	export let current: string;
	export let name: string;
	export let profilePicture: string;
	export let lbmName: string;
</script>

<div class="UserCareerCard">
	<img src={profilePicture} alt={name}>
	<h1>{name}</h1>
	<div class="current">
		<LocationMarkerIcon /> 
		<p>{current}</p>
	</div>
	<p class='lbmName'>{lbmName}</p>
</div>

<style lang="scss">
	@import './UserCareerCard';
</style>
