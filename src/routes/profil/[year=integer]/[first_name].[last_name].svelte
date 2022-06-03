<script lang="ts" context="module">
	import AnecdoteCard from '$lib/anecdoteCard/AnecdoteCard.svelte';
	import Avatar from '$lib/Avatar/Avatar.svelte';
	import Button from '$lib/button/Button.svelte';
	import { profil, user } from '$lib/store';
	import { supabase } from '$lib/supabase-client';
	import Timeline from '$lib/timeline/Timeline.svelte';
	import UserLinks from '$lib/userLinks/UserLinks.svelte';
	import {
		ArrowNarrowLeftIcon,
		BookOpenIcon,
		CakeIcon,
		CalendarIcon,
		ChatAltIcon,
		LocationMarkerIcon,
		LoginIcon
	} from '@krowten/svelte-heroicons';
	import type { Load } from '@sveltejs/kit';
	import type { Profil } from '../../../types/database/Profil.type';

	export const load: Load = async ({ params }) => {
		const { data, error: supabaseErr } = await supabase
			.from('profils')
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
				currentprofil: data[0] as Profil
			}
		};
	};
</script>

<script lang="ts">
	import Popup from '$lib/popup/Popup.svelte';
	import Input from '$lib/input/Input.svelte';
	import Textarea from '$lib/textarea/Textarea.svelte';

	export let currentprofil: Profil;
	export let error: boolean;

	let subject: string = '';
	let message: string = '';

	if (error) console.error(error);
</script>

<Popup>
	<h1 class="title">
		Envoyer un message à {currentprofil.first_name}
	</h1>
	<form method="post">
		<input type="hidden" name="id" value={currentprofil.id} />
		<input type="hidden" name="to" value={`${currentprofil.first_name} ${currentprofil.last_name}`} />
		<input type="hidden" name="from" value={`${$profil?.first_name} ${$profil?.last_name}`} />
		<input type="hidden" name="from_email" value={$user?.email} />
		<Input name="subject" type="text" bind:value={subject} required>Sujet</Input>
		<Textarea name="message" bind:value={message} required>Message</Textarea>
		<div class="flex-container">
			<Button color="accent-3" hover={false} type="submit">
				<LoginIcon slot="icon" />
				Toaster
			</Button>
			<Button color="accent-3" on:click={() => history.back()}>
				<ArrowNarrowLeftIcon slot="icon" />
				Retour
			</Button>
		</div>
	</form>
</Popup>

<div class="back">
	<a href="/" on:click|preventDefault={() => window.history.back()}>← Retour</a>
</div>
<div class="user">
	<div class="user__info">
		<div class="user__info__avatar">
			<Avatar
				avatar={currentprofil.avatar}
				first_name={currentprofil.first_name}
				last_name={currentprofil.last_name}
			/>
		</div>
		<div class="user__info__container">
			<div class="user__info__primary">
				<div class="user__info__primary__name">
					{currentprofil.first_name}
					{currentprofil.last_name}
				</div>
				{#if Object.values(currentprofil.links).some((el) => el)}
					<UserLinks links={currentprofil.links} />
				{/if}
			</div>
			<div class="user__info__history">
				<!-- <div class="godparent"><UsersIcon /><span>Jane DOE</span></div> Parrain marraine not yet implemented -->
				<div class="birthday">
					<CakeIcon /><span>{new Date(currentprofil.birthday).toLocaleDateString()}</span>
				</div>
				<div class="promoType">
					<BookOpenIcon /><span>
						{#if currentprofil.promos.year >= 2019}
							Bio-MAD
						{:else if currentprofil.promos.year >= 2014}
							Bio-Maths, doubles diplômes
						{:else}
							Bio-Maths
						{/if}
					</span>
				</div>
				<div class="promo">
					<CalendarIcon /><span>LBM {currentprofil.promos.year} — {currentprofil.promos.name}</span>
				</div>
				<div class="current">
					<LocationMarkerIcon /><span
						>{currentprofil.timeline[0]?.name} — {currentprofil.timeline[0]?.place}</span
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
		{#if currentprofil.about}
			<p>{currentprofil.about}</p>
		{:else}
			<p class="null">Cette personne n'a pas bien rempli son profil...</p>
		{/if}
	</div>
	<div class="user__anecdote">
		<AnecdoteCard name="Meilleur souvenir de la LBM" content={currentprofil.best_memory} />
		<AnecdoteCard name="Points forts de la LBM" content={currentprofil.strong_points} />
		<AnecdoteCard
			name="C'était mieux du temps de ta promo ? Prouve le !"
			content={currentprofil.better_promo}
		/>
	</div>
	<div class="user__timeline">
		<Timeline timeline={currentprofil.timeline} />
	</div>
</div>

<style lang="scss">
	@import './profil';
</style>
