import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

class SocketManager {
	private static instance: SocketManager;
	private socket: Socket | null = null;
	private token: string | null = null;

	private constructor() {}

	public static getInstance(): SocketManager {
		if (!SocketManager.instance) {
			SocketManager.instance = new SocketManager();
		}
		return SocketManager.instance;
	}

	public setToken(token: string) {
		this.token = token;
	}

	public connect() {
		if (!this.socket && this.token) {
			this.socket = io(SOCKET_URL, {
				extraHeaders: {
					token: this.token,
				},
			});

			this.socket.on('connect', () => {
				console.log('Socket connected');
			});

			this.socket.on('disconnect', () => {
				console.log('Socket disconnected');
			});

			this.socket.on('error', (error) => {
				console.error('Socket error:', error);
			});
		} else if (!this.token) {
			console.error(
				'Token is not set. Please call setToken before connecting.',
			);
		}
		return this.socket;
	}

	public getSocket(): Socket | null {
		return this.socket;
	}

	public disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}
}

export const socketManager = SocketManager.getInstance();
