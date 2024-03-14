<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';
	import { writable } from 'svelte/store';

	// Gradient color stores
	let fromColor = writable('#ef4444');
	let viaColor = writable('#a855f7');
	let toColor = writable('#4f46e5');

	// Computed gradient value
	$: gradient = `linear-gradient(to right bottom, ${$fromColor}, ${$viaColor}, ${$toColor});`;
</script>

<form
	class="h-full p-4 flex flex-col gap-y-6 w-full items-center justify-center"
	method="post"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			}

			if (result.type === 'error') {
				alert(`ERROR: ${result.error.message}`);
			}
		};
	}}
>
	<h2 class="text-gray-200 text-3xl font-bold">Create New Product</h2>
	<div class="gap-1.5 grid">
		<Label for="name">Name</Label>
		<Input name="name" required id="name" class="w-full" type="text" placeholder="My Product" />
	</div>

	<div class="gap-1.5 grid">
		<Label for="desc">Description</Label>
		<Textarea
			name="desc"
			id="desc"
			class="w-full"
			required
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</div>

	<!-- Gradient selection section -->
	<div class="w-full p-2">
		<div class="flex justify-around p-2">
			<div class="flex flex-col items-center">
				<Label for="fromColor">From Color</Label>
				<Input bind:value={$fromColor} name="fromColor" type="color" />
			</div>
			<div class="flex flex-col items-center">
				<Label for="viaColor">Via Color</Label>
				<Input bind:value={$viaColor} name="viaColor" type="color" />
			</div>
			<div class="flex flex-col items-center">
				<Label for="toColor">To Color</Label>
				<Input bind:value={$toColor} name="toColor" type="color" />
			</div>
		</div>
	</div>

	<!-- Gradient preview -->
	<div class="w-full py-4">
		<h4 class="text-gray-200 text-lg font-bold">Gradient Preview</h4>
		<div class="p-4 rounded border border-gray-200 flex items-center justify-center">
			<div
				class={`text-4xl font-jura text-transparent bg-clip-text `}
				style={`background-image: ${gradient}`}
			>
				Gradient Text
			</div>
		</div>
	</div>

	<div class="w-full flex justify-center items-center gap-x-4">
		<Button type="submit">Create</Button>
	</div>
</form>

<style>
	input[type='color'] {
		height: 3rem;
		width: 3rem;
		border: none;
		padding: 0;
	}
</style>
