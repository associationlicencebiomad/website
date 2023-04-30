import {error} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import Stripe from 'stripe';
import {SECRET_STRIPE_API_VERSION, SECRET_STRIPE_KEY, } from "$env/static/private";
import {WebhookHandler} from "$lib/stripe.server";

// initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	apiVersion: SECRET_STRIPE_API_VERSION,
});

const webhookHandler = new WebhookHandler(stripe);

export const POST = (async ({request}) => {
	let event;

	try {
		event = await webhookHandler.verifySignature(request);
	} catch (err) {
		console.log(err);
		throw error(503);
	}

	await webhookHandler.handleEvent(event);

	return new Response(null, {status: 200})
}) satisfies RequestHandler;