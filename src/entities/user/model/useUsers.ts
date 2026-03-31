import { useEffect, useState } from 'react';
import { ERROR_MESSAGE } from '@shared/const';
import { createUser, deleteUser, getUsers } from '../api/userApi';
import type { CreateUserDto, User } from './types';

type Error = string | null;

interface UseUsersReturn {
	users: Array<User>;
	isLoading: boolean;
	error: Error;
	addUser: (data: CreateUserDto) => Promise<void>;
	removeUser: (id: string) => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
	const [users, setUsers] = useState<Array<User>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error>(null);

	useEffect(() => {
		let isCancelled = false;

		const fetchUsers = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const data = await getUsers();

				if (!isCancelled) {
					setUsers(data);
				}
			} catch {
				if (!isCancelled) {
					setError(ERROR_MESSAGE);
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
			}
		};

		fetchUsers();

		return () => {
			isCancelled = true;
		};
	}, []);

	const addUser = async (data: CreateUserDto): Promise<void> => {
		const created = await createUser(data);

		setUsers((prev) => [...prev, created]);
	};

	const removeUser = async (id: string): Promise<void> => {
		await deleteUser(id);

		setUsers((prev) => prev.filter((u) => u.id !== id));
	};

	return { users, isLoading, error, addUser, removeUser };
};
