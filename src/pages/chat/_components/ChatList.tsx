import { cn } from '@/utils';

const MOCK_CHAT_LIST = [
	{
		id: 1,
		name: '뽀송하루',
		message: '안녕하세요',
		unreadLength: 3,
		time: '2024-09-05 12:00',
	},
	{
		id: 2,
		name: '뽀송하루2',
		message: '안녕하세요',
		unreadLength: 1,
		time: '2024-09-04 12:00',
	},
	{
		id: 3,
		name: '뽀송하루',
		message: '안녕하세요2',
		unreadLength: 5,
		time: '2024-09-03 12:00',
	},
	{
		id: 4,
		name: '뽀송하루4',
		message: '안녕하세요4',
		unreadLength: 3,
		time: '2024-09-02 12:00',
	},
	{
		id: 5,
		name: '뽀송하루5',
		message: '안녕하세요5',
		unreadLength: 8,
		time: '2024-09-01 12:00',
	},
];

export const ChatList = () => {
	return (
		<div className="flex flex-col">
			<ul className="flex flex-col gap-2 pt-[14px] px-[18px]">
				{MOCK_CHAT_LIST.map((chat) => (
					<li
						key={chat.id}
						className={cn(
							'flex justify-between',
							'p-4 w-full',
							'rounded-[16px] shadow-chat',
						)}
					>
						<div className={LIST_CON_STYLE}>
							<p>{chat.name}</p>
							<p className="text-sm text-gray300 font-medium">{chat.message}</p>
						</div>
						<div className={cn(LIST_CON_STYLE, 'items-end')}>
							<p className="text-gray600">{chat.time.split(' ')[1]}</p>
							<div
								className={cn(
									'flex justify-center items-center',
									'w-[18px] h-[18px]',
									'bg-warn text-white text-[10px] rounded-full',
								)}
							>
								{chat.unreadLength}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

const LIST_CON_STYLE = 'flex flex-col gap-2';
