<script lang="ts">
	import {
		UsersIcon,
		CakeIcon,
		BookOpenIcon,
		CalendarIcon,
		LocationMarkerIcon,
		ChatAltIcon,
		GlobeAltIcon,
		LoginIcon
	} from '@krowten/svelte-heroicons';

	import AnecdoteCard from '$lib/anecdoteCard/AnecdoteCard.svelte';

	import FacebookIcon from '../assets/icons/facebook.svg';
	import InstagramIcon from '../assets/icons/instagram.svg';
import Timeline from '$lib/timeline/Timeline.svelte';
</script>

<div class="back"><a href="/">← Retour</a></div>
<div class="user">
	<div class="user__info">
		<div class="user__info__avatar">
			<img src="/images/pp.png" alt="Avatar" />
		</div>
		<div class="user__info__container">
			<div class="user__info__primary">
				<div class="user__info__primary__name">Tanguy BERNARD</div>
				<div class="user__info__primary__links">
					<a href="https://evann.tech" target="_blank" class="link">
						<GlobeAltIcon />
					</a>
					<a href="https://www.facebook.com/groups/360613077352359/" target="_blank" class="link">
						<FacebookIcon />
					</a>
					<a href="https://www.instagram.com/albm_roscoff/" target="_blank" class="link">
						<InstagramIcon />
					</a>
				</div>
			</div>
			<div class="user__info__history">
				<div class="referrer"><UsersIcon /><span>Jane DOE</span></div>
				<div class="birthday"><CakeIcon /><span>27 février 2003</span></div>
				<div class="promoType"><BookOpenIcon /><span>Bio-Maths</span></div>
				<div class="promo"><CalendarIcon /><span>LBM 2021 — Pidiaoul</span></div>
				<div class="current"><LocationMarkerIcon /><span>Paris — Sorbonne université</span></div>
			</div>
			<div class="user__info__contact">
				<p>Une question sur mon parcours, mes études actuelle ou le pays de ma L3 ?</p>
				<button>Message <ChatAltIcon /></button>
			</div>
		</div>
	</div>
	<div class="user__about">
		<h3>A propos :</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sed euismod sed quis aliquet
			volutpat ante sit. Nulla amet malesuada senectus morbi sed pellentesque mi, id et. Aliquam
			laoreet a nulla egestas quis nibh ullamcorper proin ipsum. In tortor, ullamcorper tempus
			euismod lacus, aliquet sed. Sed tellus praesent id sed. At mi tempus feugiat porttitor id
			tincidunt. Id ullamcorper vehicula mauris nibh amet cras purus mauris etiam. Sodales morbi
			risus ultrices est. Tincidunt maecenas hendrerit bibendum amet. Massa aliquet pellentesque
			arcu integer. Praesent ac in a erat est blandit. Eu morbi at cursus faucibus quis ut. Amet
			facilisi risus interdum hendrerit ultricies cras auctor scelerisque tristique. Consectetur
			adipiscing magna in aliquet. Dictum eu enim pharetra ultrices tempus duis. Aliquet nulla
			adipiscing orci morbi ultrices. Facilisis bibendum amet massa lectus cras rutrum. Orci dictum
			commodo, molestie faucibus risus. Vestibulum ullamcorper tristique curabitur eget duis. Diam
			aliquam scelerisque et mattis. Id est commodo, egestas facilisi.
		</p>
	</div>
	<div class="user__anecdote">
		<AnecdoteCard
			name="Meilleur souvenir de la LBM"
			content={'Papatrick, tonton stef, oncle tanguy, Jean Mari qui danse, et "Toutes les algues se mangent, mais c\'est pas bon" de Jonas.'}
		/>
		<AnecdoteCard
			name="Points forts de la LBM"
			content={'La famille des pitchounes, vie en communauté, interdisciplinarité, proximité avec le milieu de la recherche, horizontalité dans les relations élèves/profs, un cadre de vie plutôt cool!'}
		/>
		<AnecdoteCard
			name="C'était mieux du temps de ta promo ? Prouve le !"
			content={'Je ne sais pas si dans les autres promos, certains ont "failli être virés" pour avoir essayé de rentrer dans un sèche-linge...'}
		/>
	</div>
	<div class="user__timeline">
		<Timeline />
	</div>
</div>

<style lang="scss">
	@import './profile';
</style>
