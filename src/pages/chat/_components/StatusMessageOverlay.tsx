import { useRef, useState } from 'react';

import { ConfirmOverlay } from '@/components/overlay';
import { Input } from '@/components/ui';
import { OverlayProps } from '@/libs';

export const StatusMessageOverlay = ({
	userStatus,
	resolve,
	reject,
}: OverlayProps & { userStatus: string | null }) => {
	const [statusMessage, setStatusMessage] = useState(userStatus ?? '');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (value: string) => {
		setStatusMessage(value);
	};

	return (
		<ConfirmOverlay
			overlayKey="status-message-overlay"
			disabled={statusMessage.length === 0}
			reject={() => reject?.('close')}
			resolve={() => resolve?.(statusMessage)}
		>
			<h2 className="py-3 font-semibold text-center">상태메시지 올리기</h2>
			<Input
				ref={inputRef}
				className="h-[28px] py-1"
				isResetButton
				maxLength={20}
				value={statusMessage}
				onChange={handleChange}
			/>
			<p className="pt-1 pb-2 font-medium text-gray300 text-end">
				{statusMessage.length} / <span className="text-black">20</span>
			</p>
		</ConfirmOverlay>
	);
};
