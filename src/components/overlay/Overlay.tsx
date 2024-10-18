import { useState } from 'react';
import {
	motion,
	AnimatePresence,
	useDragControls,
	PanInfo,
} from 'framer-motion';
import { Button } from '@/components';
import { OverlayProps as Props } from '@/libs';
import { cn } from '@/utils';

interface OverlayProps extends Props {
	disabled?: boolean;
	reject: () => void;
	resolve: () => void;
}

export const Overlay = ({
	resolve,
	reject,
	disabled,
	children,
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
						className="fixed inset-0 z-[9998]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleReject}
					/>
					<motion.div
						className={cn(
							'fixed bottom-0 left-0 right-0 z-[9999]',
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
						onDragEnd={() => handleReject()}
					>
						<div className="self-center mb-[14px] w-10 h-[3px] rounded-[12px] bg-gray200" />
						{children}
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
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
