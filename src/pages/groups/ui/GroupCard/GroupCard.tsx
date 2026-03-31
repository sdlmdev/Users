import { ReactNode } from 'react';
import cn from 'classnames';
import type { User } from '@entities/user';
import { GROUP_LABELS } from '@entities/user';
import { ICON_SIZE } from '@shared/const';
import { Card, Stack, Typography } from '@shared/ui';
import {
	GROUP_CLASS,
	GROUP_DESCRIPTION,
	type GroupStats,
	MAX_VISIBLE_MEMBERS,
	PERCENT_MULTIPLIER,
	UNGROUPED_CLASS,
} from '../../model/groupConfig';
import { FallbackIcon, GroupIcon } from '../../model/groupIcons';
import styles from './GroupCard.module.scss';

interface GroupCardProps {
	group: GroupStats;
	total: number;
}

export const GroupCard = ({ group, total }: GroupCardProps) => {
	const { name: groupName, members } = group;

	let name: string;
	let description: string;
	let cardClass: string;
	let icon: ReactNode;

	if (groupName === null) {
		name = 'Без группы';
		description = 'Сотрудники, не назначенные в отдел';
		cardClass = UNGROUPED_CLASS;
		icon = <FallbackIcon />;
	} else {
		name = GROUP_LABELS[groupName];
		description = GROUP_DESCRIPTION[groupName];
		cardClass = GROUP_CLASS[groupName];
		icon = <GroupIcon group={groupName} />;
	}

	const percent = total > 0 ? Math.round((members.length / total) * PERCENT_MULTIPLIER) : 0;

	return (
		<Stack direction="column" isFullHeight className={cn(cardClass)}>
			<Card isHoverable isFullHeight>
				<Stack direction="column" isFullHeight isFullWidth align="stretch" gap={5} grow={1}>
					<Stack direction="row" justify="between" align="center" isFullWidth>
						<Stack
							direction="row"
							justify="center"
							align="center"
							shrink={0}
							className={cn(styles.iconWrap)}
							style={{ width: ICON_SIZE.XXL, height: ICON_SIZE.XXL }}
						>
							{icon}
						</Stack>
						<Stack direction="column" align="end">
							<Typography variant="h3" as="span" align="right">
								{members.length}
							</Typography>
							<Typography variant="label" align="right" color="secondary">
								сотрудников
							</Typography>
						</Stack>
					</Stack>

					<Typography variant="h2">{name}</Typography>

					<div className={styles.groupDesc}>
						<Typography variant="p" color="secondary">
							{description}
						</Typography>
					</div>

					<Stack direction="column" gap={2} isFullWidth align="stretch">
						<Stack direction="row" justify="between" align="center" isFullWidth>
							<Typography variant="label" color="secondary">
								Доля от команды
							</Typography>
							<Typography variant="label" weight="semibold">
								{percent}%
							</Typography>
						</Stack>
						<div className={styles.progressTrack}>
							<div className={styles.progressFill} style={{ width: `${percent}%` }} />
						</div>
					</Stack>

					<Stack
						direction="row"
						align="center"
						justify="start"
						gap={3}
						pt={2}
						wrap="wrap"
						className={styles.membersList}
					>
						{members.slice(0, MAX_VISIBLE_MEMBERS).map((m: User) => (
							<Stack
								direction="row"
								key={m.id}
								align="center"
								gap={2}
								py={1}
								px={2}
								className={styles.memberChip}
							>
								<Stack
									direction="row"
									justify="center"
									align="center"
									className={styles.avatar}
									style={{ width: ICON_SIZE.AVATAR, height: ICON_SIZE.AVATAR }}
									aria-hidden="true"
								>
									<Typography variant="p" size="xs" weight="bold" isUppercase color="inherit">
										{m.firstName[0]}
										{m.lastName[0]}
									</Typography>
								</Stack>
								<Typography variant="p" size="ms">
									{m.firstName} {m.lastName}
								</Typography>
							</Stack>
						))}
						{members.length > MAX_VISIBLE_MEMBERS && (
							<Typography variant="label" color="secondary">
								+{members.length - MAX_VISIBLE_MEMBERS} ещё
							</Typography>
						)}
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
};
