<script lang="ts">
import Illustration from '$lib/assets/Illustration.svelte';

import Scroll from '$lib/assets/Scroll.svelte';
import Separator_1 from '$lib/assets/Separator-1.svelte';
import Separator_2 from '$lib/assets/Separator-2.svelte';

	import OrgMemberCard from '$lib/OrgMemberCard/OrgMemberCard.svelte';

</script>

<section class="landing">
	<div class="landing__title">
		<h1>Bienvenue sur le site de la Licence Bio—MAD</h1>
	</div>
	<div class="scrollDown">
		<Scroll />
	</div>
	<div class="separator">
		<Separator_1 />
	</div>
</section>
<section class="about">
	<h2 class="about__title">Une licence en 2 parties</h2>
	<div class="about__content">
		<p class="about__content__text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus tellus imperdiet tellus
			pharetra. Vulputate tempor volutpat feugiat aliquet vestibulum cras ultricies ut eu. Amet
			aenean dapibus bibendum in pellentesque nisi sapien interdum. Consequat ut congue iaculis
			varius at tincidunt pretium sed pellentesque. Eget eget diam faucibus nulla tempus risus,
			mauris, viverra nulla. In id neque bibendum quam lectus. Orci arcu, nulla at nibh amet
			rhoncus, feugiat eleifend. Vivamus odio quis nunc, consequat et pretium sed augue. Felis sit
			risus in aliquam senectus fames cursus. Enim, duis donec ultricies sed. Egestas ornare
			facilisis sem sed eu viverra eros ornare. Ornare placerat sagittis viverra at rutrum.
		</p>
		<div class="about__content__illustration">
			<Illustration />
		</div>
	</div>
</section>
<div class="separator">
	<Separator_2 />
</div>
<section class="albm">
	<h2 class="albm__title">L’association :</h2>
	<div class="albm__content">
		<img src="/images/logo_albm.webp" alt="Logo ALBM" />
		<div class="albm__content__container">
			<div class="albm__content__container__item">
				<p class="albm__content__text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus tellus imperdiet tellus
					pharetra. Vulputate tempor volutpat feugiat aliquet vestibulum cras ultricies ut eu. Amet
					aenean dapibus bibendum in pellentesque nisi sapien interdum. Consequat ut congue iaculis
					varius at tincidunt pretium sed pellentesque. Eget eget diam faucibus nulla tempus risus,
					mauris, viverra nulla.
				</p>
			</div>
			<div class="albm__content__container__item">
				<OrgMemberCard name="Tanguy BERNARD" role="Président" image="/images/pp.png" />
				<OrgMemberCard name="Léo MEYER" role="Vice-président" image="/images/pp.png" />
				<OrgMemberCard name="Enora CORRE" role="Secrétaire" image="/images/pp.png" />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import './index';
</style>
