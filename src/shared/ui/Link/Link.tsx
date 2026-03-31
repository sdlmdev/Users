import type { AnchorHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Link.module.scss';

export type LinkVariant = 'primary' | 'subtle';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
	variant?: LinkVariant;
}

export const Link = ({ children, variant = 'primary', target, rel, ...props }: LinkProps) => {
	const isExternal = target === '_blank';

	return (
		<a
			className={cn(styles.link, variant && styles[variant])}
			target={target}
			rel={isExternal ? rel || 'noopener noreferrer' : rel}
			{...props}
		>
			{children}
		</a>
	);
};

Link.displayName = 'Link';
