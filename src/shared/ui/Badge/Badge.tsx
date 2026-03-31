import cn from 'classnames';
import type { AppSize } from '@shared/types/size';
import { Stack, Typography } from '..';
import styles from './Badge.module.scss';

export type BadgeVariant = 'accent' | 'success' | 'warning' | 'info' | 'pink' | 'gray';

interface BadgeProps {
	children: string;
	variant?: BadgeVariant;
	size?: Extract<AppSize, 'xs' | 'sm' | 'md' | 'lg'>;
}

export const Badge = ({ children, variant = 'gray', size = 'sm' }: BadgeProps) => {
	return (
		<Stack
			px={2.5}
			py={0.5}
			align="center"
			justify="center"
			className={cn(styles.badge, variant && styles[variant])}
		>
			<Typography variant="label" size={size} color="inherit" weight="bold">
				{children}
			</Typography>
		</Stack>
	);
};

Badge.displayName = 'Badge';
