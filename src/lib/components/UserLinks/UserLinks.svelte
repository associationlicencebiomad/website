<script lang="ts">
	import FacebookIcon from '../../icons/FacebookIcon.svelte';
	import GithubIcon from '../../icons/GithubIcon.svelte';
	import InstagramIcon from '../../icons/InstagramIcon.svelte';
	import LinkedinIcon from '../../icons/LinkedinIcon.svelte';
	import TwitterIcon from '../../icons/TwitterIcon.svelte';
	import { GlobeAltIcon } from '@krowten/svelte-heroicons';
	import type { Links } from '../../../types/database/Profil.type';

	export let links: Links;
</script>

<div class="user__info__primary__links">
	{#if links.website}
		<a href={links.website} target="_blank" rel="noopener noreferrer" class="link">
			<GlobeAltIcon />
		</a>
	{/if}
	{#if links.twitter}
		<a
			href={`https://twitter.com/${links.twitter}`}
			target="_blank"
			rel="noopener noreferrer"
			class="link"
		>
			<TwitterIcon />
		</a>
	{/if}
	{#if links.github}
		<a
			href={`https://github.com/${links.github}`}
			target="_blank"
			rel="noopener noreferrer"
			class="link"
		>
			<GithubIcon />
		</a>
	{/if}
	{#if links.facebook}
		<a
			href={`https://www.facebook.com/${links.facebook}`}
			target="_blank"
			rel="noopener noreferrer"
			class="link"
		>
			<FacebookIcon />
		</a>
	{/if}
	{#if links.instagram}
		<a
			href={`https://www.instagram.com/${links.instagram}`}
			target="_blank"
			rel="noopener noreferrer"
			class="link"
		>
			<InstagramIcon />
		</a>
	{/if}
	{#if links.linkedin}
		<a
			href={`https://www.linkedin.com/in/${links.linkedin}`}
			target="_blank"
			rel="noopener noreferrer"
			class="link"
		>
			<LinkedinIcon />
		</a>
	{/if}
</div>

<style lang="scss">
	@import '../../../scss/colors';

	.user__info__primary__links {
		font-size: 24px;
		background-color: $accent-2;
		padding: 9px 15px;
		border-radius: 35px;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.link {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 24px;
			height: 24px;
			outline: none;
			color: $white-3;
			transition: all ease-in-out 0.2s;

			&:not(:last-child) {
				margin-right: 10px;
			}

			&:hover {
				color: $orange;
			}
		}
	}
</style>
