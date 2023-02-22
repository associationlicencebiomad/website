<script>
	import {theme} from "$lib/stores";
	import {HandRaised} from "@steeze-ui/heroicons";
	import {Icon} from "@steeze-ui/svelte-icon";

	export let isActive = false;
</script>

<div {...$$restProps} class={`dragdropbox ${$theme}`} class:isActive on:dragenter on:dragleave on:drop>
	<Icon src={HandRaised} class="icon"/>
	<span>Glissez ici les professeurs a classer</span>
</div>

<style lang="scss">
  @use "src/scss/colors";

  .dragdropbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: colors.$black-1;
    padding: 16px;
    border-radius: 10px;

    box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1),
    0 2px 0 hsla(0, 0%, 50%, 0.15);
    width: 100%;

    :global(.icon) {
      width: 40px;
      height: 40px;
    }

    &.isActive {
      box-shadow: none;
      transition: all ease-in-out 0.2s;
    }

    &.light {
      background-color: colors.$white-1;
    }
  }
</style>