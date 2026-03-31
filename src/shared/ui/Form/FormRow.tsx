import type { ReactNode } from 'react';
import { Grid } from '..';

interface FormRowProps {
	children: ReactNode;
	className?: string;
	columns?: number;
}

const DEFAULT_COLUMNS = 2;

export const FormRow = ({ children, columns }: FormRowProps) => {
	return (
		<Grid cols={columns || DEFAULT_COLUMNS} gap={4}>
			{children}
		</Grid>
	);
};

FormRow.displayName = 'FormRow';
