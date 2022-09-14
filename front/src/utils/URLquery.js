import qs from 'qs';

export const URLquery = location => {
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	return query;
};
