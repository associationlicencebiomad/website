<script lang="ts">
	import {page} from "$app/stores";

	import PageTitle from "$lib/components/PageTitle/PageTitle.svelte";
	import Button from "$lib/components/Button/Button.svelte";
	import {onMount} from "svelte";
	import {theme} from "../../../lib/stores";
	import {ThemeType} from "../../../types/Theme.type";

	let isGeneralRanking: boolean;

	onMount(() => {
		if ($theme !== ThemeType.dark) {
			theme.set(ThemeType.dark);

			return () => theme.set(ThemeType.light);
		}
	});


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

