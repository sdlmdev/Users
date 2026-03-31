import { useFormStatus } from 'react-dom';
import cn from 'classnames';
import { Button, Stack } from '..';
import styles from './Form.module.scss';

interface FormActionsProps {
	submitText?: string;
	cancelText?: string;
	onCancel?: VoidFunction;
	className?: string;
}

export const FormActions = ({
	submitText = 'Сохранить',
	cancelText = 'Отмена',
	onCancel,
}: FormActionsProps) => {
	const { pending: isPending } = useFormStatus();

	return (
		<Stack direction="row" justify="end" align="center" gap={3} className={cn(styles.actions)}>
			{onCancel && (
				<Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
					{cancelText}
				</Button>
			)}
			<Button type="submit" isLoading={isPending}>
				{submitText}
			</Button>
		</Stack>
	);
};

FormActions.displayName = 'FormActions';
