import React, { Component } from 'react';
import UUIDList from './UUIDList';
import uuid from 'uuid';
import CopyRandom from './CopyRandom';
import Ribbon from './Ribbon';

import {
	Button,
	Form,
	FormField,
	FormInput,
	FormSelect,
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

const delimiterOptions = [
	{ label: 'Line break', value: '\n' },
	{ label: 'Tab', value: '\t' },
	{ label: 'Comma', value: ',' },
];

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 10,
			version: 'v4',
			delimiter: '\n',
		}
		this.state.uuids = this.generateUUIDs();
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
		this.regenerateUUIDs();
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
				<Form type="inline" onSubmit={ this.handleSubmit }>
					<FormField label="Count">
						<FormInput
							type="number"
							placeholder="Count"
							onChange={ this.handleChangeCount }
							value={ count }
						/>
					</FormField>
					<FormField label="Delimiter">
						<FormSelect
							type="number"
							options={ delimiterOptions }
							onChange={ this.handleChangeDelimiter }
							value={ delimiter }
						/>
					</FormField>
					<FormField>
						<Button submit>
							<ReloadIcon />
							{ ' ' }
							Generate more
						</Button>
					</FormField>
				</Form>
				<UUIDList
					uuids={ uuids }
					delimiter={ delimiter }
				/>
				<hr />
				<div>
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
