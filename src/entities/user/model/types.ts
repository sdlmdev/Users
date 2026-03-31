export enum UserGroup {
	MANAGEMENT = 'management',
	ACCOUNTING = 'accounting',
	HR = 'hr',
	IT = 'it',
	MARKETING = 'marketing',
}

export const GROUP_LABELS: Record<UserGroup, string> = {
	[UserGroup.MANAGEMENT]: 'Руководство',
	[UserGroup.ACCOUNTING]: 'Бухгалтерия',
	[UserGroup.HR]: 'Отдел кадров',
	[UserGroup.IT]: 'IT',
	[UserGroup.MARKETING]: 'Маркетинг',
};

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	group: UserGroup | null;
}

export type CreateUserDto = Omit<User, 'id'>;

export const GROUPS = [
	UserGroup.MANAGEMENT,
	UserGroup.ACCOUNTING,
	UserGroup.HR,
	UserGroup.IT,
	UserGroup.MARKETING,
] as const;

export interface UserStats {
	usersCount: number;
	groupsCount: number;
}
