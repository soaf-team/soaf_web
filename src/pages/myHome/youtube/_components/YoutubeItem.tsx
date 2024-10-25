import { useState } from 'react';
import { MyYoutube, Thumbnail, Youtube } from '@/types';
import { cn, detailDate } from '@/utils';
import { extractYouTubeVideoId } from '@/pages/myHome/utils/youtube';
import { PlayIcon } from '@/assets';
export interface YoutubeItemProps
	extends Pick<
		Youtube['items'][0]['snippet'],
		'title' | 'channelTitle' | 'publishedAt'
	> {
	thumbnail: Thumbnail['url'];
}

interface Props {
	type?: 'search' | 'list' | 'detail';
	onClick?: () => void;
	youtube: YoutubeItemProps | MyYoutube;
}

export const YoutubeItem = ({ type = 'search', onClick, youtube }: Props) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const posterClass = cn({
		'min-w-[154px] w-[154px] h-[86px] rounded-[8px]':
			type === 'search' || 'list',
		'w-full h-[197px] rounded-[16px]': type === 'detail',
	});

	const titleClass = cn(
		{
			label2: type === 'search' || 'list',
			head5b: type === 'detail',
		},
		'text-black',
	);

	const handleClick = () => {
		if (type === 'detail') setIsPlaying(true);
		else onClick?.();
	};

	const getThumbnail = () => {
		if ('content' in youtube) return youtube.content.thumbnailUrl;
		return youtube.thumbnail;
	};

	const getTitle = () => {
		if ('content' in youtube) return youtube.content.title;
		return youtube.title;
	};

	const getChannelTitle = () => {
		if ('content' in youtube) return youtube.content.channelName;
		return youtube.channelTitle;
	};

	const getPublishedAt = () => {
		if ('content' in youtube) return youtube.content.publishedAt;
		return youtube.publishedAt;
	};

	const getVideoId = () => {
		if ('content' in youtube) return extractYouTubeVideoId(youtube.content.url);
		return null;
	};

	if (!youtube) return null;

	return (
		<div className="w-full flex flex-col gap-[16px]border-b border-solid border-border py-[8px]">
			<div
				className={cn('flex gap-[16px]', type === 'detail' && 'flex-col')}
				onClick={handleClick}
			>
				<div className={cn(posterClass, 'relative')}>
					{isPlaying && type === 'detail' ? (
						<iframe
							width="100%"
							height="100%"
							src={`https://www.youtube.com/embed/${getVideoId()}?autoplay=1`}
							title={getTitle()}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							className="rounded-[16px]"
							allowFullScreen
						/>
					) : (
						<>
							<img
								src={getThumbnail()}
								alt="cover"
								className={cn(posterClass, 'object-cover')}
							/>
							{type === 'detail' && (
								<img
									role="button"
									src={PlayIcon}
									alt="play"
									className="absolute_center"
									onClick={() => setIsPlaying(true)}
								/>
							)}
						</>
					)}
				</div>

				<div className="flex flex-col justify-between gap-[8px] py-[8px] items-start">
					<p className={cn('line-clamp-2', titleClass)}>{getTitle()}</p>
					<div className="flex gap-[4px] justify-center label4 text-gray200">
						<p>{detailDate(getPublishedAt())}</p>|<p>{getChannelTitle()}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
