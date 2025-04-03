<script lang="ts">
	import type { PageData } from './$types';
	import EventList from '$lib/components/EventList.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { writable } from 'svelte/store';

	let { data }: { data: PageData } = $props();

	let modalMessage = writable('');
	let showModal = writable(false);
	let isSuccess = writable(false); // New store to track success or failure

	function closeModal() {
		$showModal = false;
		modalMessage.set('');
		isSuccess.set(false); // Reset success state

		window.location.reload();
	}

	async function handleDelete(eventId: number) {
		if (confirm('Are you sure you want to delete this event?')) {
			try {
				const response = await fetch(`/api/events/${eventId}`, {
					method: 'DELETE'
				});

				if (response.ok) {
					modalMessage.set('Event deleted successfully.');
					isSuccess.set(true); // Set success state
				} else {
					const error = await response.json();
					modalMessage.set(`Failed to delete the event: ${error.message}`);
					isSuccess.set(false); // Set failure state
				}
			} catch (error) {
				modalMessage.set('An error occurred while deleting the event.');
				isSuccess.set(false); // Set failure state
			} finally {
				$showModal = true;
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

{#if $showModal}
	<div class="modal modal-open">
		<div class="modal-box">
			<div class="flex items-center space-x-4">
				{#if $isSuccess}
					<img src="/img/success-icon.svg" alt="Success" class="h-6 w-6" />
				{:else}
					<img src="/img/failure-icon.svg" alt="Failure" class="h-6 w-6" />
				{/if}
				<p>{$modalMessage}</p>
			</div>
			<div class="modal-action">
				<button class="btn" onclick={closeModal}>Close</button>
			</div>
		</div>
	</div>
{/if}
