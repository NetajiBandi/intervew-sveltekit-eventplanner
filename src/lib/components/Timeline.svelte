<script lang="ts">
	export let events: Array<{ id: number; title: string; description?: string; date: string }> = [];
</script>

<div class="flex flex-wrap items-center justify-center overflow-x-hidden xl:py-10">
	<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
		{#each events as event, index}
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
