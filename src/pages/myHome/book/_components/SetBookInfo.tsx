import { useBookDetailQuery } from '@/hooks';
import { BookItem } from './BookItem';
import { BackButton, Header, StarRating } from '@/components';
import { ReviewSection } from '../../_components';

interface Props {
	onPrevStep: () => void;
	bookId: string;
}

export const SetBookInfo = ({ onPrevStep, bookId }: Props) => {
	const { bookInfo } = useBookDetailQuery({
		id: bookId.split(' ')[0] || bookId.split(' ')[1],
	});

	if (!bookInfo) return null;

	return (
		<>
			<Header
				leftSlot={<BackButton onClick={onPrevStep} />}
				rightSlot={
					<button type="submit" className="label2">
						저장
					</button>
				}
			>
				<h1 className="head6b">새로운 리뷰</h1>
			</Header>

			<div className="flex justify-center pt-[58px] pb-[16px]">
				<StarRating size={40} onChange={() => {}} />
			</div>

			<div className="flex flex-col gap-[32px]">
				<BookItem type="set" book={bookInfo} />

				<ReviewSection
					title="감상평"
					placeholder="책을 읽은 후 어떤 생각이 드셨나요?"
					maxLength={2000}
				/>

				<ReviewSection
					title="줄거리"
					data={bookInfo.contents}
					maxLength={500}
				/>
			</div>
		</>
	);
};
