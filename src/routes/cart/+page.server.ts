import type { TCartEntry } from '$lib/client/cart.js';
import { stripe } from '$lib/server/stripe';
import { error, redirect } from '@sveltejs/kit';
import type Stripe from 'stripe';
import { track } from '@vercel/analytics/server';

export const actions = {
	default: async (event) => {
		const body = (await event.request.json()) as TCartEntry[];

		const user = event.locals.user;

		const customerId = user ? user.stripeCustomerId ?? undefined : undefined;

		// see if shipping should be added...
		const total =
			body.reduce((prev, curr) => {
				return {
					...prev,
					size: {
						...prev.size,
						price: prev.size.price + curr.size.price * curr.quantity
					}
				};
			}).size.price / 100;

		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
			...body.map((item) => {
				return {
					price: item.size.stripePriceId,
					quantity: item.quantity
				};
			})
		];

		// if (total < 65) {
		// 	// add shipping to total
		// 	line_items.push({
		// 		price_data: {
		// 			currency: 'USD',
		// 			product_data: {
		// 				name: 'US Shipping'
		// 			},
		// 			unit_amount: 1500
		// 		},
		// 		quantity: 1
		// 	});
		// }

		const session = await stripe.checkout.sessions.create({
			shipping_address_collection: {
				allowed_countries: ['US']
			},
			shipping_options: [
				{
					"shipping_rate_data": {
						"type": "fixed_amount",
						"fixed_amount": {"amount": total >= 65 ? 0 : 700, "currency": "usd"},
						"display_name": total >= 65 ? "Free shipping" : "Standard shipping",
						"delivery_estimate": {
							"minimum": {"unit": "business_day", "value": 5},
							"maximum": {"unit": "business_day", "value": 7},
						},
					},
				},
				{
					"shipping_rate_data": {
						"type": "fixed_amount",
						"fixed_amount": {"amount": 1500, "currency": "usd"},
						"display_name": "Next day air",
						"delivery_estimate": {
							"minimum": {"unit": "business_day", "value": 1},
							"maximum": {"unit": "business_day", "value": 1},
						},
					},
				},
				// {
				// 	"shipping_rate_data": {
				// 		"type": "fixed_amount",
				// 		"fixed_amount": {"amount": 0, "currency": "usd"},
				// 		"display_name": "Friends & Family Hand Delivered (Local Only)",
				// 		"delivery_estimate": {
				// 			"minimum": {"unit": "business_day", "value": 1},
				// 			"maximum": {"unit": "business_day", "value": 1},
				// 		},
				// 	},
				// },
			],
			line_items,
			customer: customerId,
			customer_creation: user && !customerId ? 'always' : undefined,
			customer_update: customerId
				? {
						shipping: 'auto'
				  }
				: undefined,
			metadata: {
				codes: JSON.stringify(
					body.map((item) => ({
						quantity: item.quantity,
						code: item.size.code
					}))
				),
				userId: user ? user.id : ''
			},
			mode: 'payment',
			success_url: `${event.url.origin}/status/checkout/success`,
			cancel_url: `${event.url.origin}/status/checkout/fail`,
			automatic_tax: { enabled: true },
			billing_address_collection: 'required'
		});

		if (session.url) {
			await track('StartedCheckout', { total });
			redirect(307, session.url);
		}

		// TODO: make these errors not suck
		error(500);
	}
};