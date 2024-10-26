import { cn } from '@/utils';

type HeaderProps = {
	children: React.ReactNode;
	leftSlot?: React.ReactNode;
	rightSlot?: React.ReactNode;
	className?: string;
};

export const Header = (props: HeaderProps) => {
	const { children, leftSlot, rightSlot, className } = props;

	return (
		<div
			className={cn([
				'sticky top-0 left-0 right-0 flex items-center justify-center h-[56px] bg-white z-50',
				className,
			])}
		>
			{leftSlot && (
				<div className="absolute left-[18px] top-1/2 translate-y-[-50%]">
					{leftSlot}
				</div>
			)}
			{children}
			{rightSlot && (
				<div className="absolute right-[18px] top-1/2 translate-y-[-50%]">
					{rightSlot}
				</div>
			)}
		</div>
	);
};
