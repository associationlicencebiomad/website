<script lang="ts">
	import { supabase } from "$lib/supabase-client";
	import type { profil } from "src/types/database/profil.type";
	import { afterUpdate, onMount } from "svelte";

	export let avatar: string;
	export let first_name: string;
	export let last_name: string;
	export let src = `https://ui-avatars.com/api/?name=${first_name}+${last_name}&size=250&background=random`;

	const getSrc = async () => {
		src = `https://ui-avatars.com/api/?name=${first_name}+${last_name}&size=250&background=random`;
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
	$: avatar, getSrc()
</script>

<img src={src} alt="{first_name} {last_name}" {...$$restProps}/>
