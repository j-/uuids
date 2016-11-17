import React, { Component } from 'react';
import UUIDList from './UUIDList';
import uuid from 'uuid';
import { Button } from 'elemental';

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
		this.regenerateUUIDs = this.regenerateUUIDs.bind(this);
	}

	generateUUIDs () {
		const { count, version } = this.state;
		return generateUUIDs(count, version);
	}

	regenerateUUIDs () {
		this.setState({
			uuids: this.generateUUIDs(),
		});
	}

	render () {
		const { uuids } = this.state;
		return (
			<div className="app">
				<h1>UUIDs</h1>
				<Button onClick={ this.regenerateUUIDs }>Generate more</Button>
				<UUIDList
					uuids={ uuids }
				/>
			</div>
		);
	}
}
