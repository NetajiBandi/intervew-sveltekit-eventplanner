<script lang="ts">
	export let events: Array<{ id: number; title: string; description?: string; date: string }> = [];
	export let onDelete: (id: number) => void = () => {};
</script>

<div class="flex flex-wrap items-center justify-center overflow-x-hidden xl:py-10">
	<div class="w-full max-w-lg">
		<ul class="list bg-base-100 rounded-box shadow-md">
			<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Recent events</li>
			{#each events as event, index}
				{#if index > 0}
					<div class="divider"></div>
				{/if}
				<li class="list-row">
					<div on:click={() => (window.location.href = `/${event.id}`)} class="cursor-pointer">
						<div>{event.title}</div>
						<div class="text-xs uppercase font-semibold opacity-60">{event.date}</div>
					</div>
					<p class="list-col-wrap text-xs">
						{event.description}
					</p>
					<div class="ml-auto flex gap-2">
						<a
							class="btn btn-square btn-ghost"
							href={`/newevent?id=${event.id}`}
							role="button"
							aria-label="Edit event"
						>
							<img src="/img/edit-icon.svg" alt="Edit" class="h-5 w-5" />
						</a>

						<button
							class="btn btn-square btn-ghost"
							on:click={() => onDelete(event.id)}
							aria-label="Delete event"
						>
							<img src="/img/delete-icon.svg" alt="Delete" class="h-5 w-5" />
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
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
