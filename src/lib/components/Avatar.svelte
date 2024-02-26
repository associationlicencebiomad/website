<script lang="ts">
	import {onMount} from 'svelte';
	import {page} from '$app/stores';

	export let avatar: string | null;
	export let first_name: string;
	export let last_name: string;

	let src: string;

	function hashCode(str: string) { // java String#hashCode
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}

	function intToRGB(i: number) {
		let c = (i & 0x00FFFFFF)
			.toString(16)
			.toUpperCase();

		return "00000".substring(0, 6 - c.length) + c;
	}

	/**
	 * Get color (black/white) depending on bgColor, so it would be clearly seen.
	 * @param bgColor
	 * @returns {string}
	 */
	function getColorByBgColor(bgColor: string) {
		if (!bgColor) {
			return '';
		}
		return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
	}

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
	<div style="background-color: #{intToRGB(hashCode(first_name + last_name))}" class="avatar" {...$$restProps}>
		<span style="color: {getColorByBgColor(intToRGB(hashCode(first_name + last_name)))}">
			{first_name.charAt(0)}{last_name.charAt(0)}
		</span>
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