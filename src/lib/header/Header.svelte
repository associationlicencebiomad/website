<script lang="ts">
	import { page } from '$app/stores';
	import { MenuIcon } from '@krowten/svelte-heroicons';

	import HeaderDropdown from './HeaderDropdown.svelte';
	
	let dropdownOpened: Boolean = false;
	let headerOpened: Boolean = false;

	function toggleHeader(value?: Boolean) {
		headerOpened = typeof value !== 'undefined' ? value : !headerOpened;
	}

	function toggleDropdown(value?: Boolean) {
		dropdownOpened = typeof value !== 'undefined' ? value : !dropdownOpened;
	}

	$: url = $page.url.pathname;

</script>


<header class:headerOpened>
	<nav>
		<a href="/" class="logo {url === '/' ? 'active': ''}" on:click={() => toggleHeader(false)}>
			<img src="/images/logo.jpg" alt="Logo" /><div class='Name'>LBM</div>
		</a>
		<a href="/test" class={url === '/test' ? 'active' : ''} on:click={() => toggleHeader(false)}>
			Blog
		</a>
		<a href="/test" class={url === '/test' ? 'active' : ''} on:click={() => toggleHeader(false)}>
			Parcours
		</a>
	</nav>
	<div class="user" on:click={() => toggleDropdown()}>
		<span class="user__username">John DOE</span>
		<img src='/images/pp.png' alt="John DOE" class='user__profilePicture' />
	</div>
	<HeaderDropdown dropdownOpened={dropdownOpened} headerOpened={headerOpened}/>
	<div on:click={() => toggleHeader()} class='hamburger'>
		<MenuIcon class="icon" />
	</div>
</header>

<style lang="scss">
	@import './Header';
</style>
