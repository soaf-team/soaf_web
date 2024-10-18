import { StarRating } from '@/components';
import { MyMovie } from '@/types';

interface MyMovieItemProps {
	movie: MyMovie;
	onClick: () => void;
}

export const MyMovieItem = ({ movie, onClick }: MyMovieItemProps) => {
	return (
		<div
			role="button"
			className="relative w-full h-[152px] rounded-2xl shadow-shadow1"
			onClick={onClick}
		>
			<img
				src={movie.content.imageUrl}
				className="object-cover w-full h-full rounded-2xl"
				alt="poster"
			/>

			<div className="absolute bottom-[43px] left-0 w-full bg-black/30 flex items-center justify-center h-6">
				<StarRating
					onChange={() => {}}
					size={16}
					defaultValue={movie.content.rating}
					readonly
				/>
			</div>

			<div className="absolute bottom-[-2px] h-[45px] bg-white flex items-center justify-center w-full rounded-b-2xl">
				<p className="label4">{movie.content.title}</p>
			</div>
		</div>
	);
};
