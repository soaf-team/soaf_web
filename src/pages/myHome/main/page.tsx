import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { BackButton, CheckButton, PageLayout, XButton } from '@/components';
import {
	useInteriorItems,
	useWindowDimensions,
	useInteriorPositionMutations,
	PositionPayloadType,
} from '@/hooks';
import { useGetSoafRequestStatus } from '../hooks/useGetSoafRequestStatus';
import { useBottomTabStore } from '@/store';
import {
	HeaderActionButtons,
	InteriorItems,
	Soaf,
	DeskAndChair,
	UpButton,
	BottomActionButtons,
	SoafStatusBadge,
} from './_components';
import { Interior, Position } from '@/types';
import {
	getPercentageToPosition,
	getPositionToPercentage,
} from '../utils/position';
import { ActivityComponentType } from '@stackflow/react';

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

interface MyHomeProps {
	userId: string;
	userName: string;
}

const MyHomeMainPage: ActivityComponentType<MyHomeProps> = ({ params }) => {
	const { userId, userName } = params; // 상대방의 아이디와 닉네임

	// api
	const { interiorItems } = useInteriorItems(userId);
	const { status, lastRequestDate } = useGetSoafRequestStatus(userId); // 소프 요청 status 상태 확인 용

	// mutations
	const { updatePositionMutation } = useInteriorPositionMutations();

	// store
	const { isOpen, handleClose } = useBottomTabStore();
	const { width, height } = useWindowDimensions();

	// state
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
				title: isEdit ? (
					<span className="head6b">방 꾸미기</span>
				) : userId ? (
					<span className="head6b">{userName}</span>
				) : null,
				leftSlot: {
					component: isEdit ? (
						<XButton onClick={handleCancelEdit} />
					) : userId ? (
						<BackButton />
					) : null,
				},
				rightSlot: {
					component: isEdit ? (
						<CheckButton onClick={handleSaveEdit} />
					) : userId ? (
						<SoafStatusBadge
							receiverId={userId}
							status={status}
							date={lastRequestDate?.toDateString()}
						/>
					) : (
						<HeaderActionButtons onBrushClick={handleStartEdit} />
					),
				},
				headerClass: backgroundClass,
			}}
			className="relative"
			containerClassName={backgroundClass}
		>
			<InteriorItems
				userId={userId}
				userName={userName}
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
