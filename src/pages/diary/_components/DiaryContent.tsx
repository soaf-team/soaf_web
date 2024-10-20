import { Fragment } from 'react';

import { DiaryType } from '@/types';
import { EmotionSticker } from '@/components/emotion';
import { Image } from '@/components/ui';

type DiaryContentProps = {
	diary: DiaryType;
	isImageClickable?: boolean;
};

export const DiaryContent = ({
	diary,
	isImageClickable,
}: DiaryContentProps) => {
	const monthDay = new Date(diary.date).toLocaleDateString('ko-KR', {
		month: 'short',
		day: 'numeric',
	});
	const week = new Date(diary.date).toLocaleDateString('ko-KR', {
		weekday: 'long',
	});

	return (
		<div className="flex flex-col">
			<EmotionSticker emotion={diary.emotions[0]} className="mb-[10px]" />
			<div className="flex flex-col text-left">
				<span className="head3 mb-[16px] gap-[4px]">
					<span>{monthDay}</span> <span className="text-gray300">{week}</span>
					<h1>{diary.title}</h1>
				</span>
				<div className="flex gap-[8px] mb-[16px]">
					{diary.photos.map((photo, index) => (
						<Fragment key={index}>
							{isImageClickable ? (
								<Image
									key={index}
									src={photo}
									alt={photo}
									className="w-[92px] h-[92px] rounded-[16px]"
								/>
							) : (
								<img
									key={index}
									src={photo}
									alt={photo}
									className="w-[92px] h-[92px] rounded-[16px]"
								/>
							)}
						</Fragment>
					))}
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: diary.content }}
					className="body2 "
				/>
			</div>
		</div>
	);
};
