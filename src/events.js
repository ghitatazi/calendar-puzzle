import React from 'react';
import EventsGroup from './events_group';
import { groupEvents } from './helpers';

export default function Events({ events, timeToTop }) {
	return (
		<div>
			{
				groupEvents(events).map( group => (
					<EventsGroup
						key={ group.startTime }
						group={ group }
						timeToTop={ timeToTop }
					/>
				))
			}
		</div>
	);
}
