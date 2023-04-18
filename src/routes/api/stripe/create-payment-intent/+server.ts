import {json} from '@sveltejs/kit';
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
	amount: number;
	user: {
		id: string;
		email: string;
	}
};

export const POST = (async ({request}) => {
	const body: PostBody = await request.json();

	const paymentIntent = await stripe.paymentIntents.create({
		amount: body.amount,
		// note, for some EU-only payment methods it must be EUR
		currency: 'eur',
		// specify what payment methods are allowed
		// can be card, sepa_debit, ideal, etc...
		payment_method_types: ['card'],
		receipt_email: body.user.email,
		metadata: {
			user_id: body.user.id
		}
	});

	return json({clientSecret: paymentIntent.client_secret, id: paymentIntent.id})
}) satisfies RequestHandler;