import { Link, Stack, Typography } from '@shared/ui';
import styles from './Footer.module.scss';

export const Footer = () => {
	return (
		<Stack as="footer" isFullWidth mt="auto" className={styles.footer}>
			<Stack
				direction="row"
				justify="between"
				align="center"
				gap={4}
				px={{ base: 6, mobile: 4 }}
				isFullWidth
				maxWidth="max"
				mx="auto"
			>
				<Typography variant="label" weight="medium" color="secondary">
					© 2026 UserHub
				</Typography>

				<Link
					href="https://github.com/sdlmdev"
					target="_blank"
					aria-label="GitHub автора"
					variant="subtle"
				>
					<Typography variant="label" weight="semibold">
						sdlmdev
					</Typography>
				</Link>
			</Stack>
		</Stack>
	);
};
