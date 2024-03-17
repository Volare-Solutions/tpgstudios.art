<script lang="ts">
	import { Icons } from "$lib/components/icons/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { cn } from "$lib/utils.js";

    let className: string | undefined | null = undefined;
    let action: "enter" | "login" | "register" = "enter";
    let labelClass = "sr-only";
    export { className as class };

    let isLoading = false;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let firstName = '';
    let lastName = '';

    function resetForm() {
        email = '';
        password = '';
        confirmPassword = '';
        action = "enter";
        labelClass = "sr-only";
    }

    async function onSubmit() {
        isLoading = true;

        try {

            if (action === "register") {
                const formData = new URLSearchParams({ email, password, firstName, lastName });
                const response = await fetch('/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // TODO: Handle errors
                window.location.href = "/profile";
            }
            else if (action === "login") {
                const formData = new URLSearchParams({ email, password });
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // TODO: Handle errors
                window.location.href = "/profile";
            }
            else {
                await validateEmail();
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            isLoading = false;
        }
    }

    async function validateEmail() {
        const response = await fetch('/auth/login/validate-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // If the email is valid, we want to login
        if (data.isValidEmail) {
            action = "login";
        } else {
            labelClass = "";
            action = "register";
        }
    }
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
    {#if action == "enter"}
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">Login/Signup</h1>
            <p class="text-sm text-muted-foreground">
                Enter your email below to login or create an account
            </p>
        </div>
    {:else if action == "register"}
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p class="text-sm text-muted-foreground">
                Enter your email below to create your account
            </p>
        </div>
    {:else}
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
            <p class="text-sm text-muted-foreground">
                Enter your email and password below to sign in
            </p>
        </div>
    {/if}
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-4">
			<div class="grid gap-4">
				<Label class={labelClass} for="email">Email</Label>
				<Input
					id="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
                    bind:value={email}
				/>
                {#if action === "login"}
                    <Label class={labelClass} for="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        bind:value={password}
                    />
                {/if}
                {#if action === "register"}
                    <Label class={labelClass} for="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Tiger"
                        autocapitalize="none"
                        autocorrect="off"
                        disabled={isLoading}
                        bind:value={firstName}
                    />
                    <Label class={labelClass} for="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Woods"
                        autocapitalize="none"
                        autocorrect="off"
                        disabled={isLoading}
                        bind:value={lastName}
                    />
                    <Label class={labelClass} for="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        bind:value={password}
                    />
                    <Label class={labelClass} for="confirm-password">Confirm Password</Label>
                    <Input
                        id="confirm-password"
                        placeholder="Confirm Password"
                        type="password"
                        bind:value={confirmPassword}
                    />
                {/if}
			</div>
            {#if action === "enter"}
                <Button type="submit" disabled={isLoading}>
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Login/Signup
                </Button>
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <span class="w-full border-t" />
                    </div>
                    <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
                    </div>
                </div>
                <Button href="/auth/login/google" variant="outline">
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
                    {:else}
                        <Icons.google class="mr-2 h-4 w-4" />
                    {/if}
                    {" "}
                    Google
                </Button>
                <Button href="/auth/login/github" variant="outline">
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
                    {:else}
                        <Icons.gitHub class="mr-2 h-4 w-4" />
                    {/if}
                    {" "}
                    GitHub
                </Button>
            {:else if action === "register"}
                <Button type="submit" disabled={isLoading}>
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Create Account
                </Button>
            {:else}
                <Button type="submit" disabled={isLoading}>
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Login 
                </Button>
            {/if}
            {#if ["login", "register"].includes(action)}
                <Button on:click={resetForm} disabled={isLoading} variant="ghost">
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Cancel
                </Button>
            {/if}
		</div>
	</form>
</div>