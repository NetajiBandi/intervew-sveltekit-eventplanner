import { createEvent, fetchEventById, updateEventById } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const event = await fetchEventById(parseInt(id));
		if (!event) {
			throw error(404, 'Event not found');
		}
		return { event };
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();

		if (!title || !date) {
			throw error(400, 'Title and Date are required');
		}

		const eventDate = new Date(date);
		const now = new Date();

		// Check if the event date is in the past
		if (eventDate < now) {
			throw error(400, 'The event date cannot be in the past');
		}

		const id = url.searchParams.get('id');
		if (id) {
			// Update existing event
			const updatedEvent = await updateEventById(parseInt(id), { title, description, date });
			if (!updatedEvent) {
				throw error(404, 'Event not found');
			}
			throw redirect(303, `/${updatedEvent.id}`);
		} else {
			// Create new event
			const newEvent = await createEvent({ title, description, date });
			throw redirect(303, `/${newEvent.id}`);
		}
	}
};
