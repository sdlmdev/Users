import { lazy } from 'react';

export const WelcomePageAsync = lazy(async () => {
	const module = await import('./WelcomePage');

	return { default: module.WelcomePage };
});
