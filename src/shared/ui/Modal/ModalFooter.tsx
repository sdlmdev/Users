import type { ReactNode } from 'react';
import cn from 'classnames';
import { Stack } from '../Stack';
import styles from './Modal.module.scss';

export interface ModalFooterProps {
	children: ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => (
	<Stack
		direction="row"
		align="center"
		justify="end"
		isFullWidth
		gap={3}
		directionMobile="column-reverse"
		className={cn(styles.footer)}
	>
		{children}
	</Stack>
);

ModalFooter.displayName = 'ModalFooter';
