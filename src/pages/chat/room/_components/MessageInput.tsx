import { useState, useEffect, FormEvent, useRef } from 'react';

import { cn } from '@/utils';
import { AlbumIcon, CameraIcon, sendIcon } from '@/assets';
import { Spacing } from '@/components';
import { chatSocketManager } from '@/libs';

export const MessageInput = () => {
	const [message, setMessage] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		chatSocketManager.emit('sendMessage', {
			roomId: '1',
			type: 'text',
			content: [message],
		});
	};

	const openAlbum = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			// TODO: emit send message 로직 추가
			console.log('선택된 파일:', files);
		}
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
			<button type="button">
				<img src={CameraIcon} alt="camera" />
			</button>
			<Spacing direction="horizontal" size={14} />
			<button type="button" onClick={openAlbum}>
				<img src={AlbumIcon} alt="album" />
			</button>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*"
				multiple
				style={{ display: 'none' }}
			/>
			<Spacing direction="horizontal" size={10} />
			<div
				className={cn(
					'flex justify-between items-center flex-1',
					'px-4 py-[10px]',
					'rounded-[24px] bg-gray50 text-gray200 caret-primary',
				)}
			>
				<input
					className="h-6 bg-transparent outline-none"
					type="text"
					placeholder="메시지를 입력주세요"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className={cn(!message && 'hidden')} type="submit">
					<img src={sendIcon} alt="send" />
				</button>
			</div>
		</form>
	);
};
