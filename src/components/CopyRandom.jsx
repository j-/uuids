import React, { Component, PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from 'elemental';

import {
	generateUUID,
	VERSION_1 as UUID_V1,
	VERSION_4 as UUID_V4,
} from '../uuid';

export default class CopyRandom extends Component {
	constructor (props) {
		super(props);
		this.state = {
			nextUUID: this.generateUUID(),
		};
		this.handleCopy = this.handleCopy.bind(this);
	}

	generateUUID () {
		const { version } = this.props;
		return generateUUID(version);
	}

	handleCopy () {
		this.setState({
			nextUUID: this.generateUUID(),
		});
	}

	render () {
		const { nextUUID } = this.state;
		const { ...props } = this.props;
		return (
			<CopyToClipboard text={ nextUUID } onCopy={ this.handleCopy }>
				<Button { ...props } />
			</CopyToClipboard>
		);
	}
}

CopyRandom.propTypes = {
	version: PropTypes.oneOf([UUID_V1, UUID_V4]),
};

CopyRandom.defaultProps = {
	version: UUID_V4,
};
