import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { MyHomeButton } from './MyHomeButton';
import { BanDialogOverlay } from './BanDialogOverlay';
import { chatSocketManager, overlay } from '@/libs';
import { useFriendListQuery, useToast } from '@/hooks';
import { useUserBlockMutations } from '@/hooks/mutations';
import { cn, throttle } from '@/utils';
import { AnnotationPlus, BanIcon } from '@/assets';

const throttledEmit = throttle((participants: string[]) => {
	chatSocketManager.emit('initializeChat', { participants });
}, 3000);

export const FriendList = () => {
	const [isDraggingId, setIsDraggingId] = useState<string | null>(null);

	const { toast } = useToast();
	const { friendList } = useFriendListQuery();
	const { postBlockUserMutation } = useUserBlockMutations();

	const handleBanButtonClick = async (userName: string, userId: string) => {
		await overlay.open(<BanDialogOverlay userName={userName} />);
		await postBlockUserMutation.mutateAsync({
			payload: {
				userToBlockId: userId,
			},
		});
		toast({
			title: `${userName}님이 차단되었어요`,
		});
	};

	const handleChatInit = useCallback((friendId: string) => {
		throttledEmit([friendId]);
	}, []);

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
							className={cn('border-b border-solid border-border')}
						>
							<motion.div
								className={cn(
									'flex justify-between items-center',
									'py-2 min-h-[60px]',
								)}
								drag="x"
								dragConstraints={{
									left: -10,
									right: 0,
								}}
								animate={{ x: isDraggingId === friend._id ? -10 : 0 }}
								onDragStart={() => setIsDraggingId(friend._id)}
								onDragEnd={(_, info) => {
									if (info.offset.x > 0) {
										setIsDraggingId(null);
									}
								}}
							>
								{isDraggingId !== friend._id ? (
									<div className="flex flex-col gap-1">
										<p>{friend.name}</p>
										<p className="text-xs text-gray300">{friend?.status}</p>
									</div>
								) : (
									<div />
								)}
								<div className="flex items-center gap-4">
									<MyHomeButton userId={friend._id} userName={friend.name} />
									<img
										src={AnnotationPlus}
										alt="start-chat"
										width={24}
										height={24}
										onClick={() => handleChatInit(friend._id)}
									/>
									{isDraggingId === friend._id && (
										<img
											src={BanIcon}
											alt="ban"
											onClick={() =>
												handleBanButtonClick(friend.name, friend._id)
											}
										/>
									)}
								</div>
							</motion.div>
							{isDraggingId === friend._id && <div />}
						</li>
					);
				})}
			</ul>
		</article>
	);
};
