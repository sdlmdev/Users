import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { routeConfig } from '@app/router/config';
import { Stack, Typography } from '@shared/ui';
import styles from './NavList.module.scss';

const NAV_LINKS = routeConfig.filter((route) => route.label);

interface NavListProps {
	variant?: 'desktop' | 'mobile';
	onLinkClick?: () => void;
}

const getLinkClass =
	(baseClass: string, activeClass: string) =>
	({ isActive }: { isActive: boolean }) =>
		cn(baseClass, { [activeClass]: isActive });

export const NavList = ({ variant = 'desktop', onLinkClick }: NavListProps) => {
	const isMobile = variant === 'mobile';

	const listStyles = cn(styles.navList, {
		[styles.desktop]: !isMobile,
		[styles.mobile]: isMobile,
	});

	const linkClass = isMobile ? styles.mobileLink : styles.link;
	const activeClass = isMobile ? styles.mobileLinkActive : styles.active;

	return (
		<Stack
			direction={isMobile ? 'column' : 'row'}
			align={isMobile ? 'stretch' : 'center'}
			gap={isMobile ? 0 : 1}
			className={listStyles}
		>
			{NAV_LINKS.map(({ path, label, isEnd }) => (
				<NavLink
					key={path}
					to={path}
					end={isEnd}
					className={getLinkClass(linkClass, activeClass)}
					onClick={onLinkClick}
				>
					<Stack
						direction="row"
						align="center"
						justify={isMobile ? 'start' : 'center'}
						isFullWidth={isMobile}
					>
						<Typography
							variant={isMobile ? 'p' : 'label'}
							as="span"
							weight={isMobile ? 'semibold' : 'normal'}
						>
							{label}
						</Typography>
					</Stack>
				</NavLink>
			))}
		</Stack>
	);
};
