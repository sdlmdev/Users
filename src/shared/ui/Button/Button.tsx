import type { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { Link, type LinkProps as RouterLinkProps } from 'react-router-dom';
import type { AppSize } from '@shared/types/size';
import { Spinner, Stack, Typography } from '..';
import styles from './Button.module.scss';

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'error'
	| 'info'
	| 'ghost'
	| 'outline';

export type ButtonSize = Extract<AppSize, 'sm' | 'md' | 'lg'>;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	icon?: ReactNode;
	children?: string;
	isRound?: boolean;
	linkProps?: Partial<RouterLinkProps>;
}

export const Button = (props: ButtonProps) => {
	const {
		variant = 'primary',
		size = 'md',
		isLoading = false,
		icon,
		children,
		isRound,
		linkProps,
		disabled,
		...rest
	} = props;

	const buttonClasses = cn(styles.button, styles[variant], styles[size], {
		[styles.iconOnly]: !children && Boolean(icon),
		[styles.isRound]: isRound,
		[styles.isLoading]: isLoading,
	});

	const content = (
		<Stack direction="row" align="center" justify="center" gap={2} isFullWidth isFullHeight>
			{isLoading ? (
				<Spinner size="sm" isCentered={false} variant="white" />
			) : (
				icon && (
					<Stack direction="row" align="center" justify="center" isFullWidth={false}>
						{icon}
					</Stack>
				)
			)}
			{children && (
				<Typography variant="label" size={size} weight="bold" as="span" color="inherit">
					{children}
				</Typography>
			)}
		</Stack>
	);

	if (linkProps?.to) {
		return (
			<Link {...linkProps} to={linkProps.to} className={cn(buttonClasses)}>
				{content}
			</Link>
		);
	}

	return (
		<button {...rest} className={cn(buttonClasses)} disabled={disabled || isLoading}>
			{content}
		</button>
	);
};

Button.displayName = 'Button';
