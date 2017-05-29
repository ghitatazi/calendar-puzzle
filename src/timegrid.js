import React from 'react';
import { range } from './helpers';

export default function Timegrid({ fromTime, toTime, timeToTop }) {
	return (
		<div style={ styles.wrapper }>
			{
				range(fromTime, toTime, 60).map( time => (
					<div
						key={ time }
						style={{
							...styles.line,
							top: timeToTop(time)
						}}
					/>
				))
			}
		</div>
	);
}

const styles = {
	wrapper: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	line: {
		position: 'absolute',
		right: 0,
		left: 0,
		height: 1,
		backgroundColor: '#d2d3d4'
	}
};
