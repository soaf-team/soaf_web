import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { CheckButton, PageLayout, XButton } from '@/components';
import {
	useInteriorItems,
	useWindowDimensions,
	useInteriorPositionMutations,
	PositionPayloadType,
} from '@/hooks';
import { useBottomTabStore } from '@/store';
import { cn } from '@/utils';
import {
	HeaderActionButtons,
	InteriorItems,
	Soaf,
	DeskAndChair,
	UpButton,
	BottomActionButtons,
} from './_components';
import { Interior, Position } from '@/types';
import {
	getPercentageToPosition,
	getPositionToPercentage,
} from '../utils/position';

const isAfter6PM = dayjs().hour() >= 18;
const backgroundClass = isAfter6PM ? 'bg-[#BECFDC]' : 'bg-[#D3E6F4]';

// 위치 데이터를 백엔드에 전달할 형식으로 변환
const convertToPositionPayload = (
	positions: { [key: string]: Position },
	interiorItems: Interior[],
	dimensions: { width: number; height: number },
): PositionPayloadType => {
	const items = interiorItems.map((item) => ({
		name: item.name,
		x: getPositionToPercentage(positions[item.name], dimensions).x,
		y: getPositionToPercentage(positions[item.name], dimensions).y,
		visible: item.visible,
	}));

	return {
		items,
	};
};

const MyHomeMainPage = () => {
	const { interiorItems } = useInteriorItems();
	const { updatePositionMutation } = useInteriorPositionMutations();
	const { isOpen, handleClose } = useBottomTabStore();
	const { width, height } = useWindowDimensions();

	const [isEdit, setIsEdit] = useState(false);
	const [isDraggable, setIsDraggable] = useState<{ [key: string]: boolean }>(
		{},
	);

	// 인테리어 요소들의 초기 위치 (불변)
	const [initialPositions, setInitialPositions] = useState<{
		[key: string]: Position;
	}>({});

	// 인테리어 요소들의 위치 (가변)
	const [positions, setPositions] = useState<{
		[key: string]: Position;
	}>({});

	const handleCancelEdit = () => {
		setIsEdit(false);
		setIsDraggable({});
		setPositions(initialPositions);
	};

	const handleStartEdit = () => {
		setIsEdit(true);
		handleClose();
	};

	const handleSaveEdit = () => {
		setIsEdit(false);

		const payload = convertToPositionPayload(
			positions,
			interiorItems.data.items,
			{
				width,
				height,
			},
		);
		updatePositionMutation.mutate({
			payload,
		});

		setIsDraggable({});
	};

	useEffect(() => {
		if (interiorItems.data.items.length > 0) {
			// 각 아이템들의 초기 draggable 상태 설정
			setIsDraggable(
				interiorItems.data.items.reduce(
					(acc, item) => {
						acc[item.name] = false;
						return acc;
					},
					{} as { [key: string]: boolean },
				),
			);

			// 서버에서 받아온 인테리어 아이템 데이터의 위치를 초기 위치로 설정
			const initialPositions = interiorItems.data.items.reduce(
				(acc, item) => {
					acc[item.name] = getPercentageToPosition(
						{ x: item.x, y: item.y },
						{
							width,
							height,
						},
					);
					return acc;
				},
				{} as { [key: string]: Position },
			);

			setInitialPositions(initialPositions);
			setPositions(initialPositions);
		}
	}, [interiorItems]);

	return (
		<PageLayout
			header={{
				title: isEdit ? <span className="head6b">방 꾸미기</span> : null,
				leftSlot: isEdit ? <XButton onClick={handleCancelEdit} /> : null,
				rightSlot: isEdit ? (
					<CheckButton onClick={handleSaveEdit} />
				) : (
					<HeaderActionButtons onBrushClick={handleStartEdit} />
				),
				headerClass: backgroundClass,
			}}
			className="relative"
			containerClassName={backgroundClass}
		>
			<InteriorItems
				interiorItems={interiorItems.data.items}
				isEdit={isEdit}
				isAfter6PM={isAfter6PM}
				isDraggable={isDraggable}
				setIsDraggable={setIsDraggable}
				positions={positions}
				initialPositions={initialPositions}
				setPositions={setPositions}
			/>
			<Soaf className="z-10 w-1/2 absolute_center" />
			<DeskAndChair
				isAfter6PM={isAfter6PM}
				className="absolute bottom-0 left-0 right-0 w-full max-w-window h-[60%] my-0 mx-auto"
			/>
			{!isEdit && !isOpen && <UpButton />}

			{isEdit && (
				<BottomActionButtons interiorItems={interiorItems.data.items} />
			)}
		</PageLayout>
	);
};

export default MyHomeMainPage;

MyHomeMainPage.displayName = 'MyHomeMainPage';
