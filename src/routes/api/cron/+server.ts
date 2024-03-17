import { env } from '$env/dynamic/private';
import Stripe from 'stripe';
import { db } from '$lib/server/db/index';
import { productSize } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

/**
 * This cron job is used to adjust the price of products in the database to match the price in Stripe.
 * Scheduled to run every 24 hours.
 * @param req
 * @returns
 */
export async function GET(req) {
	try {
		const dbProducts = await db.select().from(productSize);

		for (const dbProduct of dbProducts) {
			const stripePrice = await stripe.prices.retrieve(dbProduct.stripePriceId);
			if (stripePrice.unit_amount !== dbProduct.price) {
				await db
					.update(productSize)
					.set({ price: Number(stripePrice.unit_amount) })
					.where(eq(productSize.code, dbProduct.code));
				console.log(`Updated price for ${dbProduct.productId}`);
			}
		}
	} catch (e) {
		console.error(e);
		return new Response('Error', { status: 500 });
	}

	return new Response('OK');
}
