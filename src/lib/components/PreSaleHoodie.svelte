<script lang="ts" context="module">
  import { z } from "zod";

  export const presaleFormSchema = z.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Invalid email address"),
		size: z.enum(["Small", "Medium", "Large", "X-Large"])
	});

  export type EmailFormSchema = typeof presaleFormSchema;
</script>

<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
  import SuperDebug, { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
	import { enhance } from '$app/forms';
	import Input from './ui/input/input.svelte';
	import * as Form from "$lib/components/ui/form/index.js";
  import * as Alert from '$lib/components/ui/alert';
	import { fade } from 'svelte/transition';
  import { Check, AlertTriangle } from 'lucide-svelte';

	let data = {
		name: '',
		email: '',
		size: ''
	};

	const form = superForm(data, {
		validators: zodClient(presaleFormSchema),
	});
	const { form: formData } = form;

	let showSuccess = false;
	let showError = false;
	let errorMessage = '';

	const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
</script>

<section id="hoodie-presale" class="presale-section bg-gray-100 p-8 shadow-md">
	<h2 class="text-3xl font-bold mb-4">Pre-Sale Hoodies</h2>
	<div class="flex flex-col md:flex-row items-center gap-8">
		<CldImage
			src="egbguplmdttktgskkgwz"
			width={400}
			height={400}
			alt="Pre-sale Hoodie"
			class="rounded-lg shadow-lg"
		/>
		<div class="flex-1">
			<p class="mb-4">Get ready for our exclusive pre-sale of limited edition hoodies. Sign up now to be the first to know when they are available!</p>
			<form method="POST" action="?/presale" class="flex flex-col gap-4" use:enhance={() => {
				return ({ result }) => {
					if (result.type === 'success') {
						showSuccess = true;
						setTimeout(() => {
							showSuccess = false;
						}, 3000);
					}
					if (result.type === 'failure') {
						errorMessage = String(result.data?.error);
						showError = true;
						setTimeout(() => {
							showError = false;
						}, 3000);
					}
				};
			}}>
				<Form.Field name="name" {form}>
					<Form.Control let:attrs>
						<Form.Label>Name</Form.Label>
						<Input {...attrs} bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field name="email" {form}>
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field name="size" {form}>
					<Form.Control let:attrs>
						<Form.Label>Size</Form.Label>
						<select {...attrs} bind:value={$formData.size}>
							<option value="" disabled>Select Size</option>
							{#each sizes as sizeOption}
								<option value={sizeOption}>{sizeOption}</option>
							{/each}
						</select>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button>Sign Up</Form.Button>
			</form>
		</div>
	</div>
</section>

{#if showSuccess}
	<div class="absolute bottom-20 md:bottom-8 md:right-8 w-full md:w-[500px] z-50 flex justify-center md:block" transition:fade>
		<div class="w-[90%] md:w-full">
			<Alert.Root>
				<Check class="h-4 w-4" />
				<Alert.Title>Success!</Alert.Title>
				<Alert.Description>Thank you for signing up for the hoodie presale.</Alert.Description>
			</Alert.Root>
		</div>
	</div>
{/if}

{#if showError}
	<div class="absolute bottom-20 md:bottom-8 md:right-8 w-full md:w-[500px] z-50 flex justify-center md:block" transition:fade>
		<div class="w-[90%] md:w-full">
			<Alert.Root>
				<AlertTriangle class="h-4 w-4" />
				<Alert.Title>Error!</Alert.Title>
				<Alert.Description>{errorMessage}</Alert.Description>
			</Alert.Root>
		</div>
	</div>
{/if}

<style>
	.presale-section {
		width: 100%;
		max-width: 1200px;
		margin: 40px auto;
		padding: 40px 16px;
	}

	@media (max-width: 768px) {
		.presale-section {
			margin: 20px auto;
			padding: 20px 8px;
		}
	}
</style> 