<script lang="ts">
    import {injectSpeedInsights} from '@vercel/speed-insights/sveltekit';
    import {invalidate} from '$app/navigation';
    import {onMount} from 'svelte';
    import type {LayoutData} from './$types';

    import '../app.scss';
    import {theme} from "$lib/stores";

    injectSpeedInsights();

    export let data: LayoutData;

    $: ({supabase, session} = data);

    onMount(() => {
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => subscription.unsubscribe();
    });
</script>

<svelte:head>
  <title>ALBM</title>
</svelte:head>

<div class={$theme}>
  <slot/>
</div>

<style lang="scss">
  @use "src/scss/colors";

  div {
    font-family: Rubik, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: colors.$black-0;
    background-color: colors.$white-3;
    transition: .3s ease-in-out;

    &.dark {
      color: colors.$white-3;
      background-color: colors.$black-2;
    }
  }
</style>