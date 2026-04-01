import type { ReactNode } from 'react';
import cn from 'classnames';
import { Stack } from '../Stack';
import styles from './Modal.module.scss';

export interface ModalBodyProps {
	children: ReactNode;
}

export const ModalBody = ({ children }: ModalBodyProps) => (
	<Stack direction="column" className={cn(styles.body)}>
		{children}
	</Stack>
);

ModalBody.displayName = 'ModalBody';
