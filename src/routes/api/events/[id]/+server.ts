import { deleteEventById } from '$lib/server/remote-events';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }: { params: { id: string } }) {
	try {
		const eventId = parseInt(params.id, 10);
		if (isNaN(eventId)) {
			return json({ success: false, message: 'Invalid event ID' }, { status: 400 });
		}

		const success = await deleteEventById(eventId);
		if (success) {
			return json({ success: true });
		} else {
			return json({ success: false, message: 'Failed to delete event' }, { status: 500 });
		}
	} catch {
		return json({ success: false, message: 'Server error' }, { status: 500 });
	}
}
