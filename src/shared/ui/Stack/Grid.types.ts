import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { Responsive, SpacingKey } from './spacing';
import type { StackAlign, StackJustify } from './Stack.types';

export interface InternalGridProps {
	children: ReactNode;
	cols?: number;
	tablet?: number;
	mobile?: number;
	minChildWidth?: number;
	gap?: Responsive<SpacingKey>;
	align?: StackAlign;
	justify?: StackJustify;
	isFullWidth?: boolean;
}

export type GridProps<T extends ElementType = 'div'> = InternalGridProps & {
	as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof InternalGridProps | 'as'>;
