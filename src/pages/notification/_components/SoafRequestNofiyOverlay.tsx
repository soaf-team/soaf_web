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
			<dialog
				className={cn(
					'fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] w-[calc(100%-44px)] translate-y-[-50%] min-h-0 h-auto gap-[24px] bg-white rounded-[20px] px-[12px] pt-[34px] pb-[20px] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
					className,
				)}
			>
				<div className="relative flex items-center justify-between">
					<h3 className="absolute w-full text-center transform -translate-x-1/2 label1sb left-1/2">
						{header.title}
					</h3>
					{header.rightSlot && (
						<div className="ml-auto">{header.rightSlot}</div>
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
			</dialog>
		</>
	);
};
