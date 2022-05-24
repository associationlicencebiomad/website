<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import Header from '../lib/header/Header.svelte';
</script>

<Header />

<slot />

<Footer />

<style global lang="scss">
	@use '../app.scss';
</style>
