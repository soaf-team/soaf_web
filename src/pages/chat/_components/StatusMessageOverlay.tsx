import { useState } from 'react';

import { Overlay } from '@/components';
import { Input } from '@/components/ui';
import { OverlayProps } from '@/libs';

export const StatusMessageOverlay = ({ resolve, reject }: OverlayProps) => {
	const [statusMessage, setStatusMessage] = useState('');

	const handleChange = (value: string) => {
		if (value.length > 20) {
			return;
		}

		setStatusMessage(value);
	};

	return (
		<Overlay
			overlayKey="status-message-overlay"
			disabled={statusMessage.length === 0}
			reject={() => reject?.('close')}
			resolve={() => resolve?.(statusMessage)}
		>
			<h2 className="py-3 font-semibold text-center">상태메시지 올리기</h2>
			<Input
				className="h-[28px] py-1"
				isResetButton
				value={statusMessage}
				onChange={handleChange}
			/>
			<p className="pt-1 pb-2 font-medium text-gray300 text-end">
				{statusMessage.length} / <span className="text-black">20</span>
			</p>
		</Overlay>
	);
};
