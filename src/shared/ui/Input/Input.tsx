import type { InputHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import type { AppSize } from '@shared/types/size';
import { Stack, Typography } from '..';
import styles from './Input.module.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
	label?: string;
	error?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	isRightIconClickable?: boolean;
	isFullWidth?: boolean;
	size?: Extract<AppSize, 'sm' | 'md' | 'lg'>;
}

export const Input = ({
	label,
	error,
	leftIcon,
	rightIcon,
	isRightIconClickable = false,
	isFullWidth = false,
	size = 'md',
	id,
	...rest
}: InputProps) => {
	const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

	return (
		<Stack direction="column" gap={2} isFullWidth={isFullWidth}>
			{label && (
				<Typography variant="label" as="label" htmlFor={inputId} size="ms">
					{label}
				</Typography>
			)}
			<Stack
				direction="row"
				align="center"
				isFullWidth
				className={cn(styles.inputWrapper, { [styles.hasError]: Boolean(error) })}
			>
				{leftIcon && (
					<Stack
						direction="row"
						justify="center"
						align="center"
						className={cn(styles.icon, styles.left)}
						aria-hidden="true"
					>
						{leftIcon}
					</Stack>
				)}
				<input
					id={inputId}
					className={cn(styles.input, styles[size], {
						[styles.withLeft]: Boolean(leftIcon),
						[styles.withRight]: Boolean(rightIcon),
					})}
					{...rest}
				/>
				{rightIcon && (
					<Stack
						direction="row"
						justify="center"
						align="center"
						className={cn(styles.icon, styles.right, {
							[styles.iconClickable]: isRightIconClickable,
						})}
					>
						{rightIcon}
					</Stack>
				)}
			</Stack>
			{error && (
				<Typography variant="error" size="xs">
					{error}
				</Typography>
			)}
		</Stack>
	);
};

Input.displayName = 'Input';
