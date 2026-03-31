import type { ElementType } from 'react';
import type { TypographyProps, TypographyTag, TypographyVariant } from './Typography.types';

export const variantToTag: Record<TypographyVariant, TypographyTag> = {
	hero: 'h1',
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	p: 'p',
	label: 'label',
	caption: 'span',
	overline: 'span',
	error: 'div',
};

export const variantDefaults: Record<TypographyVariant, Partial<TypographyProps>> = {
	hero: { size: 'hero', weight: 'bold' },
	h1: { size: '4xl', weight: 'bold' },
	h2: { size: '3xl', weight: 'bold' },
	h3: { size: 'xl', weight: 'semibold' },
	h4: { size: 'lg', weight: 'semibold' },
	h5: { size: 'md', weight: 'semibold' },
	h6: { size: 'sm', weight: 'semibold' },
	p: { size: 'md', weight: 'normal' },
	label: { size: 'ms', weight: 'medium', color: 'secondary' },
	caption: { size: 'xs', color: 'secondary' },
	overline: { size: 'xs', weight: 'medium', isUppercase: true },
	error: { size: 'sm', color: 'error' },
};

export const tagToTag: Record<TypographyTag, ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	p: 'p',
	span: 'span',
	div: 'div',
	label: 'label',
	caption: 'caption',
	small: 'small',
	strong: 'strong',
	em: 'em',
	i: 'i',
	b: 'b',
	ins: 'ins',
	del: 'del',
};
