<script lang="ts">
    import {page} from '$app/stores';
    import Avatar from '$lib/components/Avatar.svelte';
    import HeaderDropdown from './HeaderDropdown.svelte';
    import {theme} from "$lib/stores.js";
    import type {LoggedInUser} from "src/types/user.types";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Bars3, Moon, Sun} from "@steeze-ui/heroicons";
    import Button from "$lib/primitives/Button/Button.svelte";
    import {ThemeType} from "src/types/theme.types";

    let dropdownOpened = false;
    let headerOpened = false;

    function toggleHeader(value?: boolean) {
        headerOpened = typeof value !== 'undefined' ? value : !headerOpened;
    }

    function toggleDropdown(value?: boolean) {
        dropdownOpened = typeof value !== 'undefined' ? value : !dropdownOpened;
    }

    let user: LoggedInUser | null | undefined

    function switchtheme() {
        $theme = $theme === ThemeType.light ? ThemeType.dark : ThemeType.light
    }

    $: url = $page.url.pathname;
    $: user = $page.data.user
</script>

<header class={$theme} class:headerOpened>
  <nav>
    <a class="logo {url === '/' ? 'active' : ''}" href="/" on:click={() => toggleHeader(false)}>
      <img alt="Logo" src="/images/logo.jpg"/>
      <div class="Name">LBM</div>
    </a>
    <!-- <a href="/blog" class={url === '/blog' ? 'active' : ''} on:click={() => toggleHeader(false)}>
      Blog
    </a> -->
    <a
        class={url === '/careers' ? 'active' : ''}
        href="/careers"
        on:click={() => toggleHeader(false)}
    >
      Parcours
    </a>
  </nav>
  <div class="container">
    <Button color="accent-2" hover on:click={switchtheme}>
      {#if $theme === ThemeType.dark}
        <Icon src={Moon} slot="icon" class="icon"/>
      {:else}
        <Icon src={Sun} slot="icon" class="icon"/>
      {/if}
    </Button>
    {#if $page.data.session}
      <div class="user" on:click={() => toggleDropdown()}>
			<span class="user__username">
				{user?.first_name} {user?.last_name}
			</span>
        {#if user}
          <Avatar
              first_name={user.first_name}
              last_name={user.last_name}
              avatar={user.avatar}
              class="user__profilPicture"
              supabaseClient={$page.data.supabase}
          />
        {/if}
      </div>
      <HeaderDropdown bind:dropdownOpened bind:headerOpened/>
    {:else}
      <div class="auth">
        <a href="/login">Connexion</a>
        —
        <a href="/register">Inscription</a>
      </div>
    {/if}
  </div>


  <div class="hamburger" class:headerOpened on:click={() => toggleHeader()}>
    <Icon src={Bars3}/>
  </div>
</header>

<style lang="scss">
  @import 'Header';
</style>