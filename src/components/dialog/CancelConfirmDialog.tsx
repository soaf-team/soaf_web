import { Button } from '@/components';
import { overlay, OverlayProps } from '@/libs';
import { cn } from '@/utils';

interface CancelConfirmDialogProps extends OverlayProps {
	title: string;
	description?: React.ReactNode;
	cancelButtonText?: string;
	confirmButtonText?: string;
	className?: string;
}

export const CancelConfirmDialog = ({
	title,
	description,
	cancelButtonText = '아니요',
	confirmButtonText = '네, 취소할래요',
	reject,
	resolve,
	overlayKey,
	className,
}: CancelConfirmDialogProps) => {
	const handleClose = () => {
		overlay.remove(overlayKey);
	};

	const handleReject = () => {
		reject?.('close');
		handleClose();
	};

	const handleResolve = () => {
		resolve?.('confirm');
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
				<div className={cn('flex flex-col gap-[12px] text-left px-[8px]')}>
					<div className="head5b">{title}</div>
					{description && (
						<div className="label3 text-gray500">{description}</div>
					)}
				</div>
				<div
					className={cn(
						'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
					)}
				>
					<div className="flex w-full gap-[8px]">
						<div className="flex-1">
							<Button size="sm" variant="secondary" onClick={handleReject}>
								{cancelButtonText}
							</Button>
						</div>
						<div className="flex-1">
							<Button size="sm" onClick={handleResolve} variant="warn">
								{confirmButtonText}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
