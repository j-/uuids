export const downloadJSON = (data) => {
	const json = JSON.stringify(data, null, 2);
	downloadData(
		json,
		data.length,
		'application/json',
		'.json'
	);
};

export const downloadCSV = (data) => {
	const csv = 'UUID\n' + data.join('\n');
	downloadData(
		csv,
		data.length,
		'text/csv',
		'.csv'
	);
};

// From http://jsfiddle.net/koldev/cW7W5/
export const downloadData = (raw, count, type, extension) => {
	const timestamp = Date.now();
	const blob = new Blob([raw], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `uuids-${count}-${timestamp}.${extension}`;
	a.click();
	URL.revokeObjectURL(url);
};
