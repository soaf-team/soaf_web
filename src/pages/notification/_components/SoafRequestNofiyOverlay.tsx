import { Button } from '@/components';
import { overlay, OverlayProps } from '@/libs';
import { cn } from '@/utils';
import { ReactNode } from 'react';

interface SoafRequestNotifyProps extends OverlayProps {
	header: {
		title: string;
		rightSlot?: ReactNode;
	};
	requestText: string;
	className?: string;
	isReceiver?: boolean;
}

export const SoafRequestNotifyOverlay = ({
	header,
	reject,
	resolve,
	requestText,
	overlayKey,
	className,
}: SoafRequestNotifyProps) => {
	const handleClose = () => {
		overlay.remove(overlayKey);
	};

	const handleReject = () => {
		reject?.('close');
		handleClose();
	};

	const handleResolve = (localText: string) => {
		resolve?.(localText);
		handleClose();
	};

	return (
		<>
			<div
				role="presentation"
				className={cn(
					'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				)}
				onClick={handleReject}
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
				<div className="relative flex items-center justify-between">
					<h3 className="absolute text-center transform -translate-x-1/2 label1sb left-1/2 pointer-events-none">
						{header.title}
					</h3>
					{header.rightSlot && (
						<div className="ml-auto z-10">{header.rightSlot}</div>
					)}
				</div>

				<div className="flex flex-col items-end gap-[2px] p-3 w-full h-[144px] text-[14px] border border-solid  border-gray100 rounded-[8px]">
					<p className="flex-1 w-full leading-normal whitespace-pre-line outline-none">
						{requestText}
					</p>
				</div>

				<div className="flex flex-col gap-5">
					<div
						className={cn(
							'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
						)}
					>
						<div className="flex w-full gap-[8px]">
							<div className="flex-1">
								<Button
									size="sm"
									variant="ghost"
									onClick={() => {
										handleResolve('reject');
									}}
								>
									거절할래요
								</Button>
							</div>
							<div className="flex-1">
								<Button
									size="sm"
									onClick={() => {
										handleResolve('accept');
									}}
									className="bg-primary"
								>
									네, 소프 맺을래요
								</Button>
							</div>
						</div>
					</div>
					<button
						className="text-[14px] text-gray500 font-medium underline"
						onClick={handleReject}
					>
						아직 모르겠어요, 더 고민해볼래요
					</button>
				</div>
			</div>
		</>
	);
};
