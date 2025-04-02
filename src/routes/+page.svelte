<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-xl">Events</h1>
{#each data.events as event}
	<div>
		<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
		<p>{event.description}</p>
		<p>{event.date}</p>
		<a class="btn" href={`/newevent?id=${event.id}`} role="button">Edit</a>
	</div>
{/each}

<a class="btn" href="/newevent" role="button">Add Event</a>
