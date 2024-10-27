import { BackButton, Header } from '@/components';
import { YoutubeItemProps, YoutubeItem } from './YoutubeItem';
import { ReviewSection } from '../../_components';
import { useUserProfileQuery } from '@/hooks';
import { useMyHomeMutations } from '@/hooks/mutations';
import { overlay } from '@/libs';
import { useState } from 'react';
import { MyYoutube } from '@/types';

interface Props {
	onPrevStep: () => void;
	youtubeInfo: YoutubeItemProps & { url: string };
}

export const SetYoutubeInfo = ({ onPrevStep, youtubeInfo }: Props) => {
	const { userProfile } = useUserProfileQuery();
	const { createMyHomeMutation } = useMyHomeMutations('youtube');

	const [review, setReview] = useState('');

	const handleReviewChange = (value: string) => {
		setReview(value);
	};

	const handleSubmit = () => {
		createMyHomeMutation.mutate({
			category: 'youtube',
			review,
			content: {
				title: youtubeInfo.title,
				channelName: youtubeInfo.channelTitle,
				publishedAt: youtubeInfo.publishedAt,
				thumbnailUrl: youtubeInfo.thumbnail,
				url: youtubeInfo.url,
			},
			userId: userProfile?.id,
		});

		setReview('');
		overlay.close();
	};

	return (
		<>
			<Header
				className="rounded-t-[28px]"
				leftSlot={{
					component: <BackButton onClick={onPrevStep} />,
					className: 'left-0',
				}}
				rightSlot={{
					component: (
						<button type="submit" className="label2" onClick={handleSubmit}>
							저장
						</button>
					),
					className: 'right-0',
				}}
			>
				<h1 className="head6b">새로운 리뷰</h1>
			</Header>

			<div className="flex flex-col gap-[32px]">
				<YoutubeItem type="search" youtube={youtubeInfo} />

				<ReviewSection
					title="감상평"
					placeholder="영상을 본 후 어떤 생각이 드셨나요?"
					maxLength={2000}
					value={review}
					onChange={handleReviewChange}
				/>
			</div>
		</>
	);
};
