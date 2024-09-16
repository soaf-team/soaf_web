import { cn, getDateStatus } from '@/utils';

type CalendarProps = {
	currentDate: Date;
	render: (day: Date, index: number, isToday: boolean) => JSX.Element;
};

export const Calendar = ({ currentDate, render }: CalendarProps) => {
	const today = new Date();

	const getMonthMatrix = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		const matrix = [];
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		let week = Array(firstDayOfMonth).fill(null);
		for (let day = 1; day <= daysInMonth; day++) {
			week.push(new Date(year, month, day));
			if (week.length === 7 || day === daysInMonth) {
				matrix.push(week);
				week = [];
			}
		}
		return matrix;
	};

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="grid grid-cols-7 gap-x-2 gap-y-4 py-[22px] w-full">
				{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
					<span key={day} className={cn(['label text-center text-gray200'])}>
						{day}
					</span>
				))}
				{getMonthMatrix()
					.flat()
					.map((day, index) => {
						const isToday = day && getDateStatus(day, today) === 'today';
						return render(day, index, isToday);
					})}
			</div>
		</div>
	);
};
