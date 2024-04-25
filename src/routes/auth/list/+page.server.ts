import { db } from '$lib/server/db/index.js';
import { emailList } from '$lib/server/db/schema.js';
import { error, redirect, fail } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { zfd } from 'zod-form-data';
import { sendThankYouListEmail } from '$lib/server/resend';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			email: zfd.text(),
			phone: zfd.text(),
			size: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			return fail(400, {
				error: 'Invalid form submission',
			});
		}

		// Check if email already exists
		const existingEmail = await db.select().from(emailList).where(eq(emailList.email, res.data.email));
		if (existingEmail.length > 0) {
			return fail(400, {
				error: 'Email already exists',
			});
		}

		const key = generateId(20);

		await db.insert(emailList).values({
			email: res.data.email,
			phoneNumber: res.data.phone,
			shirtSize: res.data.size,
			key,
			subscribedAt: new Date()
		});

		await sendThankYouListEmail(res.data.email, key);

		return {
			status: 200,
			body: {
				message: 'Success'
			}
		}
	}
};
