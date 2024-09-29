import { useGetBooksQuery } from '@/hooks';
import { useState } from 'react';
import { useObserver } from '@/hooks';
import { SearchInput } from '../../_components';
import { Document } from '@/types';
import { BookItem } from './BookItem';

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

			{books?.map((book: Document) => (
				<BookItem
					key={book.isbn}
					book={book}
					onClick={() => handleItemClick(book)}
				/>
			))}
			{isFetching ? (
				<div>로딩 중...</div>
			) : (
				<div ref={pageRef} className="h-px" />
			)}
		</>
	);
};
