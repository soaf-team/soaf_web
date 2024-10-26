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
	interiorItems: Interior[],
	dimensions: { width: number; height: number },
): PositionPayloadType => {
	const items = interiorItems.map((item) => ({
		name: item.name,
		x: getPositionToPercentage({ x: item.x, y: item.y }, dimensions).x,
		y: getPositionToPercentage({ x: item.x, y: item.y }, dimensions).y,
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

	// 인테리어 요소들의 데이터 (가변)
	const [items, setItems] = useState<{
		[key: string]: Interior;
	}>({});

	const handleCancelEdit = () => {
		setIsEdit(false);
		setIsDraggable({});
		setItems((prev) => ({
			...prev,
			...Object.keys(initialPositions).reduce(
				(acc, key) => {
					acc[key] = { ...prev[key], ...initialPositions[key] };
					return acc;
				},
				{} as { [key: string]: Interior },
			),
		}));
	};

	const handleStartEdit = () => {
		setIsEdit(true);
		handleClose();
	};

	const handleSaveEdit = () => {
		setIsEdit(false);

		const payload = convertToPositionPayload(Object.values(items), {
			width,
			height,
		});
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

			// 서버에서 받아온 인테리어 아이템을 초기 positions와 items 상태로 설정
			const initialPositionsMap = interiorItems.data.items.reduce(
				(acc, item) => {
					acc[item.name] = getPercentageToPosition(
						{ x: item.x, y: item.y },
						{ width, height },
					);
					return acc;
				},
				{} as { [key: string]: Position },
			);

			const itemsMap = interiorItems.data.items.reduce(
				(acc, item) => {
					acc[item.name] = {
						...item,
						...getPercentageToPosition(
							{ x: item.x, y: item.y },
							{ width, height },
						),
					};
					return acc;
				},
				{} as { [key: string]: Interior },
			);

			setInitialPositions(initialPositionsMap);
			setItems(itemsMap);
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
				isEdit={isEdit}
				isDraggable={isDraggable}
				setIsDraggable={setIsDraggable}
				items={Object.values(items).filter((item) =>
					isAfter6PM ? item.name !== 'windowDay' : item.name !== 'windowNight',
				)}
				setItems={setItems}
				initialPositions={initialPositions}
			/>
			<Soaf className="z-10 w-1/2 absolute_center" />
			<DeskAndChair
				isAfter6PM={isAfter6PM}
				className="absolute bottom-0 left-0 right-0 w-full max-w-window h-[60%] my-0 mx-auto"
			/>
			{!isEdit && !isOpen && <UpButton />}

			{isEdit && <BottomActionButtons items={items} setItems={setItems} />}
		</PageLayout>
	);
};

export default MyHomeMainPage;

MyHomeMainPage.displayName = 'MyHomeMainPage';
