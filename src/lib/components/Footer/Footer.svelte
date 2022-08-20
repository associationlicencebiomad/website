<script lang="ts">
	import {page} from '$app/stores';
	import Separator_3 from '../../assets/Separator-3.svelte';
	import FacebookIcon from '../../icons/FacebookIcon.svelte';
	import InstagramIcon from '../../icons/InstagramIcon.svelte';

	$: url = $page.url.pathname;
</script>

<footer>
	<div class="separator">
		<Separator_3 />
	</div>
	<div class="content">
		<div class="container">
			<img src="/images/logo_albm.png" alt="Logo ALBM" />
			<div class="title">
				<h1>ALBM</h1>
				<div class="socials">
					<a href="https://www.facebook.com/groups/360613077352359/" target="_blank">
						<FacebookIcon />
					</a>
					<a href="https://www.instagram.com/albm_roscoff/" target="_blank">
						<InstagramIcon />
					</a>
				</div>
			</div>
		</div>
		<span> ©2022 — Association des licences BIOMAD </span>
		<div class="links">
			<a href="/static" class={url === '/' ? 'active' : ''}>Home</a>
			<a href="/blog" class={url === '/blog' ? 'active' : ''}>Blog</a>
			<a class={url === '/careers' ? 'active' : ''} href="/careers">Parcours</a>
			<a href="/about" class={url === '/about' ? 'active' : ''}>A propos</a>
			<a href="/contact" class={url === '/contact' ? 'active' : ''}>Contact</a>
			<a href="/credits" class={url === '/cretis' ? 'active' : ''}>Crédits</a>
		</div>
	</div>
</footer>

<style lang="scss">
	@use 'Footer';
</style>
