import type { ReactNode } from 'react';
import type { AppSize } from '@shared/types/size';

export type TypographyVariant =
	| 'hero'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'label'
	| 'caption'
	| 'overline'
	| 'error';

export type TypographyColor =
	| 'primary'
	| 'secondary'
	| 'muted'
	| 'accent'
	| 'error'
	| 'contrast'
	| 'inherit';

export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TypographySize = AppSize;

export type TypographyTag =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'div'
	| 'label'
	| 'caption'
	| 'small'
	| 'strong'
	| 'em'
	| 'i'
	| 'b'
	| 'ins'
	| 'del';

export interface TypographyProps {
	children: ReactNode;
	variant?: TypographyVariant;
	color?: TypographyColor;
	weight?: TypographyWeight;
	size?: TypographySize;
	as?: TypographyTag;
	isMono?: boolean;
	id?: string;
	htmlFor?: string;
	isTabular?: boolean;
	isUppercase?: boolean;
	align?: 'left' | 'center' | 'right' | 'justify';
}
