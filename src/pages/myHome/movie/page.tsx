import { BackButton, PageLayout } from '@/components';
import { MyHomeDrawer } from '../_components';
import { RegisterMovieForm } from './_components/RegisterMovieForm';

const MyMoviePage = () => {
	return (
		<PageLayout
			header={{
				leftSlot: <BackButton />,
				title: <h1 className="head6b">나의 영화</h1>,
				rightSlot: <MyHomeDrawer component={<RegisterMovieForm />} />,
			}}
		>
			<div className="flex flex-col gap-[8px] justify-center items-center h-full body2m text-gray200">
				<p>좋아하는 영화를 추가해</p>
				<p>나만의 취향 목록을 만들어보세요</p>
			</div>
		</PageLayout>
	);
};

export default MyMoviePage;

MyMoviePage.displayName = 'MyMoviePage';
