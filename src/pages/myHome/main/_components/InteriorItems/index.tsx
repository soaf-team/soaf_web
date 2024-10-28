import { useFlow } from '@/stackflow';
import { DraggableData } from 'react-draggable';
import { Interior as InteriorData, InteriorName, Position } from '@/types';
import { Interior } from './Interior';

interface Props {
	userId: string;
	userName?: string;
	isEdit: boolean;
	isDraggable: { [key: string]: boolean };
	setIsDraggable: React.Dispatch<
		React.SetStateAction<{ [key: string]: boolean }>
	>;
	items: InteriorData[];
	initialPositions: {
		[key: string]: Position;
	};
	setItems: React.Dispatch<
		React.SetStateAction<{
			[key: string]: InteriorData;
		}>
	>;
}

export const InteriorItems = ({
	userId,
	userName,
	isEdit,
	isDraggable,
	setIsDraggable,
	items,
	initialPositions,
	setItems,
}: Props) => {
	const { push } = useFlow();

	const handleOnDrag = (name: string, data: DraggableData) => {
		setItems((prevItems) => ({
			...prevItems,
			[name]: {
				...prevItems[name],
				x: data.x,
				y: data.y,
			},
		}));
	};

	const handleDraggable = (name: string) => {
		setIsDraggable((prev) => ({
			...prev,
			[name]: !prev[name],
		}));
	};

	const handleHobbyItemClick = (name: string) => {
		switch (name) {
			case 'books':
				push('MyBookPage', {
					userId,
					userName,
				});
				break;
			case 'movie':
				push('MyMoviePage', {
					userId,
					userName,
				});
				break;
			case 'music':
				push('MyMusicPage', {
					userId,
					userName,
				});
				break;
			case 'youtube':
				push('MyYoutubePage', {
					userId,
					userName,
				});
				break;
			default:
				break;
		}
	};

	const handleItemClick = (name: string, isEdit: boolean) => {
		if (isEdit === true) {
			handleDraggable(name);
			return;
		}

		handleHobbyItemClick(name);
	};

	const handleDelete = (name: string) => {
		setItems((prevItems) => ({
			...prevItems,
			[name]: { ...prevItems[name], visible: false },
		}));
	};

	return (
		<>
			{items
				.filter((item) => item.visible)
				.map((item) => {
					return (
						<Interior
							key={item.name}
							{...item}
							isEdit={isEdit}
							isDraggable={isDraggable}
							position={{ x: item.x, y: item.y }}
							initialPosition={initialPositions[item.name]}
							className={CLASS_NAMES[item.name]}
							onDrag={(data) => handleOnDrag(item.name, data)}
							onItemClick={() => handleItemClick(item.name, isEdit)}
							onDelete={() => handleDelete(item.name)}
						/>
					);
				})}
		</>
	);
};

const CLASS_NAMES: Record<InteriorName, string> = {
	books: 'absolute w-1/3',
	movie: 'absolute w-1/4',
	music: 'absolute w-1/5',
	picture: 'absolute w-1/5',
	plant: 'absolute w-1/6',
	sofa: 'absolute w-1/4',
	windowNight: 'absolute w-1/4',
	windowDay: 'absolute w-1/4',
	youtube: 'absolute w-1/5',
	empty: '',
} as const;
