<script lang="ts">
	import type { PageData } from './$types';
	import EventList from '$lib/components/EventList.svelte';

	let { data }: { data: PageData } = $props();

	function handleDelete(eventId: number) {
		alert(`Delete functionality is not implemented for event ID: ${eventId}`);
	}
</script>

<div>
	{#await data.event}
		<p class="text-center mt-4">Loading event...</p>
	{:then eventData}
		{#if !eventData}
			<p class="text-center mt-4 text-gray-500">No events found. Please add an event.</p>
		{:else}
			<EventList events={[eventData]} onDelete={handleDelete} />
		{/if}
	{:catch error}
		<p class="quote error">Failed to load the event: {error.message}</p>
	{/await}
</div>
