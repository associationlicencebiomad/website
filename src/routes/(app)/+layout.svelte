<script>
    import Notifications from 'svelte-notifications';

    import Footer from "$lib/components/Footer/Footer.svelte";
    import Header from "$lib/components/Header/Header.svelte";
    import NotificationCard from "$lib/components/Notifications/NotificationCard.svelte";
</script>

<Notifications item={NotificationCard}>
    <Header/>
    <slot/>
    <Footer/>
</Notifications>

<style lang="scss">
    :global(.position-bottom-right) {
      right: 8px;
    }
</style>