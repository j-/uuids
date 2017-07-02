import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { generateUUIDs } from '../uuid';
import BlockButton from './BlockButton';

import {
	Glyph,
	FormField,
	FormInput,
	FormSelect,
	Button,
	Row,
	Col,
} from 'elemental';

const DEFAULT_COUNT = 10;
const MIN_COUNT = 1;
const MAX_COUNT = 1000;

const clamp = (val, min, max) => (
	Math.max(min, Math.min(max, val))
);

const ReloadIcon = () => <Glyph icon="sync" />;
const CopyIcon = () => <Glyph icon="clippy" />;

const DEFAULT_DELIMITER = '\n';
const delimiterOptions = [
	{ label: 'Line break', value: '\n' },
	{ label: 'Tab', value: '\t' },
	{ label: 'Comma', value: ',' },
];

export default class SectionGenerateMultiple extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			count: DEFAULT_COUNT,
			delimiter: DEFAULT_DELIMITER,
			uuids: generateUUIDs(DEFAULT_COUNT),
		};
		this.inputComponent = null;
		this.regenerateUUIDs = this.regenerateUUIDs.bind(this);
		this.handleChangeCount = this.handleChangeCount.bind(this);
		this.handleChangeDelimiter = this.handleChangeDelimiter.bind(this);
	}

	render () {
		const { count, delimiter, uuids } = this.state;
		const text = uuids.join(delimiter);
		return (
			<div>
				<FormField>
					<FormInput
						style={{ fontFamily: 'monospace', height: 250 }}
						multiline={ true }
						readOnly={ true }
						spellCheck={ false }
						value={ text }
					/>
				</FormField>
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
						<FormField label="Delimiter">
							<FormSelect
								options={ delimiterOptions }
								onChange={ this.handleChangeDelimiter }
								value={ delimiter }
							/>
						</FormField>
					</Col>
				</Row>
				<br />
				<Row>
					<Col sm="1/2">
						<BlockButton type="default-primary" onClick={ this.regenerateUUIDs }>
							<ReloadIcon />&nbsp;
							Generate more
						</BlockButton>
					</Col>
					<Col sm="1/2">
						<BlockButton onClick={ () => copy(text) }>
							<CopyIcon />&nbsp;
							Copy to clipboard
						</BlockButton>
					</Col>
				</Row>
			</div>
		);
	}

	regenerateUUIDs () {
		this.setState((state) => ({
			uuids: generateUUIDs(state.count),
		}));
	}

	handleChangeCount (e) {
		const { value } = e.currentTarget;
		const previousCount = this.state.count;
		const count = clamp(Number(value), MIN_COUNT, MAX_COUNT);
		if (count === previousCount) {
			// Count hasn't actually changed
			// Exit early
			return;
		}
		this.setState(() => ({
			count,
		}), this.regenerateUUIDs);
	}

	handleChangeDelimiter (delimiter) {
		this.setState(() => ({
			delimiter,
		}), this.regenerateUUIDs);
	}
}