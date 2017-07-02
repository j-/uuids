import React from 'react';
import { Button } from 'elemental';

const BlockButton = (props) => (
	<Button
		style={{ width: '100%' }}
		{ ...props }
	/>
);

export default BlockButton;
