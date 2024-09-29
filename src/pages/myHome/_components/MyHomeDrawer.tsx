import { Overlay } from '@/components';
import { OverlayProps } from '@/libs';

interface Props extends Omit<OverlayProps, 'overlayKey'> {
	component: React.ReactNode;
}

export const MyHomeDrawer = ({ component, resolve, reject }: Props) => {
	return (
		<Overlay
			overlayKey="my-home-overlay"
			reject={() => reject?.('close')}
			resolve={() => resolve?.('close')}
			isConfirm={false}
			overlayClassName="min-h-[92%] max-h-[92%]"
		>
			<div className="flex-1 overflow-auto">{component}</div>
		</Overlay>
	);
};
