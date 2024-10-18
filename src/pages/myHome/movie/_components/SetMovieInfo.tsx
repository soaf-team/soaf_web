import { useState, useEffect, useMemo, useCallback } from 'react';
import { useMovieDetailQuery, useUserProfileQuery } from '@/hooks';
import { MovieItem } from './MovieItem';
import { BackButton, Header, StarRating } from '@/components';
import { ReviewSection } from '../../_components';
import { myHomeMutations } from '@/hooks/mutations';
import { overlay } from '@/libs';
import { MovieContent, RatingType } from '@/types';

interface Props {
	onPrevStep: () => void;
	movieId: string;
}

export const SetMovieInfo = ({
	onPrevStep,

	movieId,
}: Props) => {
	const { movieInfo } = useMovieDetailQuery({ id: movieId });
	const [movie, setMovie] = useState<Omit<MovieContent, 'rating'>>({
		title: '',
		director: '',
		releaseDate: '',
		actors: [],
		story: '',
		genre: '',
		imageUrl: '',
	});

	const actors = useMemo((): string => {
		if (!movieInfo) return '';
		return movieInfo.credits.cast
			.filter((actor) => actor.known_for_department === 'Acting')
			.map((actor) => actor.name)
			.slice(0, 2)
			.join(', ');
	}, [movieInfo]);

	const director = useMemo((): string => {
		if (!movieInfo) return '';
		return (
			movieInfo.credits.crew.filter(
				(crew) => crew.department === 'Directing',
			)[0]?.name || ''
		);
	}, [movieInfo]);

	const genre = useMemo((): string => {
		if (!movieInfo) return '';
		return movieInfo.genres.reduce((acc, cur, idx) => {
			return idx === movieInfo.genres.length - 1
				? `${acc}${cur.name}`
				: `${acc}${cur.name}, `;
		}, '');
	}, [movieInfo]);

	const [movieData, setMovieData] = useState({
		review: '',
		actor: actors,
		story: movieInfo?.overview || '',
		rating: 0 as RatingType,
	});

	const { userProfile } = useUserProfileQuery();
	const { createMyHomeMutation } = myHomeMutations();

	const handleDataChange = useCallback(
		(key: keyof typeof movieData, value: string | number) => {
			setMovieData((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const handleSubmit = () => {
		createMyHomeMutation.mutate({
			category: 'movie',
			review: movieData.review,
			content: {
				title: movie.title,
				imageUrl: movie.imageUrl,
				director: movie.director,
				genre: movie.genre,
				releaseDate: movie.releaseDate,
				actors: movie.actors,
				story: movie.story,
				rating: movieData.rating,
			},
			userId: userProfile?.id || '',
		});

		setMovieData({
			review: '',
			actor: '',
			story: '',
			rating: 0,
		});
		overlay.close();
	};

	useEffect(() => {
		if (movieInfo && actors && director && genre) {
			setMovie({
				title: movieInfo.title,
				imageUrl: `https://image.tmdb.org/t/p/w342${movieInfo.poster_path}`,
				director: director,
				genre: genre,
				releaseDate: movieInfo.release_date,
				actors: actors.split(','),
				story: movieInfo.overview,
			});
		}
	}, [movieInfo, actors, director, genre, setMovie]);

	useEffect(() => {
		if (actors) {
			setMovieData((prev) => ({ ...prev, actor: actors }));
		}
	}, [actors]);

	useEffect(() => {
		if (movieInfo?.overview) {
			setMovieData((prev) => ({ ...prev, story: movieInfo.overview }));
		}
	}, [movieInfo?.overview]);

	if (!movieInfo) return null;

	return (
		<>
			<Header
				className="rounded-t-[28px] mt-[24px]"
				leftSlot={<BackButton onClick={onPrevStep} />}
				rightSlot={
					<button type="submit" className="label2" onClick={handleSubmit}>
						저장
					</button>
				}
			>
				<h1 className="head6b">새로운 리뷰</h1>
			</Header>

			<div className="flex justify-center pt-[58px] pb-[16px]">
				<StarRating
					size={40}
					onChange={(value) => handleDataChange('rating', value)}
				/>
			</div>

			<div className="flex flex-col gap-[32px]">
				<MovieItem
					type="set"
					movie={movieInfo}
					director={director}
					genre={genre}
				/>

				<ReviewSection
					title="감상평"
					placeholder="영화를 본 후 어떤 생각이 드셨나요?"
					maxLength={2000}
					value={movieData.review}
					onChange={(value) => handleDataChange('review', value)}
				/>

				<ReviewSection
					title="배우"
					value={movieData.actor}
					onChange={(value) => handleDataChange('actor', value)}
					maxLength={200}
				/>

				<ReviewSection
					title="줄거리"
					value={movieData.story}
					onChange={(value) => handleDataChange('story', value)}
					maxLength={500}
				/>
			</div>
		</>
	);
};
