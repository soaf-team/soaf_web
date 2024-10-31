import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer } from '../_components';
import { RegisterYoutubeForm } from './_components/RegisterYoutubeForm';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { useMyYoutubesQuery, useUserProfileQuery } from '@/hooks';
import { cn } from '@/utils';
import { YoutubeItem } from './_components/YoutubeItem';
import { ActivityComponentType } from '@stackflow/react';

interface Props {
	userId: string;
	userName: string;
}

const MyYoutubePage: ActivityComponentType<Props> = ({ params }) => {
	const { push } = useFlow();
	const { userId, userName } = params;
	const { userProfile } = useUserProfileQuery();
	const { myYoutubeList, isFetching } = useMyYoutubesQuery(
		userId || userProfile?.id,
	);

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterYoutubeForm />} />);
	};

	const handleClickYoutubeItem = (youtubeId: string) => {
		push('MyYoutubeDetailPage', {
			youtubeId,
			userId,
			userName,
		});
	};

	return (
		<PageLayout
			header={{
				leftSlot: {
					component: <BackButton />,
				},
				title: (
					<h1 className="head6b">
						{userId ? `${userName}님의` : '나의'} 유튜브
					</h1>
				),
				rightSlot: {
					component: !userId ? (
						<PlusButton onClick={handleOpenOverlay} />
					) : null,
				},
			}}
		>
			<div
				className={cn(
					'flex flex-col h-full',
					myYoutubeList?.data.length === 0 && 'p-0',
				)}
			>
				{myYoutubeList?.data.length === 0 ? (
					<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
						{userId ? (
							<p>아직 등록된 유튜브 취향이 없어요</p>
						) : (
							<>
								<p>좋아하는 유튜브 링크를 추가해</p>
								<p>나만의 취향 목록을 만들어보세요</p>
							</>
						)}
					</div>
				) : (
					<div className="flex flex-col gap-[14px] items-center justify-center">
						<p className="text-gray300 label3">
							총 {myYoutubeList?.data.length}개의 영상
						</p>

						{myYoutubeList?.data
							.sort(
								(a, b) =>
									new Date(b.createdAt).getTime() -
									new Date(a.createdAt).getTime(),
							)
							.map((youtube) => (
								<YoutubeItem
									key={youtube._id}
									type="list"
									youtube={youtube}
									onClick={() => handleClickYoutubeItem(youtube._id)}
								/>
							))}
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default MyYoutubePage;

MyYoutubePage.displayName = 'MyYoutubePage';
