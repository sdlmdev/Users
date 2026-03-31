import departmentsStyles from '@app/styles/departments.module.scss';
import type { User, UserGroup } from '@entities/user';

export interface GroupStats {
	name: UserGroup | null;
	members: Array<User>;
}

export const PERCENT_MULTIPLIER = 100;
export const MAX_VISIBLE_MEMBERS = 4;
export const UNGROUPED_ID = 'ungrouped';

export const GROUP_DESCRIPTION: Record<UserGroup, string> = {
	management: 'Топ-менеджмент и стратегическое управление компанией',
	accounting: 'Финансовый учёт, отчётность и контроль бюджета',
	hr: 'Работа с персоналом, найм и развитие сотрудников',
	it: 'Разработка, инфраструктура и технологические решения',
	marketing: 'Продвижение, бренд и коммуникации с клиентами',
};

export const GROUP_CLASS: Record<UserGroup, string> = {
	management: departmentsStyles.groupManagement,
	accounting: departmentsStyles.groupAccounting,
	hr: departmentsStyles.groupHR,
	it: departmentsStyles.groupIT,
	marketing: departmentsStyles.groupMarketing,
};

export const UNGROUPED_CLASS = departmentsStyles.groupUngrouped;
