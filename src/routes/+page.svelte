<script lang="ts">
	import MobileLogo from '$lib/client/images/mobile_logo.png';
	import ImageCollection from '$lib/components/ImageCollection.svelte';

	import { CldImage } from 'svelte-cloudinary';

	import { onMount } from 'svelte';
    import SpecialOfferModal from '$lib/components/SpecialOffer.svelte';

    let showModal = false;

    onMount(() => {
        showModal = true;
    });

    const close = () => {
        showModal = false;
    };

	export let data;

	const { homeTitle, homeSubtitle, desktopHomeImage, mobileHomeImage, tagLink } = data.asset;
</script>

<main class="grow">
	<div class=" w-full relative">
		<div
			class="z-10 absolute top-[40%] left-0 w-full flex justify-center items-center flex-col gap-y-2"
		>
			<div class="text-white flex justify-center items-center flex-col gap-y-2">
				<div style="backdrop-filter: blur(5px); border-radius: 10px; padding: 12px;">
					<div class="flex flex-row gap-4 items-center">
						<img src={MobileLogo} alt="TPG" class="h-[40px] sm:hidden flex" />

						<h2 class="sm:text-5xl text-3xl font-jura">{homeTitle}</h2>
					</div>
					<h4 class="font-light sm:text-3xl text-xl font-jura">{homeSubtitle}</h4>
				</div>
				<a
					class="uppercase bg-black mt-14 px-7 py-3 font-light"
					href={`/products?tag=${tagLink}`}
				>
					shop now</a
				>
			</div>
		</div>

		<!-- <div class="absolute bottom-0 left-1/2 translate-x-[-50%] p-4">
			<div class="flex gap-x-2">
				{#each imgs as _, i}
					<button
						on:click={() => (imgNum = i)}
						class={`w-[10px] h-[10px] ${
							i === imgNum && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
		</div> -->
		<div
			class="object-cover w-full h-[80vh] hidden sm:flex transition-all ease-in-out duration-300 bg-black"
		>
			<!-- CLD IMAGE SWITCH NEEDED -->
			<CldImage
				src={desktopHomeImage}
				width={1920}
				height={900}
				objectFit="cover"
				alt="home banner"
				opacity={90}
			/>
		</div>
		<div
			class={`object-cover w-full h-[80vh] sm:hidden flex transition-all ease-in-out duration-300 bg-black`}
		>
			<!-- CLD IMAGE SWITCH NEEDED -->
			<CldImage
				src={mobileHomeImage}
				width={700}
				height={1000}
				objectFit="cover"
				alt="home banner"
				opacity={80}
			/>
		</div>
		<!-- <img
			class={`object-cover w-full h-[80vh] hidden sm:flex transition-all ease-in-out duration-300`}
			alt="The project logo"
			src={imgs[imgNum]}
		/>
		<img
			class={`object-cover w-full h-[80vh] sm:hidden flex transition-all ease-in-out duration-300`}
			alt="The project logo"
			src={mobileImgs[imgNum]}
		/> -->
	</div>
	{#each data.collections as collection}
		<ImageCollection collectionData={collection} />
	{/each}
	<!-- <ImageCollection
		collectionData={{
			name: 'Planes',
			tagLine: 'Honor our history',
			productInfo: [
				{
					cloudinaryId: 'cld-sample-4',
					secondaryCloudinary: 'cld-sample-5',
					name: 'Molten Moon',
					availableSizes: ['5x5', '4.8x6.4', '7.2x9.6', '11x11', '10.8x14.4'],
					soldOutSizes: [],
					link: '/products/my_second_product'
				},
				{
					cloudinaryId: 'cld-sample-5',
					secondaryCloudinary: 'cld-sample-4',
					name: 'Europan Frontier',
					availableSizes: ['5x5', '4.8x6.4', '7.2x9.6'],
					soldOutSizes: ['11x11', '10.8x14.4'],
					link: '/products/my_first_product'
				},
				{
					cloudinaryId: 'cld-sample-4',
					secondaryCloudinary: 'cld-sample-5',
					name: 'Molten Moon',
					availableSizes: ['5x5', '4.8x6.4', '10.8x14.4'],
					soldOutSizes: ['7.2x9.6', '11x11'],
					link: '/products/my_second_product'
				},
				{
					cloudinaryId: 'cld-sample-5',
					secondaryCloudinary: 'cld-sample-4',
					name: 'Europan Frontier',
					availableSizes: ['7.2x9.6', '11x11', '10.8x14.4'],
					soldOutSizes: ['5x5', '4.8x6.4'],
					link: '/products/my_first_product'
				}
			],
			dark: true,
			collectionTag: 'Aerospace'
		}}
	/> -->
</main>
