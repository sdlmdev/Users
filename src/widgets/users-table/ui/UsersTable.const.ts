import type { User } from '@entities/user';

export type SortKey = keyof Pick<User, 'firstName' | 'lastName' | 'email' | 'group'>;

export interface Column {
	key: SortKey;
	label: string;
}

export const COLUMNS: Array<Column> = [
	{ key: 'firstName', label: 'Имя' },
	{ key: 'lastName', label: 'Фамилия' },
	{ key: 'email', label: 'Email' },
	{ key: 'group', label: 'Группа' },
];

export const EMPTY_ICON_SIZE = 48;
