import { useGetYoutubeQuery } from '@/hooks';
import { Youtube } from '@/types';
import React, { useState } from 'react';
import { YoutubeItemProps, YoutubeItem } from './YoutubeItem';
import { SearchInput } from '../../_components';
import { NonDataFallback } from '@/components';

interface Props {
	onNextStep: () => void;
	setYoutubeInfo: React.Dispatch<
		React.SetStateAction<YoutubeItemProps & { url: string }>
	>;
}

export const SearchYoutubeList = ({ onNextStep, setYoutubeInfo }: Props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const { youtube } = useGetYoutubeQuery({
		videoId: extractYoutubeVideoId(searchQuery),
	});

	const handleItemClick = (video: Youtube['items'][0]) => {
		setYoutubeInfo({
			title: video.snippet.title,
			channelTitle: video.snippet.channelTitle,
			publishedAt: video.snippet.publishedAt,
			thumbnail: video.snippet.thumbnails.medium.url,
			url: searchQuery,
		});
		onNextStep();
	};

	return (
		<>
			<SearchInput type="youtube" setSearchQuery={setSearchQuery} />

			{youtube === undefined ? (
				<div className="w-full absolute_center">
					<NonDataFallback>
						<p className="font-medium body2 text-gray300">
							검색 결과가 없습니다.
						</p>
						<p className="font-medium body2 text-gray300">
							링크가 정확한지 확인해주세요.
						</p>
					</NonDataFallback>
				</div>
			) : (
				<YoutubeItem
					key={youtube?.id}
					type="search"
					onClick={() => handleItemClick(youtube)}
					youtube={
						youtube && {
							title: youtube.snippet.title,
							channelTitle: youtube.snippet.channelTitle,
							publishedAt: youtube.snippet.publishedAt,
							thumbnail: youtube.snippet.thumbnails.medium.url,
						}
					}
				/>
			)}
		</>
	);
};

const extractYoutubeVideoId = (url: string): string | null => {
	try {
		const videoUrl = new URL(url);

		// youtu.be 형식
		if (videoUrl.hostname === 'youtu.be') {
			const pathSegments = videoUrl.pathname.split('/');
			return pathSegments[1]?.split('?')[0] || null;
		}

		// youtube.com 형식
		if (
			videoUrl.hostname === 'youtube.com' ||
			videoUrl.hostname === 'www.youtube.com'
		) {
			const videoId = videoUrl.searchParams.get('v');
			return videoId || null;
		}

		return null;
	} catch {
		return null;
	}
};
