import { API_BASE_URL } from '@shared/const';
import type { CreateUserDto, User, UserStats } from '../model/types';

const USERS_URL = `${API_BASE_URL}/users`;
const HTTP_METHOD_POST = 'POST';
const HTTP_METHOD_DELETE = 'DELETE';
const CONTENT_TYPE_JSON = 'application/json';

export const getUsers = async (): Promise<Array<User>> => {
	const res = await fetch(USERS_URL);

	if (!res.ok) {
		throw new Error(`Ошибка загрузки: ${res.status}`);
	}

	return res.json();
};

export const createUser = async (data: CreateUserDto): Promise<User> => {
	const res = await fetch(USERS_URL, {
		method: HTTP_METHOD_POST,
		headers: { 'Content-Type': CONTENT_TYPE_JSON },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error(`Ошибка создания: ${res.status}`);
	}

	return res.json();
};

export const deleteUser = async (id: string): Promise<void> => {
	const res = await fetch(`${USERS_URL}/${id}`, { method: HTTP_METHOD_DELETE });

	if (!res.ok) {
		throw new Error(`Ошибка удаления: ${res.status}`);
	}
};

export const getStats = async (): Promise<UserStats> => {
	const res = await fetch(`${API_BASE_URL}/stats`);

	if (!res.ok) {
		throw new Error(`Ошибка загрузки статистики: ${res.status}`);
	}

	return res.json();
};
