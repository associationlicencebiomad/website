<script lang="ts">
	import { supabase } from "$lib/supabase-client";
	import type { Profile } from "src/types/database/Profile.type";
	import { onMount } from "svelte";

	export let avatar: string;
	export let first_name: string;
	export let last_name: string;
	export let src = `https://ui-avatars.com/api/?name=${first_name}+${last_name}&size=250&background=random`;

	const getSrc = async () => {
		try {
			if (avatar) {
				const { data, error } = await supabase.storage.from('avatars').download(avatar)
				
				if (error) throw error
				
				if (data) {
					src =  URL.createObjectURL(data)
					return
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	onMount(async () => {
		await getSrc()
	});
</script>

<img src={src} alt="{first_name} {last_name}" {...$$restProps}/>
