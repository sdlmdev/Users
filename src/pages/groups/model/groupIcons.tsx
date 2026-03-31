import { Briefcase, Crown, Handshake, Megaphone, Monitor, User as UserIcon } from 'lucide-react';
import { UserGroup } from '@entities/user';
import { ICON_SIZE } from '@shared/const';

export const ManagementIcon = () => <Crown width={ICON_SIZE.MD} height={ICON_SIZE.MD} />;
export const AccountingIcon = () => <Briefcase width={ICON_SIZE.MD} height={ICON_SIZE.MD} />;
export const HRIcon = () => <Handshake width={ICON_SIZE.MD} height={ICON_SIZE.MD} />;
export const ITIcon = () => <Monitor width={ICON_SIZE.MD} height={ICON_SIZE.MD} />;
export const MarketingIcon = () => <Megaphone width={ICON_SIZE.MD} height={ICON_SIZE.MD} />;
export const FallbackIcon = () => <UserIcon width={ICON_SIZE.MD} height={ICON_SIZE.MD} />;

const ICON_MAP: Record<UserGroup, typeof ManagementIcon> = {
	[UserGroup.MANAGEMENT]: ManagementIcon,
	[UserGroup.ACCOUNTING]: AccountingIcon,
	[UserGroup.HR]: HRIcon,
	[UserGroup.IT]: ITIcon,
	[UserGroup.MARKETING]: MarketingIcon,
};

interface GroupIconProps {
	group: UserGroup;
}

export const GroupIcon = ({ group }: GroupIconProps) => {
	const Icon = ICON_MAP[group] || FallbackIcon;

	return <Icon />;
};
