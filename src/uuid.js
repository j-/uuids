import uuid from 'uuid';

export const VERSION_1 = 'v1';
export const VERSION_4 = 'v4';

export const generateUUID = (version = VERSION_4) => (
	uuid[version]()
);

export const generateUUIDs = (count, version = VERSION_4) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(
			generateUUID(version)
		);
	}
	return result;
};
