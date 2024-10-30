import { DialogOverlay } from '@/components/overlay';
import { OverlayProps } from '@/libs';

export const SoafRejectOverlay = ({
	resolve,
	reject,
}: Omit<OverlayProps, 'overlayKey'>) => {
	return (
		<DialogOverlay
			title="정말 거절할까요?"
			onClose={() => reject?.('close')}
			leftButton={{
				text: '아니요',
				onClick: () => reject?.('close'),
			}}
			rightButton={{
				text: '네, 거절할래요',
				onClick: () => resolve?.('reject'),
			}}
		>
			거절한 신청은 복원할 수 없어요
		</DialogOverlay>
	);
};
