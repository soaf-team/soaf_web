import { useState, Dispatch, SetStateAction } from 'react';
import { Interior } from '@/types';
import {
	MusicMyHomeIcon,
	BooksMyHomeIcon,
	MovieMyHomeIcon,
	YoutubeMyHomeIcon,
} from '@/assets';

interface Props {
	items: Record<string, Interior>;
	setItems: Dispatch<SetStateAction<Record<string, Interior>>>;
}

const icons = [
	{ name: 'music', icon: MusicMyHomeIcon },
	{ name: 'books', icon: BooksMyHomeIcon },
	{ name: 'movie', icon: MovieMyHomeIcon },
	{ name: 'youtube', icon: YoutubeMyHomeIcon },
];

export const BottomActionButtons = ({ items, setItems }: Props) => {
	return (
		<div className="flex justify-around items-center bg-white w-3/4 h-[56px] px-[32px] py-[16px] opacity-90 rounded-[28px] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bottom-10 shadow-bottomActionButtons">
			{icons.map(({ name, icon }) => (
				<button
					key={name}
					className={`flex justify-center items-center min-w-[32px] w-[32px] h-[32px] ${
						items[name as keyof typeof items].visible === true
							? 'border border-solid border-[#AEDDF9] bg-[#E2F2F6] rounded-[4px]'
							: ''
					}`}
					onClick={() =>
						setItems((prev) => ({
							...prev,
							[name]: { ...prev[name], visible: !prev[name].visible },
						}))
					}
				>
					<img src={icon} alt={name} className="w-[24px] h-[24px]" />
				</button>
			))}
		</div>
	);
};
