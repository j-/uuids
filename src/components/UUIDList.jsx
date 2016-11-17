import React, { PropTypes } from 'react';
import { FormInput } from 'elemental';
import uuid from 'uuid';

const generateUUIDs = (length, version = 'v4') => {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(
			uuid[version]()
		);
	}
	return result;
};

const UUIDList = ({ count, version, delimiter, ...props }) => (
	<div className="uuid-list">
		<FormInput
			style={{ height: 250 }}
			multiline
			defaultValue={ generateUUIDs(count, version).join(delimiter) }
		/>
	</div>
);

UUIDList.propTypes = {
	count: PropTypes.number,
	version: PropTypes.oneOf(['v1', 'v4']),
	delimiter: PropTypes.string,
};

UUIDList.defaultProps = {
	count: 10,
	version: 'v4',
	delimiter: '\n',
};

export default UUIDList;
