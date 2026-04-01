import cn from 'classnames';
import { X } from 'lucide-react';
import { Button, Stack, Typography } from '..';
import styles from './Modal.module.scss';

export interface ModalHeaderProps {
	title: string;
	onClose?: VoidFunction;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => (
	<Stack direction="row" align="center" justify="between" isFullWidth className={cn(styles.header)}>
		<Typography variant="h2">{title}</Typography>
		{onClose && (
			<Button
				variant="ghost"
				icon={<X width={18} height={18} />}
				onClick={onClose}
				aria-label="Закрыть"
			/>
		)}
	</Stack>
);

ModalHeader.displayName = 'ModalHeader';
