<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { ChevronRight } from 'lucide-svelte';

	export let collectionData: {
		name: string;
		tagLine: string;
		productInfo: {
			cloudinaryId: string | null;
			secondaryCloudinary: string | null;
			name: string;
			availableSizes: string[];
			soldOutSizes: string[];
			link: string;
		}[];
		dark: boolean;
		collectionTag: string;
	};

	const isHoodie = (name: string) => name.toLowerCase().includes('hoodie');
	
	$: {
		console.log('Full product list:', collectionData.productInfo);
		console.log('Product names:', collectionData.productInfo.map(p => p.name));
	}

	// Separate hoodie from other products with logging
	$: hoodieProduct = collectionData.productInfo.find(p => {
		const isHood = isHoodie(p.name);
		console.log(`Checking product ${p.name}, isHoodie: ${isHood}`);
		return isHood;
	});

	$: otherProducts = collectionData.productInfo.filter(p => !isHoodie(p.name));
</script>

<div
	class="flex flex-col {collectionData.dark
		? 'bg-gray-950 text-white'
		: 'bg-neutral-100 text-black'} px-2 sm:px-4 pt-6 pb-4 sm:py-10 sm:items-center"
>
	<!-- Show hoodie section only if found -->
	{#if hoodieProduct}
		<div class="w-full mb-12">
			<a
				href={hoodieProduct.link}
				class="flex flex-col sm:w-[60%] w-full mx-auto rounded-md cursor-pointer"
			>
				<div class="productImg relative">
					<div class="pre-sale-banner">PRE-SALE</div>
					<div>
						<CldImage
							width={350 * 2}
							height={500 * 2}
							src={hoodieProduct.cloudinaryId || 'https://via.placeholder.com/355x200'}
							alt="Description of my image"
							class="shadow-md"
							sizes="100vw"
						/>
					</div>
					<div class="image-hover">
						<CldImage
							width={350 * 2}
							height={500 * 2}
							src={hoodieProduct.secondaryCloudinary || 'https://via.placeholder.com/355x200'}
							alt="Description of my image"
							class="shadow-md"
							sizes="100vw"
						/>
					</div>
				</div>

				<div class="py-4">
					<div class={`font-jura ${collectionData.dark ? 'text-gray-100' : 'text-gray-950'} text-xl text-center`}>
						{hoodieProduct.name}
					</div>
					<div class={`flex flex-row gap-2 justify-center font-light ${
						collectionData.dark ? 'text-gray-500' : 'text-gray-700'
					}`}>
						{#each hoodieProduct.availableSizes as size}
							<span>{size}</span>
						{/each}
						{#each hoodieProduct.soldOutSizes as size}
							<span class="line-through">{size}</span>
						{/each}
					</div>
				</div>
			</a>
		</div>
	{/if}

	<!-- Rest of collections -->
	<div>
		<span class="font-jura sm:text-4xl text-3xl">{collectionData.name}.</span>
		<span class="font-jura sm:text-3xl text-2xl">{collectionData.tagLine}.</span>
	</div>
	<a
		href="/products?tag={collectionData.collectionTag}"
		class="pb-4 sm:pb-8 flex flex-row items-center"
	>
		<span class="font-jura sm:text-xl text-lg opacity-60">Shop collection</span>
		<ChevronRight class="opacity-60" />
	</a>

	<div class="flex flex-row w-full sm:overflow-x-hidden flex-wrap gap-2 sm:justify-center">
		{#each otherProducts.sort((a, b) => a.name.localeCompare(b.name)) as product}
			<a
				href={product.link}
				class="flex flex-col lg:w-[22%] md:w-[30%] sm:w-[40%] w-full sm:p-3 rounded-md cursor-pointer"
			>
				<div class="productImg relative">
					<div>
						<CldImage
							width={350 * 2}
							height={500 * 2}
							src={product.cloudinaryId || 'https://via.placeholder.com/355x200'}
							alt="Description of my image"
							class="shadow-md"
							sizes="100vw"
						/>
					</div>
					<div class="image-hover">
						<CldImage
							width={350 * 2}
							height={500 * 2}
							src={product.secondaryCloudinary || 'https://via.placeholder.com/355x200'}
							alt="Description of my image"
							class="shadow-md"
							sizes="100vw"
						/>
					</div>
				</div>

				<div class="py-4">
					<div
						class={`font-jura ${
							collectionData.dark ? 'text-gray-100' : 'text-gray-950'
						} text-xl text-center`}
					>
						{product.name}
					</div>
					<div
						class={`flex flex-row gap-2 justify-center font-light ${
							collectionData.dark ? 'text-gray-500' : 'text-gray-700'
						}`}
					>
						{#each product.availableSizes as size}
							<span>{size}</span>
						{/each}
						{#each product.soldOutSizes as size}
							<span class="line-through">{size}</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.image-hover {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		object-fit: contain;
		opacity: 0;
		transition: opacity 0.4s;
	}
	.productImg:hover .image-hover {
		opacity: 1;
	}
	.productImg {
		overflow: hidden;
	}
	.pre-sale-banner {
		position: absolute;
		top: 25px;
		left: -35px;
		background: black;
		color: white;
		padding: 8px 40px;
		transform: rotate(-45deg);
		font-weight: bold;
		z-index: 10;
		font-size: 1.2rem;
		min-width: 200px;
		text-align: center;
		letter-spacing: 1px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
	}
</style>