import { lazy } from 'react';

export const NotFoundPageAsync = lazy(async () => {
	const module = await import('./NotFoundPage');

	return { default: module.NotFoundPage };
});
