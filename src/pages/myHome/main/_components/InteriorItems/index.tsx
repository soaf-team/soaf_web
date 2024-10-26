import { useFlow } from '@/stackflow';
import { DraggableData } from 'react-draggable';
import { Interior as InteriorData, InteriorName, Position } from '@/types';
import { Interior } from './Interior';

interface Props {
	interiorItems: InteriorData[];
	isEdit: boolean;
	isAfter6PM: boolean;
	isDraggable: { [key: string]: boolean };
	setIsDraggable: React.Dispatch<
		React.SetStateAction<{ [key: string]: boolean }>
	>;
	positions: {
		[key: string]: Position;
	};
	initialPositions: {
		[key: string]: Position;
	};
	setPositions: React.Dispatch<
		React.SetStateAction<{
			[key: string]: Position;
		}>
	>;
}

export const InteriorItems = ({
	interiorItems,
	isEdit,
	isAfter6PM,
	isDraggable,
	setIsDraggable,
	positions,
	initialPositions,
	setPositions,
}: Props) => {
	const { push } = useFlow();

	const handleOnDrag = (name: string, data: DraggableData) => {
		setPositions((prevPositions) => ({
			...prevPositions,
			[name]: { x: data.x, y: data.y },
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
				push('MyBookPage', {});
				break;
			case 'movie':
				push('MyMoviePage', {});
				break;
			case 'music':
				push('MyMusicPage', {});
				break;
			case 'youtube':
				push('MyYoutubePage', {});
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

	return (
		<>
			{interiorItems.map((item) => {
				return (
					<Interior
						key={item.name}
						type={item.type}
						name={item.name}
						isEdit={isEdit}
						isDraggable={isDraggable}
						position={positions[item.name]}
						initialPosition={initialPositions[item.name]}
						className={CLASS_NAMES[item.name]}
						handleDrag={(data) => handleOnDrag(item.name, data)}
						onItemClick={() => handleItemClick(item.name, isEdit)}
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
	youtube: 'absolute w-[15%]',
	empty: '',
} as const;
