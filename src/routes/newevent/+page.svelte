<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<form method="POST">
	<label for="title">Title</label>
	<input type="text" id="title" name="title" required value={data.event?.title || ''} />
	<textarea id="description" name="description" rows="4" cols="50" placeholder="Description"
		>{data.event?.description || ''}</textarea
	>
	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" required value={data.event?.date || ''} />
	<button type="submit">{data.event ? 'Update Event' : 'Create Event'}</button>
</form>
