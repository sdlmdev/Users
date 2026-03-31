import type { ReactNode } from 'react';
import cn from 'classnames';
import type { StackAlign, StackGap } from '../Stack';
import { Stack } from '../Stack';
import styles from './Card.module.scss';

export type CardVariant = 'default' | 'subtle' | 'dashed' | 'transparent';

interface CardProps {
	children: ReactNode;
	variant?: CardVariant;
	isHoverable?: boolean;
	isFullWidth?: boolean;
	isFullHeight?: boolean;
	gap?: StackGap;
	align?: StackAlign;
	id?: string;
}

export const Card = ({
	children,
	variant = 'default',
	isHoverable = false,
	isFullWidth = true,
	isFullHeight = false,
	gap,
	align,
	id,
}: CardProps) => {
	return (
		<Stack
			direction="column"
			id={id}
			p="card"
			gap={gap}
			align={align}
			isFullWidth={isFullWidth}
			isFullHeight={isFullHeight}
			className={cn(styles.card, styles[variant], {
				[styles.hoverable]: isHoverable,
			})}
		>
			{children}
		</Stack>
	);
};

Card.displayName = 'Card';
