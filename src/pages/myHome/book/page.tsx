import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer, MyItem } from '../_components';
import { RegisterBookForm } from './_components/RegisterBookForm';
import { overlay } from '@/libs';
import { useUserProfileQuery, useMyBooksQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { cn } from '@/utils';
import { ActivityComponentType } from '@stackflow/react';

interface Props {
	userId: string;
	userName: string;
}

const MyBookPage: ActivityComponentType<Props> = ({ params }) => {
	const { push } = useFlow();

	const { userId, userName } = params;
	const { userProfile } = useUserProfileQuery();
	const { myBookList, isFetching } = useMyBooksQuery(userId || userProfile?.id);

	// TODO: fetching skeleton

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterBookForm />} />);
	};

	const handleClickBookItem = (bookId: string) => {
		push('MyBookDetailPage', {
			bookId,
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
					<h1 className="head6b">{userId ? `${userName}님의` : '나의'} 도서</h1>
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
					myBookList?.data.length === 0 && 'p-0',
				)}
			>
				{myBookList?.data.length === 0 ? (
					<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
						{userId ? (
							<p>아직 등록된 도서 취향이 없어요</p>
						) : (
							<>
								<p>좋아하는 도서를 추가해</p>
								<p>나만의 취향 목록을 만들어보세요</p>
							</>
						)}
					</div>
				) : (
					<div className="flex flex-col gap-[14px] items-center justify-center">
						<p className="text-gray300 label3">
							총 {myBookList?.data.length}개의 도서
						</p>

						<div className="grid w-full grid-cols-3 gap-2">
							{myBookList?.data.map((book) => (
								<MyItem
									key={book._id}
									item={book}
									onClick={() => handleClickBookItem(book._id)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default MyBookPage;

MyBookPage.displayName = 'MyBookPage';
