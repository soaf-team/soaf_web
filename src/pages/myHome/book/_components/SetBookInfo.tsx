import { useBookDetailQuery, useUserProfileQuery } from '@/hooks';
import { BookItem } from './BookItem';
import { BackButton, Header, StarRating } from '@/components';
import { ReviewSection } from '../../_components';
import { useEffect, useState } from 'react';
import { BookContent, RatingType } from '@/types';
import { myHomeMutations } from '@/hooks/mutations';
import { overlay } from '@/libs';

interface Props {
	onPrevStep: () => void;
	bookId: string;
}

export const SetBookInfo = ({ onPrevStep, bookId }: Props) => {
	const { bookInfo } = useBookDetailQuery({
		id: bookId.split(' ')[0] || bookId.split(' ')[1],
	});
	const { userProfile } = useUserProfileQuery();
	const { createMyHomeMutation } = myHomeMutations('book');

	const [book, setBook] = useState<Omit<BookContent, 'rating'>>({
		imageUrl: '',
		title: '',
		author: '',
		publisher: '',
		releaseDate: '',
		story: '',
	});
	const [bookData, setBookData] = useState({
		review: '',
		story: '',
		rating: 0 as RatingType,
	});

	const handleDataChange = (
		key: keyof typeof bookData,
		value: string | number,
	) => {
		setBookData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		createMyHomeMutation.mutate({
			category: 'book',
			review: bookData.review,
			content: {
				...book,
				rating: bookData.rating,
			},
			userId: userProfile?.id,
		});

		setBookData({
			review: '',
			story: '',
			rating: 0,
		});
		overlay.close();
	};

	useEffect(() => {
		if (bookInfo) {
			setBook({
				imageUrl: bookInfo.thumbnail,
				title: bookInfo.title,
				author: bookInfo.authors.join(', '),
				publisher: bookInfo.publisher,
				releaseDate: bookInfo.datetime,
				story: bookInfo.contents,
			});
		}
	}, [bookInfo]);

	if (!bookInfo) return null;

	return (
		<>
			<Header
				className="rounded-t-[28px]"
				leftSlot={{
					component: <BackButton onClick={onPrevStep} />,
					className: 'left-0',
				}}
				rightSlot={{
					component: (
						<button type="submit" className="label2" onClick={handleSubmit}>
							저장
						</button>
					),
					className: 'right-0',
				}}
			>
				<h1 className="head6b">새로운 리뷰</h1>
			</Header>

			<div className="flex justify-center pb-[16px]">
				<StarRating
					size={40}
					onChange={(value) => handleDataChange('rating', value)}
				/>
			</div>

			<div className="flex flex-col gap-[32px]">
				<BookItem type="set" book={bookInfo} />

				<ReviewSection
					title="감상평"
					placeholder="책을 읽은 후 어떤 생각이 드셨나요?"
					maxLength={2000}
					value={bookData.review}
					onChange={(value) => handleDataChange('review', value)}
				/>

				<ReviewSection
					title="줄거리"
					placeholder="어떤 내용의 책인지 간략하게 소개해주세요."
					value={bookData.story}
					onChange={(value) => handleDataChange('story', value)}
					maxLength={500}
				/>
			</div>
		</>
	);
};
