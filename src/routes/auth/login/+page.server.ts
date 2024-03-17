import { redirect, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from "oslo/password";
import { lucia } from '$lib/server/auth';
import { zfd } from 'zod-form-data';

export const load = async (event) => {
	if (event.locals.session) {
		redirect(307, '/profile');
	}
};

export const actions = {
    default: async (event) => {
		const data = await event.request.formData();

		const schema = zfd.formData({
			email: zfd.text(),
			password: zfd.text(),
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

        try {
            const userRecord = await db.select().from(user).where(eq(user.email, res.data.email));

			if (userRecord.length === 0) {
				throw new Error('Invalid credentials');
			}

			if (!userRecord[0].password) {
				throw new Error('Invalid credentials');
			}

			const isValidPassword = await new Argon2id().verify(userRecord[0].password, res.data.password);

			console.log(isValidPassword)

			if (!isValidPassword) {
				throw new Error('Invalid credentials');
			}

			const session = await lucia.createSession(userRecord[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});

            // Redirect to the profile page
            return redirect(307, '/profile');
        } catch (error) {
            // Handle login errors (e.g., invalid credentials)
            return { status: 401, body: { error: 'Invalid credentials' } };
        }
    }
};