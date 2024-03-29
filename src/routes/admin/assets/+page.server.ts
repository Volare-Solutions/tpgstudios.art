import { ensureAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db/index.js';
import { assets } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm'
import { zfd } from 'zod-form-data';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, request, params }) => {
	ensureAdmin(locals);

	const asset = await db.query.assets.findFirst();

	return { asset: asset };
};

export const actions = {
	title: async ({ locals, request, params }) => {
		ensureAdmin(locals);

		const data = await request.formData();

		const schema = zfd.formData({
			title: zfd.text(),
			subtitle: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}


		await db
			.update(assets)
			.set({
				homeTitle: res.data.title,
				homeSubtitle: res.data.subtitle,
			})
			.where(eq(assets.id, 'main'));

		return { success: true };
	},
	image: async ({ locals, request, params }) => {
		ensureAdmin(locals);

		const data = await request.formData();

		const schema = zfd.formData({
			cloudinaryId: zfd.text(),
			mode: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		const imageType = res.data.mode === 'mobile' ? 'mobileHomeImage' : 'desktopHomeImage';

		await db
			.update(assets)
			.set({
				[imageType]: res.data.cloudinaryId
			})
			.where(eq(assets.id, 'main'));

		return { success: true };
	},
};