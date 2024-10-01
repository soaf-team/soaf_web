import { LoadingDots } from '../fallback';
import { OverlayProps } from '@/libs';

type LoadingDotScreenProps = {
	message?: string;
} & OverlayProps;

export const LoadingDotScreen = ({
	message,
	onLoading,
}: LoadingDotScreenProps) => {
	return (
		<div className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col gap-[16px]">
			<LoadingDots />
			{message && <p className="text-base text-primary">{message}</p>}
		</div>
	);
};
