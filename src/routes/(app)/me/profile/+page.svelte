<script lang="ts">
    import {Icon} from "@steeze-ui/svelte-icon";
    import {ArrowDown, ArrowUp, GlobeAlt, Plus, Trash} from "@steeze-ui/heroicons";
    import {supabaseClient} from "$lib/db";
    import type {GodparentProfile, LoggedInUser} from "src/types/user.types";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import Input from "$lib/primitives/Input/Input.svelte";
    import TwitterIcon from "$lib/icons/TwitterIcon.svelte";
    import GithubIcon from "$lib/icons/GithubIcon.svelte";
    import FacebookIcon from "$lib/icons/FacebookIcon.svelte";
    import InstagramIcon from "$lib/icons/InstagramIcon.svelte";
    import LinkedinIcon from "$lib/icons/LinkedinIcon.svelte";
    import Button from "$lib/primitives/Button/Button.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import Select from "$lib/primitives/Select/Select.svelte";
    import Checkbox from "$lib/primitives/Checkbox/Checkbox.svelte";
    import Textarea from "$lib/primitives/Textarea/Textarea.svelte";
    import {ItemType} from "$lib/components/Timeline/timeline.type.js";
    import SavePopup from "$lib/components/SavePopup/SavePopup.svelte";
    import {invalidate} from "$app/navigation";
    import {theme} from "$lib/stores.js";
    import Compressor from "compressorjs";

    let uploading = false;
    let saving = false;
    let files: FileList;
    let fileInput: HTMLInputElement;
    let edited: boolean;

    let newProfile: LoggedInUser = <LoggedInUser>{...$page.data.user};
    $: edited = JSON.stringify(newProfile) !== JSON.stringify($page.data.user);

    async function uploadAvatar() {
        try {
            uploading = true;

            if (!files || files.length === 0) {
                throw new Error('You must Select an image to upload.');
            }

            let file: File | Blob = files[0];

            const fileExt = files[0].name.split('.').pop();
            const filePath = `${Math.random()}.${newProfile.id}.${fileExt}`;

            const compressor = new Compressor(file, {
                quality: 0.8,
                maxWidth: 600,
                maxHeight: 600,
                mimeType: 'image/webp',
                async success(result) {
                    file = result;
                    let {error: uploadError} = await supabaseClient.storage
                        .from('avatars')
                        .upload(filePath, file, {upsert: true});
                    if (uploadError) throw uploadError;

                    newProfile.avatar = filePath;
                },
                error(err) {
                    console.error(err.message);
                },
            });


        } finally {
            uploading = false;
        }
    }


    const updateUser = async () => {
        saving = true;
        const {error} = await supabaseClient
            .from('profiles')
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
                timeline: newProfile.timeline,
            })
            .match({id: newProfile.id})
            .single();

        if (error) console.error(error);

        if ($page.data.user?.godparents && $page.data.user.godparents !== newProfile.godparents) {
            let godparentsToRemove = $page.data.user.godparents
                .filter(godparent => !newProfile.godparents.some(g => g.profile.id === godparent.profile.id));

            await supabaseClient
                .from('godparents')
                .upsert(newProfile.godparents.map((godparent) => {
                    return {
                        user_id: newProfile.id,
                        godparent_id: godparent.profile.id,
                        is_adopted: godparent.is_adopted
                    }
                }));

            await supabaseClient
                .from('godparents')
                .delete()
                .eq('user_id', newProfile.id)
                .in('godparent_id', godparentsToRemove.map(godparent => godparent.profile.id));

            if ($page.data.user.avatar && newProfile.avatar !== $page.data.user.avatar) {
                await supabaseClient.storage.from('avatars').remove([$page.data.user.avatar]);
            }
        }

        await invalidate('supabase:auth'); // trigger a reload of the user data by recalling the hook

        newProfile = <LoggedInUser>{...$page.data.user};

        saving = false;
    };

    async function loadPossibleGodparents() {
        let currentGodparents = newProfile.godparents.map(godparent => godparent.profile.id);
        const {data, error} = await supabaseClient
            .from('profiles')
            .select('id, first_name, last_name')
            .eq('promo_id', newProfile.promo_id - 1)
            .not('id', "in", `(${currentGodparents})`)
            .order('first_name');

        if (error) throw error;
        possibleGodparents = data as GodparentProfile[];
    }

    let possibleGodparents: GodparentProfile[] = [];
    let selectGodparents = '';

    function addGodparent(godparent) {
        godparent = JSON.parse(godparent);
        newProfile.godparents = [
            ...newProfile.godparents,
            {
                profile: godparent,
                is_adopted: newProfile.godparents.length > 0
            }
        ];

        possibleGodparents = possibleGodparents.filter(p => p.id !== godparent.id);
    }

    function removeGodparent(godparent, index) {
        newProfile.godparents = [...newProfile.godparents.slice(0, index), ...newProfile.godparents.slice(index + 1)];
        possibleGodparents = [...possibleGodparents, godparent.profile];
    }

    onMount(async () => {
        await loadPossibleGodparents();
    });
</script>

