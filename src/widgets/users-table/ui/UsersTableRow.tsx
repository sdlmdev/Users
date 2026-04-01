import type { User } from '@entities/user';
import { Typography } from '@shared/ui';
import { ActionCell } from './ActionCell/ActionCell';
import { GroupBadge } from './GroupBadge/GroupBadge';
import styles from './UsersTable.module.scss';

interface UsersTableRowProps {
	user: User;
	index: number;
	onDelete: (id: string) => Promise<void>;
}

export const UsersTableRow = ({ user, index, onDelete }: UsersTableRowProps) => (
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
);
