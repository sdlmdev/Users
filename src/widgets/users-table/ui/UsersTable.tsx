import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import type { TableComponents, TableVirtuosoHandle } from 'react-virtuoso';
import { TableVirtuoso } from 'react-virtuoso';
import type { User } from '@entities/user';
import { SORT_DIRECTION_ASC, SORT_DIRECTION_DESC } from '@shared/const';
import type { SortConfig } from '@shared/lib';
import { SCROLL_TO_TOP_EVENT } from '@shared/lib';
import type { SortKey } from './UsersTable.const';
import styles from './UsersTable.module.scss';
import { UsersTableEmpty } from './UsersTableEmpty';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableRow } from './UsersTableRow';

interface UsersTableProps {
	users: Array<User>;
	sortConfig: SortConfig<User> | null;
	onSort: (config: SortConfig<User> | null) => void;
	onDelete: (id: string) => Promise<void>;
}

const VirtuosoTable = (props: ComponentProps<'table'>) => (
	<table {...props} className={styles.table} aria-label="Список пользователей" />
);

const VirtuosoTableHead = (props: ComponentProps<'thead'>) => (
	<thead {...props} className={styles.thead} />
);

const VirtuosoTableRowWrapper = ({
	item,
	context,
	...props
}: ComponentProps<'tr'> & { item?: User; context?: unknown }) => (
	<tr {...props} className={styles.row} />
);

const VirtuosoTableBody = (props: ComponentProps<'tbody'>) => <tbody {...props} />;

export const UsersTable = ({ users, sortConfig, onSort, onDelete }: UsersTableProps) => {
	const virtuosoRef = useRef<TableVirtuosoHandle>(null);

	const handleSort = (key: SortKey) => {
		if (sortConfig?.key === key) {
			if (sortConfig.direction === SORT_DIRECTION_ASC) {
				onSort({ key, direction: SORT_DIRECTION_DESC });
			} else {
				onSort(null);
			}
		} else {
			onSort({ key, direction: SORT_DIRECTION_ASC });
		}
	};

	useEffect(() => {
		const handleScrollToTop = (event: Event) => {
			if (virtuosoRef.current) {
				event.preventDefault();

				virtuosoRef.current.scrollToIndex({
					index: 0,
					align: 'start',
					behavior: 'smooth',
				});
			}
		};

		window.addEventListener(SCROLL_TO_TOP_EVENT, handleScrollToTop);

		return () => {
			window.removeEventListener(SCROLL_TO_TOP_EVENT, handleScrollToTop);
		};
	}, []);

	const virtuosoComponents: TableComponents<User> = {
		Table: VirtuosoTable,
		TableHead: VirtuosoTableHead,
		TableRow: VirtuosoTableRowWrapper,
		TableBody: VirtuosoTableBody,
	};

	if (users.length === 0) {
		return <UsersTableEmpty />;
	}

	return (
		<div className={styles.tableWrapper}>
			<TableVirtuoso
				ref={virtuosoRef}
				data={users}
				useWindowScroll
				components={virtuosoComponents}
				fixedHeaderContent={() => <UsersTableHeader sortConfig={sortConfig} onSort={handleSort} />}
				itemContent={(index, user) => (
					<UsersTableRow index={index} user={user} onDelete={onDelete} />
				)}
			/>
		</div>
	);
};
