import type { RequestHandler } from '@sveltejs/kit';
import { hoodieSignups } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { sendPresaleSignupEmail } from '$lib/server/resend';

export const post: RequestHandler = async ({ request }) => {
	console.log('API endpoint hit');
	try {
		const { name, email, size } = await request.json();
		console.log('Received data:', { name, email, size });
		
		// Check if the email already exists
		const existingSignup = await db.select().from(hoodieSignups).where(eq(hoodieSignups.email, email));
		if (existingSignup.length > 0) {
			return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
		}

		await db.insert(hoodieSignups).values({
			email: email,
			name: name,
			size: size,
			createdAt: new Date()
		});

		// Send presale signup email
		await sendPresaleSignupEmail(email, name);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error in API handler:', error);
		return new Response(JSON.stringify({ error: 'Failed to save data' }), { status: 500 });
	}
};
