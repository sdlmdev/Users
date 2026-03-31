import { type SelectHTMLAttributes } from 'react';
import cn from 'classnames';
import { ChevronDown } from 'lucide-react';
import type { AppSize } from '@shared/types/size';
import { Stack, Typography } from '..';
import styles from './Select.module.scss';

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'size'> {
	label: string;
	options: Array<SelectOption>;
	isOptional?: boolean;
	error?: string;
	isFullWidth?: boolean;
	size?: Extract<AppSize, 'sm' | 'md' | 'lg'>;
}

export const Select = ({
	label,
	options,
	isOptional,
	error,
	isFullWidth,
	size = 'md',
	id,
	...rest
}: SelectProps) => {
	return (
		<Stack direction="column" gap={2} isFullWidth={isFullWidth} className={cn(styles.fieldGroup)}>
			{label && (
				<Typography variant="label" as="label" htmlFor={id} size="ms">
					{label}{' '}
					{isOptional && (
						<Typography variant="label" as="span" size="ms" color="muted">
							(необязательно)
						</Typography>
					)}
				</Typography>
			)}
			<Stack
				direction="row"
				align="center"
				isFullWidth={isFullWidth}
				className={cn(styles.selectWrapper)}
			>
				<select
					id={id}
					className={cn(styles.select, styles[size], { [styles.error]: Boolean(error) })}
					{...rest}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown className={cn(styles.chevron)} />
			</Stack>
			{error && (
				<Typography variant="error" size="xs">
					{error}
				</Typography>
			)}
		</Stack>
	);
};

Select.displayName = 'Select';
