import { Button } from '@/components';
import { overlay, OverlayProps } from '@/libs';
import { cn } from '@/utils';
import { ReactNode, useState } from 'react';

interface SoafRequestDialogProps extends OverlayProps {
	header: {
		title: string;
		rightSlot?: ReactNode;
	};
	leftButton?: {
		text?: string;
		onClick?: () => void;
		className?: string;
	};
	rightButton?: {
		text?: string;
		onClick?: () => void;
		className?: string;
	};
	className?: string;
	onTextChange?: (text: string) => void;
	isReceiver?: boolean;
	onReject?: () => void;
}

export const SoafRequestDialogOverlay = ({
	header,
	leftButton,
	rightButton,
	reject,
	resolve,
	overlayKey,
	className,
	onTextChange,
	isReceiver = false,
	onReject,
}: SoafRequestDialogProps) => {
	const [localText, setLocalText] = useState('');

	const handleClose = () => {
		overlay.remove(overlayKey);
	};

	const handleReject = () => {
		reject?.('close');
		handleClose();
	};

	const handleResolve = () => {
		resolve?.(localText);
		handleClose();
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setLocalText(newValue);
		onTextChange?.(newValue);
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
					<h3 className="absolute text-center transform -translate-x-1/2 label1sb left-1/2">
						{header.title}
					</h3>
					{header.rightSlot && (
						<div className="ml-auto">{header.rightSlot}</div>
					)}
				</div>

				<div className="flex flex-col items-end gap-[2px] p-3 w-full h-[144px] text-[14px] border border-solidborder-gray100 rounded-[8px]">
					<textarea
						className="flex-1 w-full font-medium leading-normal outline-none placeholder:whitespace-pre-line"
						placeholder={`정성스런 메세지와 함께 신청하면\n상대방이 수락할 가능성이 높아져요!`}
						value={localText}
						maxLength={200}
						onChange={handleTextChange}
					/>
					<p className="font-medium">
						<span className="text-gray300">{localText.length} / </span>200
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
									onClick={handleReject}
									className={cn(leftButton?.className)}
								>
									{leftButton?.text}
								</Button>
							</div>
							<div className="flex-1">
								<Button
									size="sm"
									onClick={handleResolve}
									variant="primary"
									className={cn(rightButton?.className)}
								>
									{rightButton?.text}
								</Button>
							</div>
						</div>
					</div>

					{isReceiver && (
						<button
							className="text-[14px] text-gray500 font-medium underline"
							onClick={onReject}
						>
							아직 모르겠어요, 더 고민해볼래요
						</button>
					)}
				</div>
			</div>
		</>
	);
};
