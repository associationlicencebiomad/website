<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Profile } from '../types/database/Profile.type';

	export const load: Load = async () => {

		const { data, error: supabaseErr } = await supabase
			.from<Profile>('profiles')
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
			.range(0, 29);

		return {
			props: {
				profiles: data,
				error: supabaseErr
			}
		};
	};
</script>

<script lang="ts">
	import UserCareerCard from '$lib/userCareerCard/UserCareerCard.svelte';
	import { SearchIcon } from '@krowten/svelte-heroicons';
	import { supabase } from '$lib/supabase-client';
	import type { PostgrestError } from '@supabase/supabase-js';
	import { inview } from 'svelte-inview';

	export let profiles: Profile[] = [];
	export let error: PostgrestError | null;

	let page: number = 0;
	let hasMore: boolean = true;

	if (error) {
		console.error(error);
	}

	const fetchData = async () => {
		const { data, error: supabaseErr } = await supabase
			.from<Profile>('profiles')
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
			.range(page * 30, (page + 1) * 30 - 1);

		if (supabaseErr) {
			console.error(supabaseErr);
		} else {
			if (data) profiles = [...profiles, ...data];

			if (!data || data.length < 30) {
				hasMore = false;
			}
		}
	};

	const handleChange = (e: CustomEvent) => {
		// To get more results, we'll increment the page by 1
		page++;

		// And fetch more data
		if (e.detail.inView && hasMore) fetchData();
	};
</script>

<section class="title">
	<h1>Les parcours</h1>
	<p>
		Retrouve ici les parcours de chacun, que ce soit la L3 au fin fond du Texas ou bien le master au
		Bahamas.
	</p>
</section>
<div class="container">
	<div class="searchbox">
		<input type="text" placeholder="Rechercher un parcours" />
		<button>
			<SearchIcon />
		</button>
	</div>
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
<div use:inview={{}} on:change={handleChange} />

<style lang="scss">
	@import './career';
</style>
