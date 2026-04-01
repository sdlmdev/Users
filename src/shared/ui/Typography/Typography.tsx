import cn from 'classnames';
import { variantDefaults, variantToTag } from './Typography.const';
import styles from './Typography.module.scss';
import type { TypographyProps } from './Typography.types';

export const Typography = ({
	children,
	variant = 'p',
	color: propColor,
	weight: propWeight,
	size: propSize,
	as,
	isMono,
	id,
	htmlFor,
	isTabular,
	isUppercase,
	align,
}: TypographyProps) => {
	const Tag = as || variantToTag[variant];
	const defaults = variantDefaults[variant];
	const color = propColor ?? defaults.color ?? 'inherit';
	const size = propSize ?? defaults.size;
	const weight = propWeight ?? defaults.weight;
	const isUppercaseFinal = isUppercase ?? defaults.isUppercase;

	return (
		<Tag
			id={id}
			htmlFor={htmlFor}
			className={cn(
				styles.typography,
				styles[variant],
				color && styles[`color-${color}`],
				weight && styles[`weight-${weight}`],
				size && styles[`size-${size}`],
				isMono && styles.mono,
				isTabular && styles.tabular,
				(isUppercaseFinal || isUppercase) && styles.uppercase,
				align && styles[`align-${align}`],
			)}
		>
			{children}
		</Tag>
	);
};

Typography.displayName = 'Typography';
