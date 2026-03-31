import cn from 'classnames';
import { Search, X } from 'lucide-react';
import { Button, Input, Stack } from '@shared/ui';
import styles from './UserSearch.module.scss';

const ICON_SIZE = 16;

interface UserSearchProps {
	value: string;
	onChange: (value: string) => void;
}

export const UserSearch = ({ value, onChange }: UserSearchProps) => {
	return (
		<Stack direction="row" isFullWidth>
			<Input
				id="user-search"
				type="text"
				placeholder="Поиск по имени, фамилии или email..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				isFullWidth
				isRightIconClickable
				leftIcon={<Search width={ICON_SIZE} height={ICON_SIZE} />}
				rightIcon={
					value ? (
						<Stack direction="row" className={cn(styles.clearBtnWrapper)}>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								aria-label="Очистить поиск"
								onClick={() => onChange('')}
								icon={<X width={ICON_SIZE} height={ICON_SIZE} />}
							/>
						</Stack>
					) : undefined
				}
			/>
		</Stack>
	);
};
