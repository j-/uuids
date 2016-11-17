import React, { Component } from 'react';
import UUIDList from './UUIDList';
import uuid from 'uuid';

const generateUUIDs = (length, version = 'v4') => {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(
			uuid[version]()
		);
	}
	return result;
};

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 10,
			version: 'v4',
		}
		this.state.uuids = this.generateUUIDs();
	}

	generateUUIDs () {
		const { count, version } = this.state;
		return generateUUIDs(count, version);
	}

	render () {
		const { uuids } = this.state;
		return (
			<div className="app">
				<h1>UUIDs</h1>
				<UUIDList
					uuids={ uuids }
				/>
			</div>
		);
	}
}
