import { useGetMusicsQuery } from '@/hooks';
import { Album } from '@/types';
import { useState } from 'react';
import { SearchInput } from '../../_components/SearchInput';
import { MusicItem } from './MusicItem';
import { useObserver } from '@/hooks';
import { LoadingDots, NonDataFallback } from '@/components';

interface Props {
	onNextStep: () => void;
	setMusic: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const SearchMusicList = ({ onNextStep, setMusic }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const { musics, handleFetchNextPage, isFetching } = useGetMusicsQuery({
		value: searchQuery,
	});
	const pageRef = useObserver(() => handleFetchNextPage());

	const handleItemClick = (music: Album) => {
		setMusic({
			name: music.name,
			artist: music.artist,
		});
		onNextStep();
	};

	return (
		<div className="flex flex-col">
			<SearchInput type="music" setSearchQuery={setSearchQuery} />

			{musics?.length === 0 ? (
				<div className="w-full absolute_center">
					<NonDataFallback>
						<p className="font-medium body2 text-gray300">
							{searchQuery}에 대한 검색결과가 없습니다.
						</p>
						<p className="font-medium body2 text-gray300">
							단어의 철자가 정확한지 확인해주세요.
						</p>
					</NonDataFallback>
				</div>
			) : (
				musics?.map((music: Album) => (
					<MusicItem
						type="search"
						key={music.url}
						music={music}
						onClick={() => handleItemClick(music)}
					/>
				))
			)}

			{isFetching ? (
				<div className="absolute_center">
					<LoadingDots />
				</div>
			) : (
				<div ref={pageRef} className="h-px" />
			)}
		</div>
	);
};
