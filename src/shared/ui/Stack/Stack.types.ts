import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import type { ContainerSize, MarginKey, PaddingPreset, Responsive, SpacingKey } from './spacing';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';

export type StackVariant = 'row' | 'column' | 'row-center' | 'column-center' | 'row-between';

export type StackElement =
	| 'div'
	| 'header'
	| 'footer'
	| 'main'
	| 'section'
	| 'article'
	| 'aside'
	| 'nav'
	| 'form';

export interface InternalStackProps {
	children: ReactNode;
	variant?: StackVariant;
	direction?: StackDirection;
	directionTablet?: StackDirection;
	directionMobile?: StackDirection;
	align?: StackAlign;
	justify?: StackJustify;
	gap?: Responsive<SpacingKey>;
	p?: Responsive<SpacingKey> | PaddingPreset;
	px?: Responsive<SpacingKey> | PaddingPreset;
	py?: Responsive<SpacingKey>;
	pt?: Responsive<SpacingKey>;
	pr?: Responsive<SpacingKey>;
	pb?: Responsive<SpacingKey>;
	pl?: Responsive<SpacingKey>;
	m?: Responsive<MarginKey>;
	mx?: Responsive<MarginKey>;
	my?: Responsive<MarginKey>;
	mt?: Responsive<MarginKey>;
	mr?: Responsive<MarginKey>;
	mb?: Responsive<MarginKey>;
	ml?: Responsive<MarginKey>;
	maxWidth?: ContainerSize;
	isFullWidth?: boolean;
	isFullHeight?: boolean;
	flex?: 1 | 'auto' | 'none';
	grow?: 0 | 1;
	shrink?: 0 | 1;
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
	className?: string;
}

export type StackProps<T extends StackElement = 'div'> = InternalStackProps &
	Omit<ComponentPropsWithoutRef<T>, keyof InternalStackProps | 'as' | 'align' | 'justify'> & {
		as?: T;
		ref?: Ref<T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLElement>;
	};
