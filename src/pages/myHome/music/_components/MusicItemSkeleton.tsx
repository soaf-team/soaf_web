import { cn } from '@/utils';

interface Props {
	type: 'search' | 'list' | 'detail';
}

export const MusicItemSkeleton = ({ type }: Props) => {
	const coverClass = cn({
		'min-w-[56px] w-[56px] h-[56px] rounded-[4px]': type === 'search',
		'w-[88px] h-[88px] rounded-[8px]': type === 'list',
		'w-[96px] h-[96px] rounded-[8px]': type === 'detail',
	});

	const titleClass = cn(
		{
			'w-[120px] h-[18px]': type === 'search',
			'w-[160px] h-[22px]': type === 'list',
			'w-[180px] h-[24px]': type === 'detail',
		},
		'bg-gray100 rounded',
	);

	const artistClass = cn(
		{
			'w-[100px] h-[16px]': type === 'search' || type === 'list',
			'w-[140px] h-[18px]': type === 'detail',
		},
		'bg-gray100 rounded',
	);

	return (
		<div
			className={cn(
				'flex gap-[16px] py-[8px] border-solid border-b border-border',
				type === 'search' ? 'items-center' : 'items-start',
			)}
		>
			<div className={cn(coverClass, 'bg-gray100 animate-pulse')} />

			<div className="flex flex-col justify-between h-full py-[8px]">
				<div className="flex flex-col gap-[8px]">
					<div className={cn(titleClass, 'animate-pulse')} />
					<div className={cn(artistClass, 'animate-pulse')} />
				</div>

				{type !== 'search' && (
					<div className="w-[200px] h-[16px] bg-gray100 rounded mt-[8px] animate-pulse" />
				)}
			</div>
		</div>
	);
};
