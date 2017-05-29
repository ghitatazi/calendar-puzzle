import React from 'react';
import Timegrid from './timegrid';
import Events from './events';

export default function Calendar({
	fromTime,
	toTime,
	events,
	timeToTop
}) {
	return (
		<div style={ styles.wrapper }>
			<Timegrid
				fromTime={ fromTime }
				toTime={ toTime }
				timeToTop={ timeToTop }
			/>
			<Events
				events={ events }
				timeToTop={ timeToTop }
			/>
		</div>
	);
}

const styles = {
	wrapper: {
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: '#f4f5f6',
		fontFamily: 'sans-serif'
	}
};
