import React, { Component } from 'react';
import Calendar from './calendar';
import {
	CancellableRequest,
	formatEvents,
	timeToTop
} from './helpers';

const EVENTS_URL = 'https://gist.githubusercontent.com/VonD/8a241e8219bf01ddea256dc18dc8c63a/raw/80c3d3eb1930fafaea92f2abb2e7894dceea1966/input.json';
const FROM_TIME = 9 * 60;
const TO_TIME = 21 * 60;


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			windowSize: null
		};
		this.eventsRequest = new CancellableRequest({
			url: EVENTS_URL,
			cb: this.setEvents.bind(this)
		});
		this.timeToTop = this.timeToTop.bind(this);
	}
	componentDidMount() {
		// listen to window resize events
		this.cacheWindowSize = this.cacheWindowSize.bind(this);
		window.addEventListener('resize', this.cacheWindowSize);
		this.cacheWindowSize();
		// fetch events
		this.eventsRequest.start();
	}
	componentWillUnmount() {
		// cancel resize events listener
		window.removeEventListener('resize', this.cacheWindowSize);
		// cancel fetch request if pending
		this.eventsRequest.cancel();
	}
	render() {
		return (
			<Calendar
				events={ this.state.events }
				timeToTop={ this.timeToTop }
				fromTime={ FROM_TIME }
				toTime={ TO_TIME }
			/>
		);
	}
	setEvents(events = []) {
		this.setState({
			events: formatEvents(events)
		});
	}
	cacheWindowSize() {
		this.setState({
			windowSize: {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		});
	}
	timeToTop(time) {
		return timeToTop({
			time,
			fromTime: FROM_TIME,
			toTime: TO_TIME,
			height: this.state.windowSize && this.state.windowSize.height
		});
	}
}
