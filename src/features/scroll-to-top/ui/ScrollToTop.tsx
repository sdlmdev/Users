import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getRouteUsers, ICON_SIZE } from '@shared/const';
import { SCROLL_TO_TOP_EVENT } from '@shared/lib';
import { Button } from '@shared/ui';
import styles from './ScrollToTop.module.scss';

const VISIBILITY_THRESHOLD = 300;

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		let isTicking = false;

		const handleScroll = () => {
			if (!isTicking) {
				window.requestAnimationFrame(() => {
					setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);

					isTicking = false;
				});

				isTicking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		const isUsersPage = pathname === getRouteUsers();

		if (isUsersPage) {
			window.dispatchEvent(new CustomEvent(SCROLL_TO_TOP_EVENT));
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<div className={cn(styles.container, { [styles.visible]: isVisible })} aria-hidden={!isVisible}>
			<Button
				type="button"
				variant="primary"
				size="lg"
				isRound
				onClick={scrollToTop}
				aria-label="Подняться наверх"
				tabIndex={isVisible ? 0 : -1}
				disabled={!isVisible}
				icon={<ArrowUp className={cn(styles.icon)} width={ICON_SIZE.MD} height={ICON_SIZE.MD} />}
			/>
		</div>
	);
};
