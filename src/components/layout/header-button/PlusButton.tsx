import plus from '@/assets/icons/plus.svg';

interface Props {
	onClick?: () => void;
}

export const PlusButton = ({ onClick }: Props) => {
	return (
		<button type="button" onClick={onClick}>
			<img src={plus} alt="plus" className="w-[20px] h-[20px]" />
		</button>
	);
};
