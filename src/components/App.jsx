import React, { Component } from 'react';
import UUIDList from './UUIDList';
import { generateUUIDs, VERSION_4 as UUID_V4 } from '../uuid';
import CopyRandom from './CopyRandom';
import Ribbon from './Ribbon';
import Configuration from './Configuration';
import Download from './Download';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
	Button,
	Glyph,
} from 'elemental';

const MIN_COUNT = 1;
const MAX_COUNT = 1000;

const ReloadIcon = () => <Glyph icon="sync" />;
const CopyIcon = () => <Glyph icon="clippy" />;

const clamp = (val, min, max) => (
	Math.max(min, Math.min(max, val))
);

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 10,
			version: UUID_V4,
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
		const text = uuids.join(delimiter);
		return (
			<div className="app">
				<h1>UUIDs</h1>
				<Ribbon />
				<h2>Generate v4 UUIDs</h2>
				<UUIDList
					uuids={ uuids }
					delimiter={ delimiter }
				/>
				<br />
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
					<CopyToClipboard text={ text }>
						<Button>
							<CopyIcon />
							{ ' ' }
							Copy above UUIDs
						</Button>
					</CopyToClipboard>
					{ ' ' }
					<CopyRandom>
						<CopyIcon />
						{ ' ' }
						Copy random UUID
					</CopyRandom>
				</div>
				<hr />
				<h2>Download v4 UUIDs</h2>
				<Download />
			</div>
		);
	}
}
