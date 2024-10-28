import { BackButton, PageLayout } from '@/components';
import { TMDB, YoutubeDev, KakaoDevIcon, LastFM } from '@/assets';

const UsedApisPage = () => {
	return (
		<PageLayout
			header={{
				title: <h2 className="head6b">사용 API 목록</h2>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<div className="flex flex-col items-center gap-8 mt-8">
				<img src={TMDB} alt="TMDB" />
				<img src={KakaoDevIcon} alt="KakaoDevIcon" />
				<img src={YoutubeDev} alt="YoutubeDev" />
				<img src={LastFM} alt="LastFM" />
			</div>
		</PageLayout>
	);
};

export default UsedApisPage;
UsedApisPage.displayName = 'UsedApisPage';
