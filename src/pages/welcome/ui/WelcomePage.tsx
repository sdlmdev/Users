import { useEffect, useState } from 'react';
import { Briefcase, Users } from 'lucide-react';
import type { UserStats } from '@entities/user';
import { getStats } from '@entities/user';
import { ELLIPSIS, getRouteGroups, getRouteUsers, ICON_SIZE } from '@shared/const';
import { Button, Card, Grid, Spinner, Stack, Typography } from '@shared/ui';
import { FeatureCard } from './FeatureCard/FeatureCard';
import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
	const [stats, setStats] = useState<UserStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			setIsLoading(true);

			try {
				const data = await getStats();
				setStats(data);
			} catch (err) {
				console.error('Failed to load stats:', err);
				setStats({ usersCount: 0, groupsCount: 0 });
			} finally {
				setIsLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (isLoading) {
		return <Spinner size="lg" />;
	}

	const displayStats = [
		{ value: stats ? stats.usersCount.toLocaleString() : ELLIPSIS, label: 'Сотрудников' },
		{ value: stats ? stats.groupsCount.toLocaleString() : ELLIPSIS, label: 'Отделов' },
	];

	return (
		<Stack direction="column" gap={16} isFullWidth align="center" flex={1}>
			<Stack direction="column" align="center" pt={12} pb={6} gap={8} maxWidth="md">
				<Stack direction="column" align="center" gap={4}>
					<Stack direction="column" align="center" gap={2}>
						<Typography variant="h1" size="hero" align="center">
							Управление <span className={styles.accent}>персоналом</span>
						</Typography>
						<Stack direction="column" maxWidth="sm">
							<Typography variant="p" size="xl" align="center">
								Единая платформа для работы с сотрудниками. Отслеживайте команды, управляйте
								профилями и находите нужных людей за секунды.
							</Typography>
						</Stack>
					</Stack>
				</Stack>

				<Stack direction="row" justify="center" gap={4} wrap="wrap">
					<Button
						linkProps={{ to: getRouteUsers() }}
						variant="primary"
						size="lg"
						icon={<Users width={ICON_SIZE.MD} height={ICON_SIZE.MD} />}
					>
						Список сотрудников
					</Button>
					<Button
						linkProps={{ to: getRouteGroups() }}
						variant="secondary"
						size="lg"
						icon={<Briefcase width={ICON_SIZE.MD} height={ICON_SIZE.MD} />}
					>
						Отделы
					</Button>
				</Stack>
			</Stack>

			<Stack direction="row" directionMobile="column" justify="center" gap={5} isFullWidth>
				{displayStats.map((stat) => (
					<Stack direction="column" key={stat.label} flex={1}>
						<Card variant="default">
							<Stack direction="column" align="center" gap={2}>
								<span className={styles.statValue}>
									<Typography variant="h2" isTabular align="center" color="inherit">
										{stat.value}
									</Typography>
								</span>
								<Typography variant="label" size="lg" align="center" color="secondary">
									{stat.label}
								</Typography>
							</Stack>
						</Card>
					</Stack>
				))}
			</Stack>

			<Grid cols={3} tablet={1} gap={5} isFullWidth align="stretch">
				<FeatureCard
					title="База сотрудников"
					description="Полный список всех специалистов компании с удобным поиском и фильтрацией."
					icon={<Users width={ICON_SIZE.HERO} height={ICON_SIZE.HERO} />}
				/>
				<FeatureCard
					title="Структура отделов"
					description="Визуализация команд и их состава для понимания иерархии и связей."
					icon={<Briefcase width={ICON_SIZE.HERO} height={ICON_SIZE.HERO} />}
				/>
				<FeatureCard
					title="Быстрый поиск"
					description="Находите коллег по любым данным всего за несколько нажатий клавиш."
					icon={<Users width={ICON_SIZE.HERO} height={ICON_SIZE.HERO} />}
				/>
			</Grid>
		</Stack>
	);
};
