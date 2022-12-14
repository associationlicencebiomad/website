<script lang="ts">
	import {page} from '$app/stores';
	import Avatar from '../Avatar/Avatar.svelte';
	import {MenuIcon} from '@krowten/svelte-heroicons';
	import HeaderDropdown from './HeaderDropdown.svelte';
	import type {UserSession} from "/src/types/User.type";
	import {theme} from "$lib/stores.js";

	let dropdownOpened = false;
	let headerOpened = false;

	function toggleHeader(value?: boolean) {
		headerOpened = typeof value !== 'undefined' ? value : !headerOpened;
	}

	function toggleDropdown(value?: boolean) {
		dropdownOpened = typeof value !== 'undefined' ? value : !dropdownOpened;
	}

	let user: UserSession;

	$: url = $page.url.pathname;
	$: user = $page.data.session.user
</script>

<header class={$theme} class:headerOpened>
	<nav>
		<a href="/" class="logo {url === '/' ? 'active' : ''}" on:click={() => toggleHeader(false)}>
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
	{#if user}
		<div class="user" on:click={() => toggleDropdown()}>
			<span class="user__username"
			>{user.profile.first_name} {user.profile.last_name}</span
			>
			<Avatar
					first_name={user.profile.first_name}
					last_name={user.profile.last_name}
					avatar={user.profile.avatar}
					class="user__profilPicture"
			/>
		</div>
		<HeaderDropdown bind:dropdownOpened bind:headerOpened/>
	{:else}
		<div class="auth">
			<a href="/auth/login">Connexion</a>
			—
			<a href="/auth/register">Inscription</a>
		</div>
	{/if}
	<div on:click={() => toggleHeader()} class="hamburger">
		<MenuIcon class="icon"/>
	</div>
</header>

<style lang="scss">
  @import 'Header';
</style>
