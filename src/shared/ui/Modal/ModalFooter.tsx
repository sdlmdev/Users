import type { ReactNode } from 'react';
import cn from 'classnames';
import { Stack } from '../Stack';
import styles from './Modal.module.scss';

export interface ModalFooterProps {
	children: ReactNode;
	className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => (
	<Stack
		direction="row"
		align="center"
		justify="end"
		isFullWidth
		gap={3}
		directionMobile="column-reverse"
		className={cn(styles.footer, className)}
	>
		{children}
	</Stack>
);

ModalFooter.displayName = 'ModalFooter';
