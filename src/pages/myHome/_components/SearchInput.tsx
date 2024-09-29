import { SearchIcon } from '@/assets';
import { Input } from '@/components';

import { useState } from 'react';
import { overlay } from '@/libs';

interface Props {
	type: 'music' | 'movie' | 'book' | 'youtube';
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput = ({ type, setSearchQuery }: Props) => {
	const placeholder = {
		music: '좋아하는 음악을 검색해보세요',
		movie: '좋아하는 영화를 검색해보세요',
		book: '좋아하는 도서를 검색해보세요',
		youtube: '유튜브 링크를 등록해보세요',
	} as const;

	const [isSearch, setIsSearch] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setIsSearch(value.length > 0);
	};

	const handleSearchSubmit = () => {
		setSearchQuery(inputValue);
	};

	const handleClose = () => {
		overlay.close();
	};

	return (
		<div className="flex gap-[13px] items-center sticky py-[20px] top-0 bg-white">
			<Input
				variant="box"
				leftSlot={<img src={SearchIcon} alt="search" width={24} height={24} />}
				value={inputValue}
				placeholder={placeholder[type]}
				onChange={handleInputChange}
				isResetButton={true}
				className="flex-1"
			/>
			{isSearch === false ? (
				<button type="button" className="label2" onClick={handleClose}>
					취소
				</button>
			) : (
				<button type="button" className="label2" onClick={handleSearchSubmit}>
					검색
				</button>
			)}
		</div>
	);
};
