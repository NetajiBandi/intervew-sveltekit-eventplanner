import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
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

        const newEvent = await createEvent({ title, description, date });
        throw redirect(303, `/${newEvent.id}`);
    }
};
