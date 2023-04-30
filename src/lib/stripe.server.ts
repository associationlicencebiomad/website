import type Stripe from "stripe";
import {SECRET_STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_KEY} from "$env/static/private";
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_URL} from "$env/static/public";

export class WebhookHandler {
	private supabase: ReturnType<typeof createClient>;

	constructor(private stripe: Stripe) {
		this.stripe = stripe;
		this.supabase = createClient(
			PUBLIC_SUPABASE_URL,
			SUPABASE_SERVICE_KEY
		);
	}

	private toBuffer(ab: ArrayBuffer) {
		const buf = Buffer.alloc(ab.byteLength);
		const view = new Uint8Array(ab);
		for (let i = 0; i < buf.length; ++i) {
			buf[i] = view[i];
		}
		return buf;
	}

	async verifySignature(request: Request): Promise<Stripe.Event> {
		const body = this.toBuffer(await request.arrayBuffer());
		const event_signature = request.headers.get('stripe-signature') ?? "";


		return this.stripe.webhooks.constructEvent(
			body,
			event_signature,
			SECRET_STRIPE_WEBHOOK_SECRET
		)
	}

	async handleEvent(event: Stripe.Event) {
		const {type} = event;
		const handler = this.handlers[type];
		if (handler) {
			await handler(event);
		} else {
			console.log(`Unhandled event type: ${type}`);
		}
	}

	handlers: Record<string, (event: Stripe.Event) => Promise<void>> = {
		// "payment_intent.succeeded": async (event) => {
		// 	console.log("payment_intent.succeeded");
		// 	console.log(event);
		// },
		"charge.succeeded": async (event) => {
			const data = event.data.object as Stripe.Charge;

			await this.supabase
				.from("memberships")
				.insert({
					id: data.payment_intent,
					user_id: data.metadata.user_id,
					amount: data.amount,
					date: (new Date(data.created * 1000)).toISOString(),
					receipt_url: data.receipt_url,
				});
		}
	}
}

