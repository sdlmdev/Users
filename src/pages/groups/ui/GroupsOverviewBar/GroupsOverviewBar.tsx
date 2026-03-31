import cn from 'classnames';
import { GROUP_LABELS } from '@entities/user';
import { Stack } from '@shared/ui';
import {
	GROUP_CLASS,
	type GroupStats,
	UNGROUPED_CLASS,
	UNGROUPED_ID,
} from '../../model/groupConfig';
import styles from './GroupsOverviewBar.module.scss';

interface GroupsOverviewBarProps {
	groups: Array<GroupStats>;
	total: number;
}

export const GroupsOverviewBar = ({ groups, total }: GroupsOverviewBarProps) => {
	if (total === 0) {
		return null;
	}

	return (
		<Stack direction="row" align="stretch" isFullWidth className={cn(styles.bar)}>
			{groups.map(({ name, members }) => {
				if (members.length === 0) {
					return null;
				}

				const isUngrouped = name === null;
				let label: string;
				let groupClass: string;

				if (isUngrouped) {
					label = 'Без группы';
					groupClass = UNGROUPED_CLASS;
				} else {
					label = GROUP_LABELS[name];
					groupClass = GROUP_CLASS[name];
				}

				return (
					<div
						key={name ?? UNGROUPED_ID}
						className={cn(styles.segment, groupClass)}
						style={{ flex: members.length }}
						title={`${label}: ${members.length}`}
					/>
				);
			})}
		</Stack>
	);
};
