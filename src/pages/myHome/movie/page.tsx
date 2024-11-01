import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer, MyItem } from '../_components';
import { RegisterMovieForm } from './_components/RegisterMovieForm';
import { overlay } from '@/libs';
import { useFlow } from '@/stackflow';
import { useMyMoviesQuery, useUserProfileQuery } from '@/hooks';
import { cn } from '@/utils';
import { ActivityComponentType } from '@stackflow/react';

interface Props {
	userId: string;
	userName: string;
}

const MyMoviePage: ActivityComponentType<Props> = ({ params }) => {
	const { push } = useFlow();

	const { userId, userName } = params;
	const { userProfile } = useUserProfileQuery();
	const { myMovieList, isFetching } = useMyMoviesQuery(
		userId || userProfile?.id,
	);

	// TODO: fetching skeleton

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterMovieForm />} />);
	};

	const handleClickMovieItem = (movieId: string) => {
		push('MyMovieDetailPage', {
			movieId,
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
					<h1 className="head6b">{userId ? `${userName}님의` : '나의'} 영화</h1>
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
					myMovieList?.data.length === 0 && 'p-0',
				)}
			>
				{myMovieList?.data.length === 0 ? (
					<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
						{userId ? (
							<p>아직 등록된 영화 취향이 없어요</p>
						) : (
							<>
								<p>좋아하는 영화를 추가해</p>
								<p>나만의 취향 목록을 만들어보세요</p>
							</>
						)}
					</div>
				) : (
					<div className="flex flex-col gap-[14px] items-center justify-center">
						<p className="text-gray300 label3">
							총 {myMovieList?.data.length}개의 영화
						</p>

						<div className="grid w-full grid-cols-3 gap-2">
							{myMovieList?.data
								.sort(
									(a, b) =>
										new Date(b.createdAt).getTime() -
										new Date(a.createdAt).getTime(),
								)
								.map((movie) => (
									<MyItem
										key={movie._id}
										item={movie}
										onClick={() => handleClickMovieItem(movie._id)}
									/>
								))}
						</div>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default MyMoviePage;

MyMoviePage.displayName = 'MyMoviePage';
