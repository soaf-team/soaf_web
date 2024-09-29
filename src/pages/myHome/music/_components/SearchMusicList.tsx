import { useGetMusicsQuery } from '@/hooks';
import { Album } from '@/types';
import { useState } from 'react';
import { SearchInput } from '../../_components/SearchInput';
import { MusicItem } from './MusicItem';
import { useObserver } from '@/hooks';

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

	if (!musics) return null;

	return (
		<div className="flex flex-col">
			<SearchInput type="music" setSearchQuery={setSearchQuery} />

			{musics.map((music: Album) => (
				<MusicItem
					type="search"
					key={music.url}
					music={music}
					onClick={() => handleItemClick(music)}
				/>
			))}

			{isFetching ? (
				<div>로딩 중...</div>
			) : (
				<div ref={pageRef} className="h-px" />
			)}
		</div>
	);
};
