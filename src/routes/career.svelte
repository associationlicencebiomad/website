<script lang="ts">
	import UserCareerCard from '$lib/userCareerCard/UserCareerCard.svelte';
import { SearchIcon } from '@krowten/svelte-heroicons';
</script>

<section class="title">
	<h1>Les parcours</h1>
	<p>
		Retrouve ici les parcours de chacun, que ce soit la L3 au fin fond du Texas ou bien le master au
		Bahamas.
	</p>
</section>
<div class="container">
	<div class="searchbox">
		<input type="text" placeholder="Rechercher un parcours" />
		<button>
			<SearchIcon />
		</button>
	</div>
</div>
<div class="UsersCareer">
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/300"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/400"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/500"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/299"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/298"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/297"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/296"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/295"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"

	/>
	<UserCareerCard
		name="John Doe"
		profilePicture="https://i.pravatar.cc/294"
		current="Master science de la mer - Sorbonne Paris"
		lbmName="LBM 2021 - Pikoum"
	/>
</div>

<style lang="scss">
	@import './career';
</style>
