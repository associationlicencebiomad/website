<script lang="ts" context="module">
	import { supabase } from '$lib/supabase-client';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const { data, error: supabaseErr } = await supabase
			.from('profiles')
			.select(
				`
				*,
				promos!inner(*)
				`
			)
			.eq('promos.year', params.year)
			.ilike('first_name', params.first_name)
			.ilike('last_name', params.last_name);

		if (supabaseErr || !data) {
			return { 
				props: { error: supabaseErr }
			};
		}

		return {
			props: {
				currentProfile: data[0] as Profile
			}
		};
	};
</script>

<script lang="ts">
	import {
		UsersIcon,
		CakeIcon,
		BookOpenIcon,
		CalendarIcon,
		LocationMarkerIcon,
		ChatAltIcon
	} from '@krowten/svelte-heroicons';
	import type { Profile } from '../../../types/database/Profile.type';

	import AnecdoteCard from '$lib/anecdoteCard/AnecdoteCard.svelte';
	import Timeline from '$lib/timeline/Timeline.svelte';
	import Avatar from '$lib/Avatar/Avatar.svelte';
	import UserLinks from '$lib/userLinks/UserLinks.svelte';
	import Button from '$lib/button/Button.svelte';
	import { user } from '$lib/store';

	export let currentProfile: Profile;
	export let error: boolean;

	if (error) console.error(error);
</script>

<div class="back">
	<a href="/" on:click|preventDefault={() => window.history.back()}>← Retour</a>
</div>
<div class="user">
	<div class="user__info">
		<div class="user__info__avatar">
			<Avatar
				avatar={currentProfile.avatar}
				first_name={currentProfile.first_name}
				last_name={currentProfile.last_name}
			/>
		</div>
		<div class="user__info__container">
			<div class="user__info__primary">
				<div class="user__info__primary__name">
					{currentProfile.first_name}
					{currentProfile.last_name}
				</div>
				{#if currentProfile.links}
					<UserLinks links={currentProfile.links} />
				{/if}
			</div>
			<div class="user__info__history">
				<!-- <div class="godparent"><UsersIcon /><span>Jane DOE</span></div> Parrain marraine not yet implemented -->
				<div class="birthday">
					<CakeIcon /><span>{new Date(currentProfile.birthday).toLocaleDateString()}</span>
				</div>
				<div class="promoType">
					<BookOpenIcon /><span>
						{#if currentProfile.promos.year >= 2019}
							Bio-MAD
						{:else if currentProfile.promos.year >= 2014}
							Bio-Maths, doubles diplômes
						{:else}
							Bio-Maths
						{/if}
					</span>
				</div>
				<div class="promo">
					<CalendarIcon /><span
						>LBM {currentProfile.promos.year} — {currentProfile.promos.name}</span
					>
				</div>
				<div class="current">
					<LocationMarkerIcon /><span
						>{currentProfile.timeline.at(-1)?.name} — {currentProfile.timeline.at(-1)?.place}</span
					>
				</div>
			</div>
			{#if $user}
				<div class="user__info__contact">
					<p>Une question sur mon parcours, mes études actuelle ou le pays de ma L3 ?</p>
					<Button color="black-3" title="Cette fonctionnalité n'est pas encore disponible" disabled
						>Message <ChatAltIcon slot="icon" /></Button
					>
				</div>
			{/if}
		</div>
	</div>
	<div class="user__about">
		<h3>A propos :</h3>
		{#if currentProfile.about}
			<p>{currentProfile.about}</p>
		{:else}
			<p class="null">Cette personne n'a pas bien rempli son profil...</p>
		{/if}
	</div>
	<div class="user__anecdote">
		<AnecdoteCard name="Meilleur souvenir de la LBM" content={currentProfile.best_memory} />
		<AnecdoteCard name="Points forts de la LBM" content={currentProfile.strong_points} />
		<AnecdoteCard
			name="C'était mieux du temps de ta promo ? Prouve le !"
			content={currentProfile.better_promo}
		/>
	</div>
	<div class="user__timeline">
		<Timeline timeline={currentProfile.timeline} />
	</div>
</div>

<style lang="scss">
	@import '../profile';
</style>
