import { ReactNode, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { OverlayProps } from '@/libs';
import { Button } from '@/components';
import { cn } from '@/utils';

interface BasicOverlayProps extends OverlayProps {
	children: ReactNode;
	leftButton?: {
		text: string;
		onClick: () => void;
		className?: string;
	};
	rightButton?: {
		text: string;
		onClick: () => void;
		className?: string;
	};
	onClose: () => void;
}

export const BasicOverlay = ({
	children,
	leftButton,
	rightButton,
	onClose,
}: BasicOverlayProps) => {
	const [isVisible, setIsVisible] = useState(true);

	const controls = useDragControls();

	const handleClickLeftButton = () => {
		setIsVisible(false);
		setTimeout(() => leftButton?.onClick(), 300);
	};

	const handleClickRightButton = () => {
		setIsVisible(false);
		setTimeout(() => rightButton?.onClick(), 300);
	};

	const handleCloseButton = () => {
		setIsVisible(false);
		setTimeout(() => onClose(), 300);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					<motion.div
						className="fixed inset-0 z-[9998]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleCloseButton}
					/>
					<motion.div
						className={cn(
							'fixed bottom-0 left-0 lg:left-[calc(50%-220px)] lg:-translate-x-1/2 right-0 z-[9999]',
							'flex flex-col',
							'pt-2 px-[18px] pb-2 max-w-window',
							'rounded-t-[28px] bg-white shadow-shadow1',
						)}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 500 }}
						drag="y"
						dragControls={controls}
						dragConstraints={{ top: 0 }}
						onDragEnd={() => handleCloseButton()}
					>
						<div className="self-center mb-[14px] w-10 h-[3px] rounded-[12px] bg-gray200" />
						{children}
						<div className={cn('flex items-center gap-2', 'pt-6 w-full')}>
							{leftButton && (
								<Button
									size="sm"
									className={cn(
										'flex-1',
										'bg-gray50 text-black',
										leftButton.className,
									)}
									onClick={handleClickLeftButton}
								>
									{leftButton.text}
								</Button>
							)}
							{rightButton && (
								<Button
									size="sm"
									className={cn(
										'flex-1',
										'bg-primary text-white',
										rightButton.className,
									)}
									onClick={handleClickRightButton}
								>
									{rightButton.text}
								</Button>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
