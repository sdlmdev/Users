import type { StackAlign, StackDirection, StackJustify, StackVariant } from './Stack.types';

export const variantDefaults: Record<
	StackVariant,
	{ direction: StackDirection; align: StackAlign; justify: StackJustify }
> = {
	row: {
		direction: 'row',
		align: 'stretch',
		justify: 'start',
	},
	column: {
		direction: 'column',
		align: 'stretch',
		justify: 'start',
	},
	'row-center': {
		direction: 'row',
		align: 'center',
		justify: 'center',
	},
	'column-center': {
		direction: 'column',
		align: 'center',
		justify: 'center',
	},
	'row-between': {
		direction: 'row',
		align: 'center',
		justify: 'between',
	},
};
