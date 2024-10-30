import { useState, FormEvent } from 'react';

import { cn, sendMessageToApp } from '@/utils';
import { AlbumIcon, CameraIcon, sendIcon } from '@/assets';
import { Spacing } from '@/components';
import { chatSocketManager } from '@/libs';

export const MessageInput = ({ roomId }: { roomId: string }) => {
	const [message, setMessage] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		chatSocketManager.emit('sendMessage', {
			roomId,
			type: 'text',
			content: [message],
		});
		setMessage('');
	};

	const openCamera = (roomId: string) => {
		sendMessageToApp({ type: 'OPEN_CAMERA', data: roomId });
	};

	const openAlbum = (roomId: string) => {
		sendMessageToApp({ type: 'OPEN_ALBUM', data: roomId });
	};

	return (
		<form
			className={cn(
				'sticky bottom-0 left-0 right-0',
				'flex items-center',
				'pt-2 pb-7',
				'bg-white z-10',
				'min-w-0',
				'w-full',
			)}
			onSubmit={handleSubmit}
		>
			<div className="flex items-center w-full min-w-0">
				<button
					type="button"
					className="w-6 h-6 flex-shrink-0"
					onClick={() => openCamera(roomId)}
				>
					<img src={CameraIcon} alt="camera" className="w-full h-full" />
				</button>
				<Spacing direction="horizontal" size={14} />
				<button
					type="button"
					className="w-6 h-6 flex-shrink-0"
					onClick={() => openAlbum(roomId)}
				>
					<img src={AlbumIcon} alt="album" className="w-full h-full" />
				</button>
				<Spacing direction="horizontal" size={10} />
				<div
					className={cn(
						'flex justify-between gap-2 items-center flex-1',
						'px-4 py-[10px]',
						'rounded-[24px] bg-gray50 text-gray200 caret-primary',
						'min-w-0', // 추가
					)}
				>
					<input
						className="flex-1 h-6 bg-transparent outline-none min-w-0" // min-w-0 추가
						type="text"
						placeholder="메시지를 입력주세요"
						value={message}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
							}
						}}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button
						className={cn(!message && 'hidden', 'flex-shrink-0')}
						type="submit"
					>
						<img src={sendIcon} alt="send" />
					</button>
				</div>
			</div>
		</form>
	);
};
