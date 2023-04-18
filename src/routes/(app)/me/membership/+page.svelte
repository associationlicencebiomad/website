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
	// import { Elements, PaymentElement, LinkAuthenticationElement, Address } from '$lib'

	let stripe = null
	let paymentIntentManager = null
	let clientSecret = null
	let paymentIntent = null
	let error = null
	let elements
	let processing = false
	let customAmount = 20;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		paymentIntentManager = new PaymentIntentManager(stripe, fetch);
	})

	onDestroy(async () => {
		if (clientSecret) {
			// cancel previous payment intent
			await paymentIntentManager.cancelPaymentIntent(paymentIntent)
			clientSecret = null
			paymentIntent = null
		}
	})

	async function handlePaymentIntentChange(amount) {
		if (paymentIntent) {
			// update payment intent
			({
				id: paymentIntent,
				clientSecret
			} = await paymentIntentManager.updatePaymentIntent(paymentIntent, amount));
		} else {
			// create payment intent
			({
				id: paymentIntent,
				clientSecret
			} = await paymentIntentManager.createPaymentIntent(amount, $page.data.session.user.id, $page.data.session.user.email));
		}

	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return

		processing = true

		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		})

		// log results, for debugging
		console.log({result})

		if (result.error) {
			// payment failed, notify user
			error = result.error
			processing = false
		} else {
			// payment succeeded, redirect to "thank you" page
			// goto('/')
		}
	}
</script>

<PageTitle description="Pour organiser des super JEEP, on à besoin de votre contribution !" title="Adhésion"/>


<Button color="accent-2" on:click={() => handlePaymentIntentChange(500)}>Adhésion 5€</Button>
<Button color="accent-2" on:click={() => handlePaymentIntentChange(1000)}>Bienfaiteur 10€</Button>
<Input bind:value={customAmount} type="number"/>
<Button color="accent-2" on:click={() => handlePaymentIntentChange(customAmount * 100)}>Custom {customAmount}€</Button>


{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}

{#if stripe && clientSecret}
	<Elements
			{stripe}
			{clientSecret}
			theme="flat"
			labels="floating"
			variables={{ colorPrimary: '#7c4dff' }}
			rules={{ '.Input': { border: 'solid 1px #0002' } }}
			bind:elements
	>
		<form on:submit|preventDefault={submit}>
			<PaymentElement/>
			<button disabled={processing}>
				{#if processing}
					Processing...
				{:else}
					Pay
				{/if}
			</button>
		</form>
	</Elements>
{:else}
	Loading...
{/if}

<style>
    .error {
        color: tomato;
        margin: 2rem 0 0;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 2rem 0;
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
</style>