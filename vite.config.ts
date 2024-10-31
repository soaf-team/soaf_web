import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react(), tsconfigPaths()],
	server: {
		proxy: {
			'/api/lastfm': {
				target: 'http://ws.audioscrobbler.com/2.0',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/lastfm/, ''),
			},
			'/proxy-storage': {
				target: 'https://contest82-image.kr.object.ncloudstorage.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/proxy-storage/, ''),
			},
		},
	},
});
