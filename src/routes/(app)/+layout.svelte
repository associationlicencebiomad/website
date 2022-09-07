<script lang="ts">
	import Footer from '../../lib/components/Footer/Footer.svelte';
	import Header from '../../lib/components/Header/Header.svelte';
</script>

<Header/>
<slot/>
<Footer/>

<style global lang="scss">
  @use '../../app';
</style>
