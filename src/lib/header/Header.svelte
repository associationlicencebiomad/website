<script lang="ts">
	import { page } from '$app/stores';
	import { MenuIcon } from '@krowten/svelte-heroicons';
	import { profil } from '$lib/store';

	import HeaderDropdown from './HeaderDropdown.svelte';
	import { supabase } from '$lib/supabase-client';
	import Avatar from '$lib/Avatar/Avatar.svelte';

	let dropdownOpened: Boolean = false;
	let headerOpened: Boolean = false;

	function toggleHeader(value?: Boolean) {
		headerOpened = typeof value !== 'undefined' ? value : !headerOpened;
	}

	function toggleDropdown(value?: Boolean) {
		dropdownOpened = typeof value !== 'undefined' ? value : !dropdownOpened;
	}

	export let src = '';

	async function downloadImage() {
		const { data, error } = await supabase.storage
			.from('avatars')
			.download($profil?.avatar ? $profil?.avatar : '');

		if (error) {
			src = '/images/avatar.png';
			console.error(error);
		}

		if (data) {
			src = URL.createObjectURL(data);
		} else {
			src = '/images/avatar.png';
		}
	}

	$: url = $page.url.pathname;
</script>

<header class:headerOpened>
	<nav>
		<a href="/" class="logo {url === '/' ? 'active' : ''}" on:click={() => toggleHeader(false)}>
			<img src="/images/logo.jpg" alt="Logo" />
			<div class="Name">LBM</div>
		</a>
		<a href="/blog" class={url === '/blog' ? 'active' : ''} on:click={() => toggleHeader(false)}>
			Blog
		</a>
		<a
			href="/career"
			class={url === '/career' ? 'active' : ''}
			on:click={() => toggleHeader(false)}
		>
			Parcours
		</a>
	</nav>
	{#if $profil}
		<div class="user" on:click={() => toggleDropdown()}>
			<span class="user__username">{$profil.first_name} {$profil.last_name}</span>
			<Avatar first_name={$profil.first_name} last_name={$profil.last_name} avatar={$profil.avatar} class="user__profilPicture" />
		</div>
		<HeaderDropdown {dropdownOpened} {headerOpened} />
	{:else}
		<div class="auth">
			<a href="/auth/login">Connexion</a> 
			—
			<a href="/auth/register">Inscription</a>
		</div>
	{/if}
	<div on:click={() => toggleHeader()} class="hamburger">
		<MenuIcon class="icon" />
	</div>
</header>

<style lang="scss">
	@import './Header';
</style>
