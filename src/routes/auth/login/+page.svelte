<script lang="ts">
    import UserAuthForm from "./(components)/user-auth-form.svelte";
</script>

<div class="container mx-auto flex flex-col items-center justify-center p-4 lg:hidden px-4">
	<!-- UserAuthForm is always visible, specifically ensuring it is displayed on mobile with left and right padding -->
	<div class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[350px] mx-auto">
		<UserAuthForm />
		<p class="text-center text-sm text-muted-foreground mt-6">
			By clicking continue, you agree to our
			<a href="/terms" class="underline hover:text-primary">Terms of Service</a>
			and
			<a href="/privacy" class="underline hover:text-primary">Privacy Policy</a>.
		</p>
	</div>
</div>

<!-- This section is for larger screens and will not be displayed on mobile -->
<div class="hidden lg:grid lg:grid-cols-2 lg:max-w-none lg:gap-4 lg:px-0 lg:h-[800px]">
	<div class="h-full bg-cover bg-no-repeat p-10 text-white" 
		style="background-image: url('https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80');">
		<!-- Content that you want to show on larger screens can go here -->
		<div class="z-10 relative flex items-center text-lg font-medium">
			TPG Studios
		</div>
	</div>
	<div class="flex flex-col justify-center items-center p-8">
		<div class="w-full sm:w-[400px]">
			<UserAuthForm />
			<p class="text-center text-sm text-muted-foreground mt-6">
				By clicking continue, you agree to our
				<a href="/terms" class="underline hover:text-primary">Terms of Service</a>
				and
				<a href="/privacy" class="underline hover:text-primary">Privacy Policy</a>.
			</p>
		</div>
	</div>
</div>
