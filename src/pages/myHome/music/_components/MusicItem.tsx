import { MusicDefaultIcon } from '@/assets';
import { Album, IAlbumDetail } from '@/types';
import { cn } from '@/utils';

interface Props {
	music: Album | IAlbumDetail;
	type?: 'search' | 'list' | 'detail';
	onClick?: () => void;
}

export const MusicItem = ({ type = 'search', onClick, music }: Props) => {
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

	return (
		<div
			className={cn(
				'flex gap-[16px] py-[8px] border-solid border-b border-border',
				type === 'search' ? 'items-center' : 'items-start',
			)}
			onClick={onClick}
		>
			<div className={coverClass}>
				<img
					src={
						music.image[3]['#text'] === ''
							? MusicDefaultIcon
							: music.image[3]['#text']
					}
					alt="cover"
					className={coverClass}
				/>
			</div>

			<div className="flex flex-col items-start gap-[4px] py-[8px]">
				<p className={cn('line-clamp-1', titleClass)}>
					{music.name === '(null)' ? '제목 불명' : music.name}
				</p>
				<p className={cn('line-clamp-1', artistClass)}>{music.artist}</p>
			</div>
		</div>
	);
};
