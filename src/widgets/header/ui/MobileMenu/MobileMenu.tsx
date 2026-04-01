import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ESC_KEY } from '@shared/const';
import { Stack } from '@shared/ui';
import { NavList } from '../NavList/NavList';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === ESC_KEY) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKey);

		return () => {
			document.removeEventListener('keydown', handleKey);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return createPortal(
		<>
			{isOpen && <div className={styles.overlay} onClick={onClose} aria-hidden="true" />}
			<Stack
				direction="column"
				as="nav"
				align="stretch"
				className={cn(styles.mobileNav, { [styles.mobileNavOpen]: isOpen })}
				aria-label="Мобильное меню"
				inert={!isOpen}
			>
				<NavList variant="mobile" onLinkClick={onClose} />
			</Stack>
		</>,
		document.body,
	);
};
