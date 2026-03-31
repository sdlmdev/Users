import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import cn from 'classnames';
import { Button, Stack, Typography } from '..';
import styles from './ErrorBoundary.module.scss';

interface Props {
	children: ReactNode;
}

interface State {
	isError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		isError: false,
		error: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { isError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	// eslint-disable-next-line @typescript-eslint/promise-function-async
	public render() {
		if (this.state.isError) {
			return (
				<Stack
					direction="column"
					align="center"
					justify="center"
					gap={4}
					p={20}
					isFullWidth
					className={cn(styles.root)}
				>
					<Typography variant="h2">Что-то пошло не так</Typography>
					<Typography variant="p">Произошла непредвиденная ошибка в приложении.</Typography>
					<Button variant="primary" onClick={() => window.location.reload()}>
						Обновить страницу
					</Button>
					{this.state.error && (
						<pre className={cn(styles.errorDetails)}>{this.state.error.message}</pre>
					)}
				</Stack>
			);
		}

		return this.props.children;
	}
}
