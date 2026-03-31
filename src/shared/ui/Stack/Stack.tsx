import type { ElementType } from 'react';
import cn from 'classnames';
import { resolvePadding, resolveResponsive } from './spacing';
import { variantDefaults } from './Stack.const';
import styles from './Stack.module.scss';
import type { StackElement, StackProps } from './Stack.types';

export const Stack = <T extends StackElement = 'div'>({
	children,
	variant = 'row',
	direction: propDirection,
	directionTablet,
	directionMobile,
	align: propAlign,
	justify: propJustify,
	gap,
	p,
	px,
	py,
	pt,
	pr,
	pb,
	pl,
	m,
	mx,
	my,
	mt,
	mr,
	mb,
	ml,
	maxWidth,
	isFullWidth,
	isFullHeight,
	flex,
	grow,
	shrink,
	wrap,
	className,
	as,
	ref,
	...rest
}: StackProps<T>) => {
	const Tag = (as as ElementType) || 'div';
	const defaults = variantDefaults[variant];

	const direction = propDirection ?? defaults.direction;
	const align = propAlign ?? defaults.align;
	const justify = propJustify ?? defaults.justify;

	const classes = cn(
		styles.stack,
		styles[`direction-${direction}`],
		directionTablet && styles[`directionTablet-${directionTablet}`],
		directionMobile && styles[`directionMobile-${directionMobile}`],
		styles[`align-${align}`],
		styles[`justify-${justify}`],
		gap !== undefined && resolveResponsive(gap, 'gap', styles),
		p !== undefined && resolvePadding(p, 'p', styles),
		px !== undefined && resolvePadding(px, 'px', styles),
		py !== undefined && resolveResponsive(py, 'py', styles),
		pt !== undefined && resolveResponsive(pt, 'pt', styles),
		pr !== undefined && resolveResponsive(pr, 'pr', styles),
		pb !== undefined && resolveResponsive(pb, 'pb', styles),
		pl !== undefined && resolveResponsive(pl, 'pl', styles),
		m !== undefined && resolveResponsive(m, 'm', styles),
		mx !== undefined && resolveResponsive(mx, 'mx', styles),
		my !== undefined && resolveResponsive(my, 'my', styles),
		mt !== undefined && resolveResponsive(mt, 'mt', styles),
		mr !== undefined && resolveResponsive(mr, 'mr', styles),
		mb !== undefined && resolveResponsive(mb, 'mb', styles),
		ml !== undefined && resolveResponsive(ml, 'ml', styles),
		maxWidth !== undefined && styles[`maxW-${maxWidth}`],
		flex !== undefined && styles[`flex-${flex}`],
		grow !== undefined && styles[`grow-${grow}`],
		shrink !== undefined && styles[`shrink-${shrink}`],
		wrap !== undefined && styles[wrap],
		{ [styles.fullWidth]: isFullWidth, [styles.fullHeight]: isFullHeight },
		className,
	);

	return (
		<Tag className={classes} {...rest} ref={ref}>
			{children}
		</Tag>
	);
};

Stack.displayName = 'Stack';
