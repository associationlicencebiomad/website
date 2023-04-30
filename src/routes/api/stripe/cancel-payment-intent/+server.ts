import type {RequestHandler} from './$types';
import Stripe from 'stripe';
import {SECRET_STRIPE_API_VERSION, SECRET_STRIPE_KEY} from "$env/static/private";

// initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	apiVersion: SECRET_STRIPE_API_VERSION,
});

type PostBody = {
	payment_intent_id: string;
};

export const POST = (async ({request}) => {
	const body: PostBody = await request.json();

	await stripe.paymentIntents.cancel(body.payment_intent_id);

	return new Response(null, {status: 200});
}) satisfies RequestHandler;