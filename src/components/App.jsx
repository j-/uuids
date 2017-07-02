import React from 'react';
import Ribbon from './Ribbon';
import SectionGenerateSingle from './SectionGenerateSingle';
import SectionGenerateMultiple from './SectionGenerateMultiple';
import SectionDownload from './SectionDownload';

const App = () => (
	<div className="app">
		<Ribbon />
		<h1>UUIDs</h1>

		<br />
		<br />

		<h2>Generate a single v4 UUID</h2>
		<SectionGenerateSingle />

		<hr />

		<h2>Generate multiple v4 UUIDs</h2>
		<SectionGenerateMultiple />

		<hr />

		<h2>Download multiple v4 UUIDs</h2>
		<SectionDownload />
	</div>
);

export default App;
