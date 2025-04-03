import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const loadedEvents = async () => {
		return await fetchAllEvents();
	};

	return {
		events: loadedEvents()
	};
};
