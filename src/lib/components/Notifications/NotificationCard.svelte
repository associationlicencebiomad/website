<script lang="ts">
	import {CheckCircle, ExclamationCircle, ExclamationTriangle, InformationCircle, XMark} from "@steeze-ui/heroicons";
	import {Icon} from "@steeze-ui/svelte-icon";
	import type {Notification} from "src/types/notifications.types";
	import {NotificationType} from "src/types/notifications.types";

	export let notification: Notification;
	export let onRemove: () => void;
</script>


<div class="notification {notification.type}">
    {#if notification.type === NotificationType.Success}
        <Icon src={CheckCircle} class="icon"/>
    {:else if notification.type === NotificationType.Info}
        <Icon src={InformationCircle} class="icon"/>
    {:else if notification.type === NotificationType.Warning}
        <Icon src={ExclamationTriangle} class="icon"/>
    {:else if notification.type === NotificationType.Error}
        <Icon src={ExclamationCircle} class="icon"/>
    {/if}

    <div class="notification__content">
        <h3 class="notification__title">{notification.title}</h3>
        <p class="notification__message">{notification.description}</p>
    </div>
    <button class="close" on:click={onRemove}>
        <Icon class="close-icon" src={XMark}/>
    </button>
</div>


<style lang="scss">
  @use "src/scss/colors";

  .notification {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    max-width: 500px;
    margin: 8px;
    background-color: colors.$white-0;
    color: colors.$black-0;

    padding: 1rem;
    border-radius: 10px;

    &.success {
      background-color: colors.$green;
    }

    &.info {
      background-color: colors.$accent-3;
    }

    &.warning {
      background-color: colors.$yellow;
    }

    &.error {
      background-color: colors.$red;
    }


    :global(.close) {
      align-self: flex-start;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: colors.$accent-3;
      }
    }

    :global(.icon) {
      width: 48px;
      height: 48px;
      margin-right: 12px;
    }

    &__title {
      font-size: 18px;
      font-weight: 500;
    }

    &__message {
      font-weight: 300;
    }
  }
</style>