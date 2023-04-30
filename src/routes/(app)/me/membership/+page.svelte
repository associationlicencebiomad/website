<script lang="ts">
	import {onDestroy, onMount} from 'svelte'
	import {loadStripe} from '@stripe/stripe-js'
	import {PUBLIC_STRIPE_KEY} from '$env/static/public'
	import {Elements, PaymentElement} from "svelte-stripe";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import Button from "$lib/primitives/Button/Button.svelte";
	import Input from "$lib/primitives/Input/Input.svelte";
	import {page} from "$app/stores";
	import {PaymentIntentManager} from "$lib/stripe.js";
	import {NotificationType} from "src/types/notifications.types";
	import {getNotificationsContext} from "svelte-notifications";
	import {DateTime} from "luxon";
	import {Icon} from "@steeze-ui/svelte-icon";
	import {ArrowDownTray, Check} from "@steeze-ui/heroicons";

	const {addNotification} = getNotificationsContext();

	let payments = $page.data.payments;
	let hasActiveMembership = $page.data.hasActiveMembership;

	let elements
	let stripe = null

	let clientSecret = null
	let paymentIntent = null
	let paymentIntentManager = null

	let activeOption: number | null = null;
	let customAmount;

	let processing = false
	let processed = false

	onMount(async () => {
		if (!hasActiveMembership) {
			stripe = await loadStripe(PUBLIC_STRIPE_KEY);
			paymentIntentManager = new PaymentIntentManager(stripe, fetch);

			// load payment intent
			({id: paymentIntent, clientSecret} = await paymentIntentManager.createPaymentIntent(
				500,
				$page.data.session.user.id,
				$page.data.session.user.email
			));
			activeOption = 0;
		}
	})

	onDestroy(async () => {
		if (clientSecret && !processed) {
			// cancel previous payment intent
			await paymentIntentManager.cancelPaymentIntent(paymentIntent);
		}
	})

	async function handlePaymentIntentChange(amount, newOption: number, force_update = false) {
		if (!amount || activeOption === newOption && !force_update) return;

		// update payment intent
		({
			id: paymentIntent,
			clientSecret
		} = await paymentIntentManager.updatePaymentIntent(paymentIntent, amount));

		activeOption = newOption;
	}

	async function submit() {
		// avoid processing duplicates
		// avoid processing if user already has an active membership
		if (processing || hasActiveMembership) return

		processing = true;

		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		if (result.error) {
			// payment failed, notify user
			addNotification({
				position: "bottom-right",
				removeAfter: 15000,
				type: NotificationType.Error,
				title: `Une erreur est survenue lors du paiement 😢`,
				description: result.error.message ?? ''
			});
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			addNotification({
				position: "bottom-right",
				removeAfter: 10000,
				type: NotificationType.Success,
				title: `Merci pour le soutien ❤️ !`,
				description: 'Votre adhésion à bien été prise en compte et va me permettre de financer mon voyage au bahamas !'
			});
			processed = true;
			hasActiveMembership = true;
		}
	}
</script>


<PageTitle description="Pour organiser des super JEEP, on à besoin de votre contribution !" title="Adhésion"/>

