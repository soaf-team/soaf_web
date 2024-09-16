import { Card } from '@/components';
import { cn } from '@/utils';

interface Props {
	name: string;
	percent: number;
	onClick?: () => void;
	isSelected?: boolean;
	className?: string;
}

export const MatchedUserItem = ({
	name,
	percent,
	onClick,
	isSelected,
	className,
}: Props) => {
	return (
		<Card
			direction="row"
			isSelected={isSelected}
			onClick={onClick}
			shadow
			className={cn(['w-full justify-between items-center', className])}
		>
			<p className="label2">{name}</p>

			<p className="text-gray-400 label3">유사율 {percent}%</p>
		</Card>
	);
};
