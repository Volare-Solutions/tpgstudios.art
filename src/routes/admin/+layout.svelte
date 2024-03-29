<script>
    import { onMount } from 'svelte';
    export let data;

    let isMobile = false;

    onMount(() => {
        const updateLayout = () => {
            isMobile = window.innerWidth < 768;
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);

        return () => {
            window.removeEventListener('resize', updateLayout);
        };
    });
</script>

<div class="container w-full h-full grow p-4">
    <!-- Mobile Tab Navigation -->
    <div class="mobile-nav w-full flex justify-around border-b-2 mb-4">
        <a
			class={`text-lg font-bold p-2 rounded-md ${
				data.url.includes('/admin/assets') ? 'bg-neutral-100' : ''
			}`}
			href="/admin/assets">Assets</a
		>
        <a class={`text-lg font-bold p-2 rounded-md ${data.url.includes('/admin/products') ? 'bg-neutral-100' : ''}`} href="/admin/products">Products</a>
        <a class={`text-lg font-bold p-2 rounded-md ${data.url.includes('/admin/orders') ? 'bg-neutral-100' : ''}`} href="/admin/orders">Orders</a>
    </div>

    <!-- Sidebar Navigation for Desktop -->
    <div class="desktop-nav bg-neutral-200 shadow-xl w-1/6 rounded-md p-4 flex flex-col gap-y-3 items-start mr-4">
        <a
			class={`text-lg font-bold  w-full text-start p-2 rounded-md ${
				data.url.includes('/admin/assets') ? 'bg-neutral-100' : ''
			}`}
			href="/admin/assets">Assets</a
		>
        <a class={`text-lg font-bold w-full text-start p-2 rounded-md ${data.url.includes('/admin/products') ? 'bg-neutral-100' : ''}`} href="/admin/products">Products</a>
        <a class={`text-lg font-bold w-full text-start p-2 rounded-md ${data.url.includes('/admin/orders') ? 'bg-neutral-100' : ''}`} href="/admin/orders">Orders</a>
    </div>

    <!-- Main Content Always Visible -->
    <div class="bg-neutral-200 shadow-xl grow h-full rounded-md p-4">
        <slot />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row; /* Layout children side by side by default */
    }

    .mobile-nav {
        display: none; /* Hide mobile navigation by default */
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column; /* Stack elements vertically on mobile */
        }
        .desktop-nav {
            display: none; /* Hide desktop navigation on mobile */
        }
        .mobile-nav {
            display: flex; /* Show mobile navigation on mobile */
        }
    }
</style>
