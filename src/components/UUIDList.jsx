import React, { PropTypes } from 'react';
import { FormInput } from 'elemental';

const UUIDList = ({ uuids, count, version, delimiter, ...props }) => (
	<div className="uuid-list">
		<FormInput
			style={{ height: 250 }}
			multiline
			defaultValue={ uuids.join(delimiter) }
		/>
	</div>
);

UUIDList.propTypes = {
	uuids: PropTypes.arrayOf(PropTypes.string),
	count: PropTypes.number,
	version: PropTypes.oneOf(['v1', 'v4']),
	delimiter: PropTypes.string,
};

UUIDList.defaultProps = {
	uuids: [],
	count: 10,
	version: 'v4',
	delimiter: '\n',
};

export default UUIDList;
