import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { CheckButton, PageLayout, XButton } from '@/components';
import { useInteriorItems } from '@/hooks';
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

const isAfter6PM = dayjs().hour() >= 18;
const backgroundClass = isAfter6PM ? 'bg-[#BECFDC]' : 'bg-[#D3E6F4]';

const MyHomeMainPage = () => {
	const { interiorItems } = useInteriorItems();
	const { isOpen, handleClose } = useBottomTabStore();

	const [isEdit, setIsEdit] = useState(false);
	const [isDraggable, setIsDraggable] = useState<{ [key: string]: boolean }>(
		{},
	);

	// 인테리어 요소들의 초기 위치 (불변)
	const [initialPositions, setInitialPositions] = useState<{
		[key: string]: { x: number; y: number };
	}>({});

	// 인테리어 요소들의 위치 (가변)
	const [positions, setPositions] = useState<{
		[key: string]: { x: number; y: number };
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
		setIsDraggable({});
	};

	useEffect(() => {
		if (interiorItems.length > 0) {
			// 각 아이템들의 초기 draggable 상태 설정
			setIsDraggable(
				interiorItems.reduce(
					(acc, item) => {
						acc[item.name] = false;
						return acc;
					},
					{} as { [key: string]: boolean },
				),
			);

			// 서버에서 받아온 인테리어 아이템 데이터의 위치를 초기 위치로 설정
			const initialPositions = interiorItems.reduce(
				(acc, item) => {
					acc[item.name] = item.position;
					return acc;
				},
				{} as { [key: string]: { x: number; y: number } },
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
				headerClass: 'bg-transparent',
			}}
			className={cn(['relative', backgroundClass])}
		>
			<InteriorItems
				interiorItems={interiorItems}
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

			{isEdit && <BottomActionButtons interiorItems={interiorItems} />}
		</PageLayout>
	);
};

export default MyHomeMainPage;

MyHomeMainPage.displayName = 'MyHomeMainPage';
