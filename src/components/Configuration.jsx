import React, { PropTypes } from 'react';

import {
	Form,
	FormRow,
	FormField,
	FormInput,
	FormSelect,
} from 'elemental';

const delimiterOptions = [
	{ label: 'Line break', value: '\n' },
	{ label: 'Tab', value: '\t' },
	{ label: 'Comma', value: ',' },
];

const Configuration = ({
	count,
	delimiter,
	onChangeCount,
	onChangeDelimiter,
}) => (
	<Form onSubmit={ (e) => e.preventDefault() }>
		<FormRow>
			<FormField width="one-half" label="Count">
				<FormInput
					type="number"
					placeholder="Count"
					onChange={ onChangeCount }
					value={ count }
				/>
			</FormField>
			<FormField width="one-half" label="Delimiter">
				<FormSelect
					options={ delimiterOptions }
					onChange={ onChangeDelimiter }
					value={ delimiter }
				/>
			</FormField>
		</FormRow>
	</Form>
);

Configuration.propTypes = {
	count: PropTypes.number.isRequired,
	delimiter: PropTypes.string.isRequired,
	onChangeCount: PropTypes.func.isRequired,
	onChangeDelimiter: PropTypes.func.isRequired,
};

export default Configuration;
