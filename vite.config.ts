import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isGhPages = env.VITE_APP_GH_PAGES === 'true';
	const base = isGhPages ? '/Users/' : '/';

	return {
		base,
		plugins: [
			react({
				babel: {
					plugins: [['babel-plugin-react-compiler']],
				},
			}),
		],
		resolve: {
			alias: {
				'@app': resolve(__dirname, 'src/app'),
				'@pages': resolve(__dirname, 'src/pages'),
				'@widgets': resolve(__dirname, 'src/widgets'),
				'@features': resolve(__dirname, 'src/features'),
				'@entities': resolve(__dirname, 'src/entities'),
				'@shared': resolve(__dirname, 'src/shared'),
			},
		},
		css: {
			modules: {
				localsConvention: 'camelCase',
			},
			preprocessorOptions: {
				scss: {
					additionalData: `@use "${resolve(__dirname, 'src/app/styles/_mixins.scss').replace(/\\/g, '/')}" as *;`,
				},
			},
		},
	};
});
