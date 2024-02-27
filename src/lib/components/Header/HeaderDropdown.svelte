<script lang="ts">
	import {Icon} from "@steeze-ui/svelte-icon";
	import {ArrowLeftOnRectangle, User, CreditCard} from "@steeze-ui/heroicons";
	import {page} from '$app/stores';
	import {theme} from "$lib/stores";

	export let dropdownOpened: boolean;
	export let headerOpened: boolean;

	function dropdownUsed() {
		headerOpened = false;
		dropdownOpened = false;
	}
</script>

<div class={`dropdown ${$theme}`} class:headerOpened class:hidden={!dropdownOpened}>
	<ul class="dropdown__content">
		<!-- <li class="dropdown__content__item">
			<a class="dropdown__link" href="/user/settings" on:click={() => dropdownUsed()}>
				<CogIcon class="icon" /> Settings
			</a>
		</li> -->
		<li class="dropdown__content__item">
			<a class="dropdown__link" href="/me/profile" on:click={() => dropdownUsed()}>
				<Icon src={User}/>
				Mon profil
			</a>
		</li>
		<li class="dropdown__content__item">
			<a class="dropdown__link" href="/me/membership" on:click={() => dropdownUsed()}>
				<Icon src={CreditCard}/>
				Mon adhésion
			</a>
		</li>
		<li class="dropdown__content__item">
			<a class="dropdown__link" on:click={() => {
				dropdownUsed();
				$page.data.supabase.auth.signOut();
			}}>
				<Icon src="{ArrowLeftOnRectangle}"/>
				Logout
			</a>
		</li>
	</ul>
</div>

<style lang="scss">
  @use 'src/scss/colors';

  .dropdown {
    position: fixed;
    top: 75px;
    right: 10px;
    z-index: 100;

    background-color: colors.$white-4;
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
      align-items: flex-start;
    }

	&.dark {
	  background-color: colors.$black-0;
	}

    &.dark::before {
      border-bottom-color: colors.$black-0;
    }

    &::before {
      border: 8px solid transparent;
      position: absolute;
      display: inline-block;
      border-bottom-color: colors.$white-4;

      content: '';

      top: -16px;
      right: 22px;
      left: auto;
    }

    &__link {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      text-decoration: none;
      font-size: 16px;
      font-weight: 400;
      margin: 5px 0;
      color: inherit;
      outline: none;
      cursor: pointer;

      :global(svg) {
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }

      &:hover {
        color: colors.$accent-3;
        transition: color ease-in-out 0.2s;
      }
    }

    @media (max-width: 600px) {
      display: none;

      &.headerOpened {
        display: flex !important;
        width: 100%;
        position: static;
        background-color: inherit;
        border-radius: 10px;
        justify-content: center;
        filter: none;
        padding: 10px 0 0;

        &::before {
          display: none;
        }
      }
    }
  }
</style>