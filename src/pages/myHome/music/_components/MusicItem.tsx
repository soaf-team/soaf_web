import { MusicDefaultIcon } from '@/assets';
import { Album, IAlbumDetail, MyMusic } from '@/types';
import { cn } from '@/utils';

interface Props {
	music: Album | IAlbumDetail | MyMusic;
	type: 'search' | 'list' | 'detail';
	onClick?: () => void;
}

export const MusicItem = ({ type, onClick, music }: Props) => {
	const coverClass = cn({
		'min-w-[56px] w-[56px] h-[56px] rounded-[4px]': type === 'search',
		'w-[88px] h-[88px] rounded-[8px]': type === 'list',
		'w-[96px] h-[96px] rounded-[8px]': type === 'detail',
	});

	const titleClass = cn(
		{
			label2: type === 'search',
			head6sb: type === 'list',
			head5b: type === 'detail',
		},
		'text-black',
	);

	const artistClass = cn(
		{
			label4: type === 'search' || type === 'list',
			label3: type === 'detail',
		},
		'text-gray600',
	);

	const getImageUrl = () => {
		if ('content' in music) {
			return music.content.imageUrl || MusicDefaultIcon;
		}
		return music.image[3]['#text'] || MusicDefaultIcon;
	};

	const getTitle = () => {
		if ('content' in music) {
			return music.content.title;
		}
		return music.name === '(null)' ? '제목 불명' : music.name;
	};

	const getArtist = () => {
		if ('content' in music) {
			return music.content.artist;
		}
		return music.artist;
	};

	const review = 'review' in music ? music.review : '';

	return (
		<div
			className={cn(
				'flex gap-[16px] py-[8px] border-solid border-b border-border',
				type === 'search' ? 'items-center' : 'items-start',
			)}
			onClick={onClick}
		>
			<div className={coverClass}>
				<img src={getImageUrl()} alt="cover" className={coverClass} />
			</div>

			<div className="flex flex-col justify-between h-full  py-[8px]">
				<div className="flex flex-col gap-[4px]">
					<p className={cn('line-clamp-1', titleClass)}>{getTitle()}</p>
					<p className={cn('line-clamp-1', artistClass)}>{getArtist()}</p>
				</div>

				{type === 'list' && <p className="text-black body4">{review}</p>}
			</div>
		</div>
	);
};
