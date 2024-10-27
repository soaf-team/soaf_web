import { cn } from '@/utils';

type SkeletonProps = {
	className?: string;
	shape?: 'circle' | 'rect' | 'text';
} & React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({
	className,
	shape = 'rect',
	...props
}: SkeletonProps) => {
	const shapeClassName =
		shape === 'circle'
			? 'rounded-full'
			: shape === 'text'
				? 'rounded-[4px]'
				: '';

	return (
		<div
			className={cn('bg-gray50 animate-pulse', shapeClassName, className)}
			{...props}
		></div>
	);
};
