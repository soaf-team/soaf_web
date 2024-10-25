import { useGetBooksQuery } from '@/hooks';
import { useState } from 'react';
import { useObserver } from '@/hooks';
import { SearchInput } from '../../_components';
import { Document } from '@/types';
import { BookItem } from './BookItem';
import { NonDataFallback, LoadingDots } from '@/components';

interface Props {
	onNextStep: () => void;
	setBookId: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBookList = ({ onNextStep, setBookId }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const { books, handleFetchNextPage, isFetching } = useGetBooksQuery({
		value: searchQuery,
	});
	const pageRef = useObserver(() => handleFetchNextPage());

	const handleItemClick = (book: Document) => {
		setBookId(book.isbn);
		onNextStep();
	};

	return (
		<>
			<SearchInput type="book" setSearchQuery={setSearchQuery} />

			{books?.length === 0 ? (
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
				books?.map((book: Document) => (
					<BookItem
						type="search"
						key={book.isbn}
						book={book}
						onClick={() => handleItemClick(book)}
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
		</>
	);
};
