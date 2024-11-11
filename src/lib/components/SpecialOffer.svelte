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
	import { onMount, onDestroy } from 'svelte';
	import { CldImage } from 'svelte-cloudinary';
	import { X } from 'lucide-svelte';
	import * as Form from "$lib/components/ui/form/index.js";
	import Input from './ui/input/input.svelte';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { enhance } from '$app/forms';
	import { Check, AlertTriangle } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { fade } from 'svelte/transition';

	let showModal = false;
	let showSuccess = false;
	let showError = false;
	let errorMessage = '';
	let isMobile = false;
	let body: HTMLElement | null = null;

	// export let isSoldOut: boolean;

	// export let remaining: number;

	let data = {
		email: '',
		phoneNumber: '',
		shirtSize: ''
	};

	const form = superForm(data, {
		validators: zodClient(emailFormSchema),
	});
	const { form: formData } = form;

    // if (typeof window !== 'undefined') {
    //     isMobile = window.innerWidth <= 768; // Adjust this value based on your mobile breakpoint

    //     // Show the modal only if the user hasn't seen it yet
    //     if (!sessionStorage.getItem('hasSeenModal')) {
    //         setTimeout(() => {
    //             showModal = true;
    //         }, 1000);
    //         sessionStorage.setItem('hasSeenModal', 'true');
    //     }
    // }

    onMount(() => {
        body = document.querySelector('body');
    });

    $: {
        if (body) {
            if (showModal) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        }
    }

    onDestroy(() => {
        if (body) {
            body.style.overflow = 'auto';
        }
    });
</script>

<a href="/products/ly4tf4oemnpfaoa">
	<div class="marquee">
		<div class="marquee__inner">
			<span class="marquee__text">
				Exclusive Hoodie Presale - Limited Time Offer
			</span>
		</div>
	</div>
</a>

<style>
	.marquee {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: #1a1a1a;
		color: #fff;
		overflow: hidden;
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
		height: 40px; /* Set a fixed height for the special offer */
	}

	.marquee__inner {
		display: flex;
		white-space: nowrap;
	}

	.marquee__text {
		padding: 1rem;
		font-size: 1rem;
		text-transform: uppercase;
		animation: pop 5s ease-in-out infinite;
	}

	@keyframes pop {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	@media (max-width: 768px) {
		.marquee__text {
			font-size: 0.8rem; /* Smaller text size for mobile */
		}
	}
</style>

{#if showModal}
	<div class="fixed inset-0 flex items-center justify-center z-40 bg-neutral-950 bg-opacity-90" transition:fade>
		<button on:click={() => (showModal = false)} class="w-full h-full absolute" />
		<div
			class="flex shadow-md rounded-lg overflow-hidden md:w-3/5 bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-full flex-col md:flex-row"
		>
			<div class="md:w-1/2 h-full">
				{#if !isMobile} 
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

				<form method="POST" action="?/email" class="space-y-8" use:enhance={() => {
					return ({ result }) => {
						if (result.type === 'success') {
							showSuccess = true;
							setTimeout(() => {
								showSuccess = false;
							}, 3000);
							showModal = false;
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

{#if showSuccess}
	<div class="absolute bottom-20 md:bottom-8 md:right-8 w-full md:w-[500px] z-50 flex justify-center md:block" transition:fade>
		<div class="w-[90%] md:w-full">
			<Alert.Root>
				<Check class="h-4 w-4" />
				<Alert.Title>Success!</Alert.Title>
				<Alert.Description>Thank you for joining our mailing list.</Alert.Description>
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