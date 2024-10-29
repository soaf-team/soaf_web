import { useEffect, useRef, useState } from 'react';
import { useFlow } from '@/stackflow';
import { DrawerClose, DrawerContent } from '@/components/dialog';
import { DiaryType } from '@/types';
import { cn } from '@/utils';
import { DiaryContent } from '../../_components/DiaryContent';

type DiaryContentDrawerProps = {
	diary: DiaryType;
};

export const DiaryContentDrawer = ({ diary }: DiaryContentDrawerProps) => {
	// 버튼 레프
	const ref = useRef<HTMLButtonElement>(null);
	const { push } = useFlow();
	const [shouldDisappear, setShouldDisappear] = useState(false);
	const opacity = shouldDisappear ? 'opacity-0' : 'opacity-100';
	const rounded = shouldDisappear ? 'rounded-none' : 'rounded-[28px]';

	useEffect(() => {
		const currentRef = ref.current;

		if (currentRef) {
			currentRef?.click();
		}
	}, [ref.current]);

	const handleClick = ({ animate }: { animate?: boolean }) => {
		push('DiaryDetailPage', { diaryId: diary.id }, { animate });
		setShouldDisappear(true);
	};

	return (
		<DrawerContent
			className={cn([
				'shadow-shadow1 transition-all duration-300',
				opacity,
				rounded,
			])}
			overlayStyle="bg-transparent"
		>
			<div className="flex flex-col h-[100vh] justify-between pb-[10vh] pt-[2px]">
				<DrawerClose onClick={() => handleClick({ animate: true })}>
					<DiaryContent diary={diary} />
				</DrawerClose>
				<DrawerClose
					className="absolute bottom-0 left-0 right-0 h-[15vh]"
					ref={ref}
					onClick={() => handleClick({ animate: false })}
				/>
			</div>
		</DrawerContent>
	);
};
