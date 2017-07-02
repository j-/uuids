import React from 'react';
import { generateUUIDs, VERSION_4 as UUID_V4 } from '../uuid';
import BlockButton from './BlockButton';

import {
	Glyph,
	Form,
	Row,
	Col,
	FormField,
	FormInput,
	FormSelect,
} from 'elemental';

const TYPE_JSON = 'json';
const TYPE_CSV = 'csv';

const formatOptions = [
	{ label: 'JSON', value: TYPE_JSON },
	{ label: 'CSV', value: TYPE_CSV },
];

const DownloadIcon = () => <Glyph icon="desktop-download" />;

export default class SectionDownload extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 1000,
			version: UUID_V4,
			format: TYPE_JSON,
			hasFocus: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChangeCount = this.handleChangeCount.bind(this);
		this.handleChangeFormat = this.handleChangeFormat.bind(this);
	}

	render () {
		const { count, format, hasFocus } = this.state;
		const buttonType = hasFocus ? 'primary' : 'default-primary';
		return (
			<Form
				onSubmit={ this.handleSubmit }
				onFocus={ this.handleFocus }
				onBlur={ this.handleBlur }
			>
				<Row>
					<Col sm="1/2">
						<FormField label="Count">
							<FormInput
								type="number"
								placeholder="Count"
								onChange={ this.handleChangeCount }
								value={ count }
							/>
						</FormField>
					</Col>
					<Col sm="1/2">
						<FormField label="Format">
							<FormSelect
								options={ formatOptions }
								onChange={ this.handleChangeFormat }
								value={ format }
							/>
						</FormField>
					</Col>
				</Row>
				<br />
				<div>
					<BlockButton type={ buttonType } submit={ true }>
						<DownloadIcon />&nbsp;
						Download
					</BlockButton>
				</div>
			</Form>
		);
	}

	handleSubmit (e) {
		e.preventDefault();
		this.downloadFile();
	}

	handleFocus () {
		this.setState(() => ({
			hasFocus: true,
		}));
	}

	handleBlur () {
		this.setState(() => ({
			hasFocus: false,
		}));
	}

	handleChangeCount (e) {
		const { value } = e.currentTarget;
		this.setState(() => ({
			count: value,
		}));
	}

	handleChangeFormat (value) {
		this.setState(() => ({
			format: value,
		}));
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
		const json = JSON.stringify(data, null, 2);
		this.downloadData(
			json,
			data.length,
			'application/json',
			'.json'
		);
	}

	downloadCSV (data) {
		const csv = 'UUID\n' + data.join('\n');
		this.downloadData(
			csv,
			data.length,
			'text/csv',
			'.csv'
		);
	}

	// From http://jsfiddle.net/koldev/cW7W5/
	downloadData (raw, count, type, extension) {
		const timestamp = Date.now();
		const blob = new Blob([raw], { type });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `uuids-${count}-${timestamp}.${extension}`;
		a.click();
		URL.revokeObjectURL(url);
	}
}
