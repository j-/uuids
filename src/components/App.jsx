import React, { Component } from 'react';
import UUIDList from './UUIDList';
import uuid from 'uuid';

import {
	Button,
	Form,
	FormField,
	FormInput,
	Glyph,
} from 'elemental';

const ReloadIcon = () => <Glyph icon="sync" />;

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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeCount = this.handleChangeCount.bind(this);
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
		this.setState({
			count: Number(e.target.value),
		}, () => this.regenerateUUIDs());
	}

	render () {
		const { count, uuids } = this.state;
		return (
			<div className="app">
				<h1>UUIDs</h1>
				<Form type="inline" onSubmit={ this.handleSubmit }>
					<FormField label="Count">
						<FormInput
							type="number"
							placeholder="Count"
							min={ 1 }
							onChange={ this.handleChangeCount }
							value={ count }
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
				/>
			</div>
		);
	}
}
