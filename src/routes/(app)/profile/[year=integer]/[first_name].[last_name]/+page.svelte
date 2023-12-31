<script lang="ts">
	import {Icon} from "@steeze-ui/svelte-icon";
	import {
		ArrowSmallLeft,
		BookOpen,
		Cake,
		Calendar,
		ChatBubbleBottomCenterText,
		MapPin,
		PaperAirplane
	} from "@steeze-ui/heroicons";
	import {page} from "$app/stores";
	import Avatar from "$lib/components/Avatar.svelte";
	import UserLinks from "$lib/components/UserLinks.svelte";
	import AnecdoteCard from "$lib/components/AnecdoteCard/AnecdoteCard.svelte";
	import Timeline from "$lib/components/Timeline/Timeline.svelte";
	import Button from "$lib/primitives/Button/Button.svelte";
	import type {Profile} from "src/types/user.types";
	import {theme} from "$lib/stores.js";
	import Textarea from "$lib/primitives/Textarea/Textarea.svelte";
	import Input from "$lib/primitives/Input/Input.svelte";
	import Popup from "$lib/components/Popup.svelte";

	export let data;
	let currentProfile = data.currentProfile;


	let popup = false;
	let subject = '';
	let message = '';

	// page.data.currentProfile = currentProfile;
</script>

{#if $page.data.session && popup}
	<Popup>
		<h1 class="title">
			Envoyer un message à {data.currentProfile.first_name}
		</h1>
		<form method="POST" action="?/sendMessage">
			<input type="hidden" name="to" value={data.currentProfile.id}/>
			<input type="hidden" name="from"
				   value={`${$page.data.user?.first_name} ${$page.data.user?.last_name}`}/>
			<input type="hidden" name="from_email" value={$page.data.session.user?.email}/>
			<Input name="subject" type="text" bind:value={subject} required>Sujet</Input>
			<Textarea name="message" bind:value={message} required>Message</Textarea>
			<div class="flex-container">
				<Button color="accent-3" hover={false} type="submit">
					<Icon src={PaperAirplane} slot="icon"/>
					Envoyer
				</Button>
				<Button color="accent-3" on:click={(e) => {e.preventDefault(); popup = !popup}}>
					<Icon src={ArrowSmallLeft} slot="icon"/>
					Retour
				</Button>
			</div>
		</form>
	</Popup>
{/if}

<div class="back">
	<a href="/static" on:click|preventDefault={() => window.history.back()}>← Retour</a>
</div>
<div class={`user ${$theme}`}>
	<div class="user__info">
		<div class="user__info__avatar">
			<Avatar
					avatar={data.currentProfile.avatar}
					first_name={data.currentProfile.first_name}
					last_name={data.currentProfile.last_name}
			/>
		</div>
		<div class="user__info__container">
			<div class="user__info__primary">
				<div class="user__info__primary__name">
					{data.currentProfile.first_name}
					{data.currentProfile.last_name}
				</div>
				{#if Object.values(data.currentProfile.links).some((el) => el)}
					<UserLinks links={data.currentProfile.links}/>
				{/if}
			</div>
			<div class="user__info__history">
				<div class="birthday">
					<Icon class="icon" src={Cake}/>
					<span>{new Date(data.currentProfile.birthday).toLocaleDateString()}</span>
				</div>
				<div class="promoType">
					<Icon class="icon" src={BookOpen}/>
					<span>
						{#if data.currentProfile.promos.year >= 2019}
							Bio-MAD
						{:else if data.currentProfile.promos.year >= 2014}
							Bio-Maths, doubles diplômes
						{:else}
							Bio-Maths
						{/if}
					</span>
				</div>
				<div class="promo">
					<Icon class="icon" src={Calendar}/>
					<span>LBM {data.currentProfile.promos.year} — {data.currentProfile.promos.name}</span>
				</div>
				<div class="current">
					<Icon class="icon" src={MapPin}/>
					<span>{data.currentProfile.timeline[0]?.name} — {data.currentProfile.timeline[0]?.place}</span>
				</div>
			</div>
			{#if $page.data.session && data.currentProfile.id !== $page.data.session.user?.id}
				<div class="user__info__contact">
					<p>Une question sur mon parcours, mes études actuelle ou le pays de ma L3 ?</p>
					<Button
							color="green"
							on:click={() => (popup = true)}
					>
						Message
						<Icon src={ChatBubbleBottomCenterText} class="icon" slot="icon"/>
					</Button>
				</div>
			{/if}
		</div>
	</div>
	{#if data.currentProfile.godparents.length > 0}
		<section class="godparents">
			<h1>Mes parrains/marraines :</h1>
			<div class="container">
				{#each data.currentProfile.godparents as godparent, index}
					<a
							class="godparent"
							href="/profile/{data.currentProfile.promos.year - 1}/{godparent.profile.first_name.replaceAll(' ', '_').toLowerCase()}.{godparent.profile.last_name
							.replaceAll(' ', '_')
							.toLowerCase()}"
					>
						<Avatar
								avatar={godparent.profile.avatar}
								first_name={godparent.profile.first_name}
								last_name={godparent.profile.last_name}
						/>
						<div class="info">
							{godparent.profile.first_name} {godparent.profile.last_name}
							{#if godparent.is_adopted}
								<p class="adopted">adoption</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}
	<div class="user__about">
		<h3>A propos :</h3>
		{#if data.currentProfile.about}
			<p>{data.currentProfile.about}</p>
		{:else}
			<p class="null">Cette personne n'a pas bien rempli son profil...</p>
		{/if}
	</div>
	<div class="user__anecdote">
		<AnecdoteCard content={data.currentProfile.best_memory} name="Meilleur souvenir de la LBM"/>
		<AnecdoteCard content={data.currentProfile.strong_points} name="Points forts de la LBM"/>
		<AnecdoteCard
				content={data.currentProfile.better_promo}
				name="C'était mieux du temps de ta promo ? Prouve le !"
		/>
	</div>
	<div class="user__timeline">
		<Timeline timeline={data.currentProfile.timeline}/>
	</div>
</div>

<style lang="scss">
  @import 'profile';
</style>
