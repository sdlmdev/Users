import type { FormHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { Stack } from '..';
import styles from './Form.module.scss';
import { FormActions } from './FormActions';
import { FormError } from './FormError';
import { FormRow } from './FormRow';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
	children: ReactNode;
}

export const Form = ({ children, ...rest }: FormProps) => {
	if (!children) {
		return null;
	}

	return (
		<Stack as="form" direction="column" gap={6} isFullWidth className={cn(styles.form)} {...rest}>
			{children}
		</Stack>
	);
};

Form.Row = FormRow;
Form.Error = FormError;
Form.Actions = FormActions;

Form.displayName = 'Form';
