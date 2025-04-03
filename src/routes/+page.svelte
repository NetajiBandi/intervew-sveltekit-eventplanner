<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';

	let { data }: { data: PageData } = $props();
	let events = writable(data.events);

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

<div class="flex flex-wrap items-center justify-center overflow-x-hidden xl:py-10">
	<div class="w-full max-w-lg">
		<ul class="list bg-base-100 rounded-box shadow-md">
			<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Recent events</li>
			{#each $events as event, index}
				{#if index > 0}
					<div class="divider"></div>
				{/if}
				<li class="list-row">
					<div>
						<div>{event.title}</div>
						<div class="text-xs uppercase font-semibold opacity-60">{event.date}</div>
					</div>
					<p class="list-col-wrap text-xs">
						{event.description}
					</p>
					<div class="ml-auto flex gap-2">
						<a class="btn btn-square btn-ghost" href={`/newevent?id=${event.id}`} role="button">
							<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M3 21v-3.75L16.81 3.44a1.5 1.5 0 0 1 2.12 0l1.63 1.63a1.5 1.5 0 0 1 0 2.12L6.75 21H3zm3.5-2H5v1.5h1.5V19zm1.06-1.06L18.44 6.06l-1.5-1.5L6.06 16.44l1.5 1.5z"
									fill="currentColor"
								/>
							</svg>
						</a>

						<button class="btn btn-square btn-ghost" on:click={() => handleDelete(event.id)}>
							<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M9 3h6a1 1 0 0 1 1 1v1h5a1 1 0 1 1 0 2h-1v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7H3a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Zm6 4a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V7Zm-4 0a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V7Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="flex flex-wrap items-center justify-center overflow-x-hidden xl:py-10">
	<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
		{#each $events as event, index}
			<li>
				<div class="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class={index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'}>
					<time class="font-mono italic">{event.date}</time>
					<div class="text-lg font-black">{event.title}</div>
					{event.description}
				</div>
				<hr />
			</li>
		{/each}
	</ul>
</div>

<style>
	.list :where(.list-row) {
		--list-grid-cols: minmax(0, auto) 1fr;
		border-radius: var(--radius-box);
		word-break: break-word;
		grid-auto-flow: column;
		grid-template-columns: var(--list-grid-cols);
		gap: 1rem;
		padding: 1rem;
		display: grid;
		position: relative;
	}
	.list-col-wrap {
		grid-row-start: 2;
	}
	.list :where(.list-row) :not(.list-col-wrap) {
		grid-row-start: 1;
	}
</style>
