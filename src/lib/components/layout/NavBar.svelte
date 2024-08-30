<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/client/images/black-logo-no-bg.png';
	import WhiteLogo from '$lib/client/images/white-logo.png';
	import MobileLogo from '$lib/client/images/black-logo-no-bg.png';
	import MobileWhiteLogo from '$lib/client/images/white-logo.png';
	import { CldImage } from 'svelte-cloudinary';
	import { cartLengthStore } from '$lib/client/cart';
	import { onMount } from 'svelte';

	export let user: {
		firstName: string;
		lastName: string;
		email: string;
		isAdmin: boolean;
	} | null;

	export let isHomePage: boolean;

	const handleCollectionsHover = () => {
		document.getElementById('drop-menu')?.classList.remove('hidden');
	};

	const handleMobileMenu = () => {
		const menu = document.getElementById('mobile-nav');
		menu?.classList.remove('opacity-0');
		menu?.classList.remove('pointer-events-none');
		menu?.classList.add('opacity-100');
	};

	// export let pieces: {
	// 	id: string;
	// 	name: string;
	// }[];

	export let tags: {
		name: string;
		active: boolean;
	}[];

	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = isHomePage ? window.scrollY > window.innerHeight : true;
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Call once to set initial state

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$: navClass = scrolled || !isHomePage
		? 'bg-white text-black'
		: 'bg-transparent text-white';

	$: logoSrc = scrolled || !isHomePage ? Logo : WhiteLogo;
	$: mobileLogoSrc = scrolled || !isHomePage ? MobileLogo : MobileWhiteLogo;
	$: strokeColor = scrolled || !isHomePage ? 'black' : 'white';
</script>

<nav
	class={`sm:flex sm:flex-row items-center justify-between grid grid-cols-3 sm:px-12 p-4 sm:py-1 w-full z-20 ${isHomePage ? 'fixed' : 'sticky'} top-0 left-0 right-0 transition-all duration-300 ${navClass}`}
>
	<button class="sm:hidden flex" on:click={() => handleMobileMenu()}>
		<svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1H21" stroke={strokeColor} stroke-width="1" stroke-linecap="round" />
			<path d="M1 10H21" stroke={strokeColor} stroke-width="1" stroke-linecap="round" />
		</svg>
	</button>

	<div
		class="h-[400px] bg-white absolute drop-shadow-md border-t-[1px] border-solid border-neutral-300 w-full -mx-12 top-[4px] text-center z-50 grid grid-cols-3 hidden no-scroll"
		id="drop-menu"
	>
		<div class="col-span-1 w-full overflow-hidden">
			<!-- CLD IMAGE SWITCH NEEDED -->
			<CldImage
				width={400}
				src={'Logos/grqj2osxgbbbk6bduzhq' || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				class="shadow-md"
				style="object-fit: contain;"
			/>
		</div>
		<!-- <div class="flex flex-col p-6 overflow-y-scroll">
			<div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm">Pieces</div>
			{#each pieces as piece}
				<a
					href={`/products/${piece.id}`}
					class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">{piece.name}</a
				>
			{/each}
		</div> -->
		<div class="flex flex-col p-6 overflow-y-scroll">
			<div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm">Collections</div>
			<!-- <a href="/products" class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura"
				>All Pieces</a
			> -->
			{#each tags as tag}
				{#if tag.active}
				<a
					href={`/products?tag=${tag.name}`}
					class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura"
					>{tag.name}</a
				>
				{/if}
			{/each}
		</div>
	</div>

	<a class="text-4xl font-light mx-auto sm:mx-0" href="/">
		<img src={logoSrc} alt="TPG" class="h-[80px] hidden sm:flex" />
		<img src={mobileLogoSrc} alt="TPG" class="h-[70px] sm:hidden flex" />
	</a>

	<div class="flex-row items-center hidden sm:flex gap-6">
		<a
			href="/collections"
			class="uppercase font-jura flex flex-row items-center"
			on:mouseenter={handleCollectionsHover}
		>
			Collections
			<svg
				width="24"
				height="45"
				viewBox="0 0 24 55"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M7 21.7705L12 33.2288L17 21.7705H7Z" fill="currentColor" />
			</svg>
		</a>
		{#if user}
			<a href="/profile">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{:else}
			<a href="/auth/login">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{/if}
		<a href="/cart" class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-shopping-bag"
				><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path
					d="M16 10a4 4 0 0 1-8 0"
				/></svg
			>

			<div
				class="font-light text-xs rounded-full absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center"
				class:bg-white={!scrolled}
				class:text-black={!scrolled}
				class:bg-black={scrolled}
				class:text-white={scrolled}
			>
				{$cartLengthStore}
			</div>
		</a>
		{#if user?.isAdmin}
			<Button variant="link" href="/admin/assets">admin</Button>
		{/if}
	</div>
	<div class="sm:hidden flex flex-row justify-end gap-3">
		{#if user}
			<a href="/profile">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{:else}
			<a href="/auth/login">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{/if}
		<a href="/cart" class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-shopping-bag"
				><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path
					d="M16 10a4 4 0 0 1-8 0"
				/></svg
			>
			<div
				class="font-light text-xs rounded-full absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center"
				class:bg-white={!scrolled}
				class:text-black={!scrolled}
				class:bg-black={scrolled}
				class:text-white={scrolled}
			>
				{$cartLengthStore}
			</div>
		</a>
		{#if user?.isAdmin}
			<Button variant="link" href="/admin/products">admin</Button>
		{/if}
	</div>
</nav>

<style>
	.no-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	.no-scroll::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scroll {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
