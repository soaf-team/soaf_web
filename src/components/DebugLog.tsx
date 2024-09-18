import { cn } from '@/utils';
import React, { useState, useEffect, useRef } from 'react';
import { getLogs, LogEntry } from '@/utils';

export const DebugLog = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [logs, setLogs] = useState<LogEntry[]>([]);
	const logContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateInterval = setInterval(() => {
			setLogs(getLogs());
		}, 1000);

		return () => clearInterval(updateInterval);
	}, []);

	useEffect(() => {
		if (logContainerRef.current) {
			logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
		}
	}, [logs]);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div
			className={cn(
				'fixed transition-all duration-300 ease-in-out z-50',
				isCollapsed
					? 'top-0 right-1/2 translate-x-1/2 w-12 h-12 rounded-full'
					: 'top-0 right-0 w-full h-1/2 rounded-none',
			)}
		>
			<div
				className={cn(
					'absolute inset-0 bg-black bg-opacity-80',
					isCollapsed ? 'rounded-full' : 'rounded-none',
				)}
			></div>
			<div
				onClick={toggleCollapse}
				className={cn(
					'absolute inset-0 flex items-center justify-center cursor-pointer text-white font-bold',
					isCollapsed ? 'text-2xl' : 'text-lg p-2 border-b border-white',
				)}
			>
				{isCollapsed ? 'D' : 'Debug Log'}
			</div>
			{!isCollapsed && (
				<div
					ref={logContainerRef}
					className="absolute inset-0 mt-10 p-4 overflow-y-auto bg-black bg-opacity-60 text-white font-mono text-sm"
				>
					{logs.map((logEntry, index) => (
						<div
							key={index}
							className={`mb-1 ${getLogLevelColor(logEntry.level)}`}
						>
							{`${logEntry.timestamp} [${logEntry.level.toUpperCase()}] ${logEntry.message}`}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const getLogLevelColor = (level: LogEntry['level']) => {
	switch (level) {
		case 'error':
			return 'text-red-500';
		case 'warn':
			return 'text-yellow-500';
		case 'info':
			return 'text-blue-500';
		default:
			return 'text-white';
	}
};
