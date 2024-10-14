import { useState } from 'react';

import { DialogOverlay } from '@/components/overlay';
import { OverlayProps } from '@/libs';

interface BanDialogOverlayProps extends Omit<OverlayProps, 'overlayKey'> {
	userName: string;
}

export const BanDialogOverlay = ({
	userName,
	reject,
	resolve,
}: BanDialogOverlayProps) => {
	const [text, setText] = useState('');

	return (
		<DialogOverlay
			title={`${userName}님을 정말 차단할까요?`}
			leftButton={{
				text: '아니요',
				onClick: () => reject(),
			}}
			rightButton={{
				text: '네, 차단할래요',
				onClick: () => {
					if (text) resolve();
				},
			}}
			onClose={() => reject()}
		>
			<div className="flex flex-col items-center gap-4 w-full">
				<div className="flex flex-col items-end gap-[2px] p-3 w-full h-[144px] text-[14px] border border-solid  border-gray100 rounded-[8px]">
					<textarea
						className="flex-1 w-full font-medium outline-none"
						placeholder="차단하고 싶은 이유를 알려주세요."
						value={text}
						maxLength={200}
						onChange={(e) => {
							const newValue = e.target.value;
							setText(newValue);
						}}
					/>
					<p className="font-medium">
						<span className="text-gray300">{text.length} / </span>200
					</p>
				</div>
				<p className="text-[14px] text-gray500 font-medium">
					차단 해지는 [설정-친구관리]에서 가능해요
				</p>
			</div>
		</DialogOverlay>
	);
};
