import _ from 'lodash';

export class CancellableRequest {
	constructor(props) {
		this.url = props.url;
		this.cb = props.cb;
		this.start = this.start.bind(this);
		this.cancel = this.cancel.bind(this);
	}
	start() {
		fetch(this.url, {
	    	method: 'get'
	  	})
	  	.then(response => response.json())
		.then(events => {
			console.log(events);
			this.cb(events);
		});
	}
	cancel() {
		// callback does not call setState
		this.cb = () => { return; }
	}
}

export function timeToTop({ time, fromTime, toTime, height }) {
	return (height * (time - fromTime)) / (toTime - fromTime);
}

export function range(from, to, step = 1) {
	return _.range(from, to+step, step);
}

export function formatEvents(events) {
	let newEvents = events.map(eventObj => {
						let startTimeMinutes = eventObj['start'].split(":")[0]*60+parseInt(eventObj['start'].split(":")[1]);
						return {
							...eventObj,
							startTime: startTimeMinutes,
							endTime: startTimeMinutes+eventObj['duration']
						}
					});
	return newEvents;
}

export function groupEvents(events) {
	let sortedEvents = events.sort( (x, y) => {
		return (
			   x.startTime - y.startTime
		);
	});
	return sortedEvents.reduce( (groups, event) => {
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
	if ((startTime >= group.startTime && startTime <= group.endTime) ||
		(endTime >= group.startTime && endTime <= group.endTime)) {
		return true;
	}
	return false;
}

export function stackGroupEvents(events) {
	let sortedEvents = events.sort( (x, y) => {
		return (
			   x.startTime - y.startTime
			|| y.duration - x.duration
			|| x.id - y.id
		);
	});

	return sortedEvents.reduce( (stacks, event) => {
		// nous recherchons dans les colonnes déjà définies
		// s'il y en a une ou le endTime <= startTime de l'event
		const existingStack = stacks.find(
			stack => comesAfter(stack, event.startTime)
		);

		if (!existingStack) {
			stacks.push({
				startTime: event.startTime,
				endTime: event.endTime,
				events: [event]
			});
		} else {
			existingStack.endTime = event.endTime;
			existingStack.events.push(event);
		}
		return stacks;
	}, []);
}

export function comesAfter(stack, startTime) {
	if (startTime >= stack.endTime) {
		return true;
	}
	return false;
}


