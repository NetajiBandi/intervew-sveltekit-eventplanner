<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';

	// Convert `data.events` to a reactive store
	let { data }: { data: PageData } = $props();
	let events = writable(data.events);

	// Function to delete an event
	async function handleDelete(eventId: number) {
		if (confirm('Are you sure you want to delete this event?')) {
			try {
				const response = await fetch(`/api/events/${eventId}`, {
					method: 'DELETE'
				});

				if (response.ok) {
					// Update the events store to remove the deleted event
					events.update((currentEvents) => currentEvents.filter((event) => event.id !== eventId));
					alert('Event deleted successfully.');
				} else {
					const error = await response.json();
					alert(`Failed to delete the event: ${error.message}`);
				}
			} catch (error) {
				alert('An error occurred while deleting the event.');
			}
		}
	}
</script>

<h1 class="text-xl">Events</h1>
{#each $events as event}
	<div>
		<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
		<p>{event.description}</p>
		<p>{event.date}</p>
		<a class="btn" href={`/newevent?id=${event.id}`} role="button">Edit</a>
		<button class="btn btn-danger" on:click={() => handleDelete(event.id)}>Delete</button>
	</div>
{/each}

<a class="btn" href="/newevent" role="button">Add Event</a>
