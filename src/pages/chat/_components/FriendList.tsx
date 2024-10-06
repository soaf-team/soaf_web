import { MyHomeButton } from './MyHomeButton';
import { chatSocketManager } from '@/libs';
import { useFriendListQuery } from '@/hooks/queries/chat';
import { cn } from '@/utils';
import { AnnotationPlus } from '@/assets';

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
	const { friendList } = useFriendListQuery();

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
								onClick={() => {
									// TODO: 이후 해당 user와 관련된 room이 있으면 initializeChat이 아니라 enterChat로 분기 필요
									chatSocketManager.emit('initializeChat', {
										participants: [item.name],
									});
								}}
							/>
						</div>
					</li>
				))}
			</ul>
		</article>
	);
};
