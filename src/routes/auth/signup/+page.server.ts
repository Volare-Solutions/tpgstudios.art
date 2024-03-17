import { lucia } from "$lib/server/auth";
import { fail, redirect, error } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { zfd } from 'zod-form-data';

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();

        const schema = zfd.formData({
			email: zfd.text(),
			password: zfd.text(),
			firstName: zfd.text(),
			lastName: zfd.text(),
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(res.data.password);

		// TODO: check if email is already used
        const userRecord = {
            id: userId,
            email: res.data.email,
            providerId: "email",
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            password: hashedPassword
        };
		await db.insert(user).values(userRecord);

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/profile");
	}
};