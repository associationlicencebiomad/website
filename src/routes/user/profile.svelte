<script lang="ts" context="module">
	export const load: Load = async ({ params }) => {
		let user = await supabase.auth.user();
		if (user) {
			const { data, error: supabaseErr } = await supabase
				.from('profiles')
				.select(
					`
					*
					`
				)
				.eq('id', user.id)
				.single();

			if (supabaseErr || !data) {
				return {
					props: { error: supabaseErr ? supabaseErr.message : 'Une erreur est survenue' }
				};
			}

			return {
				props: {
					profile: data as Profile
				}
			};
		} else {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
	};
</script>

<script lang="ts">
	import Avatar from '$lib/Avatar/Avatar.svelte';
	import Button from '$lib/button/Button.svelte';
	import FacebookIcon from '$lib/icons/FacebookIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
	import LinkedinIcon from '$lib/icons/LinkedinIcon.svelte';
	import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
	import Input from '$lib/input/Input.svelte';
	import Select from '$lib/select/Select.svelte';
	import { supabase } from '$lib/supabase-client';
	import Textarea from '$lib/textarea/Textarea.svelte';
	import { ItemType } from '$lib/timeline/timeline.type';
	import { ArrowDownIcon, ArrowUpIcon, GlobeAltIcon, PlusIcon } from '@krowten/svelte-heroicons';
	import type { Load } from '@sveltejs/kit';
	import type { Profile } from '../../types/database/Profile.type';

	export let profile: Profile;
	export let error: string;
	let uploading = false;
	let files: FileList;
	let fileInput: HTMLInputElement;
	let edited = false;
	let newProfile: Profile = JSON.parse(JSON.stringify(profile));
	$: newProfile, (edited = JSON.stringify(newProfile) !== JSON.stringify(profile));

	async function uploadAvatar() {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${newProfile.id}.${fileExt}`;

			let { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, { upsert: true });
			if (uploadError) throw uploadError;

			newProfile.avatar = filePath;
		} finally {
			uploading = false;
		}
	}

	const resetAvatar = () => {
		newProfile.avatar = '';
	};

	let saving = false;

	const updateUser = async () => {
		saving = true;
		try {
			const { data, error } = await supabase
				.from<Profile>('profiles')
				.update({
					first_name: newProfile.first_name,
					last_name: newProfile.last_name,
					avatar: newProfile.avatar,
					birthday: newProfile.birthday,
					links: newProfile.links,
					about: newProfile.about,
					best_memory: newProfile.best_memory,
					strong_points: newProfile.strong_points,
					better_promo: newProfile.better_promo,
					timeline: newProfile.timeline
				})
				.match({ id: newProfile.id })
				.single();

			if (error) throw error;

			profile = data;
			newProfile = JSON.parse(JSON.stringify(profile));
		} catch (err) {
			console.log(err);
		} finally {
			saving = false;
		}
	};
</script>

{#if edited}
	<div class="popup">
		<div class="content">
			Il y a des modifications non enregistrées.
			<div class="container">
				<Button on:click={() => (newProfile = JSON.parse(JSON.stringify(profile)))}>
					Réinitialiser
				</Button>
				<Button color="accent-3" on:click={updateUser} disabled={saving}>{saving ? 'Enregistrement ...' : 'Enregistrer'}</Button>
			</div>
		</div>
	</div>
{/if}
<div class="back">
	<a href="/" on:click|preventDefault={() => window.history.back()}>← Retour</a>
</div>
<div class="user">
	<section class="info">
		<div class="info__avatar">
			<Avatar
				avatar={newProfile.avatar}
				first_name={newProfile.first_name}
				last_name={newProfile.last_name}
			/>
			<div class="container">
				<Button on:click={resetAvatar}>Réinitialiser</Button>
				<Button
					on:click={() => fileInput.click()}
					color="accent-3"
					disabled={uploading}
					hover={false}
					>{uploading ? 'Chargement' : 'Changer mon avatar'}
					<input
						style="visibility: hidden; position:absolute;top:0;left:0;width:0;height:0;"
						type="file"
						id="single"
						accept="image/*"
						bind:files
						on:change={uploadAvatar}
						disabled={uploading}
						bind:this={fileInput}
					/>
				</Button>
			</div>
		</div>
		<div class="container">
			<div class="info__names">
				<Input type="text" bind:value={newProfile.first_name}>Prénom</Input>
				<Input type="text" bind:value={newProfile.last_name}>Nom</Input>
				<Input type="date" bind:value={newProfile.birthday}>Date de naissance</Input>
			</div>
			<div class="info__links">
				<div class="website">
					<GlobeAltIcon />
					<Input type="text" bind:value={newProfile.links.website}>Site web</Input>
				</div>
				<div class="twitter">
					<TwitterIcon />
					<Input type="text" bind:value={newProfile.links.twitter}>Twitter</Input>
				</div>
				<div class="github">
					<GithubIcon />
					<Input type="text" bind:value={newProfile.links.github}>Github</Input>
				</div>
				<div class="facebook">
					<FacebookIcon />
					<Input type="text" bind:value={newProfile.links.facebook}>Facebook</Input>
				</div>
				<div class="instagram">
					<InstagramIcon /><Input type="text" bind:value={newProfile.links.instagram}
						>Instagram</Input
					>
				</div>
				<div class="linkedin">
					<LinkedinIcon />
					<Input type="text" bind:value={newProfile.links.linkedin}>Linkedin</Input>
				</div>
			</div>
		</div>
	</section>

	<section class="about">
		<h2>A propos</h2>
		<Textarea bind:value={newProfile.about}>
			<p slot="helper">
				Dit nous ce que tu fait actuellement et ce que tu veux faire par la suite. En passant tu
				pourras nous glisser quelques mots sur ton activité quotidienne, et comment tu te sens
				globalement :p.
			</p>
		</Textarea>
	</section>
	<section class="anecdote">
		<h2>Informations de PREMIÈRE importance</h2>
		<Textarea bind:value={newProfile.best_memory}>
			Meilleur souvenir de la LBM
			<p slot="helper">
				Nostalgique de la belle époque des tempêtes et des odeurs de goémon, fais nous part de ton
				meilleur souvenir :).
			</p>
		</Textarea>
		<Textarea bind:value={newProfile.strong_points}>
			Points forts de la LBM
			<p slot="helper">
				Qu'est ce que la licence t'as apporté de mieux sur le point personnel ou académique ? Les
				réponses évidentes tel que "petites promos" ou "licence à l'étranger" sont a éviter puisque
				c'est pas assez personnel.
			</p>
		</Textarea>
		<Textarea bind:value={newProfile.better_promo}>
			C'était mieux du temps de ta promo ? Prouve le !
			<p slot="helper">
				On connait tous les discours des ancien.ne.s quand ils parlent de leur promos, et comment
				tout se dégrade (les {new Date().getFullYear() - 1}, vous verrez l'année prochaine) ! Si tu
				as ce sentiment explique pourquoi :).
			</p>
		</Textarea>
	</section>
	<section class="timeline">
		<h2>Timeline</h2>
		<p>Plus un élément est haut, plus il est récent.</p>
		<div class="add">
			<Button
				color="accent-3"
				on:click={() =>
					(newProfile.timeline = [
						{ type: '', name: '', date: '', place: '', description: '' },
						...newProfile.timeline
					])}><PlusIcon slot="icon" /> Ajouter un item</Button
			>
		</div>
		{#each newProfile.timeline as timelineItem, index (index)}
			<div class="timelineItem">
				<div class="control">
					{#if index > 0}
						<Button
							color="accent-3"
							on:click={() => {
								let item = newProfile.timeline.splice(index, 1)[0];
								newProfile.timeline.splice(index - 1, 0, item);
								newProfile.timeline = [...newProfile.timeline];
							}}><ArrowUpIcon slot="icon" /></Button
						>
					{/if}
					{#if index < newProfile.timeline.length - 1}
						<Button
							color="accent-3"
							on:click={() => {
								let item = newProfile.timeline.splice(index, 1)[0];
								newProfile.timeline.splice(index + 1, 0, item);
								newProfile.timeline = [...newProfile.timeline];
							}}><ArrowDownIcon slot="icon" /></Button
						>
					{/if}
				</div>

				<div class="container">
					<Select bind:value={timelineItem.type} name="Type">
						<option value={ItemType.education}>Étude</option>
						<option value={ItemType.internship}>Stage</option>
						<option value={ItemType.work}>Travail</option>
					</Select>
					<Input type="text" bind:value={timelineItem.name}>Nom</Input>
				</div>
				<div class="container">
					<Input type="text" bind:value={timelineItem.place}>Où ?</Input>
					<Input type="text" bind:value={timelineItem.date}>Date</Input>
				</div>
				<Input type="text" bind:value={timelineItem.description}>Description</Input>
			</div>
		{/each}
	</section>
</div>

<style lang="scss">
	@import './profile';
</style>
