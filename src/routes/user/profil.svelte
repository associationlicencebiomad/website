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
	import { profil } from '$lib/store';
	import { supabase } from '$lib/supabase-client';
	import Textarea from '$lib/textarea/Textarea.svelte';
	import { ItemType } from '$lib/timeline/timeline.type';
	import { ArrowDownIcon,ArrowUpIcon,GlobeAltIcon,PlusIcon,TrashIcon } from '@krowten/svelte-heroicons';
	import type { Profil } from '../../types/database/Profil.type';

	let uploading = false;
	let files: FileList;
	let fileInput: HTMLInputElement;
	let edited = false;
	let newprofil: Profil = JSON.parse(JSON.stringify($profil));
	$: newprofil, (edited = JSON.stringify(newprofil) !== JSON.stringify($profil));

	async function uploadAvatar() {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${newprofil.id}.${fileExt}`;

			let { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, { upsert: true });
			if (uploadError) throw uploadError;

			newprofil.avatar = filePath;
		} finally {
			uploading = false;
		}
	}

	const resetAvatar = () => {
		newprofil.avatar = '';
	};

	let saving = false;

	const updateUser = async () => {
		saving = true;
		try {
			const { data, error } = await supabase
				.from<Profil>('profils')
				.update({
					first_name: newprofil.first_name,
					last_name: newprofil.last_name,
					avatar: newprofil.avatar,
					birthday: newprofil.birthday,
					links: newprofil.links,
					about: newprofil.about,
					best_memory: newprofil.best_memory,
					strong_points: newprofil.strong_points,
					better_promo: newprofil.better_promo,
					timeline: newprofil.timeline
				})
				.match({ id: newprofil.id })
				.single();

			if (error) throw error;

			$profil = data;
			newprofil = JSON.parse(JSON.stringify($profil));
		} catch (err) {
			console.log(err);
		} finally {
			saving = false;
		}
	};
</script>

{#if newprofil}
	{#if edited}
		<div class="popup">
			<div class="content">
				Il y a des modifications non enregistrées.
				<div class="container">
					<Button on:click={() => (newprofil = JSON.parse(JSON.stringify($profil)))}>
						Réinitialiser
					</Button>
					<Button color="accent-3" on:click={updateUser} disabled={saving}
						>{saving ? 'Enregistrement ...' : 'Enregistrer'}</Button
					>
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
					avatar={newprofil.avatar}
					first_name={newprofil.first_name}
					last_name={newprofil.last_name}
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
					<Input type="text" bind:value={newprofil.first_name}>Prénom</Input>
					<Input type="text" bind:value={newprofil.last_name}>Nom</Input>
					<Input type="date" bind:value={newprofil.birthday}>Date de naissance</Input>
				</div>
				<div class="info__links">
					<div class="website">
						<GlobeAltIcon />
						<Input type="text" bind:value={newprofil.links.website}>Site web</Input>
					</div>
					<div class="twitter">
						<TwitterIcon />
						<Input type="text" bind:value={newprofil.links.twitter}>Twitter</Input>
					</div>
					<div class="github">
						<GithubIcon />
						<Input type="text" bind:value={newprofil.links.github}>Github</Input>
					</div>
					<div class="facebook">
						<FacebookIcon />
						<Input type="text" bind:value={newprofil.links.facebook}>Facebook</Input>
					</div>
					<div class="instagram">
						<InstagramIcon /><Input type="text" bind:value={newprofil.links.instagram}
							>Instagram</Input
						>
					</div>
					<div class="linkedin">
						<LinkedinIcon />
						<Input type="text" bind:value={newprofil.links.linkedin}>Linkedin</Input>
					</div>
				</div>
			</div>
		</section>

		<section class="about">
			<h2>A propos</h2>
			<Textarea bind:value={newprofil.about}>
				<p slot="helper">
					Dit nous ce que tu fait actuellement et ce que tu veux faire par la suite. En passant tu
					pourras nous glisser quelques mots sur ton activité quotidienne, et comment tu te sens
					globalement :p.
				</p>
			</Textarea>
		</section>
		<section class="anecdote">
			<h2>Informations de PREMIÈRE importance</h2>
			<Textarea bind:value={newprofil.best_memory}>
				Meilleur souvenir de la LBM
				<p slot="helper">
					Nostalgique de la belle époque des tempêtes et des odeurs de goémon, fais nous part de ton
					meilleur souvenir :).
				</p>
			</Textarea>
			<Textarea bind:value={newprofil.strong_points}>
				Points forts de la LBM
				<p slot="helper">
					Qu'est ce que la licence t'as apporté de mieux sur le point personnel ou académique ? Les
					réponses évidentes tel que "petites promos" ou "licence à l'étranger" sont a éviter
					puisque c'est pas assez personnel.
				</p>
			</Textarea>
			<Textarea bind:value={newprofil.better_promo}>
				C'était mieux du temps de ta promo ? Prouve le !
				<p slot="helper">
					On connait tous les discours des ancien.ne.s quand ils parlent de leur promos, et comment
					tout se dégrade (les {new Date().getFullYear() - 1}, vous verrez l'année prochaine) ! Si
					tu as ce sentiment explique pourquoi :).
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
						(newprofil.timeline = [
							{ type: '', name: '', date: '', place: '', description: '' },
							...newprofil.timeline
						])}><PlusIcon slot="icon" /> Ajouter un item</Button
				>
			</div>
			{#each newprofil.timeline as timelineItem, index (index)}
				<div class="timelineItem">
					<div class="control">
						<Button
							color="red"
							on:click={() =>
								(newprofil.timeline = [
									...newprofil.timeline.slice(0, index),
									...newprofil.timeline.slice(index + 1)
								])}
							><TrashIcon slot="icon" /></Button>
						{#if index > 0}
							<Button
								color="accent-3"
								on:click={() => {
									let item = newprofil.timeline.splice(index, 1)[0];
									newprofil.timeline.splice(index - 1, 0, item);
									newprofil.timeline = [...newprofil.timeline];
								}}><ArrowUpIcon slot="icon" /></Button
							>
						{/if}
						{#if index < newprofil.timeline.length - 1}
							<Button
								color="accent-3"
								on:click={() => {
									let item = newprofil.timeline.splice(index, 1)[0];
									newprofil.timeline.splice(index + 1, 0, item);
									newprofil.timeline = [...newprofil.timeline];
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
{:else}
	<div class="not-login">
		<section>
			<h2>Tu n'es pas connecté !</h2>
			<p>
				Afin de pouvoir éditer ton profil, il faut tout d'abord te <a href="/auth/login"
					>connecter</a
				>
			</p>
		</section>
	</div>
{/if}

<style lang="scss">
	@import './profil';
</style>
