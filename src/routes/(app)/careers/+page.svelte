<script lang="ts">
    import {Icon} from "@steeze-ui/svelte-icon";
    import {ChevronDoubleUp, MagnifyingGlass, XCircle} from "@steeze-ui/heroicons";
    import {supabaseClient} from '$lib/db';
    import UserCareerCard from '$lib/components/UserCareerCard/UserCareerCard.svelte';
    import PageTitle from "$lib/components/PageTitle.svelte";
    import type {Profile} from "src/types/user.types";
    import type {PageData} from "./$types";
    import Button from "$lib/primitives/Button/Button.svelte";
    import {ProfilesStore} from "$lib/stores";

    export let data: PageData;
    let profiles: Profile[] = data.profiles ;

    let searchActive: boolean | string = false;
    let searchInput = '';
    let previousProfile: Profile[] = [];

    const handleSearch = async () => {
        if (searchInput === '') {
            if (previousProfile.length) {
                searchActive = false;
                profiles = previousProfile;
                previousProfile = [];
            }
        } else {

            const {data: freshProfiles} = await supabaseClient
                .from('profiles')
                .select(`id, first_name, last_name, avatar, timeline, promos(name, year)`)
                .textSearch("fts", searchInput, {type: "websearch", config: 'fr'});

            if (previousProfile.length === 0) {
                previousProfile = profiles;
            }

            profiles = freshProfiles as Profile[];
            searchActive = searchInput;
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    $: profiles = data.profiles;
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

<div class="bottom">
  <Button color="accent-2" on:click={scrollToTop}>
    <Icon class="icon" src={ChevronDoubleUp}/>
    Revenir en haut
  </Button>
</div>

<style lang="scss">
  @import 'careers';
</style>