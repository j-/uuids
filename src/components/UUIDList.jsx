import React, { PropTypes } from 'react';
import { FormInput } from 'elemental';

const UUIDList = ({ uuids, delimiter, ...props }) => (
	<div className="uuid-list">
		<FormInput
			style={{ height: 250 }}
			multiline
			readOnly
			spellCheck={ false }
			value={ uuids.join(delimiter) }
		/>
	</div>
);

UUIDList.propTypes = {
	uuids: PropTypes.arrayOf(PropTypes.string),
	delimiter: PropTypes.string,
};

UUIDList.defaultProps = {
	uuids: [],
	delimiter: '\n',
};

export default UUIDList;
