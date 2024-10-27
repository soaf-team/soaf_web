import { useMusicDetailQuery, useUserProfileQuery } from '@/hooks';
import { MusicItem } from './MusicItem';
import { BackButton, Header } from '@/components';
import { ReviewSection } from '../../_components/ReviewSection';
import { useState } from 'react';
import { useMyHomeMutations } from '@/hooks/mutations';
import { overlay } from '@/libs';

interface Props {
	onPrevStep: () => void;
	music: Record<string, string>;
}

export const SetMusicInfo = ({ onPrevStep, music }: Props) => {
	const { musicInfo } = useMusicDetailQuery({
		name: music.name,
		artist: music.artist,
	});

	const [review, setReview] = useState('');
	const { userProfile } = useUserProfileQuery();
	const { createMyHomeMutation } = useMyHomeMutations('music');

	const handleReviewChange = (value: string) => {
		setReview(value);
	};

	const handleSubmit = () => {
		createMyHomeMutation.mutate({
			category: 'music',
			review,
			content: {
				imageUrl: music.imageUrl,
				title: music.name,
				artist: music.artist,
			},
			userId: userProfile?.id || '',
		});
		setReview('');
		overlay.close();
	};

	if (!musicInfo) return null;

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
				<h1 className="head6sb">나의 음악</h1>
			</Header>

			<div className="flex flex-col gap-[32px]">
				<MusicItem type="detail" music={musicInfo} />

				<ReviewSection
					title="감상평"
					placeholder="음악 감상 후 어떤 생각이 드셨나요?"
					className="h-[20px]"
					value={review}
					onChange={handleReviewChange}
				/>
			</div>
		</>
	);
};
