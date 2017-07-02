import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { generateUUID } from '../uuid';

import {
	Glyph,
	FormField,
	FormInput,
	Button,
	Row,
	Col,
} from 'elemental';

const ReloadIcon = () => <Glyph icon="sync" />;
const CopyIcon = () => <Glyph icon="clippy" />;
const BlockButton = (props) => <Button style={{ width: '100%' }} { ...props } />;

export default class SectionGenerateSingle extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			uuid: generateUUID(),
		};
		this.inputComponent = null;
		this.regenerateUUID = this.regenerateUUID.bind(this);
	}

	componentDidMount () {
		this.selectUUID();
	}

	render () {
		const { uuid } = this.state;
		return (
			<div>
				<FormField>
					<FormInput
						style={{ fontFamily: 'monospace' }}
						value={ uuid }
						readOnly={ true }
						autoFocus={ true }
						ref={ (ref) => this.inputComponent = ref }
					/>
				</FormField>
				<br />
				<Row>
					<Col sm="1/2">
						<BlockButton type="default-primary" onClick={ this.regenerateUUID }>
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
			</div>
		);
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
