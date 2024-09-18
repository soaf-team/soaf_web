import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { OverlayContext } from '@/libs';
import { DebugLog } from '@/components';
import { useCheckWebview } from '@/hooks';

type Props = {
	children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
	const isWebView = useCheckWebview();
	const isDevelopment = import.meta.env.MODE === 'development';

	return (
		<QueryProvider>
			<OverlayContext>
				{children}
				{isWebView && isDevelopment && <DebugLog />}
			</OverlayContext>
		</QueryProvider>
	);
};
