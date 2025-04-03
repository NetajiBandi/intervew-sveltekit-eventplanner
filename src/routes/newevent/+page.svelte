<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let formElement: HTMLFormElement | null = null;
	let { data }: { data: PageData } = $props();
	let isSubmitting = writable(false);
	let errorMessage = writable('');

	function enhanceHandler({
		formData,
		cancel,
		formElement
	}: {
		formData: FormData;
		cancel: () => void;
		formElement: HTMLFormElement;
		submitter: HTMLElement | null;
	}) {
		cancel();

		if ($isSubmitting) return;
		$isSubmitting = true;
		errorMessage.set('');

		fetch(formElement.action, {
			method: formElement.method,
			body: formData
		})
			.then(async (response) => {
				if (response.ok) {
					const data = await response.json();
					return goto(data.location);
				} else {
					const errorData = await response.json();
					errorMessage.set(errorData.error.message || 'An error occurred');
				}
			})
			.catch(() => {
				errorMessage.set('Failed to submit the form. Please try again.');
			})
			.finally(() => {
				$isSubmitting = false;
			});
	}
</script>

<form method="POST" bind:this={formElement} use:enhance={enhanceHandler} class="form">
	<fieldset
		class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
		disabled={$isSubmitting}
	>
		<legend class="fieldset-legend">Add Event</legend>

		<div class="mx-auto flex max-w-xs flex-col gap-3">
			<label class="fieldset-label" for="title">Title</label>
			<input
				type="text"
				class="input"
				placeholder="Type here"
				id="title"
				name="title"
				required
				value={data.event?.title || ''}
			/>

			<label class="fieldset-label" for="description">Description</label>
			<textarea
				class="textarea"
				placeholder="Type here"
				id="description"
				name="description"
				rows="3"
				required>{data.event?.description || ''}</textarea
			>

			<label class="fieldset-label" for="date">Date</label>
			<input
				type="datetime-local"
				class="input"
				placeholder="Type here"
				id="date"
				name="date"
				required
				value={data.event?.date || ''}
			/>

			<p class="text-error text-sm mt-1">{$errorMessage}</p>
			<button type="submit" class="btn btn-neutral mt-4" disabled={$isSubmitting}>
				{$isSubmitting ? 'Submitting...' : data.event ? 'Update' : 'Add'}
			</button>
			<a class="btn" href="/" role="button">Cancel</a>
		</div>
	</fieldset>
</form>
