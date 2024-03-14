// SEED THE DB
import {
	product,
	productImage,
	productSize,
	productTag,
	productToProductTag
} from './src/lib/server/db/schema';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { Client } from '@planetscale/database';
import 'dotenv/config';

const seed = async () => {
	// crete db client
	const client = new Client({
		host: process.env.DATABASE_HOST ?? '',
		username: process.env.DATABASE_USERNAME ?? '',
		password: process.env.DATABASE_PASSWORD ?? ''
	});

	const db = drizzle(client);

	// create some products
	const products = [
		{
			name: 'Shirt I',
			desc: 'The first shirt in our Drive Collection, embodying the concentration and accuracy needed in golf.',
			id: 'drive_shirt_i'
		},
		{
			name: 'Shirt II',
			desc: 'The second shirt in our Drive Collection, a testament to the precision and focus of the game.',
			id: 'drive_shirt_ii'
		}
	];

	const insertedProducts = (await db.insert(product).values(products)).rows;

	console.log(`INSERTED: ${insertedProducts.length} products`);

	// create some product sizes
	// TODO STRIPE:
	// replace the stripeProductId and stripePriceId which you get from the dashboard
	const productSizes = [
		{
			code: 'drive_shirt_i_M',
			size: 'M',
			price: 40,
			stripeProductId: 'prod_PduSN2A5zbpwMJ',
			stripePriceId: 'price_1OocdkGq88MAyKwhpaiBsCg0',
			productId: 'drive_shirt_i'
		},
		{
			code: 'drive_shirt_i_L',
			size: 'L',
			price: 40,
			stripeProductId: 'prod_PduSN2A5zbpwMJ',
			stripePriceId: 'price_1OocdkGq88MAyKwhpaiBsCg0',
			productId: 'drive_shirt_i'
		},
		{
			code: 'drive_shirt_i_XL',
			size: 'XL',
			price: 40,
			stripeProductId: 'prod_PduSN2A5zbpwMJ',
			stripePriceId: 'price_1OocdkGq88MAyKwhpaiBsCg0',
			productId: 'drive_shirt_i'
		},
		{
			code: 'drive_shirt_ii_M',
			size: 'M',
			price: 40,
			stripeProductId: 'prod_Pg9lBrLuiQdTDD',
			stripePriceId: 'price_1OqnRqGq88MAyKwhfRxgZRDS',
			productId: 'drive_shirt_ii'
		},
		{
			code: 'drive_shirt_ii_L',
			size: 'L',
			price: 40,
			stripeProductId: 'prod_Pg9lBrLuiQdTDD',
			stripePriceId: 'price_1OqnRqGq88MAyKwhfRxgZRDS',
			productId: 'drive_shirt_ii'
		},
		{
			code: 'drive_shirt_ii_XL',
			size: 'XL',
			price: 40,
			stripeProductId: 'prod_Pg9lBrLuiQdTDD',
			stripePriceId: 'price_1OqnRqGq88MAyKwhfRxgZRDS',
			productId: 'drive_shirt_ii'
		}
	];

	const insertedProductSizes = (await db.insert(productSize).values(productSizes)).rows;

	console.log(`INSERTED: ${insertedProductSizes.length} product sizes`);

	// create some product images
	// TODO CLOUDINARY: update the cloudinaryIds with your own cloudinary ids
	const images = [
		{
			cloudinaryId: 'drive_shirt_i_front',
			width: 1920,
			height: 1280,
			productId: 'drive_shirt_i'
		},
		{
			cloudinaryId: 'drive_shirt_i_back',
			width: 1920,
			height: 1280,
			productId: 'drive_shirt_i'
		},
		{
			cloudinaryId: 'drive_shirt_ii_front',
			width: 1920,
			height: 1280,
			productId: 'drive_shirt_ii'
		},
		{
			cloudinaryId: 'drive_shirt_ii_back',
			width: 1920,
			height: 1280,
			productId: 'drive_shirt_ii'
		}
	];

	const insertedImages = (await db.insert(productImage).values(images)).rows;

	console.log(`INSERTED: ${insertedImages.length} product images`);

	// create some product tags
	const productTags = [
		{
			name: 'Watch This Drive',
			desc: 'Focused and precise, this collection embodies the concentration and accuracy needed in golf.'
		},
		{
			name: 'Grow the Game',
			desc: 'Inspired by the growth and evolution of golf, this collection represents the future of the sport.'
		}
	];

	const insertedTags = (await db.insert(productTag).values(productTags)).rows;

	console.log(`INSERTED ${insertedTags.length} product tags`);

	// attach tags to products
	const productsToTags = [
		{
			productId: 'drive_shirt_i',
			tagId: 'Watch This Drive'
		},
		{
			productId: 'drive_shirt_ii',
			tagId: 'Watch This Drive'
		}
	];

	const insertedTagsToProducts = (await db.insert(productToProductTag).values(productsToTags)).rows;

	console.log(`INSERTED ${insertedTagsToProducts.length} product tag relations`);
};

seed();
