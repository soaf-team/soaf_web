import { ReactNode } from 'react';

import { OverlayProps } from '@/libs';
import { cn } from '@/utils';

interface DialogOverlayProps {
	title: string;
	children: ReactNode;
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
	leftButton,
	rightButton,
	onClose,
}: DialogOverlayProps) => {
	return (
		<section>
			<div
				className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
				onClick={onClose}
			/>
			<div className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] w-[calc(100%-44px)] translate-y-[-50%] gap-6 bg-white rounded-[20px] px-3 pt-[34px] pb-5 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
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
