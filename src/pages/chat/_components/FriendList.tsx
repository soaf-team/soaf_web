import { useState } from 'react';
import { motion } from 'framer-motion';

import { MyHomeButton } from './MyHomeButton';
import { chatSocketManager, overlay } from '@/libs';
import { useFriendListQuery, useToast } from '@/hooks';
import { cn } from '@/utils';
import { AnnotationPlus, BanIcon } from '@/assets';
import { BanDialogOverlay } from './BanDialogOverlay';

export const FriendList = () => {
	const [isDragging, setIsDragging] = useState(false);

	const { toast } = useToast();
	const { friendList } = useFriendListQuery();

	const handleBanButtonClick = async (userName: string) => {
		await overlay.open(<BanDialogOverlay userName={userName} />);
		toast({
			title: `${userName}님이 차단되었어요`,
		});
	};

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
								onDragStart={() => setIsDragging(true)}
								onDragEnd={(event, info) => {
									if (info.offset.x > 0) {
										setIsDragging(false);
									}
								}}
							>
								{!isDragging ? (
									<div className="flex flex-col gap-1">
										<p>{friend.name}</p>
										<p className="text-xs text-gray300">{friend?.status}</p>
									</div>
								) : (
									<div />
								)}
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
									{isDragging && (
										<img
											src={BanIcon}
											alt="ban"
											onClick={() => handleBanButtonClick(friend.name)}
										/>
									)}
								</div>
							</motion.div>
							{isDragging && <div />}
						</li>
					);
				})}
			</ul>
		</article>
	);
};
