import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { ListThankYou } from '$lib/emails/list-thank-you';
import { PurchaseThankYou } from '$lib/emails/purchase-thank-you';
import { PresaleSignup } from '$lib/emails/presale-signup';
import * as React from 'react';

export const resend = new Resend(env.RESEND_API_KEY);

export const sendThankYouListEmail = async (email: string, key: string) => {
	try {
		await resend.emails.send({
			from: 'no-reply@tpgstudios.art',
			to: email,
			subject: 'Welcome to TPG Studios!',
			react: <ListThankYou email={email} unsubKey={key} />
		});
		console.log('sent');
	} catch (e) {
		console.log('error sending:', e);
	}
};

export const sendThankYouPurchaseEmail = async (email: string) => {
	try {
		await resend.emails.send({
			from: 'no-reply@tpgstudios.art',
			to: email,
			subject: 'TPG Studios: Thank you for your order!',
			react: <PurchaseThankYou />
		});
		console.log('sent');
	} catch (e) {
		console.log('error sending:', e);
	}
};

export const sendTestEmail = async (email: string) => {
	try {
		await resend.emails.send({
			from: 'no-reply@tpgstudios.art',
			to: email,
			subject: 'TPG Studios: Thank you for your order!',
			react: <PurchaseThankYou />
		});
		console.log('sent');
	} catch (e) {
		console.log('error sending:', e);
	}
};

export const sendPresaleSignupEmail = async (email: string, name: string) => {
	try {
		await resend.emails.send({
			from: 'no-reply@tpgstudios.art',
			to: email,
			subject: 'Welcome to the TPG Studios Presale!',
			react: <PresaleSignup name={name} />
		});
		console.log('Presale signup email sent');
	} catch (e) {
		console.log('Error sending presale signup email:', e);
	}
};
