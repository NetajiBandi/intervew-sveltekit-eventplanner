<script lang="ts">
	import type { PageData } from './$types';
	import EventList from '$lib/components/EventList.svelte';

	let { data }: { data: PageData } = $props();

	function handleDelete(eventId: number) {
		alert(`Delete functionality is not implemented for event ID: ${eventId}`);
	}
</script>

<div>
	{#if data.event}
		<EventList events={[data.event]} onDelete={handleDelete} />
	{/if}
	<div class="mx-auto flex max-w-xs flex-col gap-3">
		<a class="btn" href="/" role="button">Home</a>
	</div>
</div>
