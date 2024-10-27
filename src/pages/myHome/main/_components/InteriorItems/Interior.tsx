import remove from '@/assets/icons/my-home/delete.svg';
import drag from '@/assets/icons/my-home/move.svg';

import Draggable, { DraggableData } from 'react-draggable';
import { cn } from '@/utils';
import { InteriorType, Position } from '@/types';
import {
	BooksIcon,
	MovieIcon,
	MusicIcon,
	PictureIcon,
	PlantIcon,
	SofaIcon,
	WindowDayIcon,
	WindowNightIcon,
	YoutubeIcon,
	BooksOtherIcon,
	MovieOtherIcon,
	MusicOtherIcon,
	YoutubeOtherIcon,
} from '@/assets';

interface InteriorProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag'> {
	userId: string;
	name: string;
	type: InteriorType;
	isEdit: boolean;
	isDraggable: { [key: string]: boolean };
	position: Position;
	initialPosition?: Position;
	onDrag: (data: DraggableData) => void;
	onItemClick: () => void;
	onDelete: () => void;
}

const images: { [key: string]: string } = {
	books: BooksIcon,
	movie: MovieIcon,
	music: MusicIcon,
	picture: PictureIcon,
	plant: PlantIcon,
	sofa: SofaIcon,
	windowDay: WindowDayIcon,
	windowNight: WindowNightIcon,
	youtube: YoutubeIcon,
};

const otherUserImages: { [key: string]: string } = {
	books: BooksOtherIcon,
	movie: MovieOtherIcon,
	music: MusicOtherIcon,
	picture: PictureIcon,
	plant: PlantIcon,
	sofa: SofaIcon,
	windowDay: WindowDayIcon,
	windowNight: WindowNightIcon,
	youtube: YoutubeOtherIcon,
};

export const Interior = (props: InteriorProps) => {
	const {
		userId,
		name,
		isEdit,
		isDraggable,
		className,
		position,
		initialPosition,
		onDrag,
		onItemClick,
		onDelete,
		type,
		...rest
	} = props;

	const imageSrc = userId
		? otherUserImages[name as keyof typeof otherUserImages]
		: images[name as keyof typeof images];

	const content = (
		<div
			{...rest}
			className={cn(
				'relative z-50',
				isEdit &&
					isDraggable[name] === true &&
					'border-solid border-2 border-gray300',
				className,
			)}
			onClick={onItemClick}
		>
			<img src={imageSrc} alt={name} className="full_img_contain" />
			{isEdit && isDraggable[name] === true && type === 'hobby' && (
				<button
					onClick={onDelete}
					className="absolute -top-3 -right-3 flex space-x-1 w-[24px] h-[24px] z-20"
				>
					<img src={remove} alt="remove" className="full_img_cover" />
				</button>
			)}
			{isEdit && isDraggable[name] === true && (
				<button className="handle absolute -bottom-3 -right-3 flex space-x-1 w-[24px] h-[24px] z-20">
					<img src={drag} alt="drag" className="full_img_cover" />
				</button>
			)}
		</div>
	);

	return isDraggable ? (
		<Draggable
			defaultPosition={initialPosition}
			position={position}
			handle=".handle"
			bounds="body"
			disabled={!isEdit && !isDraggable}
			onStop={(_, data) => onDrag(data)}
		>
			{content}
		</Draggable>
	) : (
		content
	);
};
