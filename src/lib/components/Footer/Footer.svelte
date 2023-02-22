<script lang="ts">
	import {page} from '$app/stores';
	import Separator_3 from '../../assets/Separator-3.svelte';
	import FacebookIcon from '../../icons/FacebookIcon.svelte';
	import InstagramIcon from '../../icons/InstagramIcon.svelte';
	import LinkedinIcon from "$lib/icons/LinkedinIcon.svelte";

	$: url = $page.url.pathname;
</script>

<footer>
	<div class="separator">
		<Separator_3/>
	</div>
	<div class="content">
		<div class="container">
			<img alt="Logo ALBM" src="/images/logo_albm.png"/>
			<div class="title">
				<h1>ALBM</h1>
				<div class="socials">
					<a href="https://www.facebook.com/groups/360613077352359/" target="_blank">
						<FacebookIcon/>
					</a>
					<a href="https://www.linkedin.com/groups/8809708/" target="_blank">
						<LinkedinIcon/>
					</a>
					<a href="https://www.instagram.com/albm_roscoff/" target="_blank">
						<InstagramIcon/>
					</a>
				</div>
			</div>
		</div>
		<span>©2022 - {new Date().getFullYear()} — Association des licences BIOMAD</span>
		<div class="links">
			<a class={url === '/' ? 'active' : ''} href="/">Home</a>
			<a class={url === '/blog' ? 'active' : ''} href="/blog">Blog</a>
			<a class={url === '/careers' ? 'active' : ''} href="/careers">Parcours</a>
			<a class={url === '/about' ? 'active' : ''} href="/about">À propos</a>
			<a class={url === '/contact' ? 'active' : ''} href="/contact">Contact</a>
			<a class={url === '/credits' ? 'active' : ''} href="/credits">Crédits</a>
		</div>
	</div>
</footer>

<style lang="scss">
  @use 'Footer';
</style>