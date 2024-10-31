import { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Button } from '@/components';
import { OverlayProps as Props } from '@/libs';
import { cn } from '@/utils';

interface OverlayProps extends Props {
	disabled?: boolean;
	reject: () => void;
	resolve: () => void;
	isConfirm?: boolean;
	overlayClassName?: string;
}

export const ConfirmOverlay = ({
	resolve,
	reject,
	disabled,
	children,
	isConfirm = true,
	overlayClassName,
}: OverlayProps) => {
	const [isVisible, setIsVisible] = useState(true);

	const controls = useDragControls();

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => resolve(), 300);
	};

	const handleReject = () => {
		setIsVisible(false);
		setTimeout(() => reject(), 300);
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					<motion.div
						className="fixed inset-0 z-[9998] bg-black/80"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleReject}
					/>
					<motion.div
						className={cn(
							'fixed bottom-0 left-0 lg:left-[calc(50%-220px)] lg:-translate-x-1/2 right-0 z-[9999]',
							'flex flex-col',
							'pt-2 px-[18px] pb-12 max-w-window min-h-0 h-auto',
							'rounded-t-[28px] bg-white shadow-shadow1',
							overlayClassName,
						)}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'ease', damping: 25, stiffness: 500 }}
						drag="y"
						dragControls={controls}
						dragConstraints={{ top: 0 }}
						onDragEnd={() => handleReject()}
					>
						<div className="self-center mb-[14px] w-10 h-[3px] rounded-[12px] bg-gray200" />
						{children}
						{isConfirm && (
							<Button
								size="sm"
								onClick={() => (disabled ? {} : handleClose())}
								className={cn(
									'w-full',
									disabled && 'cursor-not-allowed bg-gray100',
								)}
							>
								확인
							</Button>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
