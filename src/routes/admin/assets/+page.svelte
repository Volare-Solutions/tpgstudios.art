<script lang="ts">
	import { CldImage, CldUploadButton } from 'svelte-cloudinary';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Check } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { deserialize } from '$app/forms';

	export let data;

	let disableUpdate = true;
	let showSuccess = false;

	async function handleImageUpload(info: unknown, mode: string) {
		const { public_id } = info as {
			public_id: string;
		};

		const formData = new FormData();

		formData.append('cloudinaryId', public_id);
		formData.append('mode', mode);

		const response = await fetch(`/admin/assets?/image`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			showSuccess = true;
			invalidateAll();
			setTimeout(() => {
				showSuccess = false;
			}, 3000);
		}
	}
</script>

<form
	class="h-full p-4 md:flex md:flex-row gap-6 w-full justify-center"
	action="/admin/assets?/title"
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'success') {
				showSuccess = true;
				disableUpdate = true;
				invalidateAll();
				setTimeout(() => {
					showSuccess = false;
				}, 3000);
			}
			if (result.type === 'error') {
				console.error(result.error);
			}
		};
	}}
>
	<div class="flex-1 space-y-4">
		<div class="gap-1.5 grid mb-4">
			<Label for="title">Home Title</Label>
			<Input
				name="title"
				id="title"
				class="w-full border border-gray-400"
				type="text"
				value={data.asset?.homeTitle}
				on:change={() => (disableUpdate = false)}
			/>
		</div>

		<div class="gap-1.5 grid mb-4">
			<Label for="subtitle">Home Subtitle</Label>
			<Input
				name="subtitle"
				id="subtitle"
				class="w-full border border-gray-400"
				type="text"
				value={data.asset?.homeSubtitle}
				on:change={() => (disableUpdate = false)}
			/>
		</div>

		<div class="gap-1.5 grid mb-4">
			<Label for="tagLink">Shop Now Route</Label>
			<Input
				name="tagLink"
				id="tagLink"
				class="w-full border border-gray-400"
				type="text"
				value={data.asset?.tagLink}
				on:change={() => (disableUpdate = false)}
			/>
		</div>

		{#if !disableUpdate}
			<div class="flex start">
				<Button type="submit" disabled={disableUpdate}>Save</Button>
			</div>
		{/if}
	</div>

	<div class="flex-1 space-y-4">
		<Label>Mobile Background</Label>
		<CldImage
			alt={data.asset?.mobileHomeImage}
			src={data.asset?.mobileHomeImage}
			aspectRatio="16:9"
			objectFit="cover"
			width={200}
		/>
		<CldUploadButton
			uploadPreset={env.PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			signatureEndpoint="/api/cloudinary"
			class="w-full sm:w-48 px-4 py-2 rounded-lg border-gray-900 bg-white text-gray-900 border font-semibold hover:bg-gray-200"
			onUpload={(res) => {
				if (res.event === 'success') {
					handleImageUpload(res.info, 'mobile');
				}
			}}
		/>
	</div>

	<div class="flex-1 space-y-4">
		<Label>Desktop Background</Label>
		<CldImage
			alt={data.asset?.desktopHomeImage}
			src={data.asset?.desktopHomeImage}
			aspectRatio="16:9"
			objectFit="cover"
			width={400}
		/>
		<CldUploadButton
			uploadPreset={env.PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			signatureEndpoint="/api/cloudinary"
			class="w-full sm:w-48 px-4 py-2 rounded-lg border-gray-900 bg-white text-gray-900 border font-semibold hover:bg-gray-200"
			onUpload={(res) => {
				if (res.event === 'success') {
					handleImageUpload(res.info, 'desktop');
				}
			}}
		/>
	</div>
</form>

{#if showSuccess}
	<div class="absolute bottom-12 right-12 w-[500px]" transition:fade>
		<Alert.Root>
			<Check class="h-4 w-4" />
			<Alert.Title>Success!</Alert.Title>
			<Alert.Description>Your assets have been updated.</Alert.Description>
		</Alert.Root>
	</div>
{/if}
