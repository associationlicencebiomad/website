<script lang="ts">
import Avatar from "$lib/Avatar/Avatar.svelte";


	export let avatar: string;
	export let first_name: string;
	export let last_name: string;
	export let role: string;
</script>

<div class="cardAsso">
	<Avatar  avatar={avatar} first_name={first_name} last_name={last_name}/>
	<div class="cardAsso__content">
		<h3 class="cardAsso__content__name">{first_name} {last_name}</h3>
		<p class="cardAsso__content__role">{role}</p>
	</div>
</div>

<style lang="scss">
	@import './OrgMemberCard';
</style>
