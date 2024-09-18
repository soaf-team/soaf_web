type LogLevel = 'log' | 'info' | 'warn' | 'error';

export interface LogEntry {
	timestamp: string;
	level: LogLevel;
	message: string;
}

let logs: LogEntry[] = [];
const maxLogs = 1000;

export const log = (message: any, level: LogLevel = 'log') => {
	const timestamp = new Date().toISOString();
	const formattedMessage =
		typeof message === 'object' ? JSON.stringify(message) : message;
	const logEntry: LogEntry = {
		timestamp,
		level,
		message: formattedMessage,
	};

	logs.push(logEntry);
	if (logs.length > maxLogs) {
		logs = logs.slice(-maxLogs);
	}

	console[level](formattedMessage);
};

export const getLogs = () => logs;

export const logInfo = (message: any) => log(message, 'info');
export const logWarn = (message: any) => log(message, 'warn');
export const logError = (message: any) => log(message, 'error');
