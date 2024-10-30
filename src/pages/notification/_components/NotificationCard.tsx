import { useState } from 'react';
import { motion } from 'framer-motion';
import { NotifyType } from '@/hooks';
import { cn, formatDateTime } from '@/utils';
import { BanIcon, TrashWhiteIcon } from '@/assets';

interface Props {
	notification: NotifyType;
	onClick: () => void;
	onBlock: () => void;
	onDelete: () => void;
}

export const NotificationCard = ({
	notification,
	onBlock,
	onDelete,
	onClick,
}: Props) => {
	const [isDragging, setIsDragging] = useState(false);
	const BUTTON_WIDTH = 128;
	const GAP_WIDTH = 8;
	const TOTAL_SLIDE_WIDTH = BUTTON_WIDTH + GAP_WIDTH;

	return (
		<div
			className={cn(
				'relative w-full shadow-shadow1 overflow-hidden min-h-[86px] rounded-[16px]',
				isDragging && 'shadow-0',
			)}
		>
			<motion.div
				className="flex w-full gap-2"
				drag="x"
				dragConstraints={{
					left: -TOTAL_SLIDE_WIDTH,
					right: 0,
				}}
				animate={{
					x: isDragging ? -TOTAL_SLIDE_WIDTH : 0,
				}}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={(_, info) => {
					if (info.offset.x > 0) {
						setIsDragging(false);
					}
				}}
			>
				{/* 알림 컨텐츠 */}
				<div
					role="button"
					onClick={onClick}
					className="flex-shrink-0 w-full p-4 shadow-sm rounded-[16px]"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base font-medium">
							{notification.senderName}님의 소프신청
						</h4>
						<p className="text-sm text-gray600 line-clamp-3">
							{formatDateTime(notification.lastRequestDate)}
						</p>
					</div>
					<p className="mt-2 text-sm text-gray300">
						{notification.message.length > 60
							? `${notification.message.slice(0, 60)}...`
							: notification.message}
					</p>
				</div>

				{/* 버튼 영역 */}
				<div className="flex items-center flex-shrink-0 gap-2">
					<button
						className="w-[56px] h-full rounded-[16px] bg-gray-50 flex flex-col items-center justify-center shadow-sm"
						onClick={onBlock}
					>
						<img src={BanIcon} alt="차단" className="w-6 h-6" />
						<span className="label4 text-warn">차단</span>
					</button>
					<button
						className="w-[56px] h-full rounded-[16px] bg-warn flex flex-col items-center justify-center"
						onClick={onDelete}
					>
						<img src={TrashWhiteIcon} alt="삭제" className="w-6 h-6" />
						<span className="text-white label4">삭제</span>
					</button>
				</div>
			</motion.div>
		</div>
	);
};
