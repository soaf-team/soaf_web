import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { OverlayContext } from '@/libs';
import { AuthProvider } from './AuthProvider';

type Props = {
	children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
	return (
		<QueryProvider>
			<AuthProvider>
				<OverlayContext>{children}</OverlayContext>
			</AuthProvider>
		</QueryProvider>
	);
};
