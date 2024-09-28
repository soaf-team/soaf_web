import { useState, FormEvent } from 'react';

import { useSocket } from '@/hooks';
import { cn } from '@/utils';
import { AlbumIcon, CameraIcon, sendIcon } from '@/assets';
import { Spacing } from '@/components';

export const MessageInput = () => {
	const [message, setMessage] = useState('');
	const { emit } = useSocket('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		emit('sendMessage', message);
		setMessage('');
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
			<button>
				<img src={CameraIcon} alt="camera" />
			</button>
			<Spacing direction="horizontal" size={14} />
			<button>
				<img src={AlbumIcon} alt="album" />
			</button>
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
