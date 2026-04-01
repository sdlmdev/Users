import { useActionState, useId, useState } from 'react';
import type { CreateUserDto, UserGroup } from '@entities/user';
import { GROUP_LABELS, GROUPS } from '@entities/user';
import { ERROR_MESSAGE } from '@shared/const';
import { Button, Input, Modal, Select } from '@shared/ui';
import { Form } from '@shared/ui/Form';
import { ActionState, EMPTY_FORM, INITIAL_STATE, validateUserForm } from '../../lib/helpers';

interface AddUserModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
	onSubmit: (data: CreateUserDto) => Promise<void>;
}

const SELECT_OPTIONS = [
	{ value: '', label: 'Без группы' },
	...GROUPS.map((g) => ({ value: g, label: GROUP_LABELS[g] })),
];

export const AddUserModal = ({ isOpen, onClose, onSubmit }: AddUserModalProps) => {
	const formId = useId();
	const [form, setForm] = useState<CreateUserDto>(EMPTY_FORM);

	const handleClose = () => {
		setForm(EMPTY_FORM);
		onClose();
	};

	const formAction = async (_prev: ActionState, _formData: FormData): Promise<ActionState> => {
		const errors = validateUserForm(form);

		if (Object.keys(errors).length > 0) {
			return { errors, submitError: null };
		}

		try {
			await onSubmit(form);

			handleClose();

			return INITIAL_STATE;
		} catch {
			return {
				errors: {},
				submitError: ERROR_MESSAGE,
			};
		}
	};

	const [state, action, isPending] = useActionState(formAction, INITIAL_STATE);

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<Modal.Header title="Добавить пользователя" onClose={handleClose} />

			<Modal.Body>
				<Form action={action} noValidate id={formId}>
					<Form.Row>
						<Input
							label="Имя"
							id="add-firstName"
							value={form.firstName}
							onChange={(e) => setForm({ ...form, firstName: e.target.value })}
							error={state.errors.firstName}
							isFullWidth
							placeholder="Иван"
						/>
						<Input
							label="Фамилия"
							id="add-lastName"
							value={form.lastName}
							onChange={(e) => setForm({ ...form, lastName: e.target.value })}
							error={state.errors.lastName}
							isFullWidth
							placeholder="Иванов"
						/>
					</Form.Row>

					<Input
						label="Email"
						id="add-email"
						type="email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						error={state.errors.email}
						isFullWidth
						placeholder="example@corp.ru"
					/>

					<Select
						id="add-group"
						label="Группа"
						isOptional
						isFullWidth
						options={SELECT_OPTIONS}
						value={form.group ?? ''}
						onChange={(e) => setForm({ ...form, group: (e.target.value as UserGroup) || null })}
						error={state.errors.group}
					/>

					<Form.Error>{state.submitError}</Form.Error>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button type="button" variant="ghost" onClick={handleClose} disabled={isPending}>
					Отмена
				</Button>
				<Button type="submit" form={formId} isLoading={isPending}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
