<script lang="ts">
	import { onMount } from 'svelte';
	let mounted = false;
	
	onMount(() => {
	  mounted = true;
	});
  </script>
  
  <div class="fixed top-0 left-0 right-0 z-30 bg-black text-white h-8 flex items-center justify-center transition-opacity duration-500 ease-in-out"
	   class:opacity-0={!mounted}
	   class:opacity-100={mounted}>
	<p class="text-sm md:text-base uppercase tracking-wide">
	  Free Shipping on Orders Over $65
	</p>
  </div>
  
  <style>
	@keyframes fadeIn {
	  from {
		opacity: 0;
		transform: translateY(-100%);
	  }
	  to {
		opacity: 1;
		transform: translateY(0);
	  }
	}
  
	.opacity-100 {
	  animation: fadeIn 0.3s ease-out forwards;
	}
  </style>