<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import EventList from '$lib/components/EventList.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	let { data }: { data: PageData } = $props();
	let events = writable(
		data.events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	);

	async function handleDelete(eventId: number) {
		if (confirm('Are you sure you want to delete this event?')) {
			try {
				const response = await fetch(`/api/events/${eventId}`, {
					method: 'DELETE'
				});

				if (response.ok) {
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

<div class="flex flex-wrap items-center justify-center overflow-x-hidden">
	<a class="btn btn-neutral mt-4" href="/newevent" role="button">Add Event</a>
</div>

<EventList events={$events} onDelete={handleDelete} />

<Timeline events={$events} />
