<script lang="ts">
	import {page} from "$app/stores";
	import Button from "$lib/primitives/Button/Button.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";

	let isGeneralRanking: boolean;
	$: isGeneralRanking = $page.url.pathname == "/ranking";
</script>

<PageTitle description="Vote pour les meilleurs professeurs et découvre le classement général des LBM"
		   title="Le classement"/>

<div class="controls">
	<a href="/ranking">
		<Button color={isGeneralRanking ? "green": "accent-2"}>
			Classement général
		</Button>
	</a>
	<a href="/ranking/edit">
		<Button color={!isGeneralRanking ? "green": "accent-2"}>
			Classement personel
		</Button>
	</a>
</div>

<slot/>

<style lang="scss">
  @use "src/scss/colors";

  .controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 10px;
    gap: 10px;

    a {
      text-decoration: none;
    }
  }
</style>

