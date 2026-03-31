import { useState } from 'react';
import { Plus } from 'lucide-react';
import { UsersTable } from '@widgets/users-table';
import { AddUserModal } from '@features/user-add';
import { UserSearch } from '@features/user-search';
import type { User } from '@entities/user';
import { useUsers } from '@entities/user';
import { ERROR_MESSAGE } from '@shared/const';
import type { SortConfig } from '@shared/lib';
import { getComparator } from '@shared/lib';
import { Button, Spinner, Stack, Typography } from '@shared/ui';

export const UsersPage = () => {
	const { users, isLoading, error, addUser, removeUser } = useUsers();
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState<SortConfig<User> | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenAdd = () => setIsModalOpen(true);
	const handleCloseAdd = () => setIsModalOpen(false);

	if (isLoading) {
		return <Spinner size="lg" />;
	}

	if (error) {
		return (
			<Stack direction="row" justify="center" align="center" isFullWidth>
				<Typography variant="p" color="error">
					{ERROR_MESSAGE}
				</Typography>
			</Stack>
		);
	}

	const filtered = (users || [])
		.filter(
			(user) =>
				user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				user.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.sort(getComparator(sortConfig));

	return (
		<Stack direction="column" gap={8} isFullWidth align="stretch" flex={1}>
			<Stack direction="row" justify="between" align="center" mb={4}>
				<Stack direction="column" gap={1}>
					<Typography variant="h1">Сотрудники</Typography>
					<Typography variant="label" color="secondary">
						{users?.length || 0} сотрудников в системе
					</Typography>
				</Stack>
				<Stack direction="row" shrink={0}>
					<Button variant="primary" size="md" icon={<Plus size={16} />} onClick={handleOpenAdd}>
						Добавить
					</Button>
				</Stack>
			</Stack>

			<Stack direction="column" gap={4} isFullWidth align="stretch">
				<UserSearch value={searchQuery} onChange={setSearchQuery} />
				{searchQuery && (
					<Typography variant="label" as="span">
						Найдено:{' '}
						<Typography variant="label" as="span" weight="bold">
							{filtered.length}
						</Typography>
					</Typography>
				)}
				<UsersTable
					users={filtered}
					sortConfig={sortConfig}
					onSort={setSortConfig}
					onDelete={removeUser}
				/>
			</Stack>

			<AddUserModal isOpen={isModalOpen} onClose={handleCloseAdd} onSubmit={addUser} />
		</Stack>
	);
};
