import React, { Component } from 'react';
import { generateUUIDs, VERSION_4 as UUID_V4 } from '../uuid';

import {
	Glyph,
	Form,
	FormRow,
	FormField,
	FormInput,
	FormSelect,
	Button,
} from 'elemental';

const TYPE_JSON = 'json';
const TYPE_CSV = 'csv';

const formatOptions = [
	{ label: 'JSON', value: TYPE_JSON },
	{ label: 'CSV', value: TYPE_CSV },
];

const DownloadIcon = () => <Glyph icon="desktop-download" />;

class Download extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 1000,
			version: UUID_V4,
			format: TYPE_JSON,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeCount = this.handleChangeCount.bind(this);
		this.handleChangeFormat = this.handleChangeFormat.bind(this);
	}

	handleSubmit (e) {
		e.preventDefault();
		this.downloadFile();
	}

	handleChangeCount (e) {
		this.setState({
			count: e.target.value,
		});
	}

	handleChangeFormat (value) {
		this.setState({
			format: value,
		});
	}

	generateUUIDs () {
		const { count, version } = this.state;
		return generateUUIDs(count, version);
	}

	downloadFile () {
		const data = this.generateUUIDs();
		const { format } = this.state;
		switch (format) {
			case TYPE_JSON:
				return this.downloadJSON(data);
			case TYPE_CSV:
				return this.downloadCSV(data);
			default:
				return null;
		}
	}

	downloadJSON (data) {
		const json = JSON.stringify(data, null, '  ');
		this.downloadData(
			json,
			'application/json',
			'uuids.json'
		);
	}

	downloadCSV (data) {
		const csv = 'UUID\n' + data.join('\n');
		this.downloadData(
			csv,
			'text/csv',
			'uuids.csv'
		);
	}

	// From http://jsfiddle.net/koldev/cW7W5/
	downloadData (data, type, filename) {
		const blob = new Blob([data], { type });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	}

	render () {
		const { count, format } = this.state;
		return (
			<Form onSubmit={ this.handleSubmit }>
				<FormRow>
					<FormField width="one-half" label="Count">
						<FormInput
							type="number"
							placeholder="Count"
							onChange={ this.handleChangeCount }
							value={ count }
						/>
					</FormField>
					<FormField width="one-half" label="Format">
						<FormSelect
							options={ formatOptions }
							onChange={ this.handleChangeFormat }
							value={ format }
						/>
					</FormField>
				</FormRow>
				<div>
					<Button type="default-primary" submit>
						<DownloadIcon />
						{ ' ' }
						Download
					</Button>
				</div>
			</Form>
		);
	}
}

export default Download;
