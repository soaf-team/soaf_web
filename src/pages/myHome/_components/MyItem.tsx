import { StarRating } from '@/components';
import { RatingType } from '@/types';

interface MyItemProps<T> {
	item: T & {
		content: {
			imageUrl: string;
			title: string;
			rating: RatingType;
		};
	};
	onClick: () => void;
}

export const MyItem = <T,>({ item, onClick }: MyItemProps<T>) => {
	return (
		<div
			role="button"
			className="relative w-full h-[152px] rounded-2xl shadow-shadow1"
			onClick={onClick}
		>
			<img
				src={item.content.imageUrl}
				className="object-cover w-full h-full rounded-2xl"
				alt="poster"
			/>

			<div className="absolute bottom-[43px] left-0 w-full bg-black/30 flex items-center justify-center h-6">
				<StarRating
					onChange={() => {}}
					size={16}
					defaultValue={item.content.rating}
					readonly
				/>
			</div>

			<div className="absolute bottom-[-2px] h-[45px] bg-white flex items-center justify-center w-full rounded-b-2xl px-1">
				<p className="text-center label4 line-clamp-1">{item.content.title}</p>
			</div>
		</div>
	);
};
