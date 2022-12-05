<script lang="ts">
	import Footer from '../../lib/components/Footer/Footer.svelte';
	import Header from '../../lib/components/Header/Header.svelte';
	import {theme} from "$lib/stores.js";
</script>

<div class={`layout ${$theme}`}>
	<Header/>
	<slot/>
	<Footer/>
</div>


<style global lang="scss">
  @use '../../app';

  @use 'src/scss/colors';

  .layout.dark {
    background-color: colors.$black-2;
  }
</style>
