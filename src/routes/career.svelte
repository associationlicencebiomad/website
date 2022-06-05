<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Profil as ProfilType } from '../types/database/Profil.type';

	export const load: Load = async () => {
		const { data, error: supabaseErr } = await supabase
			.from<ProfilType>('profils')
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
			.order('promo_id', { ascending: true })
			.range(0, 29)

		return {
			props: {
				profils: data,
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

	export let profils: ProfilType[] = [];
	export let error: PostgrestError | null;

	let page: number = 0;
	let hasMore: boolean = true;

	if (error) {
		console.error(error);
	}

	const fetchData = async () => {
		// To get more results, we'll increment the page by 1
		page++;

		const { data, error: supabaseErr } = await supabase
			.from<ProfilType>('profils')
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
			.order('promo_id', { ascending: true })
			.range(page * 30, (page + 1) * 30 - 1);

		if (supabaseErr) {
			console.error(supabaseErr);
		} else {
			if (data) profils = [...profils, ...data];

			if (!data || data.length < 30) {
				hasMore = false;
			}
		}
	};

	const handleChange = async (e: CustomEvent) => {
		// And fetch more data
		if (e.detail.inView && hasMore) await fetchData();
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
	{#each profils as profil (profil.id)}
		<UserCareerCard
			first_name={profil.first_name}
			last_name={profil.last_name}
			avatar={profil.avatar}
			promoName={profil.promos.name}
			promoYear={profil.promos.year}
			timeline={profil.timeline}
		/>
	{/each}
</div>

<!-- Trigger infinite scroll https://levelup.gitconnected.com/loading-more-results-on-scroll-with-svelte-js-restful-apis-svelte-infinite-scrolling-ad80a09b5e33 -->
<div use:inview={{}} on:change={handleChange} />

<style lang="scss">
	@import './career';
</style>
