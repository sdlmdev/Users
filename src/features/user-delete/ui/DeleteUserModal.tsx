import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ERROR_MESSAGE } from '@shared/const';
import { Button, Modal, Stack, Typography } from '@shared/ui';

export interface DeleteUserModalProps {
	isOpen: boolean;
	userId: string | null;
	onClose: VoidFunction;
	onDelete: (id: string) => Promise<void>;
}

export const DeleteUserModal = ({ isOpen, userId, onClose, onDelete }: DeleteUserModalProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen) {
			setError(null);
		}
	}, [isOpen]);

	const handleClose = () => {
		onClose();
	};

	const handleConfirmDelete = async () => {
		if (!userId) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			await onDelete(userId);

			handleClose();
		} catch {
			setError(ERROR_MESSAGE);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} size="sm">
			<Modal.Header title="Удалить пользователя?" onClose={handleClose} />

			<Modal.Body>
				<Stack direction="column" align="center" justify="center" gap={5}>
					<Stack direction="row" align="center" justify="center" shrink={0} aria-hidden="true">
						<AlertTriangle width={40} height={40} strokeWidth={1.5} />
					</Stack>

					<Typography variant="p" color="secondary" align="center">
						Это действие необратимо. Пользователь будет удалён из системы безвозвратно.
					</Typography>

					{error && (
						<Typography variant="error" align="center">
							{error}
						</Typography>
					)}
				</Stack>
			</Modal.Body>

			<Modal.Footer>
				<Button type="button" variant="ghost" onClick={handleClose} disabled={isLoading}>
					Отмена
				</Button>
				<Button type="button" variant="error" isLoading={isLoading} onClick={handleConfirmDelete}>
					Удалить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
