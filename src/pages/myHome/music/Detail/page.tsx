import { useState } from 'react';
import { useMyMusicDetailQuery } from '@/hooks';
import { ActivityComponentType } from '@stackflow/react';
import { BackButton, DotVerticalButton, PageLayout } from '@/components';
import { MusicItem } from '../_components/MusicItem';

interface MyMusicDetailPageProps {
	musicId: number;
}

const MyMusicDetailPage: ActivityComponentType<MyMusicDetailPageProps> = ({
	params,
}) => {
	const { musicId } = params;
	const { myMusicDetail, isFetching } = useMyMusicDetailQuery(musicId);

	const [isEditing, setIsEditing] = useState(false);

	if (!myMusicDetail) return null;

	return (
		<PageLayout
			header={{
				leftSlot: <BackButton />,
				title: <h1 className="head6b">나의 음악</h1>,
				rightSlot: isEditing ? <button>저장</button> : <DotVerticalButton />,
			}}
		>
			<div className="pt-[56px]">
				<div className="flex flex-col gap-[16px]">
					<MusicItem type="detail" music={myMusicDetail.data} />

					<div className="flex flex-col gap-[16px]">
						<p className="head6sb">감상평</p>
						<p className="body2">{myMusicDetail.data.review}</p>
						<div className="w-full h-px bg-border" />
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default MyMusicDetailPage;

MyMusicDetailPage.displayName = 'MyMusicDetailPage';
