<script lang="ts">
	import MobileLogo from '$lib/client/images/mobile_logo.png';
	import ImageCollection from '$lib/components/ImageCollection.svelte';
	import { CldImage } from 'svelte-cloudinary';
	import SpecialOffer from '$lib/components/SpecialOffer.svelte';
	import PreSaleHoodie from '$lib/components/PreSaleHoodie.svelte';

	export let data;

	const { homeTitle, homeSubtitle, desktopHomeImage, mobileHomeImage, tagLink } = data.asset;
</script>

<main class="grow">
	<SpecialOffer />
	<div class="w-full relative">
		<div
			class="z-10 absolute top-1/2 left-0 w-full flex justify-center items-center flex-col gap-y-2 transform -translate-y-1/2"
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
					href={`${tagLink}`}
				>
					shop now</a
				>
			</div>
		</div>

		<div
			class="object-cover w-full h-screen hidden sm:flex transition-all ease-in-out duration-300 bg-black"
		>
			<CldImage
				src={desktopHomeImage}
				width={1920}
				height={1080}
				objectFit="cover"
				alt="home banner"
				opacity={90}
			/>
		</div>
		<div
			class={`object-cover w-full h-screen sm:hidden flex transition-all ease-in-out duration-300 bg-black`}
		>
			<CldImage
				src={mobileHomeImage}
				width={700}
				height={1000}
				objectFit="cover"
				alt="home banner"
				opacity={80}
			/>
		</div>
	</div>
	{#each data.collections as collection}
		<ImageCollection collectionData={collection} />
	{/each}
	<PreSaleHoodie />
</main>
