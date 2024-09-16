import { useState } from 'react';

import { Overlay, Spacing } from '@/components';
import { InputField } from '@/components/ui';

export const StatusMessageOverlay = () => {
	const [statusMessage, setStatusMessage] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatusMessage(e.target.value);
	};

	return (
		<Overlay
			overlayKey="status-message-overlay"
			disabled={statusMessage.length === 0}
		>
			<h2 className="py-3 font-semibold text-center">상태메시지 올리기</h2>
			<InputField
				bottomText={
					<p className="font-medium text-gray300">
						{statusMessage.length} / <span className="text-black">60</span>
					</p>
				}
				onChange={handleChange}
			/>
		</Overlay>
	);
};
