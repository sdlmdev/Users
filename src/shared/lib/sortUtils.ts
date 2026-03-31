import { DEFAULT_LOCALE, SORT_DIRECTION_ASC, SORT_DIRECTION_DESC } from '@shared/const';

export type SortDirection = typeof SORT_DIRECTION_ASC | typeof SORT_DIRECTION_DESC;

export interface SortConfig<T> {
	key: keyof T;
	direction: SortDirection;
}

export const getComparator = <T>(config: SortConfig<T> | null) => {
	return (a: T, b: T): number => {
		if (!config) {
			return 0;
		}

		const aVal = a[config.key];
		const bVal = b[config.key];

		const aIsNull = aVal === null || aVal === undefined;
		const bIsNull = bVal === null || bVal === undefined;

		if (aIsNull && bIsNull) {
			return 0;
		}

		if (aIsNull) {
			return 1;
		}

		if (bIsNull) {
			return -1;
		}

		let cmp = 0;

		if (typeof aVal === 'string' && typeof bVal === 'string') {
			cmp = aVal.localeCompare(bVal, DEFAULT_LOCALE);
		} else {
			cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
		}

		return config.direction === SORT_DIRECTION_ASC ? cmp : -cmp;
	};
};

export const toggleSort = <T>(current: SortConfig<T> | null, key: keyof T): SortConfig<T> => {
	if (current?.key === key) {
		return {
			key,
			direction:
				current.direction === SORT_DIRECTION_ASC ? SORT_DIRECTION_DESC : SORT_DIRECTION_ASC,
		};
	}

	return { key, direction: SORT_DIRECTION_ASC };
};
