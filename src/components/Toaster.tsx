import { useActiveActivity, useToast } from '@/hooks';
import {
	Toast,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/libs';
import { Stack } from '@stackflow/core';

export function Toaster({ stack }: { stack: Stack }) {
	const { toasts } = useToast();
	const { isBottomTabActivity } = useActiveActivity(stack);

	return (
		<ToastProvider duration={2000}>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1 text-center">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{action}
					</Toast>
				);
			})}
			<ToastViewport
				style={{
					bottom: isBottomTabActivity ? '93px' : '10px',
					zIndex: 10000,
				}}
			/>
		</ToastProvider>
	);
}
