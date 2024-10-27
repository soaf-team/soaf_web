import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer } from '../_components';
import { RegisterMusicForm } from './_components/RegisterMusicForm';
import { overlay } from '@/libs';
import { useUserProfileQuery, useMyMusicListQuery } from '@/hooks';
import { MusicItem } from './_components/MusicItem';
import { MusicItemSkeleton } from './_components/MusicItemSkeleton';
import { useFlow } from '@/stackflow';
import { ActivityComponentType } from '@stackflow/react';

interface Props {
	userId: string;
	userName: string;
}

const MyMusicPage: ActivityComponentType<Props> = ({ params }) => {
	const { push } = useFlow();

	const { userId, userName } = params;
	const { userProfile } = useUserProfileQuery();
	const { myMusicList, isFetching } = useMyMusicListQuery(
		userId || userProfile?.id,
	);

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterMusicForm />} />);
	};

	const handleClickMusicItem = (musicId: string) => {
		push('MyMusicDetailPage', {
			musicId,
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
					<h1 className="head6b">{userId ? `${userName}님의` : '나의'} 음악</h1>
				),
				rightSlot: {
					component: <PlusButton onClick={handleOpenOverlay} />,
				},
			}}
		>
			<div className="flex flex-col">
				{isFetching ? (
					<>
						{[1, 2, 3, 4, 5].map((index) => (
							<MusicItemSkeleton key={index} type="list" />
						))}
					</>
				) : myMusicList?.data.length === 0 ? (
					<div className="flex flex-col gap-[8px] justify-center items-center body2m text-gray200 absolute_center w-full">
						{userId ? (
							<p>아직 등록된 음악 취향이 없어요</p>
						) : (
							<>
								<p>좋아하는 음악을 추가해</p>
								<p>나만의 취향 목록을 만들어보세요</p>
							</>
						)}
					</div>
				) : (
					<div className="flex flex-col gap-[14px] items-center justify-center">
						<p className="text-gray300 label3">
							총 {myMusicList?.data.length}곡의 음악
						</p>

						{myMusicList?.data.map((music) => (
							<MusicItem
								key={music._id}
								type="list"
								music={music}
								onClick={() => handleClickMusicItem(music._id)}
							/>
						))}
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default MyMusicPage;

MyMusicPage.displayName = 'MyMusicPage';
