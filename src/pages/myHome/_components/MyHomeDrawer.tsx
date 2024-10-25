import { ConfirmOverlay } from '@/components/overlay';
import { OverlayProps } from '@/libs';

interface Props extends Omit<OverlayProps, 'overlayKey'> {
	component: React.ReactNode;
}

export const MyHomeDrawer = ({ component, resolve, reject }: Props) => {
	return (
		<ConfirmOverlay
			overlayKey="my-home-overlay"
			reject={() => reject?.('close')}
			resolve={() => resolve?.('close')}
			overlayClassName="min-h-[92%] max-h-[92%]"
			isConfirm={false}
		>
			<div className="flex-1 overflow-auto">{component}</div>
		</ConfirmOverlay>
	);
};
