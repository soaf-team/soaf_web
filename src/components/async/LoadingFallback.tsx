import { LoadingSpinner } from '../fallback';

export const LoadingFallback = () => {
	return (
		<div className="flex-1 flex items-center justify-center">
			<LoadingSpinner />
		</div>
	);
};
