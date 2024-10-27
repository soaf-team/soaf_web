import default_cover from '@/assets/icons/my-home/books-default.svg';
import { StarRating } from '@/components';
import { Document, MyBook, RatingType } from '@/types';
import { cn } from '@/utils';

interface Props {
	type?: 'search' | 'set' | 'detail';
	onClick?: () => void;
	book: Document | MyBook;
	readOnly?: boolean;
	onRatingChange?: (rating: RatingType) => void;
}

export const BookItem = ({
	type = 'search',
	onClick,
	book,
	readOnly,
	onRatingChange,
}: Props) => {
	const posterClass = cn({
		'min-w-[92px] w-[92px] h-[134px] rounded-[8px]': type === 'search',
		'min-w-[85px] w-[85px] h-[124px] rounded-[8px]': type === 'set',
		'min-w-[96px] w-[96px] h-[140px] rounded-[8px]': type === 'detail',
	});

	const titleClass = cn(
		{
			label2: type === 'search',
			head5b: type === 'set' || type === 'detail',
		},
		'text-black',
	);

	const authorClass = cn(
		{
			label4: type === 'search' || type === 'set',
			label3: type === 'detail',
		},
		'text-gray400',
	);

	const getImageUrl = () => {
		if ('content' in book) {
			return book.content.imageUrl || default_cover;
		}
		return book.thumbnail || default_cover;
	};

	const getTitle = () => {
		if ('content' in book) {
			return book.content.title;
		}
		return book.title;
	};

	const getAuthor = () => {
		if ('content' in book) {
			return book.content.author;
		}
		return book.authors[0] || '';
	};

	const getPublisher = () => {
		if ('content' in book) {
			return book.content.publisher;
		}
		return book.publisher;
	};

	const getPublishDate = () => {
		if ('content' in book) {
			return book.content.releaseDate.split('T')[0];
		}
		return book.datetime.split('T')[0];
	};

	const getContents = () => {
		if ('content' in book) {
			return book.content.story;
		}
		return book.contents;
	};

	const getRating = () => {
		if ('content' in book) {
			return book.content.rating;
		}
		return 0;
	};

	return (
		<div className="flex flex-col gap-[16px] border-b border-solid border-border py-[8px]">
			<div className="flex gap-[16px]" onClick={onClick}>
				<div className={posterClass}>
					<img src={getImageUrl()} alt="cover" className={posterClass} />
				</div>

				<div className="flex flex-col gap-[8px] py-[8px] justify-between">
					<div className="flex flex-col gap-[8px]">
						<p className={cn('line-clamp-1', titleClass)}>{getTitle()}</p>
						<div className="flex flex-col gap-[4px]">
							<p className={authorClass}>{getAuthor()}</p>
							<p className="label4 text-gray400">{getPublisher()}</p>
							<p className="label4 text-gray400">{getPublishDate()}</p>
						</div>
					</div>
					{type === 'search' && (
						<p className="line-clamp-3 body4">{getContents()}</p>
					)}
					{type === 'detail' && (
						<StarRating
							size={24}
							onChange={onRatingChange}
							defaultValue={getRating()}
							readonly={type === 'detail' && readOnly}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
