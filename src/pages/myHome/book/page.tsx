import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer, MyItem } from '../_components';
import { RegisterBookForm } from './_components/RegisterBookForm';
import { overlay } from '@/libs';
import { useUserProfileQuery, useMyBooksQuery } from '@/hooks';
import { useFlow } from '@/stackflow';
import { cn } from '@/utils';

const MyBookPage = () => {
	const { push } = useFlow();
	const { userProfile } = useUserProfileQuery();
	const { myBookList, isFetching } = useMyBooksQuery(userProfile?.id);

	// TODO: fetching skeleton

	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterBookForm />} />);
	};

	const handleClickBookItem = (bookId: string) => {
		push('MyBookDetailPage', {
			bookId,
		});
	};

	return (
		<PageLayout
			header={{
				leftSlot: <BackButton />,
				title: <h1 className="head6b">나의 도서</h1>,
				rightSlot: <PlusButton onClick={handleOpenOverlay} />,
			}}
		>
			<div
				className={cn(
					'flex flex-col pt-[56px] h-full',
					myBookList?.data.length === 0 && 'p-0',
				)}
			>
				{myBookList?.data.length === 0 ? (
					<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
						<p>좋아하는 도서를 추가해</p>
						<p>나만의 취향 목록을 만들어보세요</p>
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
