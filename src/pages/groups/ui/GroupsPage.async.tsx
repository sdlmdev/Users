import { lazy } from 'react';

export const GroupsPageAsync = lazy(async () => {
	const module = await import('./GroupsPage');

	return { default: module.GroupsPage };
});
