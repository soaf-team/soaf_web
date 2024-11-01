import { useRef, useState } from 'react';

import { BasicOverlay } from '@/components/overlay';
import { Input } from '@/components/ui';
import { OverlayProps } from '@/libs';
import { cn } from '@/utils';

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
		<BasicOverlay
			overlayKey="status-message-overlay"
			disabled={statusMessage.length === 0}
			leftButton={{
				text: '수정',
				className: cn(
					statusMessage.length === 0
						? 'cursor-not-allowed bg-gray100'
						: 'bg-main_gradient text-white',
				),
				onClick:
					statusMessage.length === 0
						? () => {}
						: () => resolve?.(statusMessage),
			}}
			onClose={() => reject?.('close')}
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
		</BasicOverlay>
	);
};
