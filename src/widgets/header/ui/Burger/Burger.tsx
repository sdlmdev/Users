import { Button, Stack } from '@shared/ui';
import styles from './Burger.module.scss';

interface BurgerProps {
	isOpen: boolean;
	onClick: () => void;
}

export const Burger = ({ isOpen, onClick }: BurgerProps) => (
	<div className={styles.burgerWrapper} data-open={isOpen}>
		<Button
			variant="ghost"
			onClick={onClick}
			aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
			aria-expanded={isOpen}
			icon={
				<Stack direction="column" gap={1}>
					<span className={styles.burgerLine} />
					<span className={styles.burgerLine} />
					<span className={styles.burgerLine} />
				</Stack>
			}
		/>
	</div>
);
