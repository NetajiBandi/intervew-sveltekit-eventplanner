<script lang="ts">
	export let events: Array<{ id: number; title: string; description?: string; date: string }> = [];
</script>

<div class="flex flex-wrap items-center justify-center overflow-x-hidden xl:py-10">
	<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
		{#each events as event, index}
			<li>
				<div class="timeline-middle">
					<img src="/img/timeline-icon.svg" alt="Timeline" class="h-5 w-5" />
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
