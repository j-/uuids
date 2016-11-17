import React, { Component, PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from 'elemental';
import uuid from 'uuid';

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
		return uuid[version]();
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
	version: PropTypes.oneOf(['v1', 'v4']),
};

CopyRandom.defaultProps = {
	version: 'v4',
};
