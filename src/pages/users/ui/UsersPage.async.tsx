import { lazy } from 'react';

export const UsersPageAsync = lazy(async () => {
	const module = await import('./UsersPage');

	return { default: module.UsersPage };
});
