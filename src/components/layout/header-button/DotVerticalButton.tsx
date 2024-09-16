import { DotVerticalIcon } from '@/assets';

type XButtonProps = {
	onClick?: () => void;
};

export const DotVerticalButton = ({ onClick }: XButtonProps) => {
	return (
		<button onClick={onClick}>
			<img
				src={DotVerticalIcon}
				alt="dot_vertical"
				className="w-[24px] h-[24px]"
			/>
		</button>
	);
};
