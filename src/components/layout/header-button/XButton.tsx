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
		<img
			onClick={handleClick}
			src={XIcon}
			alt="x"
			className={cn('w-[12px] h-[12px]', className)}
		/>
	);
};
