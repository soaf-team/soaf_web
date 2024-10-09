import { MyHomeButton } from './MyHomeButton';
import { chatSocketManager } from '@/libs';
import { useFriendListQuery } from '@/hooks';
import { cn } from '@/utils';
import { AnnotationPlus } from '@/assets';

export const FriendList = () => {
	const { friendList } = useFriendListQuery();

	return (
		<article className="flex flex-col px-[18px] py-2">
			<div className="px-1 py-2">
				<h3 className="text-xs font-medium">소울프렌드 {friendList.length}</h3>
			</div>
			<ul className="flex flex-col gap-2">
				{friendList.map((friendData) => {
					const { friend } = friendData;

					return (
						<li
							key={friend._id}
							className={cn(
								'flex justify-between items-center',
								'py-2 min-h-[60px]',
								'border-b border-solid border-border',
							)}
						>
							<div className="flex flex-col gap-1">
								<p>{friend.name}</p>
								{/* <p className="text-xs text-gray300">{friend.status_message}</p> */}
							</div>
							<div className="flex items-center gap-4">
								<MyHomeButton userId={friend._id} />
								<img
									src={AnnotationPlus}
									alt="start-chat"
									width={24}
									height={24}
									onClick={() => {
										chatSocketManager.emit('initializeChat', {
											participants: [friend._id],
										});
									}}
								/>
							</div>
						</li>
					);
				})}
			</ul>
		</article>
	);
};
