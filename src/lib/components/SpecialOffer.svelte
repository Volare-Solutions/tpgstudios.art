<script lang="ts" context="module">
    import { z } from "zod";

    export const emailFormSchema = z.object({
        email: z.string().email(),
        phoneNumber: z.string().min(10),
        shirtSize: z.enum(["S", "M", "L", "XL"]),
    });

    export type EmailFormSchema = typeof emailFormSchema;
</script>

<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { X } from 'lucide-svelte';
	import * as Form from "$lib/components/ui/form/index.js";
	import Input from './ui/input/input.svelte';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

	export let showModal = false;

	export let isSoldOut: boolean;

	export let remaining: number;

	let data = {
		email: '',
		phoneNumber: '',
		shirtSize: ''
	};

	const form = superForm(data, {
		validators: zodClient(emailFormSchema),
	});
	const { form: formData, enhance, validate, submit } = form;

	let isMobile = false;

    if (typeof window !== 'undefined') {
        isMobile = window.innerWidth <= 768; // Adjust this value based on your mobile breakpoint
    }
</script>

<button
	type="button"
	class="bg-gray-950 text-center text-white font-jura uppercase p-1 sm:text-lg text-sm sticky w-full top-[-100px]"
	on:click={() => (showModal = true)}
>
	{#if isSoldOut}
		Sold Out, Sign up to receive updates on when we will be back in stock!
	{:else}
		Launch event, only {remaining} pieces available, order now!
	{/if}
</button>

{#if showModal}
	<div class="absolute w-screen h-screen z-40 bg-neutral-950 bg-opacity-90">
		<button on:click={() => (showModal = false)} class="w-full h-full absolute" />
		<div
			class="flex shadow-md rounded-lg overflow-hidden md:w-3/5 bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-full flex-col md:flex-row"
		>
			<div class="md:w-1/2 h-full">
				{#if !isMobile}
					<!-- CLD IMAGE SWITCH NEEDED -->
					<CldImage src={'Logos/grqj2osxgbbbk6bduzhq'} width={1000} height={1000} objectFit="cover" />
				{/if}
			</div>

			<div class="md:w-1/2 p-4 flex flex-col">
				<div class="w-full flex justify-end">
					<button
						class="hover:bg-neutral-200 rounded-full p-1"
						on:click={() => (showModal = false)}
					>
						<X class="w-4 h-4" />
					</button>
				</div>

				<div class="text-center mb-8">
					<h1 class="text-2xl font-bold">Join Our Mailing List</h1>
					<h2 class="text-xl">Sign up for exclusive offers and updates</h2>
				</div>

				<form method="POST" class="space-y-8" use:enhance >
					<Form.Field name="email" {form}>
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				
					<Form.Field name="phoneNumber" {form}>
						<Form.Control let:attrs>
							<Form.Label>Phone Number</Form.Label>
							<Input {...attrs} bind:value={$formData.phoneNumber} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				
					<Form.Field name="shirtSize" {form}>
						<Form.Control let:attrs>
							<Form.Label>Shirt Size</Form.Label>
							<select {...attrs} bind:value={$formData.shirtSize}>
								<option value="">Select size</option>
								<option value="S">Small</option>
								<option value="M">Medium</option>
								<option value="L">Large</option>
								<option value="XL">Extra Large</option>
							</select>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				
					<Form.Button>Submit</Form.Button>
				</form>
			</div>
		</div>
	</div>
{/if}
