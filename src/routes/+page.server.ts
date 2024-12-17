import { db } from '$lib/server/db';
import { productImage } from '$lib/server/db/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { presaleFormSchema } from '$lib/components/PreSaleHoodie.svelte';
import { superValidate } from "sveltekit-superforms";
import { fail, type Actions } from "@sveltejs/kit";
import { emailList, hoodieSignups } from '$lib/server/db/schema';
import { generateId } from 'lucia';
import { sendThankYouListEmail, sendPresaleSignupEmail } from '$lib/server/resend';
import { desc, eq } from 'drizzle-orm';

type SendCollection = {
	name: string;
	tagLine: string;
	productInfo: {
		cloudinaryId: string | null;
		secondaryCloudinary: string | null;
		name: string;
		availableSizes: string[];
		soldOutSizes: string[];
		link: string;
	}[];
	dark: boolean;
	collectionTag: string;
};

type Asset = {
	mobileLogo: string;
	desktopLogo: string;
	mobileHomeImage: string;
	desktopHomeImage: string;
	homeTitle: string;
	homeSubtitle: string;
	tagLink: string;
};

export const actions: Actions = {
	presale: async (event) => {
		const form = await superValidate(event, zod(presaleFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid form submission',
			});
		}

		// Check if email already exists
		const existingEmail = await db.select().from(hoodieSignups).where(eq(hoodieSignups.email, form.data.email));
		if (existingEmail.length > 0) {
			return fail(400, {
				form,
				error: 'Email already exists',
			});
		}

		// Database operation to store user for presale
		await db.insert(hoodieSignups).values({
			email: form.data.email,
			name: form.data.name,
			size: form.data.size,
			createdAt: new Date()
		});

		await sendPresaleSignupEmail(form.data.email, form.data.name);

		return {
			success: true,
			form,
		};
	},
};

export const load = async () => {
	const collections = await db.query.productTag.findMany({
		with: {
			products: {
				with: {
					product: {
						with: {
							sizes: true,
							images: {
								limit: 2,
								orderBy: desc(productImage.isVertical)
							}
						}
					}
				}
			}
		}
	});

	// transform
	const sendData: SendCollection[] = [];

	collections.forEach((c) => {
		if (c.products.length > 0) {
			sendData.push({
				dark: true,
				collectionTag: c.name,
				name: c.name,
				tagLine: c.desc,
				productInfo: c.products.map((p) => {
					return {
						cloudinaryId: p.product.images.length > 0 ? p.product.images[0].cloudinaryId : null,
						secondaryCloudinary:
							p.product.images.length > 1 ? p.product.images[1].cloudinaryId : null,
						name: p.product.name,
						availableSizes: p.product.sizes
							.map((s) => {
								if (s.isAvailable) {
									return `${s.size}`;
								} else {
									return '';
								}
							})
							.filter((s) => s !== ''),
						soldOutSizes: p.product.sizes
							.map((s) => {
								if (!s.isAvailable) {
									return `${s.size}`;
								} else {
									return '';
								}
							})
							.filter((s) => s !== ''),
						link: `/products/${p.product.id}`
					};
				})
			});
		}
	});

	const assetRecord = await db.query.assets.findFirst();
	const asset: Asset = {
		mobileLogo: assetRecord?.mobileLogo || '',
		desktopLogo: assetRecord?.desktopLogo || '',
		mobileHomeImage: assetRecord?.mobileHomeImage || '',
		desktopHomeImage: assetRecord?.desktopHomeImage || '',
		homeTitle: assetRecord?.homeTitle || '',
		homeSubtitle: assetRecord?.homeSubtitle || '',
		tagLink: assetRecord?.tagLink || ''
	};

	return { collections: sendData, asset: asset };
};
