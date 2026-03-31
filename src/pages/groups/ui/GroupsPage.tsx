import { GROUP_LABELS, useUsers } from '@entities/user';
import { ERROR_MESSAGE } from '@shared/const';
import { Card, Grid, Spinner, Stack, Typography } from '@shared/ui';
import type { GroupStats } from '../model/groupConfig';
import { GroupCard } from './GroupCard/GroupCard';
import { GroupsOverviewBar } from './GroupsOverviewBar/GroupsOverviewBar';

export const GroupsPage = () => {
	const { users, isLoading, error } = useUsers();

	if (isLoading) {
		return <Spinner size="lg" />;
	}

	if (error) {
		return (
			<Stack direction="row" justify="center" align="center" p={10} isFullWidth>
				<Typography variant="p" color="error">
					{ERROR_MESSAGE}
				</Typography>
			</Stack>
		);
	}

	const groupsStats: Array<GroupStats> = (users || []).reduce((acc: Array<GroupStats>, user) => {
		const groupName = user.group;
		const existingGroup = acc.find((g) => g.name === groupName);

		if (existingGroup) {
			existingGroup.members.push(user);
		} else {
			acc.push({ name: groupName, members: [user] });
		}

		return acc;
	}, []);

	const sortedGroupsStats = [...groupsStats].sort((a, b) => {
		if (a.name === null) {
			return 1;
		}

		if (b.name === null) {
			return -1;
		}

		const countDiff = b.members.length - a.members.length;

		if (countDiff !== 0) {
			return countDiff;
		}

		const labelA = GROUP_LABELS[a.name] || '';
		const labelB = GROUP_LABELS[b.name] || '';

		return labelA.localeCompare(labelB);
	});

	const departmentsCount = groupsStats.filter((g) => g.name !== null).length;
	const distributedCount = (users || []).filter((u) => u.group !== null).length;

	return (
		<Stack direction="column" gap={8} isFullWidth align="stretch">
			<Stack direction="column" gap={1}>
				<Typography variant="h1">Отделы</Typography>
				<Typography variant="label">
					{departmentsCount} отделов, {users?.length || 0} сотрудников, {distributedCount}{' '}
					распределено
				</Typography>
			</Stack>

			<Card>
				<Stack direction="column" gap={6} isFullWidth align="stretch">
					<Typography variant="h3">Структура отделов</Typography>
					<GroupsOverviewBar groups={sortedGroupsStats} total={users?.length || 0} />
				</Stack>
			</Card>

			<Grid cols={3} tablet={2} mobile={1} gap={5} minChildWidth={250}>
				{sortedGroupsStats.map((group) => (
					<GroupCard key={group.name} group={group} total={users?.length || 0} />
				))}
			</Grid>
		</Stack>
	);
};
