<script lang="ts">
	import type {PageData} from "./$types";
	import type {Profile as ProfileType} from '../../types/database/Profile.type';

	import {supabaseClient} from '$lib/supabase-client';
	import UserCareerCard from '$lib/components/UserCareerCard/UserCareerCard.svelte';
	import {SearchIcon, XCircleIcon} from '@krowten/svelte-heroicons';
	import {inview} from 'svelte-inview';

	let hasMore = true;
	let searchActive: boolean | string = false;
	let searchInput = '';
	let previousProfile: ProfileType[] = [];

	let profilesPage = 0;
	export let data: PageData;

	// export let error;

	let profiles: ProfileType[] = [];
	$: profiles = data?.profiles;

	$: hasMore = data?.hasMore;
	const fetchData = async () => {
		// To get more results, we'll increment the page by 1

		profilesPage++;

		const {data: freshProfiles} = await supabaseClient
			.from<ProfileType>('profiles')
			.select(
				`
				id,
				first_name,
				last_name,
				avatar,
				timeline,
				promos (name, year)
			`
			)
			.order('promo_id', {ascending: true})
			.range(profilesPage * 14, (profilesPage + 1) * 14 - 1);

		profiles = [...profiles, ...freshProfiles];
		if (!freshProfiles || freshProfiles.length < 14) {
			hasMore = false;
		}

	};
	const handleChange = async (e: CustomEvent) => {
		// And fetch more data
		if (e.detail.inView && hasMore) await fetchData();

	};
	const handleSearch = async () => {
		if (searchInput === '') {
			if (previousProfile.length) {
				searchActive = false;
				hasMore = true;
				profiles = previousProfile;
				previousProfile = [];
			}
		} else {
			hasMore = false;

			const {data: freshProfiles} = await supabaseClient
				.from<ProfileType>('profiles')
				.select(
					`
				id,
				first_name,
				last_name,
				avatar,
				timeline,
				promos (name, year)
			`
				)
				.textSearch("fts", searchInput, {
					type: "websearch",
					config: 'fr',
				});

			if (previousProfile.length === 0) {
				previousProfile = profiles;
			}

			profiles = freshProfiles;
			searchActive = searchInput;
		}
	}
</script>

<section class="title">
	<h1>Les parcours</h1>
	<p>
		Retrouve ici les parcours de chacun, que ce soit la L3 au fin fond du Texas ou bien le master au
		Bahamas.
	</p>
</section>
<div class="container">
	<form class="searchbox" on:keypress={(e) => {
		if (e.keyCode===13) {
			e.preventDefault();
			handleSearch();
		}
	}} on:submit|preventDefault={handleSearch}>
		<input bind:value={searchInput} placeholder="Rechercher un parcours" type="text"/>
		{#if !searchActive || searchInput !== searchActive}
			<button>
				<SearchIcon/>
			</button>
		{:else}
			<button on:click={()=> {
				searchInput = '';
				handleSearch();
			}}>
				<XCircleIcon/>
			</button>
		{/if}
	</form>
</div>
<div class="UsersCareer">
	{#each profiles as profile (profile.id)}
		<UserCareerCard
				first_name={profile.first_name}
				last_name={profile.last_name}
				avatar={profile.avatar}
				promoName={profile.promos.name}
				promoYear={profile.promos.year}
				timeline={profile.timeline}
		/>
	{/each}
</div>

<!-- Trigger infinite scroll https://levelup.gitconnected.com/loading-more-results-on-scroll-with-svelte-js-restful-apis-svelte-infinite-scrolling-ad80a09b5e33 -->
<div on:change={handleChange} use:inview/>

<style lang="scss">
  @import './career';
</style>
