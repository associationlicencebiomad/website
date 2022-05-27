<script lang="ts">
	import { CogIcon, UserIcon, LogoutIcon } from '@krowten/svelte-heroicons';
	export let dropdownOpened: Boolean;
	export let headerOpened: Boolean;

	function dropdownUsed() {
		headerOpened = false;
		dropdownOpened = false;
	}
</script>

<div class="dropdown" class:headerOpened class:hidden={!dropdownOpened}>
	<ul class="dropdown__content">
		<li class="dropdown__content__item">
			<a class="dropdown__link" href="/user/settings" on:click={() => dropdownUsed()}>
				<CogIcon class="icon" /> Settings
			</a>
		</li>
		<li class="dropdown__content__item">
			<a class="dropdown__link" href="/user/profile" on:click={() => dropdownUsed()}>
				<UserIcon class="icon" /> Mon profil
			</a>
		</li>
		<li class="dropdown__content__item">
			<a class="dropdown__link" href="/auth/logout" on:click={() => dropdownUsed()}>
				<LogoutIcon class="icon" /> Logout
			</a>
		</li>
	</ul>
</div>

<style lang="scss">
	@import '../../scss/colors';

	.dropdown {
		position: fixed;
		top: 75px;
		right: 10px;
		z-index: 100;

		background-color: $white-4;
		padding: 10px 20px;
		border-radius: 10px;

		filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));

		&.hidden {
			display: none;
		}

		&__content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
		}

		&::before {
			border: 8px solid transparent;
			border-bottom-color: $white-4;
			position: absolute;
			display: inline-block;

			content: '';

			top: -16px;
			right: 22px;
			left: auto;
		}

		&__link {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			text-decoration: none;
			font-size: 16px;
			font-weight: 400;
			margin: 5px 0px;
			color: inherit;
			outline: none;

			:global(svg) {
				margin-right: 5px;
			}

			&:hover {
				color: $accent-3;
				transition: color ease-in-out 0.2s;
			}
		}

		@media (max-width: 600px) {
			display: none;

			&.headerOpened {
				display: flex !important;
				width: 100%;
				position: static;
				background-color: $white-4;
				border-radius: 10px;
				justify-content: center;
				filter: none;
				padding: 0;
				padding-top: 10px;
				&::before {
					display: none;
				}
			}
		}
	}
</style>
