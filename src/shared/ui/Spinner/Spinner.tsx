import cn from 'classnames';
import { Stack } from '..';
import styles from './Spinner.module.scss';

interface SpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	variant?: 'primary' | 'white';
	isCentered?: boolean;
}

export const Spinner = ({ size = 'md', variant = 'primary', isCentered = true }: SpinnerProps) => {
	return (
		<Stack
			align={isCentered ? 'center' : undefined}
			justify={isCentered ? 'center' : undefined}
			flex={isCentered ? (1 as const) : undefined}
			isFullWidth={isCentered}
			isFullHeight={isCentered}
			role="status"
			aria-label="Загрузка"
		>
			<span className={cn(styles.ring, styles[size], styles[variant])} />
		</Stack>
	);
};

Spinner.displayName = 'Spinner';
