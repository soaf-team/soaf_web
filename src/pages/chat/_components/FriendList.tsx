import { cn } from '@/utils';
import { MyHomeIcon, AnnotationPlus } from '@/assets';
import { Spacing } from '@/components';
import { MyHomeButton } from './MyHomeButton';

const MOCK_DATA = [
	{
		id: 1,
		name: '소울프렌드 1',
		status_message: '안녕하세요',
	},
	{
		id: 2,
		name: '소울프렌드 2',
		status_message: '안녕하세요',
	},
	{
		id: 3,
		name: '소울프렌드 3',
		status_message: '안녕하세요',
	},
	{
		id: 4,
		name: '소울프렌드 4',
		status_message: '안녕하세요',
	},
	{
		id: 5,
		name: '소울프렌드 5',
		status_message: '안녕하세요',
	},
];

export const FriendList = () => {
	return (
		<article className="flex flex-col px-[18px] py-2">
			<div className="px-1 py-2">
				<h3 className="text-xs font-medium">소울프렌드 5</h3>
			</div>
			<ul className="flex flex-col gap-2">
				{MOCK_DATA.map((item) => (
					<li
						key={item.name}
						className={cn(
							'flex justify-between items-center',
							'py-2',
							'border-b border-solid border-border',
						)}
					>
						<div className="flex flex-col gap-1">
							<p>{item.name}</p>
							<p className="text-xs text-gray300">{item.status_message}</p>
						</div>
						<div className="flex items-center gap-4">
							<MyHomeButton userId={item.id} />
							<img
								src={AnnotationPlus}
								alt="start-chat"
								width={24}
								height={24}
							/>
						</div>
					</li>
				))}
			</ul>
		</article>
	);
};
