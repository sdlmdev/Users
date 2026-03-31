import { Outlet } from 'react-router-dom';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';
import { ScrollToTop } from '@features/scroll-to-top';
import { Stack } from '@shared/ui';
import styles from './Layout.module.scss';

export const Layout = () => {
	return (
		<Stack direction="column" align="stretch" isFullWidth className={styles.root}>
			<Header />
			<Stack
				direction="column"
				as="main"
				align="stretch"
				isFullWidth
				maxWidth="max"
				mx="auto"
				py={{ base: 8, mobile: 6 }}
				px={{ base: 6, mobile: 4 }}
				flex={1}
			>
				<Outlet />
			</Stack>
			<Footer />
			<ScrollToTop />
		</Stack>
	);
};
