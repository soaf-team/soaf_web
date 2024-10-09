import { useState, FormEvent, useRef, useCallback } from 'react';

import { cn, convertToBase64, getCompressedImgFile } from '@/utils';
import { AlbumIcon, CameraIcon, sendIcon } from '@/assets';
import { Spacing } from '@/components';
import { chatSocketManager } from '@/libs';

export const MessageInput = ({ roomId }: { roomId: string }) => {
	const [message, setMessage] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		chatSocketManager.emit('sendMessage', {
			roomId,
			type: 'text',
			content: [message],
		});
		setMessage('');
	};

	const openAlbum = () => {
		fileInputRef.current?.click();
	};

	const encodeMultipleFiles = async (files: File[]): Promise<string[]> => {
		const compressedFiles = await Promise.all(files.map(getCompressedImgFile));

		return Promise.all(compressedFiles.map(convertToBase64));
	};

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const files = event.target.files;
			if (files) {
				const base64Array = await encodeMultipleFiles(Array.from(files));

				chatSocketManager.emit('sendMessage', {
					roomId,
					type: 'image',
					content: base64Array,
				});
			}
		},
		[roomId],
	);

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
				accept="image/*,.png,.jpg,.jpeg"
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
