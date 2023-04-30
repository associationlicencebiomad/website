import type Stripe from "stripe";

export class PaymentIntentManager {
	constructor(private stripe: Stripe, private fetch: typeof window.fetch) {
		this.stripe = stripe;
		this.fetch = fetch;
	}

	async createPaymentIntent(amount: number, user_id: string, user_email: string) {
		const response = await fetch('/api/stripe/create-payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				amount,
				user: {
					id: user_id,
					email: user_email
				},
			})
		});

		return await response.json();
	}

	async updatePaymentIntent(payment_intent_id: string, amount: number) {
		const response = await fetch('/api/stripe/update-payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				payment_intent_id,
				amount
			})
		});

		return await response.json();
	}

	async cancelPaymentIntent(payment_intent_id: string) {
		await this.fetch('/api/stripe/cancel-payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				payment_intent_id: payment_intent_id
			})
		});
	}
}