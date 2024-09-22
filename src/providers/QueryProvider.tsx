import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};
