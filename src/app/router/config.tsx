import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { GroupsPageAsync } from '@pages/groups';
import { NotFoundPageAsync } from '@pages/not-found';
import { UsersPageAsync } from '@pages/users';
import { WelcomePageAsync } from '@pages/welcome';
import { getRouteGroups, getRouteNotFound, getRouteUsers, getRouteWelcome } from '@shared/const';
import { Spinner } from '@shared/ui';

export interface AppRouteProps {
	path: string;
	element: ReactNode;
	isIndex?: boolean;
	label?: string;
	isEnd?: boolean;
}

const withSuspense = (component: ReactNode) => (
	<Suspense fallback={<Spinner size="lg" />}>{component}</Suspense>
);

export const routeConfig: Array<AppRouteProps> = [
	{
		path: getRouteWelcome(),
		element: withSuspense(<WelcomePageAsync />),
		isIndex: true,
		label: 'Главная',
		isEnd: true,
	},
	{
		path: getRouteUsers(),
		element: withSuspense(<UsersPageAsync />),
		label: 'Пользователи',
	},
	{
		path: getRouteGroups(),
		element: withSuspense(<GroupsPageAsync />),
		label: 'Отделы',
	},
	{
		path: getRouteNotFound(),
		element: withSuspense(<NotFoundPageAsync />),
	},
];
