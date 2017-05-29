import React, { Component } from 'react';
import Event from './event';
import { stackGroupEvents } from './helpers';

export default class EventsGroup extends Component {
	componentWillMount() {
		this.timeToTop = this.timeToTop.bind(this);
	}
	render() {
		const { group, timeToTop } = this.props;
		const top = this.top();
		const stacks = stackGroupEvents(group.events);
		const width = `${ 100 / stacks.length }%`;
		return (
			<div
				style={{
					...styles.group,
					top
				}}
			>
				{
					stacks.map( (stack, i) => (
						<div
							key={ i }
							style={{
								...styles.stack,
								width
							}}
						>
							{
								stack.events.map( event => (
									<Event
										key={ event.id }
										event={ event }
										timeToTop={ this.timeToTop }
									/>
								))
							}
						</div>
					))
				}
			</div>
		);
	}
	top() {
		return this.props.timeToTop(this.props.group.startTime);
	}
	timeToTop(time) {
		return this.props.timeToTop(time) - this.top();
	}
}

const styles = {
	group: {
		position: 'absolute',
		left: 0,
		right: 0,
		display: 'flex'
	},
	stack: {
		height: '100%',
		position: 'relative'
	}
};
