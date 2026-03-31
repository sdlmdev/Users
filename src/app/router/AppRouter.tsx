import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@widgets/layout';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { routeConfig } from './config';

export const AppRouter = () => {
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						{routeConfig.map(({ path, element, isIndex }) => (
							<Route key={path} path={path} index={isIndex} element={element} />
						))}
					</Route>
				</Routes>
			</BrowserRouter>
		</ErrorBoundary>
	);
};
