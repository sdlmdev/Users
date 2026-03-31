import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DeleteUserModal } from '@features/user-delete';
import { ICON_SIZE } from '@shared/const';
import { Button } from '@shared/ui';

interface ActionCellProps {
	userId: string;
	onDelete: (id: string) => Promise<void>;
}

export const ActionCell = ({ userId, onDelete }: ActionCellProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpen = () => setIsModalOpen(true);
	const handleClose = () => setIsModalOpen(false);

	return (
		<>
			<Button
				variant="error"
				size="sm"
				onClick={handleOpen}
				aria-label="Удалить пользователя"
				icon={<Trash2 width={ICON_SIZE.XS} height={ICON_SIZE.XS} />}
			/>
			<DeleteUserModal
				isOpen={isModalOpen}
				userId={userId}
				onClose={handleClose}
				onDelete={onDelete}
			/>
		</>
	);
};
