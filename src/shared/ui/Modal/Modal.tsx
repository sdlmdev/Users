import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { Stack } from '..';
import styles from './Modal.module.scss';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
	children: ReactNode;
	size?: ModalSize;
}

export const Modal = ({ isOpen, onClose, children, size = 'md' }: ModalProps) => {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKey);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKey);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<Stack
			direction="row"
			justify="center"
			align="center"
			className={cn(styles.overlay)}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
		>
			<div className={cn(styles.dialog, styles[size])} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</Stack>,
		document.body,
	);
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

Modal.displayName = 'Modal';
