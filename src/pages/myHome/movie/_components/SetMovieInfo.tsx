import { useMovieDetailQuery } from '@/hooks';
import { MovieItem } from './MovieItem';
import { BackButton, Header, StarRating } from '@/components';
import { ReviewSection } from '../../_components';

interface Props {
	onPrevStep: () => void;
	movieId: string;
}

export const SetMovieInfo = ({ onPrevStep, movieId }: Props) => {
	const { movieInfo } = useMovieDetailQuery({ id: movieId });

	if (!movieInfo) return null;

	const actors = movieInfo.credits.cast
		.filter((actor) => actor.known_for_department === 'Acting')
		.map((actor) => actor.name)
		.slice(0, 2)
		.join(', ');

	return (
		<>
			<Header
				className="rounded-t-[28px] mt-[24px]"
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
				<MovieItem type="set" movie={movieInfo} />

				<ReviewSection
					title="감상평"
					placeholder="영화를 본 후 어떤 생각이 드셨나요?"
					maxLength={2000}
				/>

				<ReviewSection title="배우" data={actors} maxLength={200} />

				<ReviewSection
					title="줄거리"
					data={movieInfo.overview}
					maxLength={500}
				/>
			</div>
		</>
	);
};
