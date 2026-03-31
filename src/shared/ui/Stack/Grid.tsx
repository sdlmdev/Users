import type { ElementType } from 'react';
import cn from 'classnames';
import type { GridProps } from './Grid.types';
import { resolveResponsive } from './spacing';
import styles from './Stack.module.scss';

export const Grid = <T extends ElementType = 'div'>({
	children,
	cols = 1,
	tablet,
	mobile,
	minChildWidth,
	gap,
	align,
	justify,
	isFullWidth,
	as,
	style,
	className,
	...rest
}: GridProps<T>) => {
	const Tag = as || 'div';

	const gridStyles = {
		...style,
		'--grid-cols': cols,
		'--grid-cols-tablet': tablet ?? cols,
		'--grid-cols-mobile': mobile ?? tablet ?? cols,
		...(minChildWidth && {
			gridTemplateColumns: `repeat(auto-fit, minmax(clamp(calc((100% - (${cols} - 1) * var(--grid-gap, 0px)) / ${cols}), ${minChildWidth}px, 100%), 1fr))`,
		}),
	};

	const classes = cn(
		styles.grid,
		align && styles[`align-${align}`],
		justify && styles[`justify-${justify}`],
		gap !== undefined && resolveResponsive(gap, 'gap', styles),
		{ [styles.fullWidth]: isFullWidth },
		className,
	);

	return (
		<Tag className={classes} style={gridStyles} {...rest}>
			{children}
		</Tag>
	);
};

Grid.displayName = 'Grid';
