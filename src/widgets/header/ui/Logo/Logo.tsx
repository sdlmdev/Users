import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRouteWelcome, ICON_SIZE } from '@shared/const';
import { Stack, Typography } from '@shared/ui';
import styles from './Logo.module.scss';

export const Logo = () => (
	<Link to={getRouteWelcome()} className={styles.logo}>
		<Stack direction="row" align="center" gap={3}>
			<Stack
				direction="row"
				justify="center"
				align="center"
				className={styles.logoIcon}
				style={{ width: ICON_SIZE.XXL, height: ICON_SIZE.XXL }}
				aria-hidden="true"
			>
				<Users width={ICON_SIZE.LG} height={ICON_SIZE.LG} />
			</Stack>
			<span className={styles.logoText}>
				<Typography variant="h3" weight="bold" size="ml">
					UserHub
				</Typography>
			</span>
		</Stack>
	</Link>
);