{#if hasActiveMembership}
    <h2>Hourra 🎉 ! Vous êtes déjà adhérent pour l'année {DateTime.now().year} !</h2>
{:else}
    <h2>Adhérer à l'association pour l'année {DateTime.now().year}</h2>
    <div class="payment">
        <div class="options">
            <div class="options__card" class:active={activeOption === 0}
                 on:click={() => handlePaymentIntentChange(500, 0)}>
                <h3>Adhérent</h3>
                <div class="price">
                    5<span>€</span>
                </div>
            </div>
            <div class="options__card" class:active={activeOption === 1}
                 on:click={() => handlePaymentIntentChange(1000, 1)}>
                <h3>Bienfaiteur</h3>
                <div class="price">
                    10<span>€</span>
                </div>
            </div>
            <div class="options__card" class:active={activeOption === 2}
                 on:click={() => handlePaymentIntentChange(customAmount * 100, 2)}>
                <h3>Je choisis</h3>
                <div class="price__control">
                    <Input bind:value={customAmount} min="5"
                           on:change={() => handlePaymentIntentChange(customAmount * 100, 2, true)}
                           type="number"/><span>€</span>
                </div>

            </div>
        </div>

        <div class="payment__info">
            {#if stripe && clientSecret}
                <Elements
                        {stripe}
                        {clientSecret}
                        theme="night"
                        labels="floating"
                        bind:elements
                        variables={{
                            fontFamily: 'Rubik, sans-serif',
                            borderRadius: '10px',
                            colorPrimary: '#5e81ac',
                            colorBackground: '#2e3440',
                            colorDanger: '#bf616a',
                            colorText: '#f2f4f8',
                        }}
                >
                    <form on:submit|preventDefault={submit}>
                        <PaymentElement/>
                        <Button color="accent-3" disabled={processing}>
                            <Icon slot="icon" src={Check} class="icon"/>

                            {#if processing}
                                Processing...
                            {:else}
                                Procéder au paiement
                            {/if}
                        </Button>
                    </form>
                </Elements>
            {:else}
                Loading...
            {/if}
        </div>


    </div>
{/if}


{#if payments.length > 0}
    <h2>Historique des paiements</h2>
    <table>
        <thead>
        <tr>
            <th>N° de paiement</th>
            <th>Date</th>
            <th>Description</th>
            <th>Montant</th>
            <th>Facture</th>
        </tr>
        </thead>

        <tbody>
        {#each payments as payment}
            <tr>
                <td>{payment.id}</td>
                <td>{DateTime.fromISO(payment.date).toLocaleString({
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}</td>
                <td>Adhésion pour l'année {DateTime.fromISO(payment.date).year}</td>
                <td>{payment.amount / 100}€</td>
                <td>
                    {#if payment.receipt_url}
                        <Button color="green" on:click={() => window.open(payment.receipt_url, '_blank')}>
                            <Icon src={ArrowDownTray} class="icon"/>
                        </Button>
                    {:else}
                        <Button color="red" disabled>
                            <Icon src={ArrowDownTray} class="icon"/>
                        </Button>
                    {/if}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>

{/if}


<style lang="scss">
  @use "src/scss/colors";
  @import 'src/scss/animations';

  h2 {
    margin: 24px;
    text-align: center;
    font-weight: 500;
    font-size: 36px;
  }

  .payment {
    max-width: 90vw;
    margin: 0 auto;
    padding: 24px;
    background-color: colors.$white-4;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    //flex-wrap: wrap;
    gap: 18px;

    @media screen and (max-width: 1500px) {
      flex-direction: column;
      align-items: center;

    }

    &__info {
      //flex: 3;
      width: 100%;
      max-width: 700px;


    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 2rem 0;

    :global(button) {
      align-self: flex-end;
      justify-self: flex-end;
      font-size: 18px;
      margin-top: 12px;
    }
  }

  .options {
    //flex: 1;
    //width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    //flex-shrink: 100;
    justify-content: space-around;
    gap: 10px;


    &__card {
      width: 200px;
      height: 200px;
      padding: 24px;
      background-color: colors.$accent-2;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &.active {
        background-color: colors.$green;
      }

      h3 {
        color: colors.$white-4;
        font-size: 28px;
        font-weight: 600;

      }

      .price__control {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 15px;

        :global(input) {
          //width: 50px!important;
          font-size: 64px !important;
          padding-bottom: 6px !important;
        }

        span {
          font-size: 18px;
        }

      }

      .price {
        text-align: right;
        font-size: 64px;

        span {
          font-size: 18px;
        }
      }

      &:hover {
        animation: hover-feedback 0.3s ease-in-out;
      }
    }
  }

  button {
    padding: 1rem;
    border-radius: 5px;
    border: solid 1px #ccc;
    color: white;
    background: #7c4dff;
    font-size: 1.2rem;
    margin: 1rem 0;
  }

  table {
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;
    background-color: colors.$white-4;
    padding: 10px;
    border-radius: 10px;
    justify-items: center;


    thead > tr > th {
      background-color: colors.$white-0;
      color: colors.$black-0;
      padding: 10px 5px;
      font-weight: 600;
      font-size: 18px;

      &:first-child {
        border-top-left-radius: 10px;
      }

      &:nth-child(3) {
        @media screen and (max-width: 500px) {
          display: none;
        }
      }

      &:last-child {
        border-top-right-radius: 10px;
      }
    }

    tbody > tr {
      td {
        height: 100%;
        padding: 10px 10px;
        color: colors.$black-3;
        text-align: center;
        border-bottom: 1px solid rgba(colors.$black-3, 30%);
        vertical-align: middle;

        &:first-child {
          word-break: break-word;
        }

        &:nth-child(3) {
          @media screen and (max-width: 500px) {
            display: none;
          }
        }

        &:last-child {
          :global(button) {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%);
          }
        }
      }

      &:last-child {
        td {
          border-bottom: none;
        }
      }
    }


  }
</style>