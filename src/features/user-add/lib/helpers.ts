import type { CreateUserDto } from '@entities/user';

export type FormErrors = Partial<Record<keyof CreateUserDto, string>>;

export interface ActionState {
	errors: FormErrors;
	submitError: string | null;
}

export const INITIAL_STATE: ActionState = {
	errors: {},
	submitError: null,
};

const REQUIRED_FIELD_ERROR = 'Обязательное поле';
const INVALID_EMAIL_ERROR = 'Некорректный email';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMPTY_FORM: CreateUserDto = {
	firstName: '',
	lastName: '',
	email: '',
	group: null,
};

export const validateUserForm = (form: CreateUserDto): FormErrors => {
	const errors: FormErrors = {};

	if (!form.firstName.trim()) {
		errors.firstName = REQUIRED_FIELD_ERROR;
	}

	if (!form.lastName.trim()) {
		errors.lastName = REQUIRED_FIELD_ERROR;
	}

	if (!form.email.trim()) {
		errors.email = REQUIRED_FIELD_ERROR;
	} else if (!EMAIL_REGEX.test(form.email)) {
		errors.email = INVALID_EMAIL_ERROR;
	}

	return errors;
};
