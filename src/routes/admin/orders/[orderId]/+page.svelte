<script lang="ts">
    import { onMount } from 'svelte';
    import * as Card from '$lib/components/ui/card/index.js';

    export let data;

    onMount(() => {
        console.log(data);
    });
</script>

<div class="order-details">
    <Card.Root>
        <Card.Header>
            <Card.Title>Order Details</Card.Title>
        </Card.Header>
		<Card.Content>
			<p><b>Order ID:</b> {data.order.stripeOrderId}</p>
			<p><b>Status:</b> {data.order.status}</p>
			<p><b>Date:</b> {new Date(data.order.timestamp).toLocaleDateString()}</p>
			<p><b>Total Price:</b> ${(data.order.totalPrice / 100).toFixed(2)}</p>
		</Card.Content>
		
		<Card.Content>
			<table>
				<thead>
					<tr>
						<th>SKU</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{#each data.order.products as product}
						<tr>
							<td>{product.productSizeCode}</td>
							<td>{product.quantity}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Card.Content>
    </Card.Root>

    <Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>Customer Details</Card.Title>
		</Card.Header>

		<Card.Content>
			<p><b>Name:</b> {data.order.customerInfo.name}</p>
			<p><b>Email:</b> {data.order.email}</p>
			<p><b>Address:</b> {data.order.customerInfo.address?.line1}</p>
			<p><b>City:</b> {data.order.customerInfo.address?.city}</p>
			<p><b>State:</b> {data.order.customerInfo.address?.state}</p>
			<p><b>Zip:</b> {data.order.customerInfo.address?.postal_code}</p>
			<p><b>Country:</b> {data.order.customerInfo.address?.country}</p>
		</Card.Content>
    </Card.Root>
</div>

<style>
    .order-details {
        max-width: 800px;
        margin: auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

	table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        color: black;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
</style>
