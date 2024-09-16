import { cn } from '@/utils';
import { ReactNode, Ref, forwardRef } from 'react';

type CardProps = {
	children: ReactNode;
	shadow?: boolean;
	isSelected?: boolean;
	direction?: 'column' | 'row';
} & React.HTMLAttributes<HTMLDivElement>;

const Card = (
	{
		children,
		shadow,
		className,
		direction = 'column',
		isSelected,
		...props
	}: CardProps,
	ref: Ref<HTMLDivElement>,
) => {
	const shadowClass = shadow
		? 'shadow-shadow1'
		: 'outline outline-1 outline-[rgba(138,145,168,0.2)]';

	// TODO: 그라이데이션 컬러 checkbox 추가
	const selectedClass = isSelected ? 'outline outline-2 outline-primary ' : '';

	return (
		<div
			ref={ref}
			className={cn([
				'flex rounded-2xl p-[16px] bg-white',
				direction === 'column' ? 'flex-col' : 'flex-row',
				shadowClass,
				selectedClass,
				className,
			])}
			{...props}
		>
			{children}
		</div>
	);
};

const _Card = forwardRef(Card);
export { _Card as Card };
