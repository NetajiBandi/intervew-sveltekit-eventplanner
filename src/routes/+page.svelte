<script lang="ts">
	import type { PageData } from './$types';
	import EventList from '$lib/components/EventList.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	let { data }: { data: PageData } = $props();

	async function handleDelete(eventId: number) {
		if (confirm('Are you sure you want to delete this event?')) {
			try {
				const response = await fetch(`/api/events/${eventId}`, {
					method: 'DELETE'
				});

				if (response.ok) {
					window.location.reload();
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

<div class="flex flex-wrap items-center justify-center overflow-x-hidden">
	<a class="btn btn-neutral mt-4" href="/newevent" role="button" data-sveltekit-prefetch
		>Add Event</a
	>
</div>

{#await data.events}
	<p class="text-center mt-4">Loading events...</p>
{:then event}
	{#if !event || event.length === 0}
		<p class="text-center mt-4 text-gray-500">No events found. Please add an event.</p>
	{:else}
		<EventList events={event} onDelete={handleDelete} />
		<Timeline events={event} />
	{/if}
{:catch error}
	<p class="quote error">Failed to load events: {error.message}</p>
{/await}
