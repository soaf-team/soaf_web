import { ChevronRightIcon } from '@/assets';

interface Props {
	items: {
		label: string;
		onClick: () => void;
	}[];
}

export const MenuList = ({ items }: Props) => {
	return (
		<div className="w-full">
			{items.map((item, index) => (
				<MenuItem key={index} label={item.label} onClick={item.onClick} />
			))}
		</div>
	);
};

interface ItemProps {
	label: string;
	onClick: () => void;
}

const MenuItem = ({ label, onClick }: ItemProps) => {
	return (
		<button
			onClick={onClick}
			className="w-full flex items-center justify-between py-[22px]"
		>
			<span className="text-black label2">{label}</span>
			<img src={ChevronRightIcon} alt="chevron-right" />
		</button>
	);
};
