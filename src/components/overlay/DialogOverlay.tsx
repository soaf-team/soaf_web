import { ReactNode } from 'react';

import { OverlayProps } from '@/libs';
import { cn } from '@/utils';

interface DialogOverlayProps {
	title: string;
	children: ReactNode;
	className?: string;
	leftButton?: {
		text: string;
		leftButtonClassName?: string;
		onClick: () => void;
	};
	rightButton?: {
		text: string;
		rightButtonClassName?: string;
		onClick: () => void;
	};
	onClose: () => void;
}

export const DialogOverlay = ({
	title,
	children,
	className,
	leftButton,
	rightButton,
	onClose,
}: DialogOverlayProps) => {
	return (
		<section className="relative">
			<div
				className="fixed inset-0 z-[9999] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
				onClick={onClose}
			/>
			<div
				className={cn(
					'fixed top-1/2 z-[9999]',
					'w-[calc(100%-44px)] lg:w-[396px]',
					'left-1/2 -translate-x-1/2 -translate-y-1/2',
					'grid min-h-0 h-auto gap-6',
					'bg-white rounded-[20px] px-3 pt-[34px] pb-5 shadow-lg',
					className,
				)}
			>
				<div className="flex flex-col gap-3 text-left px-2">
					<h3 className="head5b">{title}</h3>
					<div>{children}</div>
				</div>
				<div className="flex items-center gap-2 w-full">
					{leftButton && (
						<button
							className={cn(
								'flex-1 py-[14px] bg-gray50 rounded-[16px] font-semibold',
								leftButton.leftButtonClassName,
							)}
							onClick={leftButton.onClick}
						>
							{leftButton.text}
						</button>
					)}
					{rightButton && (
						<button
							className={cn(
								'flex-1 py-[14px] bg-warn text-white rounded-[16px] font-semibold',
								rightButton.rightButtonClassName,
							)}
							onClick={rightButton.onClick}
						>
							{rightButton.text}
						</button>
					)}
				</div>
			</div>
		</section>
	);
};
