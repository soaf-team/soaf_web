import { StarRating } from '@/components';
import { Movie, MovieDetail } from '@/types';
import { cn } from '@/utils';
import { useMemo } from 'react';

interface Props {
	type?: 'search' | 'set' | 'detail';
	onClick?: () => void;
	movie: Movie | MovieDetail;
}

export const MovieItem = ({ type = 'search', onClick, movie }: Props) => {
	const isMovieDetail = (movie: Movie | MovieDetail): movie is MovieDetail => {
		return (movie as MovieDetail).genres !== undefined;
	};

	const director = useMemo((): string => {
		if (!isMovieDetail(movie)) return '';

		return movie.credits.crew.filter(
			(crew) => crew.department === 'Directing',
		)[0].name;
	}, [movie]);

	const genre = useMemo((): string => {
		if (!isMovieDetail(movie)) return '';

		return movie.genres.reduce((acc, cur, idx) => {
			return idx === movie.genres.length - 1
				? `${acc}${cur.name}`
				: `${acc}${cur.name}, `;
		}, '');
	}, [movie]);

	const posterClass = cn({
		'min-w-[92px] w-[92px] h-[134px] rounded-[8px]': type === 'search',
		'w-[85px] h-[124px] rounded-[8px]': type === 'set',
		'w-[96px] h-[140px] rounded-[8px]': type === 'detail',
	});

	const titleClass = cn(
		{
			label2: type === 'search',
			head5b: type === 'set' || 'detail',
		},
		'text-black',
	);

	return (
		<div className="flex flex-col gap-[16px] border-b border-solid border-border py-[8px]">
			<div className="flex gap-[16px]" onClick={onClick}>
				<div className={posterClass}>
					<img
						src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
						alt="cover"
						className={posterClass}
					/>
				</div>

				<div
					className={cn(
						'flex flex-col gap-[8px]py-[8px]',
						type === 'search' ? 'justify-between' : '',
					)}
				>
					<div className="flex flex-col gap-[8px]">
						<p className={cn('line-clamp-1', titleClass)}>{movie.title}</p>
						<div className="flex flex-col gap-[4px]">
							{isMovieDetail(movie) && (
								<p className="label3 text-gray400">{director}</p>
							)}
							<p className="label4 text-gray400">{movie.release_date}</p>
						</div>
					</div>
					{type === 'search' && (
						<p className="line-clamp-4 body4">{movie.overview}</p>
					)}
					{type === 'detail' && <StarRating size={24} onChange={() => {}} />}
				</div>
			</div>

			{isMovieDetail(movie) && (
				<div className="flex justify-between py-[8px]">
					<p className="label2 text-gray500">장르</p>
					<p className="label2 text-gray600">{genre}</p>
				</div>
			)}
		</div>
	);
};
