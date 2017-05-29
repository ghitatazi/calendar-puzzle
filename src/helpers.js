export class CancellableRequest {
	// TODO
	start() {

	}
	cancel() {
		
	}
}

export function timeToTop({ time, fromTime, toTime, height }) {
	// TODO
	// retourne une valeur en pixels
	return 0;
}

export function range(from, to, step = 1) {
	// TODO
	return [];
}

export function formatEvents(events) {
	// TODO
	return events;
}

export function groupEvents(events) {
	return events.reduce( (groups, event) => {
		const overlappingGroup = groups.find(
			group => overlaps(group, event.startTime, event.endTime)
		);
		if (!overlappingGroup) {
			groups.push({
				startTime: event.startTime,
				endTime: event.endTime,
				events: [event]
			});
		} else {
			overlappingGroup.startTime = Math.min(event.startTime, overlappingGroup.startTime);
			overlappingGroup.endTime = Math.max(event.endTime, overlappingGroup.endTime);
			overlappingGroup.events.push(event);
		}
		return groups;
	}, []);
}

export function overlaps(group, startTime, endTime) {
	// TODO
	// retourne true si l'event allant de startTime à endTime recoupe group
	// false sinon
	return false;
}

export function stackGroupEvents(events) {
	return events.sort( (x, y) => {
		return (
			   x.startTime - y.startTime
			|| y.duration - x.duration
			|| x.id - y.id
		);
	}).reduce( (stacks, event) => {
		// TODO
		return stacks;
	}, []);
}
