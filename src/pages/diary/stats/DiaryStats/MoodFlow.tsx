import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
} from 'chart.js';
import 'chart.js/auto';
import { DiaryStatsCard } from '../_components/DiaryStatsCard';
import { MOOD_RATINGS } from '@/constants';
import { MoodRating } from '@/types';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

type MoodFlowProps = {
	data: {
		date: string;
		rating: MoodRating;
	}[];
};

export const MoodFlow = ({ data }: MoodFlowProps) => {
	const labelData = data.map((e) => e.date);
	const moodData = data.map((e) => e.rating);

	const chartData: ChartData<'line', number[], string> = {
		labels: labelData,
		datasets: [
			{
				label: 'Contributions',
				data: moodData,
				borderColor: 'rgba(87, 194, 255, 1)',
				borderWidth: 2,
				tension: 0.1,
				pointRadius: 1,
				pointHoverRadius: 5,
				pointBorderWidth: 0,
				pointBackgroundColor: 'rgba(87, 194, 255, 1)',
			},
		],
	};

  return (
    <DiaryStatsCard title="감정 흐름">
      <div className="relative h-[138px] flex">
        <div className="absolute flex flex-col-reverse justify-around py-3">
          {MOOD_RATINGS.map((rating, index) => (
            <img
              key={index}
              src={rating}
              alt="rating"
              className="w-[19px] h-[19px]"
            />
          ))}
        </div>
        <Line options={CHART_OPTIONS} data={chartData} />
      </div>
    </DiaryStatsCard>
  );
};

const CHART_OPTIONS: ChartOptions<'line'> = {
	layout: {
		padding: {
			left: 20,
		},
	},
	maintainAspectRatio: false,
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			enabled: false,
		},
	},
	scales: {
		x: {
			ticks: {
				maxTicksLimit: 7,
				callback: function (value, index, values) {
					const dateLabel = this.getLabelForValue(value as number);
					const currentMonth = dateLabel.split('-')[1].replace(/^0+/, '');
					const currentDay = dateLabel.split('-')[2].replace(/^0+/, '');
					const isLastLabel = index === values.length - 1;

					if (
						index === 0 ||
						isLastLabel ||
						(values[index - 1].label as string).split('-')[1] !== currentMonth
					) {
						return currentMonth + '/' + currentDay;
					} else {
						return '';
					}
				},
				color: 'rgba(138,145,168,1)',
				font: {
					family: 'Pretendard',
					size: 12,
					weight: 'bolder',
				},
			},
			border: {
				display: false,
				dash: [5, 3],
			},
		},
		y: {
			min: 0.5,
			max: 5.5,
			ticks: {
				stepSize: 1,
				callback: function () {
					return '';
				},
			},
			grid: {
				display: false,
			},
		},
	},
};