{#if edited}
  <SavePopup onReset={async () => {
			newProfile = {...$page.data.user}
			await loadPossibleGodparents();
		}} onSave={updateUser} {saving}
  />
{/if}


<div class="back">
  <a href="/static" on:click|preventDefault={() => window.history.back()}>← Retour</a>
</div>
<div class="user {$theme}">
  <section class="info">
    <div class="info__avatar">
      <Avatar
          avatar={newProfile.avatar}
          first_name={newProfile.first_name}
          last_name={newProfile.last_name}
      />
      <div class="container">
        <Button on:click={() => newProfile.avatar = null}>
          Réinitialiser
        </Button>
        <Button
            color="accent-3"
            disabled={uploading}
            hover={false}
            on:click={() => fileInput.click()}
        >{uploading ? 'Chargement' : 'Changer mon avatar'}
          <input
              accept="image/*"
              bind:files
              bind:this={fileInput}
              disabled={uploading ? "disabled" : ""}
              id="single"
              on:change={uploadAvatar}
              style="visibility: hidden; position:absolute;top:0;left:0;width:0;height:0;"
              type="file"
          />
        </Button>
      </div>
    </div>
    <div class="container">
      <div class="info__names">
        <Input bind:value={newProfile.first_name} type="text">Prénom</Input>
        <Input bind:value={newProfile.last_name} type="text">Nom</Input>
        <Input bind:value={newProfile.birthday} type="date">Date de naissance</Input>
      </div>
      <div class="info__links">
        <div class="website">
          <Icon class="icon" src={GlobeAlt}/>
          <Input bind:value={newProfile.links.website} type="text">Site web</Input>
        </div>
        <div class="twitter">
          <TwitterIcon/>
          <Input bind:value={newProfile.links.twitter} type="text">
            Twitter
            <p slot="helper">Seulement le nom d'utilisateur sans le @</p>
          </Input>
        </div>
        <div class="github">
          <GithubIcon/>
          <Input bind:value={newProfile.links.github} type="text">
            Github
            <p slot="helper">Seulement le nom d'utilisateur sans le @</p>
          </Input>
        </div>
        <div class="facebook">
          <FacebookIcon/>
          <Input bind:value={newProfile.links.facebook} type="text">
            Facebook
            <p slot="helper">Seulement le nom d'utilisateur sans le @</p>
          </Input>
        </div>
        <div class="instagram">
          <InstagramIcon/>
          <Input bind:value={newProfile.links.instagram} type="text">
            Instagram
            <p slot="helper">Seulement le nom d'utilisateur sans le @</p>
          </Input>
        </div>
        <div class="linkedin">
          <LinkedinIcon/>
          <Input bind:value={newProfile.links.linkedin} type="text">
            Linkedin
            <p slot="helper">Seulement le nom d'utilisateur sans le @</p>
          </Input>
        </div>
      </div>
    </div>
  </section>
  <section class="godparents">
    <Select bind:value={selectGodparents} name="Ajouter un parrain ou une marraine" on:change={(e) =>{
				addGodparent(e.target.value);
				selectGodparents = '';
			}}
    >
      {#each possibleGodparents as possibleGodparent, index}
        <option
            value={JSON.stringify({id: possibleGodparent.id, first_name:possibleGodparent.first_name, last_name:possibleGodparent.last_name})}>{possibleGodparent.first_name} {possibleGodparent.last_name}</option>
      {/each}
    </Select>
    <div class="container">
      {#each newProfile.godparents as godparent, index}
        <div class="godparent">
          <Avatar
              avatar={godparent.profile.avatar}
              first_name={godparent.profile.first_name}
              last_name={godparent.profile.last_name}
          />
          <div class="info">
            {godparent.profile.first_name} {godparent.profile.last_name}
            <Checkbox filled={true} bind:value={godparent.is_adopted}>
              Adoption ?
            </Checkbox>
          </div>
          <Button color="red" on:click={() => removeGodparent(godparent, index)}>
            <Icon src={Trash} class="icon"/>
          </Button>
        </div>
      {/each}
    </div>
  </section>
  <section class="about">
    <h2>A propos</h2>
    <Textarea bind:value={newProfile.about}>
				<p slot="helper">
					Dit nous ce que tu fais actuellement et ce que tu veux faire par la suite. En passant tu
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
					réponses évidentes tel que "petites promos" ou "licence à l'étranger" sont a éviter
					puisque c'est pas assez personnel.
				</p>
			</Textarea>
    <Textarea bind:value={newProfile.better_promo}>
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
						(newProfile.timeline = [
							{ type: '', name: '', date: '', place: '', description: '' },
							...newProfile.timeline
						])}>
        <Icon class="icon" slot="icon" src={Plus}/>
        Ajouter un item
      </Button
      >
    </div>
    {#each newProfile.timeline as timelineItem, index (index)}
      <div class="timelineItem">
        <div class="control">
          <Button
              color="red"
              on:click={() =>
								(newProfile.timeline = [
									...newProfile.timeline.slice(0, index),
									...newProfile.timeline.slice(index + 1)
								])}>
            <Icon src={Trash} class="icon" slot="icon"/>
          </Button>
          {#if index > 0}
            <Button
                color="accent-3"
                on:click={() => {
									let item = newProfile.timeline.splice(index, 1)[0];
									newProfile.timeline.splice(index - 1, 0, item);
									newProfile.timeline = [...newProfile.timeline];
								}}>
              <Icon src={ArrowUp} class="icon" slot="icon"/>
            </Button>
          {/if}
          {#if index < newProfile.timeline.length - 1}
            <Button
                color="accent-3"
                on:click={() => {
									let item = newProfile.timeline.splice(index, 1)[0];
									newProfile.timeline.splice(index + 1, 0, item);
									newProfile.timeline = [...newProfile.timeline];
								}}>
              <Icon src={ArrowDown} class="icon" slot="icon"/>
            </Button>
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
  @import 'edit_profile';
</style>
