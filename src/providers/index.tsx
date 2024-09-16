import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { OverlayContext } from '@/libs';

type Props = {
	children: ReactNode;
};

export const ProviderGroup = ({ children }: Props) => {
	return (
		<QueryProvider>
			<OverlayContext>{children}</OverlayContext>
		</QueryProvider>
	);
};
