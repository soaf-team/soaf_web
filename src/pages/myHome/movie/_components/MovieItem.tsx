import { StarRating } from '@/components';
import { Movie, MovieDetail, MyMovie, RatingType } from '@/types';
import { cn } from '@/utils';
import defaultPoster from '@/assets/icons/my-home/movie-default.svg';

interface Props {
	movie: Movie | MovieDetail | MyMovie;
	type: 'search' | 'set' | 'detail';
	onClick?: () => void;
	onRatingChange?: (value: RatingType) => void;
	isEditing?: boolean;
}

export const MovieItem = ({
	type = 'search',
	onClick,
	movie,
	onRatingChange,
	isEditing,
}: Props) => {
	const posterClass = cn({
		'min-w-[92px] w-[92px] h-[134px] rounded-[8px]': type === 'search',
		'w-[85px] h-[124px] rounded-[8px]': type === 'set',
		'w-[96px] h-[140px] rounded-[8px]': type === 'detail',
	});

	const titleClass = cn(
		{
			label2: type === 'search',
			head5b: type === 'set' || type === 'detail',
		},
		'text-black',
	);

	const directorClass = cn(
		{
			label4: type === 'search' || type === 'set',
			label3: type === 'detail',
		},
		'text-gray400',
	);

	const getImageUrl = () => {
		if ('content' in movie) {
			return movie.content.imageUrl || defaultPoster;
		}
		return movie.poster_path
			? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
			: defaultPoster;
	};

	const getTitle = () => {
		if ('content' in movie) {
			return movie.content.title;
		}
		return movie.title;
	};

	const getDirector = () => {
		if ('content' in movie) {
			return movie.content.director;
		}
		if ('credits' in movie) {
			return (
				movie.credits.crew.find((crew) => crew.job === 'Director')?.name || ''
			);
		}
		return '';
	};

	const getReleaseDate = () => {
		if ('content' in movie) {
			return movie.content.releaseDate;
		}
		return movie.release_date;
	};

	const getOverview = () => {
		if ('content' in movie) {
			return movie.content.story;
		}
		return movie.overview;
	};

	const getGenre = () => {
		if ('content' in movie) {
			return movie.content.genre;
		}
		if ('genres' in movie) {
			return movie.genres.map((g) => g.name).join(', ');
		}
		return '';
	};

	const getRating = () => {
		if ('content' in movie) {
			return movie.content.rating;
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
							<p className={directorClass}>{getDirector()}</p>
							<p className="label4 text-gray400">{getReleaseDate()}</p>
						</div>
					</div>
					{type === 'search' && (
						<p className="line-clamp-4 body4">{getOverview()}</p>
					)}
					{type === 'detail' && (
						<StarRating
							size={24}
							onChange={onRatingChange}
							readonly={type === 'detail' && !isEditing}
							defaultValue={getRating()}
						/>
					)}
				</div>
			</div>

			{(type === 'set' || type === 'detail') && (
				<div className="flex justify-between py-[8px]">
					<p className="label2 text-gray500">장르</p>
					<p className="label2 text-gray600">{getGenre()}</p>
				</div>
			)}
		</div>
	);
};
