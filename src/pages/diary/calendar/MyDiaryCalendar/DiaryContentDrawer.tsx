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
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						ref.current?.click();
					}
				});
			},
			{ threshold: 1.0 },
		);

		const currentRef = ref.current;

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [diary, ref]);

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
					ref={ref}
					onClick={() => handleClick({ animate: false })}
				/>
			</div>
		</DrawerContent>
	);
};
