import { cn } from '@/utils';
import { HTMLAttributes } from 'react';

type BarChartItem = {
	level: string;
	ratio: number;
	color: string;
};

type BarChartProps = {
	data: BarChartItem[];
	className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const BarChart = ({ data, className }: BarChartProps) => {
	return (
		<div
			className={cn([
				'flex w-full bg-gray-200 rounded-full overflow-hidden h-[29px]',
				className,
			])}
		>
			{data.map((item, index) => (
				<div
					key={index}
					className="h-full"
					style={{ width: `${item.ratio}%`, backgroundColor: item.color }}
					title={`${item.level}: ${item.ratio}%`}
				/>
			))}
		</div>
	);
};
