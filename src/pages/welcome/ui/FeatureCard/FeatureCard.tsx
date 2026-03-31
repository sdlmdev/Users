import { ReactNode } from 'react';
import { ICON_SIZE } from '@shared/const';
import { Card, Stack, Typography } from '@shared/ui';

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
	return (
		<Card isHoverable>
			<Stack direction="column" gap={4} isFullWidth align="stretch">
				<Stack
					direction="row"
					justify="center"
					align="center"
					style={{ width: ICON_SIZE.HERO, height: ICON_SIZE.HERO }}
				>
					{icon}
				</Stack>
				<Typography variant="h3">{title}</Typography>
				<Typography variant="p" color="secondary">
					{description}
				</Typography>
			</Stack>
		</Card>
	);
};
