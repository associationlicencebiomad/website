<script lang="ts">
	import { supabase } from "$lib/supabase-client";
	import type { Profile } from "src/types/database/Profile.type";
import { onMount } from "svelte";

	export let profile: Profile;
	export let src = `https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}&size=250&background=random`;

	const getSrc = async () => {
		try {
			if (profile && profile.avatar) {
				const { data, error } = await supabase.storage.from('avatars').download(profile.avatar)
				
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

<img src={src} alt="{profile.first_name} {profile.last_name}" {...$$restProps}/>
