import { ensureAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db/index.js';
import { product } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { zfd } from 'zod-form-data';

export const actions = {
	default: async ({ locals, request }) => {
		ensureAdmin(locals);

		const data = await request.formData();

		const schema = zfd.formData({
			name: zfd.text(),
			desc: zfd.text(),
			fromColor: zfd.text(),
			viaColor: zfd.text(),
			toColor: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		const productId = generateId(15);

		await db.insert(product).values({
			id: productId,
			name: res.data.name,
			desc: res.data.desc,
			gradientColorStart: res.data.fromColor,
			gradientColorVia: res.data.viaColor,
			gradientColorStop: res.data.toColor
		});

		redirect(300, `/admin/products/${productId}/sizes`);
	}
};
