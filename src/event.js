import React from 'react';

export default function Event({ event, timeToTop }) {
	const top = timeToTop(event.startTime);
	const height = timeToTop(event.endTime) - top;
	return (
		<div
			style={{
				...styles.event,
				top,
				height
			}}
		>
			<span>#{ event.id }</span>
			<span style={ styles.subtitle }>
				{ event.start } / {event.duration}min
			</span>
		</div>
	);
}

const styles = {
  event: {
    fontSize: '.8em',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    border: 'solid 1px #e3e4e5',
    color: '#808080',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingLeft: 10,
    overflow: 'hidden'
  },
  subtitle: {
    fontSize: '.8em',
    color: '#e3e4e5',
    paddingLeft: 5
  }
}
