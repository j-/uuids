import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { generateUUID } from '../uuid';
import BlockButton from './BlockButton';

import {
	Glyph,
	Form,
	FormField,
	FormInput,
	Button,
	Row,
	Col,
} from 'elemental';

const ReloadIcon = () => <Glyph icon="sync" />;
const CopyIcon = () => <Glyph icon="clippy" />;

export default class SectionGenerateSingle extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			uuid: generateUUID(),
			hasFocus: false,
		};
		this.inputComponent = null;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.regenerateUUID = this.regenerateUUID.bind(this);
		this.selectUUID = this.selectUUID.bind(this);
	}

	componentDidMount () {
		this.selectUUID();
	}

	render () {
		const { uuid, hasFocus } = this.state;
		const buttonType = hasFocus ? 'primary' : 'default-primary';
		return (
			<Form
				onSubmit={ this.handleSubmit }
				onFocus={ this.handleFocus }
				onBlur={ this.handleBlur }
			>
				<FormField>
					<FormInput
						style={{ fontFamily: 'monospace' }}
						value={ uuid }
						readOnly={ true }
						autoFocus={ true }
						ref={ (ref) => this.inputComponent = ref }
						onMouseUp={ this.selectUUID }
					/>
				</FormField>
				<br />
				<Row>
					<Col sm="1/2">
						<BlockButton type={ buttonType } onClick={ this.regenerateUUID }>
							<ReloadIcon />&nbsp;
							Generate another
						</BlockButton>
					</Col>
					<Col sm="1/2">
						<BlockButton onClick={ () => copy(uuid) }>
							<CopyIcon />&nbsp;
							Copy to clipboard
						</BlockButton>
					</Col>
				</Row>
			</Form>
		);
	}

	handleSubmit (e) {
		e.preventDefault();
		this.regenerateUUID();
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

	regenerateUUID () {
		this.setState(() => ({
			uuid: generateUUID(),
		}), () => this.selectUUID());
	}

	selectUUID () {
		const { inputComponent } = this;
		const { input } = inputComponent.refs;
		input.select();
	}
}
