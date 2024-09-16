import { useDebounce } from '@/hooks';
import { useFlow } from '@/stackflow';
import { DraggableData } from 'react-draggable';
import { Interior as InteriorData, InteriorName } from '@/types';
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
		[key: string]: { x: number; y: number };
	};
	initialPositions: {
		[key: string]: { x: number; y: number };
	};
	setPositions: React.Dispatch<
		React.SetStateAction<{
			[key: string]: { x: number; y: number };
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

	const { debounced: handleOnDrag } = useDebounce(
		(name: string, data: DraggableData) => {
			setPositions((prevPositions) => ({
				...prevPositions,
				[name]: { x: data.x, y: data.y },
			}));
		},
		100,
	);

	const handleDraggable = (name: string) => {
		setIsDraggable((prev) => ({
			...prev,
			[name]: !prev[name],
		}));
	};

  const handleHobbyItemClick = (name: string) => {
    switch (name) {
      case "books":
        push("MyBookPage", {});
        break;
      case "movie":
        push("MyMoviePage", {});
        break;
      case "music":
        push("MyMusicPage", {});
        break;
      case "youtube":
        push("MyYoutubePage", {});
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
						key={item.id}
						name={
							item.name.includes('window')
								? isAfter6PM
									? 'windowNight'
									: 'windowDay'
								: (item.name as InteriorName)
						}
						src={item.src}
						type={item.type}
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
	books: 'absolute w-1/4 top-16',
	movie: 'absolute w-1/4 top-1/3',
	music: 'absolute w-1/5 top-[18%] left-[10%]',
	picture: 'absolute w-1/5 left-[45%] top-[5%]',
	plant: 'absolute top-[35%] right-1/4 w-1/6',
	sofa: 'absolute right-[5%] top-1/3',
	windowNight: 'absolute w-1/4 top-14 right-4',
	windowDay: 'absolute w-1/4 top-14 right-4',
	youtube: 'absolute w-[15%] left-1/2 top-1/4',
} as const;
