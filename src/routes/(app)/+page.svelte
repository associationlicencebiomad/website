<script lang="ts">
	import Scroll from "$lib/assets/Scroll.svelte";
	import Separator_1 from '$lib/assets/Separator-1.svelte';
	import Separator_2 from '$lib/assets/Separator-2.svelte';
	import OrgMemberCard from '$lib/components/OrgMemberCard/OrgMemberCard.svelte';
	import {page} from "$app/stores";

	if ($page.data.error) console.error($page.data.error);
</script>

<section class="landing">
	<div class="landing__title">
		<h1>Bienvenue sur le site de l'association des licences Bio-MAD.</h1>
	</div>
	<div class="scrollDown">
		<Scroll/>
	</div>
	<div class="separator">
		<Separator_1/>
	</div>
</section>
<section class="about">
	<h2 class="about__title">Une licence en 2 parties</h2>
	<div class="about__content">
		<p class="about__content__text">
			La licence de biologie modélisation et analyse de données (BIO-MAD) se déroule à la station
			biologique de Roscoff les 2 premières années ; l'occasion pour nos frais bacheliers de
			découvrir les oignons de Roscoff, le doux crachin breton et les sorties vélo les cheveux au
			vent. Après ces 2 années de dur labeur entourés de gens vraiment pas ouf, les étudiants ont
			l'opportunité de s'envoler vers de nouveaux horizons. Il y a de quoi satisfaire nos jeunes
			roscovites, la carte des accords avec Sorbonne Université couvre tous les continents. Même si
			la plupart des étudiants privilégient les destinations canadiennes et européennes, certains
			visent des destinations plus exotiques tel que l'Amérique du sud, l'Asie de l'est et
			l'Océanie. C'est l'occasion de quitter notre douce Bretagne et de découvrir de nouvelles
			contrées plus lointaines.
		</p>
		<div class="about__content__video">
			<video src="https://github.com/associationlicencebiomad/website/raw/master/data/presentation.webm" loop autoplay muted controls poster="/images/presentation.png" />
		</div>
	</div>
</section>
<div class="separator">
	<Separator_2/>
</div>
<section class="albm">
	<h2 class="albm__title">L'association :</h2>
	<div class="albm__content">
		<img alt="Logo ALBM" src="/images/logo_albm.png"/>
		<div class="albm__content__container">
			<div class="albm__content__container__item">
				<p class="albm__content__text">
					L'ALBM est l'association des licences Bio-MAD. Elle permet l'organisation de la JEEP. Il
					s'agit de la journée d'échange entre promotions. Lors de cette journée les étudiants
					peuvent échanger sur leurs expériences. Il y a des présentations de parcours de chercheurs
					et d'étudiants. L'association permet aussi d'aider à financer des projets tel que les
					week-ends d'intégration des nouvelles générations.
				</p>
			</div>
			<div class="albm__content__container__item">
				{#if $page.data.buro}
					{#each $page.data.buro as member (member.id)}
						<OrgMemberCard
								first_name={member.profiles.first_name}
								last_name={member.profiles.last_name}
								role={member.role}
								avatar={member.profiles.avatar}
						/>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
  @import './index';
</style>