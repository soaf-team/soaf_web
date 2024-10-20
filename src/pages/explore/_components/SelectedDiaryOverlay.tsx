import dayjs from 'dayjs';

import { EmotionSticker } from '@/components';
import { BasicOverlay } from '@/components/overlay';
import { OverlayProps } from '@/libs';
import { Diary } from '@/types';
import { cn, removeHtmlTags } from '@/utils';

interface SelectedDiaryOverlayProps extends OverlayProps {
	diary: Diary;
}

export const SelectedDiaryOverlay = ({
	overlayKey,
	diary,
	resolve,
	reject,
}: SelectedDiaryOverlayProps) => {
	console.log(diary);
	return (
		<BasicOverlay
			overlayKey={overlayKey}
			leftButton={{
				text: '아니요',
				onClick: () => reject?.('close'),
			}}
			rightButton={{
				text: '네, 탐색할래요',
				onClick: () => resolve?.('search'),
			}}
			onClose={() => reject?.('close')}
		>
			<h2 className="py-4 w-full text-center text-[18px] font-bold">
				선택한 일기가 맞나요?
			</h2>
			<div className="w-full max-h-[423px]">
				<div className="border border-solid border-border rounded-[16px]">
					<div
						className={cn(
							'flex items-center gap-3',
							'p-4',
							'border-b border-solid border-b-border',
						)}
					>
						<div className="flex flex-col justify-center items-center w-[40px] min-w-[40px] h-[40px] bg-gray50 px-[10px] py-[6px] rounded-lg">
							<p className="text-[16px] text-gray400 font-black leading-[20px]">
								{diary.date.split('.')[2]}
							</p>
							<p className="text-[10px] text-gray200 leading-[12px] font-semibold">
								{dayjs(diary.date).format('ddd')}
							</p>
						</div>
						<div className="flex flex-col justify-start gap-[4px]">
							<p className="label2">{diary.title}</p>
							<div className="flex">
								{diary.emotions.map((emotion, index) => (
									<EmotionSticker
										key={index}
										emotion={emotion}
										size="sm"
										style={{
											transform: `translateX(-${index * 5}px)`,
											zIndex: diary.emotions.length - index,
										}}
									/>
								))}
							</div>
						</div>
					</div>
					<div className={cn('flex flex-col gap-4', 'p-4')}>
						{diary.photos.length > 0 && (
							<div className="overflow-x-scroll">
								{diary.photos.map((photo) => (
									<div
										key={photo}
										className="w-[48px] min-w-[48px] h-[48px] rounded-[10px] bg-gray50"
									>
										<img
											src={photo}
											alt="diary-photo"
											className="object-cover w-full h-full rounded-[10px]"
										/>
									</div>
								))}
							</div>
						)}
						<p className="flex-1 overflow-hidden line-clamp-3 overflow-ellipsis">
							{removeHtmlTags(diary.content)}
						</p>
					</div>
				</div>
			</div>
		</BasicOverlay>
	);
};
