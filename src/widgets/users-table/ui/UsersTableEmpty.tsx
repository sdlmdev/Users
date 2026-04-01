import { Users } from 'lucide-react';
import { Stack, Typography } from '@shared/ui';
import { EMPTY_ICON_SIZE } from './UsersTable.const';
import styles from './UsersTable.module.scss';

export const UsersTableEmpty = () => (
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
