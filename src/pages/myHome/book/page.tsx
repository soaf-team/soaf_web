import { BackButton, PageLayout, PlusButton } from '@/components';
import { MyHomeDrawer } from '../_components';
import { RegisterBookForm } from './_components/RegisterBookForm';
import { overlay } from '@/libs';

const MyBookPage = () => {
	const handleOpenOverlay = async () => {
		await overlay.open(<MyHomeDrawer component={<RegisterBookForm />} />);
	};

	return (
		<PageLayout
			header={{
				leftSlot: <BackButton />,
				title: <h1 className="head6b">나의 도서</h1>,
				rightSlot: <PlusButton onClick={handleOpenOverlay} />,
			}}
		>
			<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
				<p>좋아하는 도서를 추가해</p>
				<p>나만의 취향 목록을 만들어보세요</p>
			</div>
		</PageLayout>
	);
};

export default MyBookPage;

MyBookPage.displayName = 'MyBookPage';
