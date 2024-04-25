<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { Check, AlertTriangle } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { fade } from 'svelte/transition';

	let showSuccess = false;
	let showError = false;
	let errorMessage = '';
	let formElement: HTMLFormElement;
</script>

<div class="flex justify-center mt-12 md:mt-32">
	<Card.Root class="w-[400px] mb-12">
		<Card.Header>
			<Card.Title>Email List</Card.Title>
			<Card.Description>Get updates and deals from the TPG team</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" bind:this={formElement} use:enhance={() => {
				return ({ result }) => {
					if (result.status === 200) {
						showSuccess = true;
						formElement.reset();
						setTimeout(() => {
							showSuccess = false;
						}, 3000);
					}
					if (result.status === 400) {
						errorMessage = String(result.data?.error);
						showError = true;
						setTimeout(() => {
							showError = false;
						}, 3000);
					}
				};
			}}>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="email">Email</Label>
						<Input id="email" placeholder="you@mail.com" name="email" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="phone">Phone Number</Label>
						<Input id="phone" placeholder="999-999-9999" name="phone" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="size">Shirt Size</Label>
						<select id="size" name="size">
							<option value="">Select size</option>
							<option value="S">Small</option>
							<option value="M">Medium</option>
							<option value="L">Large</option>
							<option value="XL">Extra Large</option>
						</select>
					</div>
				</div>
				<div class="flex justify-end pt-4">
					<Button type="submit">Join</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>

{#if showSuccess}
	<div class="absolute md:bottom-8 md:right-8 w-full md:w-[500px] z-50 flex justify-center md:block" transition:fade>
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
	<div class="absolute md:bottom-8 md:right-8 w-full md:w-[500px] z-50 flex justify-center md:block" transition:fade>
		<div class="w-[90%] md:w-full">
			<Alert.Root>
				<AlertTriangle class="h-4 w-4" />
				<Alert.Title>Error!</Alert.Title>
				<Alert.Description>{errorMessage}</Alert.Description>
			</Alert.Root>
		</div>
	</div>
{/if}