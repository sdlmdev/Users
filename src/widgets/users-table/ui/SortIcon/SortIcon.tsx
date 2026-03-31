import cn from 'classnames';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { SORT_DIRECTION_ASC, SORT_DIRECTION_DESC } from '@shared/const';
import styles from '../UsersTable.module.scss';

const SORT_ICON_SIZE = 14;

interface SortIconProps {
	isActive: boolean;
	direction: typeof SORT_DIRECTION_ASC | typeof SORT_DIRECTION_DESC;
}

export const SortIcon = ({ isActive, direction }: SortIconProps) => {
	if (isActive && direction === SORT_DIRECTION_ASC) {
		return (
			<span className={cn(styles.sortIcon, styles.sortActive)} aria-hidden="true">
				<ChevronUp width={SORT_ICON_SIZE} height={SORT_ICON_SIZE} strokeWidth={2.5} />
			</span>
		);
	}

	if (isActive && direction === SORT_DIRECTION_DESC) {
		return (
			<span className={cn(styles.sortIcon, styles.sortActive)} aria-hidden="true">
				<ChevronDown width={SORT_ICON_SIZE} height={SORT_ICON_SIZE} strokeWidth={2.5} />
			</span>
		);
	}

	return (
		<span className={cn(styles.sortIcon)} aria-hidden="true">
			<ChevronsUpDown width={SORT_ICON_SIZE} height={SORT_ICON_SIZE} />
		</span>
	);
};
