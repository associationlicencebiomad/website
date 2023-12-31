<script lang="ts">
	import {Icon} from "@steeze-ui/svelte-icon";
	import {ChevronDoubleUp, MagnifyingGlass, XCircle} from "@steeze-ui/heroicons";
	import InfiniteLoading from 'svelte-infinite-loading';
	import {supabaseClient} from '$lib/db';
	import UserCareerCard from '$lib/components/UserCareerCard/UserCareerCard.svelte';
	import PageTitle from "$lib/components/PageTitle.svelte";
	import type {Profile} from "src/types/user.types";
	import type {PageData} from "./$types";
	import Button from "$lib/primitives/Button/Button.svelte";

	export let data: PageData;

    let searchActive: boolean | string = false;
    let searchInput = '';
    let previousProfile: Profile[] = [];

    let profilesPage = 0;
    let profiles: Profile[] = data?.profiles;
    let hasMore = data?.hasMore;

    const fetchData = async ({detail: {loaded, complete}}) => {
        if (!hasMore) {
            complete();
            return

        }
        // To get more results, we'll increment the page by 1
        profilesPage++;

        const {data: freshProfiles} = await supabaseClient
            .from('profiles')
            .select(`id, first_name, last_name, avatar, timeline, promos(name, year)`)
            .order('promo_id', {ascending: true})
						.order('last_name', {ascending: true})
            .order('first_name', {ascending: true})
            .range(profilesPage * 14, (profilesPage + 1) * 14 - 1);

        console.log(profiles);
        console.log(freshProfiles);

        profiles = [...profiles, ...freshProfiles];

        if (!freshProfiles || freshProfiles.length < 14) {

            hasMore = false;
            complete();
            return
        }
        loaded();
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
                .from('profiles')
                .select(`id, first_name, last_name, avatar, timeline, promos(name, year)`)
                .textSearch("fts", searchInput, {type: "websearch", config: 'fr'});

            if (previousProfile.length === 0) {
                previousProfile = profiles;
            }

            profiles = freshProfiles;
            searchActive = searchInput;
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
</script>

<PageTitle
    description="Retrouve ici les parcours de chacun, que ce soit la L3 au fin fond du Texas ou bien le master au Bahamas."
    title="Les parcours"
/>

<div class="container">
  <form class="searchbox" on:keypress={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSearch();
		}
	}} on:submit|preventDefault={handleSearch}>
    <input bind:value={searchInput} placeholder="Rechercher un parcours" type="text"/>
    {#if !searchActive || searchInput !== searchActive}
      <button>
        <Icon src={MagnifyingGlass}/>
      </button>
    {:else}
      <button on:click={()=> {searchInput = '';handleSearch();}}>
        <Icon src={XCircle}/>
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

<InfiniteLoading distance={80} on:infinite={fetchData}>
  <Button color="accent-2" on:click={scrollToTop} slot="noMore">
    <Icon class="icon" src={ChevronDoubleUp}/>
    Revenir en haut
  </Button>
</InfiniteLoading>

<style lang="scss">
  @import 'careers';
</style>