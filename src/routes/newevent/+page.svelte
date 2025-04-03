<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<form method="POST">
	<fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
		<legend class="fieldset-legend">Add Event</legend>

		<div class="mx-auto flex max-w-xs flex-col gap-3">
			<label class="fieldset-label">Title</label>
			<input
				type="text"
				class="input"
				placeholder="Type here"
				id="title"
				name="title"
				required
				value={data.event?.title || ''}
			/>

			<label class="fieldset-label">Description</label>
			<textarea
				class="textarea"
				placeholder="Type here"
				value={data.event?.description || ''}
				id="description"
				name="description"
				rows="3"
				required
			/>

			<label class="fieldset-label">Title</label>
			<input
				type="datetime-local"
				class="input"
				placeholder="Type here"
				id="date"
				name="date"
				required
				value={data.event?.date || ''}
			/>

			<button type="submit" class="btn btn-neutral mt-4">
				{data.event ? 'Update' : 'Add'}
			</button>
			<a class="btn" href="/" role="button">Cancel</a>
		</div>
	</fieldset>
</form>
