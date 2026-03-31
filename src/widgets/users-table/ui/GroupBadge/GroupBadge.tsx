import { GROUP_LABELS, UserGroup } from '@entities/user';
import { Badge, BadgeVariant } from '@shared/ui';

interface GroupBadgeProps {
	group: UserGroup | null;
}

const GROUP_VARIANT_MAP: Record<UserGroup, BadgeVariant> = {
	[UserGroup.MANAGEMENT]: 'accent',
	[UserGroup.ACCOUNTING]: 'success',
	[UserGroup.HR]: 'warning',
	[UserGroup.IT]: 'info',
	[UserGroup.MARKETING]: 'pink',
};

const DEFAULT_VARIANT: BadgeVariant = 'gray';

export const GroupBadge = ({ group }: GroupBadgeProps) => {
	if (!group) {
		return <Badge variant={DEFAULT_VARIANT}>Без группы</Badge>;
	}

	const variant = GROUP_VARIANT_MAP[group] ?? DEFAULT_VARIANT;

	return <Badge variant={variant}>{GROUP_LABELS[group]}</Badge>;
};
