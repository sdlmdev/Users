import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack } from '@shared/ui';
import { Burger } from './Burger/Burger';
import styles from './Header.module.scss';
import { Logo } from './Logo/Logo';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { NavList } from './NavList/NavList';

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [location.pathname]);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<header className={styles.header}>
				<Stack
					direction="row"
					justify="between"
					align="center"
					isFullWidth
					isFullHeight
					maxWidth="max"
					mx="auto"
					px={{ base: 6, mobile: 4 }}
				>
					<Logo />

					<NavList />

					<Burger isOpen={isMenuOpen} onClick={toggleMenu} />
				</Stack>
			</header>

			<MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
		</>
	);
};
