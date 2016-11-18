import React, { Component } from 'react';
import UUIDList from './UUIDList';
import uuid from 'uuid';
import CopyRandom from './CopyRandom';
import Ribbon from './Ribbon';
import Configuration from './Configuration';

import {
	Button,
	Glyph,
} from 'elemental';

const MIN_COUNT = 1;
const MAX_COUNT = 1000;

const ReloadIcon = () => <Glyph icon="sync" />;
const CopyIcon = () => <Glyph icon="clippy" />;

const generateUUIDs = (length, version = 'v4') => {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(
			uuid[version]()
		);
	}
	return result;
};

const clamp = (val, min, max) => (
	Math.max(min, Math.min(max, val))
);

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 10,
			version: 'v4',
			delimiter: '\n',
		}
		this.state.uuids = this.generateUUIDs();
		this.regenerateUUIDs = this.regenerateUUIDs.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeCount = this.handleChangeCount.bind(this);
		this.handleChangeDelimiter = this.handleChangeDelimiter.bind(this);
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

	handleSubmit (e) {
		e.preventDefault();
	}

	handleChangeCount (e) {
		const previousCount = this.state.count;
		const newCount = clamp(Number(e.target.value), MIN_COUNT, MAX_COUNT);
		if (newCount !== previousCount) {
			this.setState({
				count: newCount,
			}, () => this.regenerateUUIDs());
		}
	}

	handleChangeDelimiter (value) {
		this.setState({
			delimiter: value,
		});
	}

	render () {
		const { count, uuids, delimiter } = this.state;
		return (
			<div className="app">
				<h1>UUIDs</h1>
				<Ribbon />
				<UUIDList
					uuids={ uuids }
					delimiter={ delimiter }
				/>
				<hr />
				<Configuration
					count={ count }
					delimiter={ delimiter }
					onChangeCount={ this.handleChangeCount }
					onChangeDelimiter={ this.handleChangeDelimiter }
				/>
				<div>
					<Button type="primary" onClick={ this.regenerateUUIDs }>
						<ReloadIcon />
						{ ' ' }
						Generate more
					</Button>
					{ ' ' }
					<CopyRandom>
						<CopyIcon />
						{ ' ' }
						Copy random
					</CopyRandom>
				</div>
			</div>
		);
	}
}
