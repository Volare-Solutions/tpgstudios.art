<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root class="w-[400px] mb-12">
	<Card.Header>
		<Card.Title>Email List</Card.Title>
		<Card.Description>Get updates and deals from the TPG team</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST">
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="email">Email</Label>
					<Input id="email" placeholder="you@mail.com" name="email" />
				</div>
			</div>
			<div class="flex justify-end pt-4">
				<Button type="submit">Join</Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>
