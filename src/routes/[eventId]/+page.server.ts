import { fetchEventById } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const loadedEvent = async () => {
		return await fetchEventById(parseInt(params.eventId));
	};

	return {
		event: loadedEvent()
	};
};
