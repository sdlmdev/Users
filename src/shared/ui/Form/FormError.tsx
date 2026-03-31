import type { ReactNode } from 'react';
import cn from 'classnames';
import { AlertCircle } from 'lucide-react';
import { Stack, Typography } from '..';
import styles from './Form.module.scss';

interface FormErrorProps {
	children: ReactNode;
	className?: string;
}

export const FormError = ({ children }: FormErrorProps) => {
	if (!children) {
		return null;
	}

	return (
		<Stack direction="row" gap={2} align="start" className={cn(styles.errorBox)} role="alert">
			<AlertCircle width={16} height={16} className={cn(styles.errorIcon)} />
			<Typography variant="p" size="sm">
				{children}
			</Typography>
		</Stack>
	);
};

FormError.displayName = 'FormError';
