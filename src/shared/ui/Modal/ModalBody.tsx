import type { ReactNode } from 'react';
import cn from 'classnames';
import { Stack } from '../Stack';
import styles from './Modal.module.scss';

export interface ModalBodyProps {
	children: ReactNode;
	className?: string;
}

export const ModalBody = ({ children, className }: ModalBodyProps) => (
	<Stack direction="column" className={cn(styles.body, className)}>
		{children}
	</Stack>
);

ModalBody.displayName = 'ModalBody';
