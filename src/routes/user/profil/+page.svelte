<script lang="ts">
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import FacebookIcon from '$lib/icons/FacebookIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
	import LinkedinIcon from '$lib/icons/LinkedinIcon.svelte';
	import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import Select from '$lib/components/Select/Select.svelte';
	import {supabaseClient} from '$lib/supabase-client';
	import Textarea from '$lib/components/Textarea/Textarea.svelte';
	import {ItemType} from '$lib/components/Timeline/timeline.type';
	import {ArrowDownIcon, ArrowUpIcon, GlobeAltIcon, PlusIcon, TrashIcon} from '@krowten/svelte-heroicons';
	import type {Profile} from '/src/types/database/Profile.type';
	import {page} from "$app/stores";
	import {invalidate} from "$app/navigation";

	let uploading = false;
	let files: FileList;
	let fileInput: HTMLInputElement;
	let edited;
	let newprofile: Profile = JSON.parse(JSON.stringify($page.data.session.user.profile));
	$: newprofile, (edited = JSON.stringify(newprofile) !== JSON.stringify($page.data.session.user.profile));

	async function uploadAvatar() {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must Select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${newprofile.id}.${fileExt}`;

			let { error: uploadError } = await supabaseClient.storage
				.from('avatars')
				.upload(filePath, file, { upsert: true });
			if (uploadError) throw uploadError;

			newprofile.avatar = filePath;
		} finally {
			uploading = false;
		}
	}

	const resetAvatar = () => {
		newprofile.avatar = null;
	};

	let saving = false;

	const updateUser = async () => {
		saving = true;
		try {
			const {error} = await supabaseClient
				.from<Profile>('profiles')
				.update({
					first_name: newprofile.first_name,
					last_name: newprofile.last_name,
					avatar: newprofile.avatar,
					birthday: newprofile.birthday,
					links: newprofile.links,
					about: newprofile.about,
					best_memory: newprofile.best_memory,
					strong_points: newprofile.strong_points,
					better_promo: newprofile.better_promo,
					timeline: newprofile.timeline
				})
				.match({id: newprofile.id})
				.single();

			if (newprofile.avatar !== $page.data.session.user.profile.avatar) {
				await supabaseClient.storage.from('avatars').remove($page.data.session.user.profile.avatar);
			}

			if (error) throw error;
			await invalidate();
			// $page.data.session.user = data;
			newprofile = JSON.parse(JSON.stringify($page.data.session.user.profile));
		} catch (err) {
			console.log(err);
		} finally {
			saving = false;
		}
	};
</script>

{#if newprofile}
	{#if edited}
		<div class="popup">
			<div class="content">
				Il y a des modifications non enregistrées.
				<div class="container">
					<Button on:click={() => (newprofile = JSON.parse(JSON.stringify($page.data.session.user.profile)))}>
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
						avatar={newprofile.avatar}
						first_name={newprofile.first_name}
						last_name={newprofile.last_name}
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
					<Input type="text" bind:value={newprofile.first_name}>Prénom</Input>
					<Input type="text" bind:value={newprofile.last_name}>Nom</Input>
					<Input type="date" bind:value={newprofile.birthday}>Date de naissance</Input>
					<!--					<Select bind:value={newprofile.god} name="Parrain ou marraine">-->
					<!--						<option value={ItemType.education}>Étude</option>-->
					<!--						<option value={ItemType.internship}>Stage</option>-->
					<!--						<option value={ItemType.work}>Travail</option>-->
					<!--					</Select>-->
				</div>
				<div class="info__links">
					<div class="website">
						<GlobeAltIcon />
						<Input type="text" bind:value={newprofile.links.website}>Site web</Input>
					</div>
					<div class="twitter">
						<TwitterIcon />
						<Input type="text" bind:value={newprofile.links.twitter}>
							Twitter
							<p slot="helper">Seulement le nom d'utilisateur sans le @</p>
						</Input>
					</div>
					<div class="github">
						<GithubIcon />
						<Input type="text" bind:value={newprofile.links.github}>
							Github
							<p slot="helper">Seulement le nom d'utilisateur sans le @</p>
						</Input>
					</div>
					<div class="facebook">
						<FacebookIcon />
						<Input type="text" bind:value={newprofile.links.facebook}>
							Facebook
							<p slot="helper">Seulement le nom d'utilisateur sans le @</p>
						</Input>
					</div>
					<div class="instagram">
						<InstagramIcon />
						<Input type="text" bind:value={newprofile.links.instagram}>
							Instagram
							<p slot="helper">Seulement le nom d'utilisateur sans le @</p>
						</Input>
					</div>
					<div class="linkedin">
						<LinkedinIcon />
						<Input type="text" bind:value={newprofile.links.linkedin}>
							Linkedin
							<p slot="helper">Seulement le nom d'utilisateur sans le @</p>
						</Input>
					</div>
				</div>
			</div>
		</section>

		<section class="about">
			<h2>A propos</h2>
			<Textarea bind:value={newprofile.about}>
				<p slot="helper">
					Dit nous ce que tu fait actuellement et ce que tu veux faire par la suite. En passant tu
					pourras nous glisser quelques mots sur ton activité quotidienne, et comment tu te sens
					globalement :p.
				</p>
			</Textarea>
		</section>
		<section class="anecdote">
			<h2>Informations de PREMIÈRE importance</h2>
			<Textarea bind:value={newprofile.best_memory}>
				Meilleur souvenir de la LBM
				<p slot="helper">
					Nostalgique de la belle époque des tempêtes et des odeurs de goémon, fais nous part de ton
					meilleur souvenir :).
				</p>
			</Textarea>
			<Textarea bind:value={newprofile.strong_points}>
				Points forts de la LBM
				<p slot="helper">
					Qu'est ce que la licence t'as apporté de mieux sur le point personnel ou académique ? Les
					réponses évidentes tel que "petites promos" ou "licence à l'étranger" sont a éviter
					puisque c'est pas assez personnel.
				</p>
			</Textarea>
			<Textarea bind:value={newprofile.better_promo}>
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
						(newprofile.timeline = [
							{ type: '', name: '', date: '', place: '', description: '' },
							...newprofile.timeline
						])}><PlusIcon slot="icon" /> Ajouter un item</Button
				>
			</div>
			{#each newprofile.timeline as timelineItem, index (index)}
				<div class="timelineItem">
					<div class="control">
						<Button
							color="red"
							on:click={() =>
								(newprofile.timeline = [
									...newprofile.timeline.slice(0, index),
									...newprofile.timeline.slice(index + 1)
								])}><TrashIcon slot="icon" /></Button
						>
						{#if index > 0}
							<Button
								color="accent-3"
								on:click={() => {
									let item = newprofile.timeline.splice(index, 1)[0];
									newprofile.timeline.splice(index - 1, 0, item);
									newprofile.timeline = [...newprofile.timeline];
								}}><ArrowUpIcon slot="icon" /></Button
							>
						{/if}
						{#if index < newprofile.timeline.length - 1}
							<Button
								color="accent-3"
								on:click={() => {
									let item = newprofile.timeline.splice(index, 1)[0];
									newprofile.timeline.splice(index + 1, 0, item);
									newprofile.timeline = [...newprofile.timeline];
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
  @import './profile';
</style>
