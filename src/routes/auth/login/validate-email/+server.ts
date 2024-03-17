import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';

export const POST = async ({ request }) => {
    const { email } = await request.json();
    const userRecord = await db.select().from(user).where(eq(user.email, email));
    const isValidEmail = userRecord.length > 0;
    return json({ isValidEmail });
}
