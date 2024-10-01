import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer } from '../_components';
import { RegisterMusicForm } from './_components/RegisterMusicForm';
import { overlay } from '@/libs';
import { useUserProfileQuery, useMyMusicListQuery } from '@/hooks';
import { MusicItem } from './_components/MusicItem';
import { MusicItemSkeleton } from './_components/MusicItemSkeleton';

const MyMusicPage = () => {
	const { userProfile } = useUserProfileQuery();
	const { myMusicList, isFetching, MOCK_MY_MUSIC_LIST } = useMyMusicListQuery(
		userProfile?.id,
	);

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterMusicForm />} />);
	};

	// myMusicList?.data.length === 0 ? (
	// 	<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
	// 		<p>좋아하는 음악을 추가해</p>
	// 		<p>나만의 취향 목록을 만들어보세요</p>
	// 	</div>
	// ) :

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
				) : (
					MOCK_MY_MUSIC_LIST.map((music) => (
						<MusicItem key={music.id} type="list" music={music} />
					))
				)}
			</div>
		</PageLayout>
	);
};

export default MyMusicPage;

MyMusicPage.displayName = 'MyMusicPage';
