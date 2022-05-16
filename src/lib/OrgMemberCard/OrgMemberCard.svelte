<script lang="ts">
	export let image: string;
	export let name: string;
	export let role: string;
</script>

<div class="cardAsso">
	<img src={image} alt={name} class="cardAsso__image" />
	<div class="cardAsso__content">
		<h3 class="cardAsso__content__name">{name}</h3>
		<p class="cardAsso__content__role">{role}</p>
	</div>
</div>

<style lang="scss">
	@import './OrgMemberCard';
</style>
