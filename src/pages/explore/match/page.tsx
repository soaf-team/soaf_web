import { useEffect, useState } from 'react';
import { IconBack } from '@stackflow/plugin-basic-ui';
import { useFlow } from '@/stackflow';
import { Button, LoadingSpinner, PageLayout } from '@/components';
import { MatchedUserItem } from '../_components';
import { DialogOverlay } from '@/components/overlay';
import { MatchingUser } from '@/types';
import { useSimilarUserQuery } from '@/hooks/queries';
import { overlay, OverlayProps } from '@/libs';
import { XIcon } from '@/assets';

const MatchedUserPage = ({
	params,
}: {
	params: {
		diaryId: string;
	};
}) => {
	const { diaryId } = params;
	const { replace } = useFlow();
	const { similarUser } = useSimilarUserQuery(diaryId);

	const [isLoading, setIsLoading] = useState(false);
	const [selectedUser, setSelectedUser] = useState<string | null>(null);

	const handleSelect = (id: string) => {
		setSelectedUser((prev) => (prev === id ? null : id));
	};

	// TODO: 매칭 경험을 위해 setTimeout추가 이후 제거 필요
	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 4000);
	}, []);

	return (
		<PageLayout
			header={{
				leftSlot: {
					component: <LeftIcon />,
				},
				rightSlot: {
					component: <RightIcon />,
				},
			}}
			className="overflow-y-auto"
		>
			{isLoading ? (
				<div className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black/80 z-[100]">
					<LoadingSpinner />
				</div>
			) : (
				<>
					<div className="flex flex-col justify-center items-center gap-[8px]">
						<p className="head4b">매칭된 유저 목록</p>

						<div className="flex flex-col body3 mb-[12px]">
							<p>원하는 유저를 선택하여</p>
							<p>취향을 탐색하고 소프를 맺어 소통해보세요!</p>
						</div>

						<div className="flex flex-col justify-center items-center gap-[12px] w-[95%] mb-[150px]">
							{similarUser
								.sort((a: MatchingUser, b: MatchingUser) =>
									a.score > b.score ? -1 : a.score < b.score ? 1 : 0,
								)
								.slice(0, 7)
								.map((user: MatchingUser, index: number) => (
									<MatchedUserItem
										key={user.userId}
										name={user.userName}
										percent={user.score}
										onClick={() => handleSelect(user.userId)}
										isSelected={selectedUser === user.userId}
										className={
											index === similarUser.length - 1 ? 'mb-[120px]' : ''
										}
									/>
								))}
						</div>
					</div>
					<div className="fixed_bottom_button">
						<Button
							disabled={selectedUser === null}
							onClick={() =>
								replace('MyHomeMainPage', {
									userId: selectedUser,
								})
							}
						>
							방문하기
						</Button>
					</div>
				</>
			)}
		</PageLayout>
	);
};

export default MatchedUserPage;

MatchedUserPage.displayName = 'MatchedUserPage';

const LeftIcon = () => {
	const { pop } = useFlow();

	const handleClickLeftButton = async () => {
		await overlay.open(<BackDialogOverlay overlayKey="backOverlay" />);
		pop();
	};

	return (
		<button onClick={handleClickLeftButton}>
			<IconBack />
		</button>
	);
};

const RightIcon = () => {
	const { replace } = useFlow();

	const handleClickRightButton = async () => {
		await overlay.open(<CloseDialogOverlay overlayKey="end" />);
		replace('DiaryCalendarPage', {});
	};

	return (
		<button onClick={handleClickRightButton}>
			<img src={XIcon} alt="x" className="w-[12px] h-[12px]" />
		</button>
	);
};

const BackDialogOverlay = ({ resolve, reject }: OverlayProps) => {
	return (
		<DialogOverlay
			title="정말 이전으로 돌아갈까요?"
			leftButton={{
				text: '아니요',
				onClick: () => reject?.('close'),
				leftButtonClassName: 'h-[48px]',
			}}
			rightButton={{
				text: '네, 뒤로갈래요',
				onClick: () => resolve?.('back'),
				rightButtonClassName: 'h-[48px]',
			}}
			onClose={() => reject?.('close')}
		>
			<p className="text-[14px]">
				이전으로 돌아가면 매칭된 유저목록이 사라져요
			</p>
		</DialogOverlay>
	);
};

const CloseDialogOverlay = ({ resolve, reject }: OverlayProps) => {
	return (
		<DialogOverlay
			title="정말 종료할까요?"
			leftButton={{
				text: '아니요',
				onClick: () => reject?.('close'),
				leftButtonClassName: 'h-[48px]',
			}}
			rightButton={{
				text: '네, 종료할래요',
				onClick: () => resolve?.('end'),
				rightButtonClassName: 'h-[48px]',
			}}
			onClose={() => reject?.('close')}
		>
			<p className="text-[14px]">창을 닫으면 매칭된 유저 목록이 사라져요</p>
		</DialogOverlay>
	);
};
