<script lang="ts">
	import AnecdoteCard from '$lib/components/AnecdoteCard/AnecdoteCard.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import Popup from '$lib/components/Popup/Popup.svelte';
	import Textarea from '$lib/components/Textarea/Textarea.svelte';
	import Timeline from '$lib/components/Timeline/Timeline.svelte';
	import UserLinks from '$lib/components/UserLinks/UserLinks.svelte';
	import {
		ArrowNarrowLeftIcon,
		BookOpenIcon,
		CakeIcon,
		CalendarIcon,
		ChatAltIcon,
		LocationMarkerIcon,
		PaperAirplaneIcon
	} from '@krowten/svelte-heroicons';
	import type {Profile} from '/src/types/database/Profile.type';
	import {page} from "$app/stores";

	let currentProfile: Profile;
	$: currentProfile = $page.data.currentProfile;

	let popup = false;
	let subject = '';
	let message = '';
</script>

{#if popup}
	<Popup>
		<h1 class="title">
			Envoyer un message à {currentProfile.first_name}
		</h1>
		<form method="post">
			<input type="hidden" name="to" value={currentProfile.id}/>
			<input type="hidden" name="from" value={`${currentProfile.first_name} ${currentProfile.last_name}`}/>
			<input type="hidden" name="from_email" value={$page.data.session.user?.email}/>
			<Input name="subject" type="text" bind:value={subject} required>Sujet</Input>
			<Textarea name="message" bind:value={message} required>Message</Textarea>
			<div class="flex-container">
				<Button color="accent-3" hover={false} type="submit">
					<PaperAirplaneIcon slot="icon"/>
					Envoyer
				</Button>
				<Button color="accent-3" on:click={() => (popup = false)}>
					<ArrowNarrowLeftIcon slot="icon"/>
					Retour
				</Button>
			</div>
		</form>
	</Popup>
{/if}

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
				{#if Object.values(currentProfile.links).some((el) => el)}
					<UserLinks links={currentProfile.links}/>
				{/if}
			</div>
			<div class="user__info__history">
				<!-- <div class="godparent"><UsersIcon /><span>Jane DOE</span></div> Parrain marraine not yet implemented -->
				<div class="birthday">
					<CakeIcon/>
					<span>{new Date(currentProfile.birthday).toLocaleDateString()}</span>
				</div>
				<div class="promoType">
					<BookOpenIcon/>
					<span>
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
					<CalendarIcon/>
					<span>LBM {currentProfile.promos.year} — {currentProfile.promos.name}</span>
				</div>
				<div class="current">
					<LocationMarkerIcon/>
					<span>{currentProfile.timeline[0]?.name} — {currentProfile.timeline[0]?.place}</span>
				</div>
			</div>
			<!--{#if $page.data.session.user && currentProfile.id !== $page.data.session.user?.id}-->
			<div class="user__info__contact">
				<p>Une question sur mon parcours, mes études actuelle ou le pays de ma L3 ?</p>
				<Button
						color="green"
						on:click={() => (popup = true)}
						title="Cette fonctionnalité n'est pas encore disponible"
				>
					Message
					<ChatAltIcon slot="icon"/>
				</Button>
			</div>
			<!--{/if}-->
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
		<AnecdoteCard content={currentProfile.best_memory} name="Meilleur souvenir de la LBM"/>
		<AnecdoteCard content={currentProfile.strong_points} name="Points forts de la LBM"/>
		<AnecdoteCard
				content={currentProfile.better_promo}
				name="C'était mieux du temps de ta promo ? Prouve le !"
		/>
	</div>
	<div class="user__timeline">
		<Timeline timeline={currentProfile.timeline}/>
	</div>
</div>

<style lang="scss">
  @import './profil';
</style>
