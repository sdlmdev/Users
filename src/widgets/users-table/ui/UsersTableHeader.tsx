import type { User } from '@entities/user';
import { SORT_DIRECTION_ASC } from '@shared/const';
import type { SortConfig } from '@shared/lib';
import { Stack, Typography } from '@shared/ui';
import { SortIcon } from './SortIcon/SortIcon';
import { COLUMNS } from './UsersTable.const';
import type { SortKey } from './UsersTable.const';
import styles from './UsersTable.module.scss';

interface UsersTableHeaderProps {
	sortConfig: SortConfig<User> | null;
	onSort: (key: SortKey) => void;
}

export const UsersTableHeader = ({ sortConfig, onSort }: UsersTableHeaderProps) => (
	<tr className={styles.headerRow}>
		<th className={styles.thNum} aria-label="Номер строки">
			<Typography variant="label" weight="bold" color="primary">
				#
			</Typography>
		</th>
		{COLUMNS.map(({ key, label }) => (
			<th
				key={key}
				className={styles.th}
				onClick={() => onSort(key)}
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
);
