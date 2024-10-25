import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer } from '../_components';
import { RegisterMusicForm } from './_components/RegisterMusicForm';
import { overlay } from '@/libs';
import { useUserProfileQuery, useMyMusicListQuery } from '@/hooks';
import { MusicItem } from './_components/MusicItem';
import { MusicItemSkeleton } from './_components/MusicItemSkeleton';
import { useFlow } from '@/stackflow';

const MyMusicPage = () => {
	const { push } = useFlow();
	const { userProfile } = useUserProfileQuery();
	const { myMusicList, isFetching } = useMyMusicListQuery(userProfile?.id);

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterMusicForm />} />);
	};

	const handleClickMusicItem = (musicId: string) => {
		push('MyMusicDetailPage', {
			musicId,
		});
	};

	return (
		<PageLayout
			header={{
				leftSlot: <BackButton />,
				title: <h1 className="head6b">나의 음악</h1>,
				rightSlot: <PlusButton onClick={handleOpenOverlay} />,
			}}
		>
			<div className="flex flex-col pt-[56px]">
				{isFetching ? (
					<>
						{[1, 2, 3, 4, 5].map((index) => (
							<MusicItemSkeleton key={index} type="list" />
						))}
					</>
				) : myMusicList?.data.length === 0 ? (
					<div className="flex flex-col gap-[8px] justify-center items-center body2m text-gray200 absolute_center w-full">
						<p>좋아하는 음악을 추가해</p>
						<p>나만의 취향 목록을 만들어보세요</p>
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
