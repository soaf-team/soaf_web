import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react(), tsconfigPaths()],
	server: {
		proxy: {
			'/api': {
				target:
					'http://default-api-service-77559-26019998-ded2c8967f62.kr.lb.naverncp.com:8443',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
