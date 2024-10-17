import { XIcon } from '@/assets';
import { useFlow } from '@/stackflow';
import { cn } from '@/utils';

type XButtonProps = {
	className?: string;
	onClick?: () => void;
};

export const XButton = ({ className, onClick }: XButtonProps) => {
	const { pop } = useFlow();

	const handleClick = () => {
		if (onClick) {
			onClick();
			return;
		}
		pop();
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				'w-[24px] h-[24px] flex justify-end items-center',
				className,
			)}
		>
			<img src={XIcon} alt="x" className={cn('w-[12px] h-[12px]')} />
		</button>
	);
};
