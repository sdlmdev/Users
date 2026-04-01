import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@widgets/layout';
import { ErrorBoundary } from '@shared/ui';
import { routeConfig } from './config';

export const AppRouter = () => {
	return (
		<ErrorBoundary>
			<HashRouter>
				<Routes>
					<Route element={<Layout />}>
						{routeConfig.map(({ path, element, isIndex }) => (
							<Route key={path} path={path} index={isIndex} element={element} />
						))}
					</Route>
				</Routes>
			</HashRouter>
		</ErrorBoundary>
	);
};
