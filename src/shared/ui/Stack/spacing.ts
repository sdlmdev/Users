/* eslint-disable no-magic-numbers */
export type SpacingKey =
	| 0
	| 0.5
	| 1
	| 1.25
	| 1.5
	| 2
	| 2.5
	| 3
	| 3.5
	| 4
	| 5
	| 6
	| 8
	| 10
	| 12
	| 16
	| 20;

export type StackGap = SpacingKey;

export type Responsive<T> = T | { base?: T; tablet?: T; mobile?: T };
export type PaddingPreset = 'page' | 'card' | 'section' | 'compact';

export type MarginKey = SpacingKey | 'auto';
export type ContainerSize = 'tiny' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'max';

export const formatSpacingKey = (value: SpacingKey | 'auto'): string =>
	String(value).replace('.', '-');

export const resolveResponsive = (
	value: Responsive<SpacingKey | 'auto'>,
	prefix: string,
	styleMap: Record<string, string>,
): Array<string | false | undefined> => {
	if (typeof value !== 'object') {
		return [styleMap[`${prefix}-${formatSpacingKey(value)}`]];
	}

	return [
		value.base !== undefined && styleMap[`${prefix}-${formatSpacingKey(value.base)}`],
		value.tablet !== undefined && styleMap[`${prefix}-tablet-${formatSpacingKey(value.tablet)}`],
		value.mobile !== undefined && styleMap[`${prefix}-mobile-${formatSpacingKey(value.mobile)}`],
	];
};

export const resolvePadding = (
	value: Responsive<SpacingKey> | PaddingPreset,
	prefix: string,
	styleMap: Record<string, string>,
): Array<string | false | undefined> => {
	if (typeof value === 'string') {
		return [styleMap[`${prefix}-${value}`]];
	}

	return resolveResponsive(value, prefix, styleMap);
};
