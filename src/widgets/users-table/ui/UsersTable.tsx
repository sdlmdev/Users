import { useEffect, useRef } from 'react';
import type { ComponentProps } from 'react';
import { Users } from 'lucide-react';
import { TableVirtuoso } from 'react-virtuoso';
import type { TableComponents, TableVirtuosoHandle } from 'react-virtuoso';
import type { User } from '@entities/user';
import { SORT_DIRECTION_ASC } from '@shared/const';
import { SCROLL_TO_TOP_EVENT } from '@shared/lib';
import type { SortConfig } from '@shared/lib';
import { Stack, Typography } from '@shared/ui';
import { ActionCell } from './ActionCell/ActionCell';
import { GroupBadge } from './GroupBadge/GroupBadge';
import { SortIcon } from './SortIcon/SortIcon';
import styles from './UsersTable.module.scss';

type SortKey = keyof Pick<User, 'firstName' | 'lastName' | 'email' | 'group'>;

interface UsersTableProps {
	users: Array<User>;
	sortConfig: SortConfig<User> | null;
	onSort: (config: SortConfig<User> | null) => void;
	onDelete: (id: string) => Promise<void>;
}

const COLUMNS: Array<{ key: SortKey; label: string }> = [
	{ key: 'firstName', label: 'Имя' },
	{ key: 'lastName', label: 'Фамилия' },
	{ key: 'email', label: 'Email' },
	{ key: 'group', label: 'Группа' },
];

const EMPTY_ICON_SIZE = 48;

const VirtuosoTable = (props: ComponentProps<'table'>) => (
	<table {...props} className={styles.table} aria-label="Список пользователей" />
);

const VirtuosoTableHead = (props: ComponentProps<'thead'>) => (
	<thead {...props} className={styles.thead} />
);

const VirtuosoTableRow = ({
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
			if (sortConfig.direction === 'asc') {
				onSort({ key, direction: 'desc' });
			} else {
				onSort(null);
			}
		} else {
			onSort({ key, direction: 'asc' });
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
		TableRow: VirtuosoTableRow,
		TableBody: VirtuosoTableBody,
	};

	if (users.length === 0) {
		return (
			<Stack direction="column" align="center" justify="center" gap={3} className={styles.empty}>
				<Users
					width={EMPTY_ICON_SIZE}
					height={EMPTY_ICON_SIZE}
					strokeWidth={1.5}
					className={styles.emptyIcon}
				/>
				<Typography variant="h3" weight="semibold" align="center">
					Пользователи не найдены
				</Typography>
				<Typography variant="p" color="secondary" align="center">
					Попробуйте изменить запрос или добавьте нового пользователя
				</Typography>
			</Stack>
		);
	}

	return (
		<div className={styles.tableWrapper}>
			<TableVirtuoso
				ref={virtuosoRef}
				data={users}
				useWindowScroll
				components={virtuosoComponents}
				fixedHeaderContent={() => (
					<tr>
						<th className={styles.thNum} aria-label="Номер строки">
							<Typography variant="label" weight="bold" color="primary">
								#
							</Typography>
						</th>
						{COLUMNS.map(({ key, label }) => (
							<th
								key={key}
								className={styles.th}
								onClick={() => handleSort(key)}
								aria-sort={
									sortConfig?.key === key
										? sortConfig.direction === SORT_DIRECTION_ASC
											? 'ascending'
											: 'descending'
										: 'none'
								}
							>
								<Stack direction="row" align="center" gap={2}>
									<Typography variant="label" weight="bold" color="primary">
										{label}
									</Typography>
									<SortIcon
										isActive={sortConfig?.key === key}
										direction={sortConfig?.key === key ? sortConfig.direction : SORT_DIRECTION_ASC}
									/>
								</Stack>
							</th>
						))}
						<th className={styles.thAction}>
							<Typography variant="label" weight="bold" color="primary">
								Действия
							</Typography>
						</th>
					</tr>
				)}
				itemContent={(index, user) => (
					<>
						<td className={styles.tdNum}>
							<Typography variant="p" size="sm" color="muted">
								{index + 1}
							</Typography>
						</td>
						<td className={styles.td}>
							<Typography variant="p" weight="medium">
								{user.firstName}
							</Typography>
						</td>
						<td className={styles.td}>
							<Typography variant="p" weight="medium">
								{user.lastName}
							</Typography>
						</td>
						<td className={styles.td}>
							<Typography variant="p" color="secondary">
								{user.email}
							</Typography>
						</td>
						<td className={styles.td}>
							<GroupBadge group={user.group} />
						</td>
						<td className={styles.tdAction}>
							<ActionCell userId={user.id} onDelete={onDelete} />
						</td>
					</>
				)}
			/>
		</div>
	);
};
