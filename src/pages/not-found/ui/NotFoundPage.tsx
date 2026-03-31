import { ArrowLeft } from 'lucide-react';
import { getRouteWelcome } from '@shared/const';
import { Button, Stack, Typography } from '@shared/ui';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
	return (
		<Stack
			direction="column"
			justify="center"
			align="center"
			py={20}
			isFullWidth
			className={styles.page}
		>
			<Stack direction="column" align="center" justify="center" gap={6} className={styles.content}>
				<div className={styles.code}>
					<Typography variant="h1" size="hero" align="center">
						404
					</Typography>
				</div>
				<Typography variant="h2" align="center">
					Страница не найдена
				</Typography>
				<Stack direction="column" align="center" gap={6}>
					<Button
						linkProps={{ to: getRouteWelcome() }}
						variant="outline"
						size="lg"
						icon={<ArrowLeft width={16} height={16} />}
					>
						Вернуться на главную
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};
