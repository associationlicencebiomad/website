<script lang="ts">
	import {onMount} from 'svelte';
	import {page} from '$app/stores';
	import Avatar from 'svelte-boring-avatars';

	export let avatar: string | null;
	export let first_name: string;
	export let last_name: string;

	let src: string;

	async function getSrc() {
		if (avatar) {
			const {data, error} = await $page.data.supabase.storage.from('avatars').download(avatar);

			if (error) console.error(error);

			if (data) {
				src = URL.createObjectURL(data);
				return;
			}
		}
	}

	onMount(async () => {
		await getSrc();
	});

	$: avatar, getSrc();
</script>

{#if avatar && src}
	<img class="avatar" {src} alt="{first_name} {last_name}" loading="lazy" {...$$restProps}/>
{:else}
	<div class="avatar" {...$$restProps}>
		<Avatar
				size={100}
				name={`${first_name} ${last_name}`}
				variant="beam"
				colors={['#5e81ac', '#88c0d0', '#b48ead', '#d08770', '#ebcb8b']}
		/>
	</div>
{/if}

<style lang="scss">
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    span {
      padding: 5px;
      font-size: 42px;
      font-weight: 600;
    }
  }
</style>