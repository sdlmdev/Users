import cn from 'classnames';
import { X } from 'lucide-react';
import { Button, Stack, Typography } from '..';
import styles from './Modal.module.scss';

export interface ModalHeaderProps {
	title: string;
	onClose?: VoidFunction;
	className?: string;
}

export const ModalHeader = ({ title, onClose, className }: ModalHeaderProps) => (
	<Stack
		direction="row"
		align="center"
		justify="between"
		isFullWidth
		className={cn(styles.header, className)}
	>
		<div className={cn(styles.title)}>
			<Typography variant="h2">{title}</Typography>
		</div>
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
