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
			)}
			onSubmit={handleSubmit}
		>
			<button type="button" onClick={() => openCamera(roomId)}>
				<img src={CameraIcon} alt="camera" />
			</button>
			<Spacing direction="horizontal" size={14} />
			<button type="button" onClick={() => openAlbum(roomId)}>
				<img src={AlbumIcon} alt="album" />
			</button>
			<Spacing direction="horizontal" size={10} />
			<div
				className={cn(
					'flex justify-between gap-2 items-center flex-1',
					'px-4 py-[10px]',
					'rounded-[24px] bg-gray50 text-gray200 caret-primary',
				)}
			>
				<input
					className="flex-1 h-6 bg-transparent outline-none"
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
				<button className={cn(!message && 'hidden')} type="submit">
					<img src={sendIcon} alt="send" />
				</button>
			</div>
		</form>
	);
};
