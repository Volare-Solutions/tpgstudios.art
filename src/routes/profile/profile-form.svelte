<script lang="ts" context="module">
	import { z } from "zod";
	export const profileFormSchema = z.object({
		email: z
			.string()
			.min(2, "Email must be at least 2 characters.")
			.max(30, "Email must not be longer than 30 characters"),
		mobile: z.boolean().default(false).optional(),
		communication_emails: z.boolean().default(false).optional(),
		marketing_emails: z.boolean().default(false).optional(),
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { Switch } from "$lib/components/ui/switch/index.js";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { browser } from "$app/environment";

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input placeholder="tiger@woods.com" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>
			This is your public display email. It will be used for communication purposes. You can only change this once every 10 days.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div>
		<h3 class="mb-4 text-lg font-medium">Email Notifications</h3>
		<div class="space-y-4">
			<Form.Field
				{form}
				name="communication_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Communication emails</Form.Label>
						<Form.Description>
							Receive emails about your account activity.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.communication_emails} />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="marketing_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Marketing emails</Form.Label>
						<Form.Description>
							Receive emails about new products, features, and more.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.marketing_emails} />
				</Form.Control>
			</Form.Field>
			<!-- <Form.Field
				{form}
				name="social_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Social emails</Form.Label>
						<Form.Description>
							Receive emails for friend requests, follows, and more.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.social_emails} />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="security_emails"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<Form.Label class="text-base">Security emails</Form.Label>
						<Form.Description>
							Receive emails about your account activity and security.
						</Form.Description>
					</div>
					<Switch includeInput {...attrs} bind:checked={$formData.security_emails} />
				</Form.Control>
			</Form.Field> -->
		</div>
	</div>
	<Form.Field {form} name="mobile" class="flex flex-row items-start space-x-3 space-y-0">
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.mobile} />
			<div class="space-y-1 leading-none">
				<Form.Label>Use different settings for my mobile devices</Form.Label>
				<Form.Description>
					You can manage your mobile notifications in the <a href="/examples/forms"
						>mobile settings</a
					> page.
				</Form.Description>
			</div>
			<input name={attrs.name} value={$formData.mobile} hidden />
		</Form.Control>
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}