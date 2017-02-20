import React, { Component } from 'react';
import { FormInput } from 'elemental';

import { generateUUID,
	VERSION_1 as UUID_V1,
	VERSION_4 as UUID_V4,
} from '../uuid';

export default class UUIDSingle extends Component {
	constructor (props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
		this.state = {
			uuid: generateUUID(UUID_V4),
		};
	}

	componentDidMount () {
		try {
			const { control } = this.refs;
			const { input } = control.refs;
			input.focus();
			input.select();
		} catch (err) {
			// Ignore errors
		}
	}

	handleFocus () {
		try {
			const { control } = this.refs;
			const { input } = control.refs;
			input.select();
			input.selectionStart = 0;
			input.selectionEnd = 36; // Length of a UUID string
		} catch (err) {
			// Ignore errors
		}
	}

	render () {
		const { props } = this;
		return (
			<div className="uuid-single" { ...props }>
				<FormInput
					autoFocus
					spellCheck={ false }
					value={ this.state.uuid }
					ref="control"
					onFocus={ this.handleFocus }
					onChange={ () => {} }
				/>
			</div>
		);
	}
}
