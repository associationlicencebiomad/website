<script lang="ts">
	import FacebookIcon from '$lib/icons/FacebookIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
	import LinkedinIcon from '$lib/icons/LinkedinIcon.svelte';
	import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
	import type {Links} from "../../types/user.types";
	import {GlobeAlt} from "@steeze-ui/heroicons";
	import {Icon} from "@steeze-ui/svelte-icon";

	export let links: Links;
</script>

<div class="user__info__primary__links">
	{#if links.website}
		<a href={links.website} target="_blank" rel="noopener noreferrer" class="link">
			<Icon src={GlobeAlt} class="icon"/>
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
  @use 'src/scss/colors';

  .user__info__primary__links {
    font-size: 24px;
    background-color: colors.$accent-2;
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
      color: colors.$white-3;
      transition: all ease-in-out 0.2s;

      &:not(:last-child) {
        margin-right: 10px;
      }

      &:hover {
        color: lighten(colors.$orange, 10%);
      }
    }
  }
</style>